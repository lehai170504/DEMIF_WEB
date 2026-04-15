"use client";

import { use, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { toast } from "sonner";

// Custom Hooks
import {
  useUserLessonDetail,
  useSegments,
  useCheckVoice,
  useCheckShadowingSegment,
  useMyProgress,
  useSyncLessonProgress,
} from "@/hooks/use-lesson";
import { useYoutubePlayer } from "@/hooks/use-youtube-player";
import { useAddVocabulary } from "@/hooks/use-vocabulary";

// UI Components
import { ShadowingHeader } from "@/components/shadowing/shadowing-header";
import { ShadowingResult } from "@/components/shadowing/shadowing-result";
import { ShadowingMedia } from "@/components/shadowing/shadowing-media";
import { ShadowingPlaylist } from "@/components/shadowing/shadowing-playlist";
import { ShadowingWorkout } from "@/components/shadowing/shadowing-workout";
import { QuickAddVocabDialog } from "@/components/dictation/quick-add-vocab-dialog";
import {
  Level,
  LEVEL_LABELS,
  LEVEL_COLORS,
} from "@/components/shadowing/shadowing-level-selector";

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
  const [isCompleted, setIsCompleted] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const [userText, setUserText] = useState("");
  const [checkResults, setCheckResults] = useState<Record<number, any>>({});
  const [speechSupported, setSpeechSupported] = useState(true);

  // --- Vocabulary State ---
  const [selectedWord, setSelectedWord] = useState("");
  const [isVocabDialogOpen, setIsVocabDialogOpen] = useState(false);

  // --- Refs ---
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);
  const segmentsRef = useRef<any[]>([]);

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
  const { data: myProgress } = useMyProgress(id);

  const checkVoiceMutation = useCheckVoice(id, currentIdx);
  const checkSegmentMutation = useCheckShadowingSegment();
  const syncProgressMutation = useSyncLessonProgress();
  const addVocabMutation = useAddVocabulary();

  const segments = segmentsData?.segments ?? [];
  const levelConfig = segmentsData?.levelConfig;

  const currentSegment = useMemo(() => {
    return segments.length > 0 && segments[currentIdx]
      ? segments[currentIdx]
      : null;
  }, [segments, currentIdx]);

  // Sync segments ref
  useEffect(() => {
    segmentsRef.current = segments;
  }, [segments]);
  
  const isProgressRestored = useRef(false);

  useEffect(() => {
    if (segments.length > 0 && myProgress && !isProgressRestored.current) {
        setCheckResults(prev => {
           const restored = { ...prev };
           myProgress.completedSegments?.forEach((cs: any) => {
              restored[cs.segmentIndex] = {
                 score: cs.bestScore,
                 accuracy: cs.bestScore,
                 passed: true
              };
           });
           return restored;
        });
        
        // Restore progress pointer
        if (myProgress.completedSegments && myProgress.completedSegments.length < segments.length) {
           const nextIdx = myProgress.lastSegmentIndex ?? 0;
           setCurrentIdx(nextIdx >= segments.length ? 0 : nextIdx);
        } else if (myProgress.completedSegments && myProgress.completedSegments.length > 0) {
           setIsCompleted(true);
        }
        isProgressRestored.current = true;
    }
  }, [segments, myProgress, level]);

  // --- logic: Xử lý YouTube Sync ---
  function handleYouTubeTimeUpdate(time: number) {
    const segs = segmentsRef.current;
    if (!segs.length) return;

    const currentSeg = segs[currentIdx];

    if (currentSeg && time >= currentSeg.endTime) {
      if (time >= currentSeg.endTime + 0.3) {
        ytPause();
        setIsPlaying(false);
      }
      return;
    }

    const segIdx = segs.findIndex(
      (seg: any) => time >= seg.startTime && time < seg.endTime,
    );
    if (segIdx !== -1 && segIdx !== currentIdx) {
      setCurrentIdx(segIdx);
    }
  }

  // --- LESSON TRACKER (SYNC PROGRESS) ---
  const lastSyncedIdx = useRef(currentIdx);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Refs for background values (avoiding effect re-triggers)
  const currentIdxRef = useRef(currentIdx);
  const isCompletedRef = useRef(isCompleted);
  useEffect(() => { currentIdxRef.current = currentIdx; }, [currentIdx]);
  useEffect(() => { isCompletedRef.current = isCompleted; }, [isCompleted]);

  // Extract mutate to keep triggerSync stable
  const { mutate: syncMutate } = syncProgressMutation;

  const triggerSync = useCallback((idx: number, isFinished: boolean = false) => {
    if (!id) return;
    
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    syncMutate({
      id: id,
      data: { 
        segmentIndex: idx, 
        isCompleted: isFinished // isCompleted ở đây nên là trạng thái TỔNG THỂ của bài
      },
    });
    lastSyncedIdx.current = idx;
  }, [id, syncMutate]);

  // 1. Sync khi đổi đoạn (Debounce 5s)
  useEffect(() => {
    if (isCompleted) return;
    
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    
    syncTimeoutRef.current = setTimeout(() => {
      if (currentIdx !== lastSyncedIdx.current) {
        // Luôn gửi isCompleted: false khi đang học dở
        triggerSync(currentIdx, false);
      }
    }, 5000);

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [currentIdx, isCompleted, triggerSync]);

  // 2. Sync khi Pause
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const onPause = () => {
       if (!isCompletedRef.current) triggerSync(currentIdxRef.current, false);
    };
    media.addEventListener("pause", onPause);
    return () => media.removeEventListener("pause", onPause);
  }, [triggerSync]);

  // 3. Sync khi Exit (Page Unload / Unmount)
  useEffect(() => {
    const onExit = () => {
      if (!isCompletedRef.current) triggerSync(currentIdxRef.current, false);
    };

    window.addEventListener("beforeunload", onExit);

    return () => {
      window.removeEventListener("beforeunload", onExit);
      onExit(); 
    };
  }, [triggerSync]);

  const {
    setIframeRef,
    seekAndPlay: ytSeekAndPlay,
    pauseVideo: ytPause,
  } = useYoutubePlayer(handleYouTubeTimeUpdate);

  // --- Progress Calculations ---
  const progress = useMemo(() => {
    const serverProgress = myProgress?.progressPercent ?? segmentsData?.progressPercent ?? 0;
    const localProgress =
      segments.length > 0 ? (currentIdx / segments.length) * 100 : 0;
    return Math.max(serverProgress, localProgress);
  }, [segmentsData, myProgress, segments.length, currentIdx]);

  // --- Browser Support Check ---
  useEffect(() => {
    const hasSR =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setSpeechSupported(hasSR);
  }, []);

  // --- Reset logic khi đổi Level ---
  useEffect(() => {
    setCurrentIdx(0);
    setCheckResults({});
    setReplayCount(0);
    setIsPlaying(false);
    setUserText("");
    isProgressRestored.current = false;
  }, [level]);

  // --- Media Control ---
  const handlePlaySegment = useCallback(() => {
    if (!currentSegment) return;
    const maxReplays = levelConfig?.maxReplays ?? -1;
    if (maxReplays !== -1 && replayCount >= maxReplays) return;

    setIsPlaying(true);
    setReplayCount((c) => c + 1);

    if (lesson?.mediaType === "youtube") {
      ytSeekAndPlay(currentSegment.startTime);
    } else {
      const audioVideo = mediaRef.current as HTMLMediaElement | null;
      if (!audioVideo) return;
      audioVideo.currentTime = currentSegment.startTime;
      audioVideo.play().catch(() => {
        toast.error("Vui lòng ấn Play thủ công trước để cấp quyền trình duyệt");
      });
    }
  }, [currentSegment, levelConfig, lesson, replayCount, ytSeekAndPlay]);

  const handleStopPlayback = useCallback(() => {
    if (lesson?.mediaType === "youtube") {
      ytPause();
    } else {
      mediaRef.current?.pause();
    }
    setIsPlaying(false);
  }, [lesson, ytPause]);

  const handleSelectSegment = useCallback(
    (idx: number) => {
      setCurrentIdx(idx);
      const seg = segments[idx];
      if (!seg) return;

      if (lesson?.mediaType === "youtube") {
        ytSeekAndPlay(seg.startTime);
        setIsPlaying(true);
      } else {
        const audioVideo = mediaRef.current as HTMLMediaElement | null;
        if (!audioVideo) return;
        audioVideo.currentTime = seg.startTime;
        audioVideo.play().catch(() => {});
        setIsPlaying(true);
      }
    },
    [segments, lesson, ytSeekAndPlay],
  );

  // --- Shadowing Logic ---
  const handleRecord = useCallback(() => {
    if (!speechSupported || !lesson) return;
    const SR =
      (window as any).SpeechRecognition ??
      (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
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
            // Chỉ gửi isCompleted: false để lưu progress segment
            triggerSync(currentIdx, false);
          },
        },
      );
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [speechSupported, lesson, currentIdx, level, checkVoiceMutation, triggerSync]);

  const handleStopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

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
          // Chỉ gửi isCompleted: false để lưu progress segment
          triggerSync(currentIdx, false);
        },
      },
    );
  };

  const handleNext = useCallback(() => {
    if (currentIdx < segments.length - 1) {
      handleSelectSegment(currentIdx + 1);
    } else {
      // Chỉ đoạn cuối cùng mới gửi true
      triggerSync(currentIdx, true); 
      setIsCompleted(true);
    }
  }, [currentIdx, segments.length, handleSelectSegment, triggerSync]);

  // --- Vocabulary Logic ---
  const handleOpenVocabDialog = useCallback((word: string) => {
    setSelectedWord(word.trim());
    setIsVocabDialogOpen(true);
  }, []);

  const handleSaveVocab = (data: any) => {
    addVocabMutation.mutate(data, {
      onSuccess: () => {
        toast.success(`Đã lưu "${data.word}" vào sổ tay!`);
        setIsVocabDialogOpen(false);
      },
      onError: () => toast.error("Không thể lưu từ vựng lúc này."),
    });
  };

  if (lessonLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#050505]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !lesson) return notFound();

  if (isCompleted) {
    const completedResults = Object.values(checkResults);
    const avgAccuracy =
      completedResults.length > 0
        ? Math.round(
            completedResults.reduce((s, r) => s + (r.accuracyScore ?? 0), 0) /
              completedResults.length,
          )
        : 0;
    return (
      <ShadowingResult
        score={avgAccuracy}
        onRestart={() => {
          setCurrentIdx(0);
          setIsCompleted(false);
          setCheckResults({});
        }}
        details={[
          {
            label: "Độ chính xác",
            value: avgAccuracy,
            color: "text-orange-500",
          },
        ]}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 overflow-hidden">
      <ShadowingHeader
        title={lesson.title}
        current={currentIdx + 1}
        total={segments.length || 1}
        progress={progress}
        level={level}
        onSelectLevel={setLevel}
      />

      <main className="flex-1 flex flex-col lg:flex-row min-h-0">
        <div className="flex-1 min-w-0 flex flex-col h-full border-r border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.01]">
          <div className="shrink-0 p-4 border-b border-gray-100 dark:border-white/5">
            <div className="max-w-[440px] mx-auto">
              {/* KIỂM TRA LESSON VÀ CURRENTSEGMENT TRƯỚC KHI RENDER */}
              {lesson && (
                <ShadowingMedia
                  lesson={lesson}
                  currentSegment={currentSegment}
                  mediaRef={mediaRef}
                  iframeRef={
                    lesson.mediaType === "youtube" ? setIframeRef : undefined
                  }
                  levelLabel={LEVEL_LABELS[level]}
                  levelColor={LEVEL_COLORS[level]}
                  onAddVocab={handleOpenVocabDialog}
                />
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-6">
            <div className="max-w-4xl mx-auto pb-12">
              <ShadowingWorkout
                isLoading={segmentsLoading}
                segmentsLength={segments.length}
                isRecording={isRecording}
                handleStopRecording={handleStopRecording}
                handleRecord={handleRecord}
                checkResult={checkResults[currentIdx]}
                isChecking={
                  checkVoiceMutation.isPending || checkSegmentMutation.isPending
                }
                handleNext={handleNext}
                handleRetry={() =>
                  setCheckResults((p) => {
                    const n = { ...p };
                    delete n[currentIdx];
                    return n;
                  })
                }
                speechSupported={speechSupported}
                userText={userText}
                setUserText={setUserText}
                handleCheckText={handleCheckText}
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[500px] shrink-0 bg-white dark:bg-[#050505] flex flex-col h-full shadow-2xl">
          <ShadowingPlaylist
            segments={segments}
            currentIdx={currentIdx}
            checkResults={checkResults}
            myProgress={myProgress}
            onSelectSegment={handleSelectSegment}
            isPlaying={isPlaying}
            onPlayPause={isPlaying ? handleStopPlayback : handlePlaySegment}
            onAddVocab={handleOpenVocabDialog}
          />
        </div>
      </main>

      <QuickAddVocabDialog
        isOpen={isVocabDialogOpen}
        onOpenChange={setIsVocabDialogOpen}
        word={selectedWord}
        lessonId={id}
        topic={lesson.category || "General"}
        contextSentence={currentSegment?.text || ""}
        isAdding={addVocabMutation.isPending}
        onSave={handleSaveVocab}
      />
    </div>
  );
}
