"use client";

import { use, useState, useRef, useEffect, useCallback } from "react";
import { useUserLessonDetail, useSegments, useCheckSegment } from "@/hooks/use-lesson";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { ShadowingHeader } from "@/components/shadowing/shadowing-header";
import { ShadowingPlayer } from "@/components/shadowing/shadowing-player";
import { ShadowingRecorder } from "@/components/shadowing/shadowing-recorder";
import { ShadowingResult } from "@/components/shadowing/shadowing-result";
import { CheckSegmentResponse } from "@/types/lesson.type";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Build YouTube embed URL from various URL formats
function getYoutubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0`;
  return url;
}

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;
type Level = (typeof LEVELS)[number];

const LEVEL_LABELS: Record<Level, string> = {
  Beginner: "Sơ cấp",
  Intermediate: "Trung cấp",
  Advanced: "Nâng cao",
  Expert: "Chuyên gia",
};

const LEVEL_COLORS: Record<Level, string> = {
  Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Advanced: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Expert: "text-purple-400 bg-purple-500/10 border-purple-500/20",
};

export default function ShadowingPracticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // --- UI state ---
  const [level, setLevel] = useState<Level>("Beginner");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const [checkResults, setCheckResults] = useState<Record<number, CheckSegmentResponse>>({});
  const [speechSupported, setSpeechSupported] = useState(true);

  // --- Refs ---
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Data fetching ---
  const { data: lesson, isLoading: lessonLoading, error } = useUserLessonDetail(id);
  const { data: segmentsData, isLoading: segmentsLoading } = useSegments(id, level);
  const checkMutation = useCheckSegment();

  const segments = segmentsData?.segments ?? [];
  const levelConfig = segmentsData?.levelConfig;
  const currentSegment = segments[currentIdx] ?? null;
  const progress = segments.length > 0 ? (currentIdx / segments.length) * 100 : 0;

  // --- Speech recognition support check ---
  useEffect(() => {
    const hasSR =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setSpeechSupported(hasSR);
  }, []);

  // --- Reset when level changes ---
  useEffect(() => {
    setCurrentIdx(0);
    setCheckResults({});
    setReplayCount(0);
    setShowTranscript(false);
    setIsPlaying(false);
  }, [level]);

  // --- Reset state on segment change ---
  useEffect(() => {
    setReplayCount(0);
    setShowTranscript(
      levelConfig?.showTranscriptBefore ?? false
    );
    setIsPlaying(false);
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
  }, [currentIdx, levelConfig]);

  // --- Play current segment on HTML5 media ---
  const handlePlaySegment = useCallback(() => {
    if (!currentSegment) return;

    const maxReplays = levelConfig?.maxReplays ?? -1;
    if (maxReplays !== -1 && replayCount >= maxReplays) return;

    const media = mediaRef.current;
    if (media && lesson?.mediaType !== "youtube") {
      media.currentTime = currentSegment.startTime;
      media.play().catch(() => {});
      setIsPlaying(true);
      setReplayCount((c) => c + 1);

      const duration = (currentSegment.endTime - currentSegment.startTime) * 1000 + 300;
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      stopTimerRef.current = setTimeout(() => {
        media.pause();
        setIsPlaying(false);
      }, duration);
    } else {
      // YouTube — just track count; user controls playback manually
      setReplayCount((c) => c + 1);
    }
  }, [currentSegment, levelConfig, lesson, replayCount]);

  const handleStopPlayback = useCallback(() => {
    mediaRef.current?.pause();
    setIsPlaying(false);
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
  }, []);

  // --- Speech recognition recording ---
  const handleRecord = useCallback(() => {
    if (!speechSupported || !lesson) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e: Event & { results: SpeechRecognitionResultList }) => {
      const text = e.results[0][0].transcript;
      setIsRecording(false);
      checkMutation.mutate(
        { id: lesson.id, segmentIndex: currentIdx, data: { level, userText: text, timeSpentSeconds: 0 } },
        {
          onSuccess: (result) => {
            setCheckResults((prev) => ({ ...prev, [currentIdx]: result }));
            if (levelConfig?.showTranscriptAfter) setShowTranscript(true);
          },
        }
      );
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [speechSupported, lesson, currentIdx, level, levelConfig, checkMutation]);

  const handleStopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIdx < segments.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentIdx, segments.length]);

  const handleRestart = () => {
    setCurrentIdx(0);
    setIsCompleted(false);
    setCheckResults({});
    setReplayCount(0);
    setShowTranscript(false);
    setIsPlaying(false);
  };

  // ----------------------------------------------------------------
  // Derived data for result screen
  // ----------------------------------------------------------------
  const completedResults = Object.values(checkResults);
  const avgAccuracy =
    completedResults.length > 0
      ? Math.round(completedResults.reduce((s, r) => s + r.accuracy, 0) / completedResults.length)
      : 0;

  // ----------------------------------------------------------------
  // Early returns
  // ----------------------------------------------------------------
  if (lessonLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#050505]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !lesson) return notFound();

  if (isCompleted) {
    return (
      <ShadowingResult
        score={avgAccuracy}
        onRestart={handleRestart}
        details={[
          {
            label: "Độ chính xác",
            value: avgAccuracy,
            color: "text-orange-400",
          },
          {
            label: "Câu đã làm",
            value: completedResults.length,
            color: "text-emerald-400",
          },
          {
            label: "Câu bỏ qua",
            value: segments.length - completedResults.length,
            color: "text-blue-400",
          },
        ]}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30">
      <ShadowingHeader
        title={lesson.title}
        current={currentIdx + 1}
        total={segments.length || 1}
        progress={progress}
      />

      <main className="container mx-auto px-4 py-8 max-w-[1400px]">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

          {/* ---- LEFT: Media Player (hidden on mobile, show above on small) ---- */}
          <div className="xl:col-span-5 space-y-6">

            {/* Media player card */}
            <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl">
              {lesson.mediaType === "youtube" ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={`${getYoutubeEmbedUrl(lesson.mediaUrl) ?? ""}${currentSegment ? `&start=${Math.floor(currentSegment.startTime)}` : ""}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={lesson.title}
                  />
                </div>
              ) : lesson.mediaType === "video" ? (
                <video
                  ref={mediaRef as React.RefObject<HTMLVideoElement>}
                  className="w-full max-h-64 bg-black"
                  src={lesson.mediaUrl ?? undefined}
                  poster={lesson.thumbnailUrl ?? undefined}
                />
              ) : (
                <div className="p-6">
                  <audio
                    ref={mediaRef as React.RefObject<HTMLAudioElement>}
                    className="w-full"
                    src={lesson.audioUrl ?? undefined}
                  />
                </div>
              )}
              <div className="px-5 py-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-3">
                <Badge className={cn("text-[10px]", LEVEL_COLORS[level])}>
                  {LEVEL_LABELS[level]}
                </Badge>
                <span className="text-xs text-gray-500 dark:text-zinc-500 flex-1 line-clamp-1">
                  {lesson.title}
                </span>
              </div>
            </div>

            {/* Level Selector */}
            <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-5 shadow-xl">
              <h3 className="font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em] mb-3">
                Cấp độ
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={cn(
                      "px-3 py-2.5 rounded-xl text-xs font-bold transition-all border",
                      level === l
                        ? "bg-orange-500 text-white border-orange-500 shadow-md"
                        : "bg-transparent text-gray-600 dark:text-zinc-400 border-transparent hover:bg-gray-100 dark:hover:bg-white/5"
                    )}
                  >
                    {LEVEL_LABELS[l]}
                  </button>
                ))}
              </div>
            </div>

            {/* Transcript panel (all segments) */}
            {segments.length > 0 && (
              <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-5 shadow-xl max-h-72 overflow-y-auto">
                <h3 className="font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em] mb-3 sticky top-0 bg-white dark:bg-[#18181b] py-1">
                  Bản chép
                </h3>
                <ol className="space-y-2">
                  {segments.map((seg, i) => (
                    <li
                      key={i}
                      onClick={() => setCurrentIdx(i)}
                      className={cn(
                        "flex gap-3 p-3 rounded-xl cursor-pointer text-sm transition-colors",
                        i === currentIdx
                          ? "bg-orange-500/10 border border-orange-500/20 text-gray-900 dark:text-white"
                          : "hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-zinc-400",
                        checkResults[i] ? "opacity-100" : "opacity-70"
                      )}
                    >
                      <span className="shrink-0 w-5 h-5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] flex items-center justify-center font-black">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{seg.text}</span>
                      {checkResults[i] && (
                        <span className={cn("ml-auto shrink-0 text-xs font-bold",
                          checkResults[i].accuracy >= 80 ? "text-emerald-400" : checkResults[i].accuracy >= 60 ? "text-orange-400" : "text-rose-400"
                        )}>
                          {checkResults[i].accuracy.toFixed(0)}%
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* ---- RIGHT: Practice Area ---- */}
          <div className="xl:col-span-7 space-y-6">
            {segmentsLoading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            ) : segments.length === 0 ? (
              <div className="flex items-center justify-center py-32 text-gray-500 dark:text-zinc-500 text-sm">
                Bài học này chưa có dữ liệu cho cấp độ đã chọn.
              </div>
            ) : (
              <>
                <ShadowingPlayer
                  isPlaying={isPlaying}
                  onPlayPause={isPlaying ? handleStopPlayback : handlePlaySegment}
                  onNext={handleNext}
                  onPrev={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  canNext={currentIdx < segments.length - 1}
                  canPrev={currentIdx > 0}
                  segment={currentSegment}
                  showTranscript={showTranscript}
                  onToggleTranscript={() => setShowTranscript((v) => !v)}
                  replayCount={replayCount}
                  maxReplays={levelConfig?.maxReplays ?? -1}
                />

                <ShadowingRecorder
                  isRecording={isRecording}
                  onRecord={isRecording ? handleStopRecording : handleRecord}
                  checkResult={checkResults[currentIdx] ?? null}
                  isChecking={checkMutation.isPending}
                  onNext={handleNext}
                  onRetry={() => {
                    setCheckResults((prev) => {
                      const next = { ...prev };
                      delete next[currentIdx];
                      return next;
                    });
                  }}
                  speechSupported={speechSupported}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

