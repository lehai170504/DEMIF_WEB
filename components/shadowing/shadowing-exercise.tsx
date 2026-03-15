"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Play,
  Pause,
  Mic,
  Square,
  Volume2,
  Check,
  RotateCcw,
  Headphones,
  ChevronRight,
  Trophy,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ExerciseStep = "listen" | "record" | "review" | "score";

export function ShadowingExercise({ lesson }: { lesson: any }) {
  const [step, setStep] = useState<ExerciseStep>("listen");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [scores] = useState({
    pronunciation: 85,
    fluency: 78,
    intonation: 82,
    overall: 81,
  });

  // Logic đếm thời gian ghi âm
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setHasRecording(false);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const handleNextStep = () => {
    if (step === "listen") setStep("record");
    else if (step === "record") setStep("review");
    else if (step === "review") setStep("score");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-blue-500/30">
      {/* Header & Steps */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10"
          >
            <Link href="/shadowing" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-black text-[10px] uppercase tracking-widest">
                Thoát
              </span>
            </Link>
          </Button>
          <div className="flex flex-col items-center gap-2 w-full max-w-xs md:max-w-md mx-8">
            <div className="flex justify-between w-full">
              <span className="text-[10px] font-black uppercase text-blue-500 tracking-tighter">
                Tiến trình bài tập
              </span>
              <span className="text-[10px] font-black uppercase text-zinc-400">
                Bước{" "}
                {step === "listen"
                  ? 1
                  : step === "record"
                    ? 2
                    : step === "review"
                      ? 3
                      : 4}
                /4
              </span>
            </div>
            <Progress
              value={
                step === "listen"
                  ? 25
                  : step === "record"
                    ? 50
                    : step === "review"
                      ? 75
                      : 100
              }
              className="h-1.5 w-full bg-blue-50 dark:bg-white/5"
            />
          </div>
          <div className="w-20 hidden md:block" /> {/* Spacer */}
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* STEP 1: LISTEN */}
            {step === "listen" && (
              <motion.div
                key="listen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-12 rounded-[3rem] border-gray-100 dark:border-white/5 shadow-2xl bg-white dark:bg-[#111113] text-center space-y-8">
                  <div className="w-24 h-24 rounded-[2rem] bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mx-auto shadow-inner">
                    <Headphones className="h-10 w-10 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black mb-2 tracking-tight">
                      Nghe bản gốc
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-500 font-bold text-sm uppercase tracking-widest">
                      Lắng nghe kỹ ngữ điệu và cách nối âm của người bản xứ
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-white/[0.02] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 relative group">
                    <p className="text-2xl md:text-3xl font-bold leading-relaxed text-gray-800 dark:text-white">
                      "{lesson.transcript}"
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-6">
                    <Button
                      onClick={togglePlay}
                      className="h-20 w-20 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/30"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8 fill-current" />
                      ) : (
                        <Play className="h-8 w-8 fill-current ml-1" />
                      )}
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="h-14 px-12 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest transition-all"
                    >
                      Tôi đã sẵn sàng nói
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* STEP 2: RECORD */}
            {step === "record" && (
              <motion.div
                key="record"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <Card className="p-12 rounded-[3rem] border-gray-100 dark:border-white/5 shadow-2xl bg-white dark:bg-[#111113] text-center space-y-8">
                  <div
                    className={cn(
                      "w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto transition-all duration-500",
                      isRecording
                        ? "bg-red-500 animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.4)]"
                        : "bg-blue-50 dark:bg-blue-500/10",
                    )}
                  >
                    <Mic
                      className={cn(
                        "h-10 w-10",
                        isRecording ? "text-white" : "text-blue-500",
                      )}
                    />
                  </div>

                  <h2 className="text-3xl font-black tracking-tight">
                    Ghi âm giọng của bạn
                  </h2>

                  <div className="bg-gray-50 dark:bg-white/[0.02] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
                    <p className="text-xl md:text-2xl font-bold text-zinc-400 dark:text-zinc-600 line-through decoration-blue-500/30">
                      {lesson.transcript}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-6">
                    {isRecording ? (
                      <div className="space-y-4">
                        <span className="text-4xl font-black text-red-500 tabular-nums">
                          {recordingTime}s
                        </span>
                        <Button
                          onClick={handleStopRecording}
                          variant="destructive"
                          className="h-16 px-10 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-red-500/20"
                        >
                          <Square className="mr-2 h-5 w-5 fill-current" /> Dừng
                          lại
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <Button
                          onClick={handleStartRecording}
                          className="h-16 px-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest shadow-xl shadow-blue-500/20"
                        >
                          <Mic className="mr-2 h-5 w-5" />{" "}
                          {hasRecording ? "Ghi âm lại" : "Bắt đầu thu"}
                        </Button>
                        {hasRecording && (
                          <Button
                            onClick={handleNextStep}
                            variant="ghost"
                            className="font-bold text-blue-500 uppercase text-xs tracking-widest"
                          >
                            Tiếp tục <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* STEP 3: REVIEW */}
            {step === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="p-12 rounded-[3rem] border-gray-100 dark:border-white/5 shadow-2xl bg-white dark:bg-[#111113] space-y-10">
                  <div className="text-center">
                    <h2 className="text-3xl font-black tracking-tight mb-2">
                      So khớp kết quả
                    </h2>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
                      Nghe lại cả hai để tự đánh giá
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-6 bg-blue-50/50 dark:bg-blue-500/5 rounded-3xl border border-blue-100 dark:border-blue-500/20">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500 rounded-2xl text-white">
                          <Volume2 size={20} />
                        </div>
                        <span className="font-bold text-sm">Âm thanh gốc</span>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full text-blue-500"
                      >
                        <Play size={20} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-3xl border border-emerald-100 dark:border-emerald-500/20">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500 rounded-2xl text-white">
                          <Mic size={20} />
                        </div>
                        <span className="font-bold text-sm">
                          Bản thu của bạn
                        </span>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full text-emerald-500"
                      >
                        <Play size={20} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setStep("record")}
                      variant="outline"
                      className="flex-1 h-14 rounded-2xl border-zinc-200 dark:border-white/10 font-bold uppercase text-xs"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" /> Thu lại
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-500/20"
                    >
                      AI Chấm điểm
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* STEP 4: SCORE */}
            {step === "score" && (
              <motion.div
                key="score"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-12 rounded-[3rem] border-gray-100 dark:border-white/5 shadow-2xl bg-zinc-900 text-white text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />

                  <div className="relative z-10 space-y-8">
                    <div className="inline-flex p-6 bg-blue-500 rounded-full shadow-2xl shadow-blue-500/40">
                      <Trophy className="h-12 w-12 text-white" />
                    </div>

                    <div>
                      <h2 className="text-4xl font-black mb-2">Hoàn thành!</h2>
                      <div className="flex items-center justify-center gap-2 text-blue-400 font-black uppercase text-[10px] tracking-[0.3em]">
                        <Sparkles size={14} /> AI Analysis Complete
                      </div>
                    </div>

                    <div className="flex justify-center items-baseline gap-1">
                      <span className="text-8xl font-black tracking-tighter">
                        {scores.overall}
                      </span>
                      <span className="text-2xl font-bold text-zinc-500">
                        %
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          label: "Phát âm",
                          val: scores.pronunciation,
                          color: "text-emerald-400",
                        },
                        {
                          label: "Trôi chảy",
                          val: scores.fluency,
                          color: "text-blue-400",
                        },
                        {
                          label: "Ngữ điệu",
                          val: scores.intonation,
                          color: "text-purple-400",
                        },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="bg-white/5 border border-white/5 rounded-2xl p-4"
                        >
                          <div
                            className={cn("text-xl font-black mb-1", s.color)}
                          >
                            {s.val}%
                          </div>
                          <div className="text-[8px] font-bold uppercase text-zinc-500 tracking-wider">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={() => setStep("listen")}
                        variant="outline"
                        className="flex-1 h-14 rounded-2xl border-white/10 bg-transparent hover:bg-white/5 text-white font-bold uppercase text-xs"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" /> Thử lại bài này
                      </Button>
                      <Button
                        asChild
                        className="flex-1 h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black uppercase text-xs tracking-widest"
                      >
                        <Link href="/shadowing">Bài học khác</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <audio
        ref={audioRef}
        src={lesson.audioUrl}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}
