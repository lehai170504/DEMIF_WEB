"use client";

import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { motion} from "framer-motion";
import { cn } from "@/lib/utils";
import { useDictationExercise, useSubmitDictation } from "@/hooks/use-lesson";
import { LessonDto, DictationAnswer } from "@/types/lesson.type";

// Extract YouTube video ID and return embed URL
function getYoutubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0`;
  return url;
}

interface DictationPlayerProps {
  lesson: LessonDto;
}

export function DictationPlayer({ lesson }: DictationPlayerProps) {
  const [level, setLevel] = useState("Beginner");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: exercise, isLoading } = useDictationExercise(lesson.id, level);
  const submitMutation = useSubmitDictation();

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (segmentIndex: number, position: number, value: string) => {
    setAnswers({
      ...answers,
      [`${segmentIndex}-${position}`]: value,
    });
  };

  const handleSubmit = () => {
    if (!exercise) return;

    // Build a complete answer list covering every blank in the exercise.
    // The backend expects all blank positions to be present; unfilled ones get an empty string.
    const formattedAnswers: DictationAnswer[] = exercise.template.segments.flatMap(
      (segment, segmentIndex) =>
        segment.words
          .filter((word) => word.isBlank)
          .map((word) => ({
            segmentIndex,
            position: word.position,
            userInput: answers[`${segmentIndex}-${word.position}`]?.trim() ?? "",
          }))
    );

    submitMutation.mutate({
      id: lesson.id,
      data: {
        level,
        answers: formattedAnswers,
        timeSpentSeconds: timeSpent,
      },
    });
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      Intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      Advanced: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      Expert: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    };
    return colors[level] || colors.Beginner;
  };

  const getLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      Beginner: "Sơ cấp",
      Intermediate: "Trung cấp",
      Advanced: "Nâng cao",
      Expert: "Chuyên gia",
    };
    return labels[level] || level;
  };

  // Calculate progress
  const totalBlanks = exercise?.template.totalBlanks || 0;
  const filledBlanks = Object.values(answers).filter((v) => v.trim()).length;
  const progress = totalBlanks > 0 ? (filledBlanks / totalBlanks) * 100 : 0;

  return (
    <div className="min-h-screen font-mono text-gray-900 dark:text-zinc-100 pb-20 bg-white dark:bg-[#050505]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-[1600px] h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10"
            >
              <Link href="/dictation">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>

            <div className="space-y-0.5">
              <h1 className="text-sm md:text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                {lesson.title}
              </h1>
              <div className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-500 dark:text-zinc-500 uppercase font-black tracking-widest">
                <Badge className={cn("text-[9px]", getLevelColor(lesson.level))}>
                  {getLevelLabel(lesson.level)}
                </Badge>
                <span className="flex items-center gap-1">
                  <Volume2 className="h-3 w-3" /> {Math.floor(lesson.durationSeconds / 60)}m
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20">
            <Trophy className="h-4 w-4 text-amber-500 fill-amber-500/20" />
            <span className="text-xs font-bold text-amber-400">Điểm cao: {lesson.avgScore.toFixed(0)}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-[1600px] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ===== LEFT: Media + Level + Progress (sticky) ===== */}
          <aside className="lg:col-span-5 space-y-5 sticky top-24">
            {/* Media Player */}
            <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl">
              {lesson.mediaType === "youtube" ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={getYoutubeEmbedUrl(lesson.mediaUrl) ?? undefined}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={lesson.title}
                  />
                </div>
              ) : lesson.mediaType === "video" ? (
                <video
                  ref={audioRef as React.RefObject<HTMLVideoElement>}
                  controls
                  className="w-full max-h-[360px] bg-black"
                  src={lesson.mediaUrl ?? undefined}
                  poster={lesson.thumbnailUrl ?? undefined}
                />
              ) : (
                <div className="p-8 flex flex-col items-center gap-6">
                  <div className="inline-flex p-6 rounded-[2.5rem] bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/20 text-orange-500">
                    <Volume2 className="h-12 w-12" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                      Nghe &amp; Chép lại
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-zinc-500">
                      Lắng nghe kỹ và điền vào chỗ trống.
                    </p>
                  </div>
                  {lesson.audioUrl ? (
                    <audio
                      ref={audioRef}
                      controls
                      className="w-full max-w-lg"
                      src={lesson.audioUrl}
                    />
                  ) : (
                    <p className="text-sm text-gray-400 dark:text-zinc-600">Không có tệp âm thanh.</p>
                  )}
                </div>
              )}

              {/* Bottom bar */}
              <div className="px-6 py-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-3 bg-gray-50 dark:bg-white/[0.02]">
                <Volume2 className="h-4 w-4 text-orange-500 shrink-0" />
                <span className="text-xs font-bold text-gray-600 dark:text-zinc-400 flex-1 line-clamp-1">
                  {lesson.title}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHints(!showHints)}
                  className="rounded-xl text-xs shrink-0"
                >
                  {showHints ? <Eye className="h-4 w-4 mr-1.5" /> : <EyeOff className="h-4 w-4 mr-1.5" />}
                  {showHints ? "Ẩn gợi ý" : "Hiện gợi ý"}
                </Button>
              </div>
            </div>

            {/* Level Selector */}
            <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-5 shadow-xl">
              <h3 className="font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em] mb-3">
                Chọn cấp độ
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {["Beginner", "Intermediate", "Advanced", "Expert"].map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLevel(l);
                      setAnswers({});
                    }}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-xs font-bold transition-all border",
                      level === l
                        ? "bg-orange-500 text-white border-orange-500 shadow-lg"
                        : "bg-transparent text-gray-600 dark:text-zinc-400 border-transparent hover:bg-gray-100 dark:hover:bg-white/5"
                    )}
                  >
                    {getLevelLabel(l)}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Card */}
            <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-5 shadow-xl">
              <div className="flex items-center gap-2 font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em] mb-4">
                <Info className="h-4 w-4 text-orange-500" />
                Tiến độ
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                  <span className="text-xs font-bold text-gray-600 dark:text-zinc-400">Đã điền</span>
                  <div className="flex items-baseline gap-1 text-orange-500">
                    <span className="text-xl font-black">{filledBlanks}</span>
                    <span className="text-xs font-bold text-gray-400">/ {totalBlanks}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase">
                    <span>Hoàn thành</span>
                    <span className="text-gray-900 dark:text-white">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-200 dark:bg-white/5" />
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400">
                  ⏱️ Thời gian: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          </aside>

          {/* ===== RIGHT: Exercise (scrollable) ===== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Exercise Content */}
            {isLoading && (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            )}

            {!isLoading && exercise && (
              <div className="space-y-5">
                {exercise.template.segments.map((segment, segIndex) => (
                  <motion.div
                    key={segIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: segIndex * 0.07 }}
                    className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-6 shadow-xl"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase">
                        <span className="h-6 w-6 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center text-xs shrink-0">
                          {segIndex + 1}
                        </span>
                        <span>{segment.startTime.toFixed(1)}s – {segment.endTime.toFixed(1)}s</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-3 leading-loose text-base">
                        {segment.words.map((word, wordIndex) => (
                          <span key={wordIndex}>
                            {word.isBlank ? (
                              <input
                                type="text"
                                placeholder={showHints ? (word.hint ?? "___") : "___"}
                                value={answers[`${segIndex}-${word.position}`] || ""}
                                onChange={(e) =>
                                  handleInputChange(segIndex, word.position, e.target.value)
                                }
                                className="inline-block px-3 py-1 border-b-2 border-orange-500/30 bg-orange-500/5 focus:border-orange-500 focus:bg-orange-500/10 outline-none rounded-lg text-gray-900 dark:text-white font-medium"
                                style={{ width: `${(word.length || 5) * 12}px` }}
                              />
                            ) : (
                              <span className="text-gray-900 dark:text-white">{word.text}</span>
                            )}
                            {word.punctuation && (
                              <span className="text-gray-900 dark:text-white">{word.punctuation}</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Submit Button */}
                <div className="flex justify-center py-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending || filledBlanks === 0}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl h-12 px-10 text-base"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Đang chấm điểm...
                      </>
                    ) : (
                      "Nộp bài"
                    )}
                  </Button>
                </div>

                {/* Results */}
                {submitMutation.data && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-[2rem] bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-8"
                  >
                    <div className="text-center space-y-4">
                      <div className="inline-flex p-4 rounded-full bg-green-500/20 text-green-500">
                        <CheckCircle2 className="h-12 w-12" />
                      </div>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                        Điểm: {submitMutation.data.score.toFixed(0)}
                      </h3>
                      <p className="text-gray-600 dark:text-zinc-400">
                        Đúng {submitMutation.data.correctCount}/{submitMutation.data.totalBlanks} câu
                      </p>

                      {/* Detailed Results */}
                      <div className="mt-6 grid gap-3 text-left">
                        {submitMutation.data.results.map((result, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "flex items-center justify-between p-4 rounded-xl",
                              result.isCorrect
                                ? "bg-green-500/10 border border-green-500/20"
                                : "bg-red-500/10 border border-red-500/20"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {result.isCorrect ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                              )}
                              <span className="font-medium text-gray-900 dark:text-white">
                                {result.userInput}
                              </span>
                            </div>
                            {!result.isCorrect && result.correctAnswer && (
                              <span className="text-sm text-gray-600 dark:text-zinc-400">
                                → {result.correctAnswer}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 justify-center pt-4">
                        <Button
                          onClick={() => {
                            setAnswers({});
                            submitMutation.reset();
                          }}
                          variant="outline"
                          className="rounded-xl"
                        >
                          Làm lại
                        </Button>
                        <Button asChild className="bg-orange-500 hover:bg-orange-600 rounded-xl">
                          <Link href="/dictation">Quay lại danh sách</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
