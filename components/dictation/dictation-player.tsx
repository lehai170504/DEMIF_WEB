"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  Trophy,
  Volume2,
  Info,
  CheckCircle2,
  XCircle,
  Loader2,
  Eye,
  EyeOff,
  RotateCcw,
  SpellCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  useDictationExercise,
  useSubmitDictation,
  useCheckDictationSegment, // <-- IMPORT HOOK MỚI
} from "@/hooks/use-lesson";
import { LessonDto, DictationAnswer } from "@/types/lesson.type";

import { DictationHeader } from "@/components/dictation/dictation-header";
import { DictationMedia } from "@/components/dictation/dictation-media";
import { DictationResult } from "@/components/dictation/dictation-result";

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
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);

  // State lưu kết quả check của từng segment
  const [segmentResults, setSegmentResults] = useState<Record<number, any>>({});

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const { data: exercise, isLoading } = useDictationExercise(lesson.id, level);
  const submitMutation = useSubmitDictation();
  const checkSegmentMutation = useCheckDictationSegment(); // <-- KHỞI TẠO HOOK

  useEffect(() => {
    const timer = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.pause();
    if (videoRef.current) videoRef.current.pause();
    // Reset kết quả segment khi đổi level
    setSegmentResults({});
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
      const keys = Object.keys(inputRefs.current).sort((a, b) => {
        const [sA, pA] = a.split("-").map(Number);
        const [sB, pB] = b.split("-").map(Number);
        return sA !== sB ? sA - sB : pA - pB;
      });
      const nextIdx = keys.indexOf(currentKey) + 1;
      if (nextIdx < keys.length) {
        inputRefs.current[keys[nextIdx]]?.focus();
      }
    }
  };

  // Logic gọi API check cho TỪNG CÂU
  const handleCheckSegment = (segIndex: number) => {
    if (!exercise) return;
    const segment = exercise.template.segments[segIndex];

    // Ghép câu hoàn chỉnh từ text tĩnh và chữ user nhập
    const userText = segment.words
      .map((w) => {
        const val = w.isBlank
          ? answers[`${segIndex}-${w.position}`]?.trim() || ""
          : w.text;
        return val + (w.punctuation || "");
      })
      .join(" ")
      .replace(/\s+/g, " ") // Xóa khoảng trắng thừa
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
        },
      },
    );
  };

  // Logic Nộp bài TỔNG THỂ
  const handleSubmit = () => {
    if (!exercise) return;
    const formattedAnswers: DictationAnswer[] =
      exercise.template.segments.flatMap((segment, segmentIndex) =>
        segment.words
          .filter((word) => word.isBlank)
          .map((word) => ({
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
  };

  const getLevelColor = (lvl: string) => {
    const colors: Record<string, string> = {
      Beginner: "text-emerald-500 bg-emerald-500/10",
      Intermediate: "text-amber-500 bg-amber-500/10",
      Advanced: "text-rose-500 bg-rose-500/10",
      Expert: "text-purple-500 bg-purple-500/10",
    };
    return colors[lvl] || colors.Beginner;
  };

  const youtubeUrl = useMemo(
    () => getYoutubeEmbedUrl(lesson.mediaUrl),
    [lesson.mediaUrl],
  );
  const isVideoType = lesson.mediaType?.toLowerCase() === "video";
  const finalMediaUrl = useMemo(
    () =>
      getCleanMediaUrl(lesson.mediaUrl) ?? getCleanMediaUrl(lesson.audioUrl),
    [lesson],
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
    <div className="min-h-screen font-mono text-gray-900 dark:text-zinc-100 pb-20 bg-white dark:bg-[#050505] selection:bg-orange-500/30">
      <DictationHeader lesson={lesson} level={level} />

      <main className="container mx-auto max-w-[1600px] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CỘT TRÁI: Media, Level, Progress */}
          <aside className="lg:col-span-5 space-y-6 sticky top-24">
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
                      setSegmentResults({}); // Reset kết quả check
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

            <div className="rounded-[2.5rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-6 shadow-xl">
              <div className="flex items-center gap-2 font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em] mb-4">
                <Info className="h-4 w-4 text-orange-500" /> Tiến độ làm bài
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase">
                    Đã điền
                  </span>
                  <div className="flex items-baseline gap-1 text-orange-500">
                    <span className="text-2xl font-black">{filledBlanks}</span>
                    <span className="text-xs font-bold text-gray-400">
                      / {totalBlanks}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-gray-500 dark:text-zinc-500 uppercase">
                    <span>Hoàn thành</span>
                    <span className="text-gray-900 dark:text-white">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-1.5 bg-gray-100 dark:bg-white/5"
                  />
                </div>
                <div className="p-3 rounded-xl bg-orange-500/10 text-xs text-orange-600 dark:text-orange-400 font-bold text-center">
                  ⏱️ {Math.floor(timeSpent / 60)}:
                  {(timeSpent % 60).toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          </aside>

          {/* CỘT PHẢI: Bài tập & Kết quả */}
          <div className="lg:col-span-7 space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
              </div>
            ) : !exercise ? (
              <div className="p-20 text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[3rem] text-gray-400 font-bold uppercase text-xs">
                Không tải được dữ liệu bài tập.
              </div>
            ) : (
              <div className="space-y-6">
                {exercise.template.segments.map((segment, segIndex) => {
                  const segResult = segmentResults[segIndex]; // Lấy kết quả check của segment này

                  return (
                    <motion.div
                      key={segIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: segIndex * 0.05 }}
                      className="rounded-[2.5rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-8 shadow-lg hover:border-orange-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="h-7 w-7 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center text-[10px] font-black shrink-0">
                            {segIndex + 1}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                            {segment.startTime.toFixed(1)}s –{" "}
                            {segment.endTime.toFixed(1)}s
                          </span>
                        </div>
                        {/* NÚT KIỂM TRA TỪNG CÂU */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCheckSegment(segIndex)}
                          disabled={checkSegmentMutation.isPending}
                          className="h-8 text-[10px] uppercase font-bold text-orange-500 bg-orange-500/10 hover:bg-orange-500/20"
                        >
                          <SpellCheck className="w-3.5 h-3.5 mr-1.5" /> Kiểm tra
                        </Button>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-4 leading-loose text-lg font-medium">
                        {segment.words.map((word, wordIndex) => (
                          <span key={wordIndex}>
                            {word.isBlank ? (
                              <input
                                ref={(el) => {
                                  inputRefs.current[
                                    `${segIndex}-${word.position}`
                                  ] = el;
                                }}
                                type="text"
                                spellCheck={false}
                                autoComplete="off"
                                disabled={submitMutation.isPending}
                                placeholder={
                                  showHints ? (word.hint ?? "___") : "___"
                                }
                                value={
                                  answers[`${segIndex}-${word.position}`] || ""
                                }
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    `${segIndex}-${word.position}`,
                                  )
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    segIndex,
                                    word.position,
                                    e.target.value,
                                  )
                                }
                                className="inline-block px-3 py-1 border-b-2 border-orange-500/30 bg-orange-500/5 focus:border-orange-500 focus:bg-orange-500/10 outline-none rounded-lg text-gray-900 dark:text-white font-black transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-700 disabled:opacity-50 text-center"
                                style={{
                                  width: `${Math.max(word.text.length, 3) * 14}px`,
                                }}
                              />
                            ) : (
                              <span className="text-gray-800 dark:text-zinc-200">
                                {word.text}
                              </span>
                            )}
                            <span className="text-gray-500 dark:text-zinc-500">
                              {word.punctuation}
                            </span>
                          </span>
                        ))}
                      </div>

                      {/* HIỂN THỊ KẾT QUẢ CHECK NGAY BÊN DƯỚI */}
                      <AnimatePresence>
                        {segResult && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10"
                          >
                            <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-orange-500">
                              Phân tích ({segResult.accuracy.toFixed(0)}%)
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {segResult.words?.map((w: any, i: number) => (
                                <span
                                  key={i}
                                  className={cn(
                                    "px-2.5 py-1 rounded-lg text-sm font-bold border",
                                    w.isCorrect
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                                  )}
                                >
                                  {w.word}
                                  {!w.isCorrect && w.expected && (
                                    <span className="ml-1.5 text-[10px] opacity-70">
                                      → {w.expected}
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                <div className="flex justify-center py-6">
                  <Button
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending || filledBlanks === 0}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-2xl h-14 px-12 text-sm shadow-xl shadow-orange-500/30 active:scale-95 transition-all"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Đang
                        xử lý...
                      </>
                    ) : (
                      "Nộp bài & Chấm điểm tổng"
                    )}
                  </Button>
                </div>

                <AnimatePresence>
                  {submitMutation.data && (
                    <DictationResult
                      data={submitMutation.data}
                      onRetry={() => {
                        setAnswers({});
                        setSegmentResults({});
                        submitMutation.reset();
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
