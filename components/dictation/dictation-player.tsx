import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Info,
  Loader2,
  SpellCheck,
  CheckCircle2,
  ListTodo,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  useSubmitDictation,
  useCheckDictationSegment,
} from "@/hooks/use-lesson";
import { useQuery } from "@tanstack/react-query";
import { lessonService } from "@/services/lesson.service";
import { LessonDto, DictationAnswer } from "@/types/lesson.type";

import { DictationHeader } from "@/components/dictation/dictation-header";
import { DictationMedia } from "@/components/dictation/dictation-media";
import { DictationResult } from "@/components/dictation/dictation-result";
import { DictationPlaylist } from "@/components/dictation/dictation-playlist";

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
  const [currentIdx, setCurrentIdx] = useState(0); // Track current active segment
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);

  // State lưu kết quả check của từng segment
  const [segmentResults, setSegmentResults] = useState<Record<number, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const { data: exercise, isLoading } = useQuery({
    queryKey: ["dictation", lesson.id, level],
    queryFn: () => lessonService.getDictationExercise(lesson.id, level),
    enabled: !!lesson.id && !!level,
  });
  const submitMutation = useSubmitDictation();
  const checkSegmentMutation = useCheckDictationSegment();

  const segments = exercise?.template.segments || [];
  const currentSegment = segments[currentIdx];

  useEffect(() => {
    const timer = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.pause();
    if (videoRef.current) videoRef.current.pause();
    setSegmentResults({});
    setCurrentIdx(0);
    setIsCompleted(false);
  }, [level]);

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
      // Nếu user gõ Enter khi input đang trống thì có thể ko làm gì,
      // Khi đã nhập xong, Enter => Next input. 
      // Nếu là input cuối => có thể kiểm tra segment.
      const segmentKeys = Object.keys(inputRefs.current)
        .filter(k => k.startsWith(`${currentIdx}-`))
        .sort((a, b) => {
          const pA = Number(a.split("-")[1]);
          const pB = Number(b.split("-")[1]);
          return pA - pB;
        });

      const nextIdx = segmentKeys.indexOf(currentKey) + 1;
      if (nextIdx < segmentKeys.length) {
        inputRefs.current[segmentKeys[nextIdx]]?.focus();
      } else {
        // Đã gõ xong input cuối cùng, tự động check?
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
        data: {
          level,
          userText,
          timeSpentSeconds: timeSpent,
        },
      },
      {
        onSuccess: (data) => {
          setSegmentResults((prev) => ({ ...prev, [segIndex]: data }));
          if (autoNext && segIndex < segments.length - 1) {
            setTimeout(() => setCurrentIdx(segIndex + 1), 1000); // Tự sang câu tiếp theo
          }
        },
      },
    );
  };

  const handleSubmit = () => {
    if (!exercise) return;
    const formattedAnswers: DictationAnswer[] = segments.flatMap((segment: any, segmentIndex: number) =>
      segment.words
        .filter((word: any) => word.isBlank)
        .map((word: any) => ({
          segmentIndex,
          position: word.position,
          userInput: answers[`${segmentIndex}-${word.position}`]?.trim() ?? "",
        })),
    );

    submitMutation.mutate({
      id: lesson.id,
      data: { level, answers: formattedAnswers, timeSpentSeconds: timeSpent },
    });
    
    setIsCompleted(true);
  };

  const handleRevealWord = (position: number) => {
      // Mock logic for Hint (Xem từ) / since backend hides full text,
      // The frontend must get expected answer somehow, 
      // but without it, we can't reveal! 
      // Typically, Senglish has the hint in the API. We'll leave it as a visual button that triggers a toast or mock reveal.
  }

  const youtubeUrl = useMemo(() => {
    const url = exercise?.mediaUrl ?? lesson.mediaUrl;
    return getYoutubeEmbedUrl(url);
  }, [exercise?.mediaUrl, lesson.mediaUrl]);

  const isVideoType = (exercise?.mediaType ?? lesson.mediaType)?.toLowerCase() === "video";

  const finalMediaUrl = useMemo(() => {
    const url = exercise?.mediaUrl ?? exercise?.audioUrl ?? lesson.mediaUrl ?? lesson.audioUrl;
    return getCleanMediaUrl(url);
  }, [exercise, lesson]);

  const { totalBlanks, filledBlanks, progress } = useMemo(() => {
    const totalBlanks = exercise?.template.totalBlanks || 0;
    const filledBlanks = Object.values(answers).filter(v => v.trim() !== "").length;
    return {
      totalBlanks,
      filledBlanks,
      progress: totalBlanks > 0 ? (filledBlanks / totalBlanks) * 100 : 0,
    };
  }, [exercise, answers]);

  return (
    <div className="min-h-screen font-mono text-gray-900 dark:text-zinc-100 pb-20 bg-white dark:bg-[#050505] selection:bg-orange-500/30">
      <DictationHeader lesson={lesson} level={level} />

      <main className="container mx-auto max-w-[1400px] px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* CỘT TRÁI: Media, Level, Progress */}
          <aside className="xl:col-span-5 space-y-6">
            <DictationMedia
              lessonTitle={lesson.title}
              youtubeUrl={youtubeUrl}
              isVideoType={isVideoType}
              finalMediaUrl={finalMediaUrl}
              audioRef={audioRef}
              videoRef={videoRef}
              showHints={showHints}
              onToggleHints={() => setShowHints(!showHints)}
              thumbnailUrl={lesson.thumbnailUrl}
            />

            <div className="rounded-[2.5rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-6 shadow-xl">
              <h3 className="font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em] mb-4 text-center">
                Chọn cấp độ
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {["Beginner", "Intermediate", "Advanced", "Expert"].map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLevel(l);
                      setAnswers({});
                      setSegmentResults({});
                      submitMutation.reset();
                    }}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-[10px] uppercase tracking-widest font-black transition-all border",
                      level === l
                        ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20"
                        : "bg-transparent text-gray-500 border-gray-200 dark:border-white/5 hover:border-orange-500/50",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <DictationPlaylist 
                segments={segments}
                currentIdx={currentIdx}
                segmentResults={segmentResults}
                onSelectSegment={setCurrentIdx}
            />

            <div className="rounded-[2.5rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-6 shadow-xl text-center">
                <div className="flex justify-between text-[10px] font-black text-gray-500 dark:text-zinc-500 uppercase mb-2">
                    <span>Tổng tiến độ: {filledBlanks} / {totalBlanks} chỗ trống</span>
                    <span className="text-gray-900 dark:text-white">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-gray-100 dark:bg-white/5 mb-3" />
                <div className="inline-block p-2 px-4 rounded-xl bg-orange-500/10 text-xs text-orange-600 dark:text-orange-400 font-bold">
                  ⏱️ {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}
                </div>
            </div>
          </aside>

          {/* CỘT PHẢI: Bài tập (Workout Area) */}
          <div className="xl:col-span-7 space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
              </div>
            ) : !exercise || !currentSegment ? (
              <div className="p-20 text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[3rem] text-gray-400 font-bold uppercase text-xs">
                Không có dữ liệu bài tập
              </div>
            ) : isCompleted ? (
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
            ) : (
                <div className="space-y-6">
                    {/* KHU VỰC ĐIỀN TỪ (Textarea/Inputs) */}
                    <motion.div
                        key={currentIdx} // Remount animation when changing segment
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-[2.5rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-8 shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-white/5">
                            <h2 className="text-sm font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    {currentIdx + 1}
                                </span>
                                Điền câu đã nghe
                            </h2>
                            <div className="text-[10px] text-gray-400 font-bold">
                                {currentSegment.startTime.toFixed(1)}s - {currentSegment.endTime.toFixed(1)}s
                            </div>
                        </div>

                        {/* Workout Inputs */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-6 leading-loose text-2xl font-bold min-h-[160px] content-start">
                            {currentSegment.words.map((word: any, wordIndex: number) => {
                                if (!word.isBlank) {
                                    return (
                                        <span key={wordIndex} className="text-gray-800 dark:text-zinc-200">
                                            {word.text}{word.punctuation}
                                        </span>
                                    );
                                }

                                const dotsCount = word.length || 4;
                                const dots = "•".repeat(dotsCount);

                                return (
                                    <div key={wordIndex} className="relative group inline-block">
                                        <input
                                            ref={(el) => { inputRefs.current[`${currentIdx}-${word.position}`] = el; }}
                                            type="text"
                                            spellCheck={false}
                                            autoComplete="off"
                                            disabled={checkSegmentMutation.isPending}
                                            placeholder={showHints ? (word.hint ?? dots) : dots}
                                            value={answers[`${currentIdx}-${word.position}`] || ""}
                                            onKeyDown={(e) => handleKeyDown(e, `${currentIdx}-${word.position}`)}
                                            onChange={(e) => handleInputChange(currentIdx, word.position, e.target.value)}
                                            className="px-3 py-1.5 border-b-2 border-orange-500/30 bg-orange-500/5 focus:border-orange-500 focus:bg-orange-500/10 outline-none rounded-xl text-gray-900 dark:text-white font-black transition-all placeholder:text-gray-400/50 dark:placeholder:text-zinc-600 disabled:opacity-50 text-center tracking-widest"
                                            style={{ width: `${Math.max(dotsCount, 3) * 18}px` }}
                                        />
                                        {/* Hint under input like Senglish */}
                                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-black text-orange-500/50 tracking-[0.2em] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                            {dotsCount} CHỮ
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Control Buttons (Hits & Next) */}
                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" size="sm" 
                                    className="font-bold text-[10px] uppercase rounded-xl border-gray-200 dark:border-white/10 dark:hover:bg-white/5"
                                >
                                    Chữ cái đầu <kbd className="ml-2 font-sans bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[8px]">Opt+H</kbd>
                                </Button>
                                <Button 
                                    variant="outline" size="sm" 
                                    className="font-bold text-[10px] uppercase rounded-xl border-gray-200 dark:border-white/10 dark:hover:bg-white/5"
                                    onClick={() => handleRevealWord(0)}
                                >
                                    Xem từ <kbd className="ml-2 font-sans bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[8px]">Opt+R</kbd>
                                </Button>
                            </div>
                            
                            <Button
                                onClick={() => handleCheckSegment(currentIdx)}
                                disabled={checkSegmentMutation.isPending}
                                className="bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors rounded-xl text-[10px] uppercase font-black"
                            >
                                <SpellCheck className="w-3.5 h-3.5 mr-2" /> KIỂM TRA
                            </Button>
                        </div>
                    </motion.div>

                    {/* Result for Current Segment */}
                    <AnimatePresence>
                        {segmentResults[currentIdx] && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-6 rounded-[2rem] bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/10 shadow-lg"
                            >
                                <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-orange-500">
                                    Kết quả phân tích ({segmentResults[currentIdx].accuracy?.toFixed(0) || 0}%)
                                </div>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {segmentResults[currentIdx].words?.map((w: any, i: number) => (
                                        <span
                                            key={i}
                                            className={cn(
                                                "px-3 py-1.5 rounded-xl font-bold border",
                                                w.isCorrect
                                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                                            )}
                                        >
                                            {w.word}
                                            {!w.isCorrect && w.expected && (
                                                <span className="ml-2 text-[10px] opacity-70">
                                                    → {w.expected}
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center py-4">
                        <Button
                            variant="ghost"
                            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                            disabled={currentIdx === 0}
                            className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 rounded-xl font-bold uppercase text-[10px] tracking-widest"
                        >
                            ← Quay lại
                        </Button>

                        {currentIdx < segments.length - 1 ? (
                            <Button
                                onClick={() => setCurrentIdx(currentIdx + 1)}
                                className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl px-8 hover:opacity-90 font-black uppercase text-[10px] tracking-widest"
                            >
                                Tiếp theo →
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={submitMutation.isPending || filledBlanks === 0}
                                className="bg-orange-500 text-white hover:bg-orange-600 rounded-xl px-8 shadow-lg shadow-orange-500/20 font-black uppercase text-[10px] tracking-widest"
                            >
                                {submitMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ListTodo className="w-4 h-4 mr-2" />} Nộp bài tổng kết
                            </Button>
                        )}
                    </div>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
