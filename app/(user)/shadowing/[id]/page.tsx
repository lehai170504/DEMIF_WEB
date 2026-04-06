"use client";

import { use, useState, useRef, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Custom Hooks
import {
  useUserLessonDetail,
  useSegments,
  useCheckVoice,
  useCheckShadowingSegment,
} from "@/hooks/use-lesson";

// UI Components
import { ShadowingHeader } from "@/components/shadowing/shadowing-header";
import { ShadowingPlayer } from "@/components/shadowing/shadowing-player";
import { ShadowingRecorder } from "@/components/shadowing/shadowing-recorder";
import { ShadowingResult } from "@/components/shadowing/shadowing-result";

// Tách Components
import { ShadowingMedia } from "@/components/shadowing/shadowing-media";
import {
  ShadowingLevelSelector,
  Level,
  LEVEL_LABELS,
  LEVEL_COLORS,
} from "@/components/shadowing/shadowing-level-selector";
import { ShadowingPlaylist } from "@/components/shadowing/shadowing-playlist";
import { ShadowingTextFallback } from "@/components/shadowing/shadowing-text-fallback";

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
  const [userText, setUserText] = useState("");

  const [checkResults, setCheckResults] = useState<Record<number, any>>({});
  const [speechSupported, setSpeechSupported] = useState(true);

  // --- Refs ---
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Data fetching & Mutations ---
  const {
    data: lesson,
    isLoading: lessonLoading,
    error,
  } = useUserLessonDetail(id);
  const { data: segmentsData, isLoading: segmentsLoading } = useSegments(
    id,
    level,
  );

  const checkVoiceMutation = useCheckVoice(id, currentIdx);
  const checkSegmentMutation = useCheckShadowingSegment();

  const segments = segmentsData?.segments ?? [];
  const levelConfig = segmentsData?.levelConfig;
  const currentSegment = segments[currentIdx] ?? null;
  
  // Mix: Dữ liệu backend trả về và local runtime progress
  const serverProgress = segmentsData?.progressPercent ?? 0;
  const localProgress = segments.length > 0 ? (currentIdx / segments.length) * 100 : 0;
  const progress = Math.max(serverProgress, localProgress);

  // --- Check Speech API Support ---
  useEffect(() => {
    const hasSR =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setSpeechSupported(hasSR);
  }, []);

  // --- Reset logic ---
  useEffect(() => {
    setCurrentIdx(0);
    setCheckResults({});
    setReplayCount(0);
    setShowTranscript(false);
    setIsPlaying(false);
    setUserText("");
  }, [level]);

  useEffect(() => {
    setReplayCount(0);
    setShowTranscript(levelConfig?.showTranscriptBefore ?? false);
    setIsPlaying(false);
    setUserText("");
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
  }, [currentIdx, levelConfig]);

  // --- Media Control ---
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

      const duration =
        (currentSegment.endTime - currentSegment.startTime) * 1000 + 300;
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      stopTimerRef.current = setTimeout(() => {
        media.pause();
        setIsPlaying(false);
      }, duration);
    } else {
      setReplayCount((c) => c + 1);
    }
  }, [currentSegment, levelConfig, lesson, replayCount]);

  const handleStopPlayback = useCallback(() => {
    mediaRef.current?.pause();
    setIsPlaying(false);
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
  }, []);

  // --- LƯỒNG 1: CHECK BẰNG VOICE ---
  const handleRecord = useCallback(() => {
    if (!speechSupported || !lesson) return;

    const SR =
      (window as any).SpeechRecognition ??
      (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      const confidence = e.results[0][0].confidence;
      setIsRecording(false);

      checkVoiceMutation.mutate(
        {
          level,
          spokenText: text,
          speechConfidence: confidence,
          timeSpentSeconds: 5,
        },
        {
          onSuccess: (result) => {
            setCheckResults((prev) => ({ ...prev, [currentIdx]: result }));
            if (levelConfig?.showTranscriptAfter) setShowTranscript(true);
          },
        },
      );
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [
    speechSupported,
    lesson,
    currentIdx,
    level,
    levelConfig,
    checkVoiceMutation,
  ]);

  const handleStopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  // --- LƯỒNG 2: CHECK BẰNG TEXT ---
  const handleCheckText = () => {
    if (!userText.trim()) return;

    checkSegmentMutation.mutate(
      {
        id,
        segmentIndex: currentIdx,
        data: { level, userText, timeSpentSeconds: 5 },
      },
      {
        onSuccess: (result) => {
          setCheckResults((prev) => ({ ...prev, [currentIdx]: result }));
          if (levelConfig?.showTranscriptAfter) setShowTranscript(true);
        },
      },
    );
  };

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
    setUserText("");
  };

  // --- Dữ liệu tổng kết ---
  const completedResults = Object.values(checkResults);
  const avgAccuracy =
    completedResults.length > 0
      ? Math.round(
          completedResults.reduce(
            (s, r) => s + (r.accuracyScore ?? r.accuracy ?? 0),
            0,
          ) / completedResults.length,
        )
      : 0;

  if (lessonLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#050505]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
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
          { label: "Độ chính xác", value: avgAccuracy, color: "text-blue-500" },
          {
            label: "Câu đã nói",
            value: completedResults.length,
            color: "text-emerald-500",
          },
          {
            label: "Câu còn lại",
            value: segments.length - completedResults.length,
            color: "text-rose-500",
          },
        ]}
      />
    );
  }

  const isChecking =
    checkVoiceMutation.isPending || checkSegmentMutation.isPending;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-blue-500/30">
      <ShadowingHeader
        title={lesson.title}
        current={currentIdx + 1}
        total={segments.length || 1}
        progress={progress}
      />

      <main className="container mx-auto px-4 py-8 max-w-[1400px]">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL */}
          <div className="xl:col-span-5 space-y-6">
            <ShadowingMedia
              lesson={lesson}
              currentSegment={currentSegment}
              mediaRef={mediaRef}
              levelLabel={LEVEL_LABELS[level]}
              levelColor={LEVEL_COLORS[level]}
            />

            <ShadowingLevelSelector level={level} onSelectLevel={setLevel} />

            <ShadowingPlaylist
              segments={segments}
              currentIdx={currentIdx}
              checkResults={checkResults}
              onSelectSegment={setCurrentIdx}
            />
          </div>

          {/* RIGHT PANEL: Practice Area */}
          <div className="xl:col-span-7 space-y-6">
            {segmentsLoading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : segments.length === 0 ? (
              <div className="flex items-center justify-center py-32 text-gray-500 text-sm">
                Bài học chưa có dữ liệu cho cấp độ này.
              </div>
            ) : (
              <>
                <ShadowingPlayer
                  isPlaying={isPlaying}
                  onPlayPause={
                    isPlaying ? handleStopPlayback : handlePlaySegment
                  }
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
                  isChecking={isChecking}
                  onNext={handleNext}
                  onRetry={() => {
                    setUserText("");
                    setCheckResults((prev) => {
                      const next = { ...prev };
                      delete next[currentIdx];
                      return next;
                    });
                  }}
                  speechSupported={speechSupported}
                />

                {/* TEXT FALLBACK COMPONENT */}
                <AnimatePresence>
                  {!checkResults[currentIdx] && !isRecording && (
                    <ShadowingTextFallback
                      userText={userText}
                      isChecking={isChecking}
                      onUserTextChange={setUserText}
                      onCheckText={handleCheckText}
                    />
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
