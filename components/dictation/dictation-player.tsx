import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Loader2, ListTodo } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import {
  useSubmitDictation,
  useCheckDictationSegment,
  useSyncLessonProgress,
  useMyProgress,
} from "@/hooks/use-lesson";
import { useQuery } from "@tanstack/react-query";
import { lessonService } from "@/services/lesson.service";
import { LessonDto, DictationAnswer } from "@/types/lesson.type";
import { useYoutubePlayer } from "@/hooks/use-youtube-player";
import { useAddVocabulary } from "@/hooks/use-vocabulary";

import { DictationHeader } from "@/components/dictation/dictation-header";
import { DictationMedia } from "@/components/dictation/dictation-media";
import { DictationResult } from "@/components/dictation/dictation-result";
import { DictationPlaylist } from "@/components/dictation/dictation-playlist";

import { DictationStats } from "@/components/dictation/dictation-stats";
import { DictationWorkout } from "@/components/dictation/dictation-workout";

// Helper Functions
function getYoutubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url || url === "string" || url.trim() === "") return null;
  if (url.includes("/embed/"))
    return `${url.split("?")[0]}?autoplay=0&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?rel=0&enablejsapi=1`
    : null;
}

const getCleanMediaUrl = (url: string | null | undefined) => {
  if (!url || url === "string" || url.trim() === "") return undefined;
  if (url.startsWith("storage.")) return `https://${url}`;
  return url;
};

interface DictationPlayerProps {
  lesson: LessonDto;
}

export function DictationPlayer({ lesson }: DictationPlayerProps) {
  const [level, setLevel] = useState("Beginner");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);

  const [segmentResults, setSegmentResults] = useState<Record<number, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const segmentsRef = useRef<any[]>([]);

  const { data: exercise, isLoading } = useQuery({
    queryKey: ["dictation", lesson.id, level],
    queryFn: () => lessonService.getDictationExercise(lesson.id, level),
    enabled: !!lesson.id && !!level,
  });

  const submitMutation = useSubmitDictation();
  const checkSegmentMutation = useCheckDictationSegment();
  const syncProgressMutation = useSyncLessonProgress();
  const { data: myProgress } = useMyProgress(lesson.id);

  // KHỞI TẠO HOOK LƯU TỪ VỰNG
  const addVocabMutation = useAddVocabulary();

  const segments = exercise?.template.segments || [];
  const currentSegment = segments[currentIdx];

  const youtubeUrl = useMemo(() => {
    const url = exercise?.mediaUrl ?? lesson.mediaUrl;
    return getYoutubeEmbedUrl(url);
  }, [exercise?.mediaUrl, lesson.mediaUrl]);

  const isVideoType =
    (exercise?.mediaType ?? lesson.mediaType)?.toLowerCase() === "video";

  const finalMediaUrl = useMemo(() => {
    const url =
      exercise?.mediaUrl ??
      exercise?.audioUrl ??
      lesson.mediaUrl ??
      lesson.audioUrl;
    return getCleanMediaUrl(url);
  }, [exercise, lesson]);

  useEffect(() => {
    segmentsRef.current = segments;
  }, [segments]);

  const isProgressRestored = useRef(false);

  // Sync initial level from myProgress if available
  useEffect(() => {
    if (myProgress?.level && !isProgressRestored.current) {
      setLevel(myProgress.level);
    }
  }, [myProgress]);

  useEffect(() => {
    if (exercise && myProgress && !isProgressRestored.current) {
      setAnswers(prev => {
        const restored = { ...prev };
        myProgress.completedSegments?.forEach((cs: any) => {
          const seg = exercise.template.segments[cs.segmentIndex];
          if (!seg) return;
          seg.words.forEach((w: any) => {
            if (w.isBlank) restored[`${cs.segmentIndex}-${w.position}`] = w.text;
          });
        });
        return restored;
      });

      setSegmentResults(prev => {
        const restored = { ...prev };
        myProgress.completedSegments?.forEach((cs: any) => {
          const seg = exercise.template.segments[cs.segmentIndex];
          if (!seg) return;
          restored[cs.segmentIndex] = {
            segmentIndex: cs.segmentIndex,
            transcript: seg.words.map((w:any) => w.text + (w.punctuation||'')).join(' '),
            userText: seg.words.map((w:any) => w.text + (w.punctuation||'')).join(' '),
            words: seg.words.map((w:any) => ({ text: w.text, isCorrect: true, isBlank: w.isBlank })),
            accuracy: 100,
            isCorrect: true
          };
        });
        return restored;
      });
      
      // Restore progress pointer
      if (myProgress.completedSegments && myProgress.completedSegments.length < exercise.template.segments.length) {
         const nextIdx = myProgress.lastSegmentIndex ?? 0;
         setCurrentIdx(nextIdx >= exercise.template.segments.length ? 0 : nextIdx);
      } else if (myProgress.completedSegments && myProgress.completedSegments.length > 0) {
         setIsCompleted(true);
      }
      isProgressRestored.current = true;
    }
  }, [exercise, myProgress, level]);

  const { setIframeRef, seekAndPlay, pauseVideo } = useYoutubePlayer(
    youtubeUrl ? handleYouTubeTimeUpdate : undefined,
  );

  useEffect(() => {
    if (!currentSegment || isCompleted) return;
    const timer = setTimeout(() => {
      const blanks = currentSegment.words.filter((w: any) => w.isBlank);
      if (blanks.length > 0) {
        const firstBlankPosition = blanks[0].position;
        const key = `${currentIdx}-${firstBlankPosition}`;
        inputRefs.current[key]?.focus();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [currentIdx, currentSegment, isCompleted]);

  function handleYouTubeTimeUpdate(time: number) {
    const segs = segmentsRef.current;
    if (!segs.length) return;
    const currentSeg = segs[currentIdx];

    if (currentSeg && time >= currentSeg.endTime) {
      if (time >= currentSeg.endTime + 0.3) pauseVideo();
      return;
    }

    const segIdx = segs.findIndex(
      (seg: any) => time >= seg.startTime && time < seg.endTime,
    );
    if (segIdx !== -1) {
      setCurrentIdx((prev) => (prev === segIdx ? prev : segIdx));
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (level) {
      if (audioRef.current) audioRef.current.pause();
      if (videoRef.current) videoRef.current.pause();
      setSegmentResults({});
      setCurrentIdx(0);
      setIsCompleted(false);
      isProgressRestored.current = false;
    }
  }, [level]);

  useEffect(() => {
    if (youtubeUrl) return;
    const interval = setInterval(() => {
      const media = (audioRef.current ??
        videoRef.current) as HTMLMediaElement | null;
      if (!media || media.paused) return;

      const t = media.currentTime;
      const segs = segmentsRef.current;
      const currentSeg = segs[currentIdx];

      if (currentSeg && t >= currentSeg.endTime) {
        if (t >= currentSeg.endTime + 0.3) media.pause();
        return;
      }

      const segIdx = segs.findIndex(
        (seg: any) => t >= seg.startTime && t < seg.endTime,
      );
      if (segIdx !== -1) {
        setCurrentIdx((prev) => (prev === segIdx ? prev : segIdx));
      }
    }, 300);
    return () => clearInterval(interval);
  }, [youtubeUrl, currentIdx]);

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
    if (!lesson.id) return;
    
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    syncMutate({
      id: lesson.id,
      data: { 
        segmentIndex: idx, 
        isCompleted: isFinished // isCompleted ở đây nên là trạng thái TỔNG THỂ của lesson
      },
    });
    lastSyncedIdx.current = idx;
  }, [lesson.id, syncMutate]);

  // 1. Sync khi đổi đoạn (Debounce 5s)
  useEffect(() => {
    if (isCompleted) return;
    
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    
    syncTimeoutRef.current = setTimeout(() => {
      if (currentIdx !== lastSyncedIdx.current) {
        // Luôn gửi isCompleted: false khi đang học dở các đoạn
        triggerSync(currentIdx, false);
      }
    }, 5000);

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [currentIdx, isCompleted, triggerSync]);

  // 2. Sync khi Pause
  useEffect(() => {
    const media = (audioRef.current ?? videoRef.current) as HTMLMediaElement | null;
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

  const seekAndPlaySegment = useCallback(
    (segIndex: number) => {
      const seg = segments[segIndex];
      if (!seg) return;

      if (youtubeUrl) {
        seekAndPlay(seg.startTime);
      } else {
        const media =
          audioRef.current ?? (videoRef.current as HTMLMediaElement | null);
        if (!media) return;
        media.currentTime = seg.startTime;
        media.play().catch(() => {});
      }
    },
    [segments, youtubeUrl, seekAndPlay],
  );

  const handleSelectSegment = useCallback(
    (idx: number) => {
      setCurrentIdx(idx);
      seekAndPlaySegment(idx);
    },
    [seekAndPlaySegment],
  );

  const handleInputChange = useCallback(
    (segmentIndex: number, position: number, value: string) => {
      setAnswers((prev) => ({
        ...prev,
        [`${segmentIndex}-${position}`]: value,
      }));
    },
    [],
  );

  const handleKeyDown = (e: React.KeyboardEvent, currentKey: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const segmentKeys = Object.keys(inputRefs.current)
        .filter((k) => k.startsWith(`${currentIdx}-`))
        .sort((a, b) => {
          const pA = Number(a.split("-")[1]);
          const pB = Number(b.split("-")[1]);
          return pA - pB;
        });

      const nextIdx = segmentKeys.indexOf(currentKey) + 1;
      if (nextIdx < segmentKeys.length) {
        inputRefs.current[segmentKeys[nextIdx]]?.focus();
      } else {
        handleCheckSegment(currentIdx, true);
      }
    }
  };

  const handleCheckSegment = (segIndex: number, autoNext?: boolean) => {
    if (!exercise) return;
    const segment = exercise.template.segments[segIndex];

    const userText = segment.words
      .map((w: any) => {
        const val = w.isBlank
          ? answers[`${segIndex}-${w.position}`]?.trim() || ""
          : w.text;
        return val + (w.punctuation || "");
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    checkSegmentMutation.mutate(
      {
        id: lesson.id,
        segmentIndex: segIndex,
        data: { level, userText, timeSpentSeconds: timeSpent },
      },
      {
        onSuccess: (data) => {
          setSegmentResults((prev) => ({ ...prev, [segIndex]: data }));
          
          // Gõ đúng -> Sync vị trí mới nhưng chưa hoàn thành bài
          if (data.accuracy === 100) {
            triggerSync(segIndex, false);
          }

          if (autoNext && segIndex < segments.length - 1) {
            setTimeout(() => handleSelectSegment(segIndex + 1), 1000);
          }
        },
      },
    );
  };

  const handleSubmit = () => {
    if (!exercise) return;
    const formattedAnswers: DictationAnswer[] = segments.flatMap(
      (segment: any, segmentIndex: number) =>
        segment.words
          .filter((word: any) => word.isBlank)
          .map((word: any) => ({
            segmentIndex,
            position: word.position,
            userInput:
              answers[`${segmentIndex}-${word.position}`]?.trim() ?? "",
          })),
    );

    submitMutation.mutate({
      id: lesson.id,
      data: { level, answers: formattedAnswers, timeSpentSeconds: timeSpent },
    });

    // Chỉ khi nộp bài cuối cùng mới đánh dấu isCompleted: true
    syncProgressMutation.mutate({
      id: lesson.id,
      data: { segmentIndex: currentIdx, isCompleted: true },
    });
    setIsCompleted(true);
  };

  const handleAddVocab = useCallback(
    (data: {
      lessonId: string;
      word: string;
      topic: string;
      meaning: string;
      contextSentence?: string;
      note?: string;
    }) => {
      if (!data.word || addVocabMutation.isPending) return;

      addVocabMutation.mutate(data, {
        onSuccess: () => {
          toast.success(`Đã thêm "${data.word}" vào sổ tay từ vựng!`);
        },
        onError: () => {
          toast.error("Không thể lưu từ vựng lúc này.");
        },
      });
    },
    [addVocabMutation],
  );

  const { totalBlanks, filledBlanks, progress } = useMemo(() => {
    const totalBlanks = exercise?.template.totalBlanks || 0;
    const filledBlanks = Object.values(answers).filter(
      (v) => v.trim() !== "",
    ).length;
    return {
      totalBlanks,
      filledBlanks,
      progress: totalBlanks > 0 ? (filledBlanks / totalBlanks) * 100 : 0,
    };
  }, [exercise, answers]);

  return (
    <div className="h-screen flex flex-col font-sans text-gray-900 dark:text-zinc-100 bg-white dark:bg-background selection:bg-orange-500/30 overflow-hidden">
      {/* HEADER cố định trên cùng */}
      <div className="shrink-0">
        <DictationHeader
          lesson={lesson}
          level={level}
          onSelectLevel={(l) => {
            setLevel(l);
            setAnswers({});
            setSegmentResults({});
            submitMutation.reset();
          }}
          progress={progress}
        />
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 overflow-hidden container mx-auto max-w-[1700px] px-4 py-4">
        <div className="flex flex-col xl:flex-row gap-6 items-start h-full">
          {/* CỘT TRÁI (60%): Media + Workout */}
          <div className="flex-1 w-full xl:w-[60%] flex flex-col h-full overflow-hidden relative">
            {/* MEDIA - Dính chặt ở trên, không bao giờ cuộn (shrink-0) */}
            <div className="sticky top-0 z-30 shrink-0 w-full p-4 border-b border-gray-200 dark:border-white/5 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl rounded-t-[2.5rem] shadow-sm">
              <div className="max-w-[440px] mx-auto">
                <DictationMedia
                  lessonTitle={lesson.title}
                  youtubeUrl={youtubeUrl}
                  isVideoType={isVideoType}
                  finalMediaUrl={finalMediaUrl}
                  audioRef={audioRef}
                  videoRef={videoRef}
                  iframeRef={youtubeUrl ? setIframeRef : undefined}
                  showHints={showHints}
                  onToggleHints={() => setShowHints(!showHints)}
                  thumbnailUrl={lesson.thumbnailUrl}
                />
              </div>
            </div>

            {/* KHU VỰC WORKOUT */}
            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative z-0">
              <div className="flex flex-col min-h-full pb-20">
                {isLoading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
                  </div>
                ) : !exercise || !currentSegment ? (
                  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/5 rounded-[2.5rem] text-zinc-500 font-bold uppercase text-xs gap-4 mx-2">
                    <div className="p-4 rounded-full bg-gray-50 dark:bg-white/5">
                      <ListTodo className="w-10 h-10" />
                    </div>
                    Không có dữ liệu bài tập
                  </div>
                ) : isCompleted ? (
                  <div className="flex-1 flex items-center justify-center">
                    <AnimatePresence>
                      {submitMutation.data && (
                        <DictationResult
                          data={submitMutation.data}
                          onRetry={() => {
                            setIsCompleted(false);
                            setCurrentIdx(0);
                            setAnswers({});
                            setSegmentResults({});
                            submitMutation.reset();
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="px-2">
                    <DictationWorkout
                      currentIdx={currentIdx}
                      totalSegments={segments.length}
                      currentSegment={currentSegment}
                      answers={answers}
                      showHints={showHints}
                      isChecking={checkSegmentMutation.isPending}
                      isSubmitting={submitMutation.isPending}
                      isAddingVocab={addVocabMutation.isPending}
                      filledBlanks={filledBlanks}
                      inputRefs={inputRefs}
                      onToggleHints={() => setShowHints(!showHints)}
                      onInputChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onCheckSegment={handleCheckSegment}
                      onSelectSegment={handleSelectSegment}
                      onSubmit={handleSubmit}
                      onAddVocab={handleAddVocab}
                      lessonId={lesson.id}
                      lessonCategory={lesson.category || "General"}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-background to-transparent pointer-events-none z-10" />
          </div>

          {/* CỘT PHẢI (40%): Stats + Playlist */}
          <aside className="w-full xl:w-[40%] flex flex-col gap-4 h-full overflow-hidden">
            <DictationStats
              timeSpent={timeSpent}
              filledBlanks={filledBlanks}
              totalBlanks={totalBlanks}
            />

            <div className="flex-1 rounded-[2.5rem] bg-white dark:bg-card border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl transition-all">
              <DictationPlaylist
                segments={segments}
                currentIdx={currentIdx}
                segmentResults={segmentResults}
                onSelectSegment={handleSelectSegment}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
