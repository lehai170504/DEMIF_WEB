"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Play,
  Pause,
  Clock as ClockIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDictationExercise, useSubmitDictation } from "@/hooks/use-lesson";
import { LessonDto, DictationAnswer } from "@/types/lesson.type";

// FIX 1: Hàm xử lý URL YouTube cực kỳ chặt chẽ
function getYoutubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url || url === "string" || url.trim() === "") return null;

  // Nếu đã là link embed thì giữ nguyên nhưng thêm tham số bảo mật
  if (url.includes("/embed/")) {
    const cleanUrl = url.split("?")[0];
    return `${cleanUrl}?autoplay=0&rel=0&enablejsapi=1&origin=${window.location.origin}`;
  }

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?rel=0&enablejsapi=1&origin=${window.location.origin}`;
  }
  return null;
}

interface DictationPlayerProps {
  lesson: LessonDto;
}

export function DictationPlayer({ lesson }: DictationPlayerProps) {
  const [level, setLevel] = useState("Beginner");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const { data: exercise, isLoading } = useDictationExercise(lesson.id, level);
  const submitMutation = useSubmitDictation();

  useEffect(() => {
    const timer = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // FIX 2: Tự động reset media khi đổi bài hoặc đổi type
  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [lesson.id, lesson.mediaType]);

  const togglePlay = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      if (media.paused) {
        media.play().catch((err) => console.error("Lỗi phát media:", err));
        setIsPlaying(true);
      } else {
        media.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleInputChange = useCallback(
    (segIdx: number, pos: number, val: string) => {
      setAnswers((prev) => ({ ...prev, [`${segIdx}-${pos}`]: val }));
    },
    [],
  );

  const handleSubmit = () => {
    if (!exercise || submitMutation.isPending) return;
    const formattedAnswers: DictationAnswer[] =
      exercise.template.segments.flatMap((seg, sIdx) =>
        seg.words
          .filter((w) => w.isBlank)
          .map((w) => ({
            segmentIndex: sIdx,
            position: w.position,
            userInput: answers[`${sIdx}-${w.position}`]?.trim() ?? "",
          })),
      );
    submitMutation.mutate({
      id: lesson.id,
      data: { level, answers: formattedAnswers, timeSpentSeconds: timeSpent },
    });
  };

  // Xác định nguồn phát
  const youtubeUrl = getYoutubeEmbedUrl(lesson.mediaUrl);
  const isVideoType = lesson.mediaType?.toLowerCase() === "video";

  // FIX 3: Ưu tiên lấy URL từ mediaUrl, sau đó mới đến các field phụ để tránh link "string"
  const finalMediaUrl =
    lesson.mediaUrl && lesson.mediaUrl !== "string"
      ? lesson.mediaUrl
      : lesson.audioUrl && lesson.audioUrl !== "string"
        ? lesson.audioUrl
        : undefined;

  const totalBlanks = exercise?.template.totalBlanks || 0;
  const filledBlanks = Object.values(answers).filter((v) => v.trim()).length;
  const progress = totalBlanks > 0 ? (filledBlanks / totalBlanks) * 100 : 0;

  return (
    <div className="min-h-screen font-mono text-gray-900 dark:text-zinc-100 pb-20 bg-white dark:bg-[#050505] selection:bg-orange-500/30">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-[1600px] h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-orange-500/10"
            >
              <Link href="/dictation">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-sm font-bold line-clamp-1">{lesson.title}</h1>
              <div className="flex items-center gap-2">
                <Badge className="text-[9px] uppercase font-black px-2 bg-orange-500/10 text-orange-500 border-none">
                  {level}
                </Badge>
                <span className="text-[10px] text-zinc-500 font-bold flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" /> {Math.floor(timeSpent / 60)}
                  :{(timeSpent % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-3 w-40">
                <Progress
                  value={progress}
                  className="h-1.5 flex-1 bg-gray-100 dark:bg-white/5"
                />
                <span className="text-xs font-bold text-orange-500">
                  {filledBlanks}/{totalBlanks}
                </span>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitMutation.isPending || filledBlanks === 0}
              className="rounded-xl bg-orange-500 hover:bg-orange-600 h-10 px-6 font-black text-xs uppercase shadow-lg shadow-orange-500/20"
            >
              {submitMutation.isPending ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Nộp bài"
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-[1600px] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MEDIA SECTION */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-[2.5rem] bg-black overflow-hidden shadow-2xl border border-white/5 relative group">
              {youtubeUrl ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={youtubeUrl}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : isVideoType ? (
                <video
                  ref={videoRef}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls
                  playsInline
                  className="w-full max-h-[550px]"
                  src={finalMediaUrl || ""}
                  poster={lesson.thumbnailUrl || ""}
                />
              ) : (
                <div className="p-16 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
                  <div
                    className={cn(
                      "p-8 rounded-full transition-all duration-500",
                      isPlaying
                        ? "bg-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.4)] scale-110"
                        : "bg-white/5",
                    )}
                  >
                    <Volume2
                      className={cn(
                        "w-16 h-16",
                        isPlaying ? "text-white" : "text-zinc-600",
                      )}
                    />
                  </div>
                  <audio
                    ref={audioRef}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    controls
                    className="mt-10 w-full max-w-md"
                    src={finalMediaUrl || ""}
                  />
                </div>
              )}
            </div>

            {/* EXERCISE CONTENT */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between px-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">
                    Điền vào chỗ trống
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHints(!showHints)}
                    className="text-[10px] font-bold uppercase hover:bg-orange-500/10"
                  >
                    {showHints ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 mr-2" /> Ẩn gợi ý
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 mr-2" /> Hiện gợi ý
                      </>
                    )}
                  </Button>
                </div>

                {exercise?.template.segments.map((seg, sIdx) => (
                  <motion.div
                    key={sIdx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sIdx * 0.05 }}
                    className="group rounded-[2rem] bg-white dark:bg-[#111113] border border-gray-100 dark:border-white/5 p-8 hover:border-orange-500/30 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[10px] font-black bg-orange-500 text-white px-2 py-1 rounded-md">
                        {sIdx + 1}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                        {seg.startTime.toFixed(1)}s → {seg.endTime.toFixed(1)}s
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-4 text-lg md:text-xl font-medium">
                      {seg.words.map((w, wIdx) => (
                        <span key={wIdx} className="flex items-center">
                          {w.isBlank ? (
                            <input
                              ref={(el) => {
                                inputRefs.current[`${sIdx}-${w.position}`] = el;
                              }}
                              type="text"
                              spellCheck={false}
                              autoComplete="off"
                              placeholder={showHints ? w.hint : ""}
                              value={answers[`${sIdx}-${w.position}`] || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  sIdx,
                                  w.position,
                                  e.target.value,
                                )
                              }
                              className="min-w-[70px] px-3 py-1 bg-orange-500/5 border-b-2 border-orange-500/20 focus:border-orange-500 focus:bg-orange-500/10 outline-none rounded-lg text-center font-black text-orange-600 transition-all"
                              style={{
                                width: `${Math.max(w.text.length, 3) * 16}px`,
                              }}
                            />
                          ) : (
                            <span className="text-zinc-800 dark:text-zinc-200">
                              {w.text}
                            </span>
                          )}
                          <span className="text-zinc-400">{w.punctuation}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR RIGHT */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 shadow-xl text-center">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">
                  Trình độ làm bài
                </h4>
                <div className="flex flex-col gap-3">
                  {["Beginner", "Intermediate", "Advanced", "Expert"].map(
                    (l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLevel(l);
                          setAnswers({});
                        }}
                        className={cn(
                          "py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
                          level === l
                            ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30"
                            : "bg-transparent text-zinc-500 border-zinc-200 dark:border-white/5 hover:border-orange-500/50",
                        )}
                      >
                        {l}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {submitMutation.data && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 rounded-[2.5rem] bg-zinc-900 text-white shadow-2xl border border-white/10 text-center"
                >
                  <Trophy className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <div className="text-5xl font-black">
                    {submitMutation.data.score.toFixed(0)}
                  </div>
                  <p className="text-xs font-bold text-zinc-400 mt-2 uppercase tracking-widest">
                    Đúng {submitMutation.data.correctCount}/
                    {submitMutation.data.totalBlanks}
                  </p>
                  <Button
                    asChild
                    className="w-full mt-8 bg-orange-500 hover:bg-orange-600 rounded-2xl font-black uppercase text-[10px]"
                  >
                    <Link href="/dictation">Học bài khác</Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
