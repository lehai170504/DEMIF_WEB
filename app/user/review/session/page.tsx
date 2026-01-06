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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { vocabularyItems } from "@/lib/data/vocabulary";
import { cn } from "@/lib/utils";

export default function ReviewSessionPage() {
  const dueItems = vocabularyItems.filter(
    (item) => new Date(item.nextReview) <= new Date()
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

      // Tạo hiệu ứng chuyển mượt mà hơn
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShowAnswer(false);
      }, 100);
    },
    [dueItems.length]
  );

  // 1. Giao diện Hoàn thành (Result Screen)
  if (isComplete) {
    const accuracy = Math.round((results.correct / dueItems.length) * 100);
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full max-w-lg overflow-hidden border-none bg-white p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-[3rem]">
            <div className="relative mx-auto mb-8 h-24 w-24">
              <div className="absolute inset-0 animate-ping rounded-full bg-orange-100 opacity-75" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-orange-500 text-white shadow-xl">
                <Trophy className="h-10 w-10" />
              </div>
            </div>

            <h2 className="mb-2 text-3xl font-black text-slate-900 leading-tight">
              Tuyệt vời!
            </h2>
            <p className="mb-8 text-slate-500 font-medium">
              Bạn vừa củng cố thêm {results.correct} từ vựng vào trí nhớ dài
              hạn.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <ResultStat
                label="Đúng"
                value={results.correct}
                color="text-emerald-500"
              />
              <ResultStat
                label="Chính xác"
                value={`${accuracy}%`}
                color="text-orange-500"
              />
              <ResultStat
                label="Sai"
                value={results.incorrect}
                color="text-rose-500"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="h-14 rounded-2xl bg-slate-900 text-lg font-bold shadow-xl hover:bg-slate-800 transition-all active:scale-95"
              >
                <Link href="/review">Tiếp tục ôn tập</Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="h-12 rounded-2xl font-bold text-slate-400"
              >
                <Link href="/dashboard">Về trang chủ</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // 2. Giao diện Đang ôn tập (Session Screen)
  return (
    <div className="min-h-screen bg-card/50 flex flex-col font-mono">
      {/* Header tinh giản */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-4xl mx-auto w-full">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="rounded-full hover:bg-slate-100"
        >
          <Link href="/review">
            <ArrowLeft className="h-5 w-5 text-slate-400" />
          </Link>
        </Button>
        <div className="flex-1 px-8">
          <div className="flex justify-between mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Tiến độ ôn tập</span>
            <span>
              {currentIndex + 1} / {dueItems.length}
            </span>
          </div>
          <Progress value={progress} className="h-1.5 bg-slate-100" />
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 font-bold text-xs">
          <Zap className="h-4 w-4 fill-current mr-1" /> {results.correct}
        </div>
      </nav>

      {/* Card Arena */}
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: 100 * direction, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100 * direction, rotateY: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-xl perspective-1000"
          >
            <div
              className={cn(
                "relative h-[400px] w-full transition-all duration-700 preserve-3d cursor-pointer",
                showAnswer ? "rotate-y-180" : ""
              )}
              onClick={() => !showAnswer && setShowAnswer(true)}
            >
              {/* MẶT TRƯỚC (CÂU HỎI) */}
              <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-12 border-none bg-white shadow-[0_30px_60px_rgba(0,0,0,0.05)] rounded-[3rem]">
                <div className="absolute top-8 left-8 flex items-center gap-2 opacity-30">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Question
                  </span>
                </div>

                <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 select-none">
                  {currentItem?.word}
                </h2>
                <div className="flex items-center gap-4 text-slate-300 mb-8">
                  <div className="h-[1px] w-8 bg-current" />
                  <Volume2 className="h-5 w-5 cursor-pointer hover:text-orange-500 transition-colors" />
                  <div className="h-[1px] w-8 bg-current" />
                </div>
                <p className="text-center text-slate-400 font-medium leading-relaxed italic px-4">
                  "{currentItem?.example}"
                </p>
                <div className="mt-10 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] animate-pulse">
                  Chạm để xem đáp án
                </div>
              </Card>

              {/* MẶT SAU (ĐÁP ÁN) */}
              <Card className="absolute inset-0 rotate-y-180 backface-hidden flex flex-col items-center justify-center p-12 border-none bg-slate-900 text-white shadow-2xl rounded-[3rem]">
                <div className="mb-4 text-orange-500 font-black uppercase tracking-widest text-xs">
                  Meaning
                </div>
                <h3 className="text-4xl font-bold mb-6 text-center">
                  {currentItem?.translation}
                </h3>
                <div className="w-full max-w-[200px] h-[1px] bg-white/10 mb-6" />
                <p className="text-slate-400 text-center italic text-sm px-6">
                  "{currentItem?.example}"
                </p>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="p-8">
        <div className="max-w-xl mx-auto h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showAnswer ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="h-16 px-12 rounded-2xl bg-white text-slate-900 font-bold border-2 border-slate-100 shadow-xl hover:bg-slate-50 transition-all active:scale-95"
                >
                  Tôi đã nhớ rồi
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex gap-4 w-full"
              >
                <Button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 h-16 rounded-2xl bg-rose-50 text-rose-600 font-bold border-2 border-rose-100 hover:bg-rose-100 transition-all active:scale-95"
                >
                  <X className="mr-2 h-5 w-5" /> Quên mất
                </Button>
                <Button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 h-16 rounded-2xl bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95"
                >
                  <Check className="mr-2 h-5 w-5" /> Thuộc rồi
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
function ResultStat({ label, value, color }: any) {
  return (
    <div className="p-4 rounded-3xl bg-slate-50 border font-mono border-slate-100">
      <div className={cn("text-2xl font-black mb-1", color)}>{value}</div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
