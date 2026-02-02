"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  X,
  Trophy,
  Volume2,
  Sparkles,
  Zap,
  RotateCcw,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { vocabularyItems } from "@/lib/data/vocabulary";
import { cn } from "@/lib/utils";

export default function ReviewSessionPage() {
  const dueItems = vocabularyItems.filter(
    (item) => new Date(item.nextReview) <= new Date(),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState({ correct: 0, incorrect: 0 });
  const [direction, setDirection] = useState(0); // 1: next, -1: prev

  const isComplete = currentIndex >= dueItems.length && dueItems.length > 0;
  const currentItem = dueItems[currentIndex];
  const progress = (currentIndex / dueItems.length) * 100;

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      setDirection(1);
      setResults((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      }));

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShowAnswer(false);
      }, 150);
    },
    [dueItems.length],
  );

  // 1. Giao diện Hoàn thành (Result Screen)
  if (isComplete) {
    const accuracy = Math.round((results.correct / dueItems.length) * 100);
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-mono text-white selection:bg-orange-500/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <div className="relative overflow-hidden rounded-[3rem] bg-[#18181b] border border-white/10 p-10 text-center shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="relative mx-auto mb-8 h-24 w-24">
                <div className="absolute inset-0 animate-ping rounded-full bg-orange-500/20 opacity-75" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow-xl shadow-orange-500/30">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
              </div>

              <h2 className="mb-2 text-3xl font-black text-white leading-tight tracking-tight">
                Tuyệt vời!
              </h2>
              <p className="mb-10 text-zinc-400 font-medium">
                Bạn vừa củng cố thêm{" "}
                <span className="text-orange-500 font-bold">
                  {results.correct}
                </span>{" "}
                từ vựng vào trí nhớ dài hạn.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10">
                <ResultStat
                  label="Đúng"
                  value={results.correct}
                  color="text-emerald-400"
                  bg="bg-emerald-500/10 border-emerald-500/20"
                />
                <ResultStat
                  label="Chính xác"
                  value={`${accuracy}%`}
                  color="text-orange-400"
                  bg="bg-orange-500/10 border-orange-500/20"
                />
                <ResultStat
                  label="Sai"
                  value={results.incorrect}
                  color="text-rose-400"
                  bg="bg-rose-500/10 border-rose-500/20"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  className="h-14 rounded-2xl bg-white text-black text-lg font-black uppercase tracking-widest shadow-lg hover:bg-zinc-200 transition-all active:scale-95"
                >
                  <Link href="/review">Tiếp tục ôn tập</Link>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="h-12 rounded-2xl font-bold text-zinc-500 hover:text-white hover:bg-white/5"
                >
                  <Link href="/dashboard">Về trang chủ</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. Giao diện Đang ôn tập (Session Screen)
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-mono text-white overflow-hidden selection:bg-orange-500/30">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-2xl mx-auto w-full relative z-20">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
        >
          <Link href="/review">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>

        <div className="flex-1 px-8 max-w-xs mx-auto">
          <div className="flex justify-between mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <span>Tiến độ</span>
            <span>
              {currentIndex + 1} / {dueItems.length}
            </span>
          </div>
          <Progress
            value={progress}
            className="h-1.5 bg-white/10"
            indicatorClassName="bg-gradient-to-r from-orange-500 to-amber-500"
          />
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 font-black text-sm">
          <Zap className="h-4 w-4 fill-current mr-0.5" /> {results.correct}
        </div>
      </nav>

      {/* Card Arena */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{
              opacity: 0,
              x: 50 * direction,
              scale: 0.9,
              rotateY: 10 * direction,
            }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            exit={{
              opacity: 0,
              x: -50 * direction,
              scale: 0.9,
              rotateY: -10 * direction,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full max-w-md perspective-1000"
          >
            <div
              className={cn(
                "relative h-[420px] w-full transition-all duration-700 preserve-3d cursor-pointer group",
                showAnswer ? "rotate-y-180" : "",
              )}
              onClick={() => !showAnswer && setShowAnswer(true)}
            >
              {/* MẶT TRƯỚC (CÂU HỎI) */}
              <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-10 bg-[#18181b] border border-white/10 rounded-[3rem] shadow-2xl">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] pointer-events-none" />

                <div className="absolute top-8 left-0 w-full flex justify-center">
                  <span className="bg-white/5 border border-white/5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-orange-500" /> Question
                  </span>
                </div>

                <h2 className="text-5xl font-black text-white tracking-tight mb-6 select-none text-center leading-tight">
                  {currentItem?.word}
                </h2>

                <div className="flex items-center gap-6 text-zinc-500 mb-8">
                  <div className="h-px w-8 bg-white/10" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); /* Play audio logic here */
                    }}
                    className="p-3 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <Volume2 className="h-6 w-6" />
                  </button>
                  <div className="h-px w-8 bg-white/10" />
                </div>

                <p className="text-center text-zinc-400 font-medium italic px-4 line-clamp-3">
                  "{currentItem?.example}"
                </p>

                <div className="absolute bottom-8 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] animate-pulse flex items-center gap-2">
                  <Eye className="h-3 w-3" /> Chạm để xem đáp án
                </div>
              </div>

              {/* MẶT SAU (ĐÁP ÁN) */}
              <div className="absolute inset-0 rotate-y-180 backface-hidden flex flex-col items-center justify-center p-10 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden">
                {/* Background Decor */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="mb-6 text-orange-500 font-black uppercase tracking-[0.2em] text-xs border border-orange-500/20 px-3 py-1 rounded-full bg-orange-500/10">
                  Meaning
                </div>

                <h3 className="text-3xl font-bold mb-8 text-center text-white leading-snug">
                  {currentItem?.translation}
                </h3>

                <div className="w-full max-w-[120px] h-1 rounded-full bg-white/10 mb-8" />

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <p className="text-zinc-400 text-center italic text-sm">
                    "{currentItem?.example}"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="p-8 pb-12 relative z-20">
        <div className="max-w-md mx-auto h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showAnswer ? (
              <motion.div
                key="show-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full"
              >
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="w-full h-16 rounded-2xl bg-white text-black font-black text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-zinc-200 transition-all active:scale-[0.98]"
                >
                  <Eye className="mr-2 h-5 w-5" /> Hiện đáp án
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="action-btns"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex gap-4 w-full"
              >
                <Button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 h-16 rounded-2xl bg-rose-500/10 text-rose-500 font-bold border-2 border-rose-500/20 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all active:scale-95 text-base"
                >
                  <X className="mr-2 h-6 w-6" /> Quên
                </Button>
                <Button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 h-16 rounded-2xl bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95 text-base"
                >
                  <Check className="mr-2 h-6 w-6" /> Thuộc
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>
    </div>
  );
}

// Sub-component cho trang kết quả
function ResultStat({ label, value, color, bg }: any) {
  return (
    <div
      className={cn(
        "p-4 rounded-3xl border flex flex-col items-center justify-center",
        bg,
      )}
    >
      <div className={cn("text-3xl font-black mb-1", color)}>{value}</div>
      <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
