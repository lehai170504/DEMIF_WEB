"use client";

import { useState, useCallback, useMemo } from "react";
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
  Eye,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDueVocabulary, useReviewVocabulary } from "@/hooks/use-vocabulary";
import { cn } from "@/lib/utils";

export default function ReviewSessionPage() {
  const { data, isLoading } = useDueVocabulary({
    page: 1,
    pageSize: 50,
  });

  const dueItems = useMemo(() => data?.items || [], [data]);

  const { mutate: submitReview } = useReviewVocabulary();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState({ correct: 0, incorrect: 0 });
  const [direction, setDirection] = useState(0);

  const isComplete = currentIndex >= dueItems.length && dueItems.length > 0;
  const currentItem = dueItems[currentIndex];
  const progress =
    dueItems.length > 0 ? (currentIndex / dueItems.length) * 100 : 0;

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (!currentItem) return;

      // Ghi nhận ôn tập lên Server
      submitReview({ id: currentItem.id, isCorrect });

      setDirection(1);
      setResults((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      }));

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShowAnswer(false);
      }, 200);
    },
    [currentItem, submitReview],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col items-center justify-center font-mono">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF7A00] mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          Đang truy xuất mục tiêu ôn tập...
        </p>
      </div>
    );
  }

  if (dueItems.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mb-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
          <Check className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black mb-3 uppercase tracking-tighter">
          Nhiệm vụ đã xong!
        </h2>
        <p className="text-zinc-500 text-sm mb-10 max-w-xs mx-auto">
          Hiện tại không còn từ vựng nào đến hạn ôn. Hãy quay lại sau nhé homie.
        </p>
        <Button
          asChild
          className="rounded-2xl bg-[#FF7A00] h-14 px-10 font-black uppercase tracking-widest text-[11px] shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95"
        >
          <Link href="/review">Quay lại trung tâm</Link>
        </Button>
      </div>
    );
  }

  if (isComplete) {
    const accuracy = Math.round((results.correct / dueItems.length) * 100);
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center p-6 font-mono text-gray-900 dark:text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <div className="relative overflow-hidden rounded-[3rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-10 text-center shadow-2xl">
            <div className="relative z-10">
              <div className="relative mx-auto mb-8 h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FF7A00] to-amber-600 shadow-xl shadow-orange-500/30">
                <Trophy className="h-10 w-10 text-white" />
              </div>

              <h2 className="mb-2 text-4xl font-black uppercase tracking-tighter italic leading-none">
                RECALL COMPLETE
              </h2>
              <p className="mb-10 text-zinc-500 font-medium text-sm">
                Bạn đã hoàn tất phiên ôn tập định kỳ.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10">
                <ResultStat
                  label="Đúng"
                  value={results.correct}
                  color="text-emerald-400"
                  bg="bg-emerald-500/10"
                />
                <ResultStat
                  label="Tỉ lệ"
                  value={`${accuracy}%`}
                  color="text-[#FF7A00]"
                  bg="bg-orange-500/10"
                />
                <ResultStat
                  label="Sai"
                  value={results.incorrect}
                  color="text-rose-400"
                  bg="bg-rose-500/10"
                />
              </div>

              <Button
                asChild
                className="w-full h-14 rounded-2xl bg-[#FF7A00] text-white font-black uppercase tracking-widest text-[11px] shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
              >
                <Link href="/review">Xác nhận & Thoát</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col font-mono text-gray-900 dark:text-white overflow-hidden selection:bg-orange-500/30">
      <nav className="flex items-center justify-between px-6 py-8 max-w-3xl mx-auto w-full relative z-20">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Link href="/review">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>

        <div className="flex-1 px-10 max-w-sm mx-auto">
          <div className="flex justify-between mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
            <span>Sóng não hiện tại</span>
            <span>
              {currentIndex + 1} / {dueItems.length}
            </span>
          </div>
          <Progress
            value={progress}
            className="h-1 bg-white/5 border border-white/5"
            indicatorClassName="bg-gradient-to-r from-[#FF7A00] to-amber-500"
          />
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 text-[#FF7A00] font-black text-sm shadow-[0_0_20px_rgba(255,122,0,0.1)]">
          <Zap className="h-5 w-5 fill-current" />
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: 100 * direction, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100 * direction, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full max-w-md perspective-1000"
          >
            <div
              className={cn(
                "relative h-[450px] w-full transition-all duration-700 preserve-3d cursor-pointer",
                showAnswer ? "rotate-y-180" : "",
              )}
              onClick={() => !showAnswer && setShowAnswer(true)}
            >
              {/* MẶT TRƯỚC (Câu hỏi) */}
              <div
                className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-12 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-[3.5rem] shadow-2xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute top-10 left-0 w-full flex justify-center">
                  <span className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-[#FF7A00]" />{" "}
                    {currentItem?.topic}
                  </span>
                </div>

                <h2 className="text-5xl font-black tracking-tighter mb-8 text-center leading-[0.9] text-gray-900 dark:text-white">
                  {currentItem?.word}
                </h2>

                <button className="p-5 rounded-full bg-gray-50 dark:bg-white/5 hover:bg-[#FF7A00] hover:text-white transition-all duration-300 mb-10 group">
                  <Volume2 className="h-8 w-8 group-active:scale-90" />
                </button>

                <p className="text-center text-zinc-400 font-medium italic px-6 leading-relaxed text-sm">
                  "
                  {currentItem?.contextSentence || "Không có dữ liệu ngữ cảnh."}
                  "
                </p>

                <div className="absolute bottom-12 text-[9px] font-black text-[#FF7A00] uppercase tracking-[0.3em] animate-pulse flex items-center gap-2">
                  <Eye className="h-3 w-3" /> Chạm để giải mã
                </div>
              </div>

              {/* MẶT SAU (Đáp án) */}
              <div
                className="absolute inset-0 rotate-y-180 backface-hidden flex flex-col items-center justify-center p-12 bg-zinc-900 border border-white/10 rounded-[3.5rem] shadow-2xl"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="mb-6 text-[#FF7A00] font-black uppercase tracking-[0.3em] text-[10px] border border-orange-500/20 px-4 py-1.5 rounded-full bg-orange-500/5">
                  ĐỊNH NGHĨA
                </div>
                <h3 className="text-3xl font-bold mb-10 text-center text-emerald-400 leading-tight">
                  {currentItem?.meaning}
                </h3>

                {currentItem?.note && (
                  <div className="bg-white/5 p-5 rounded-[2rem] border border-white/5 w-full">
                    <p className="text-zinc-500 text-center text-[11px] leading-relaxed italic">
                      Ghi chú: {currentItem.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="p-10 pb-16">
        <div className="max-w-md mx-auto h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showAnswer ? (
              <motion.div
                key="show-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="w-full h-16 rounded-[2rem] bg-white dark:bg-white text-black font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl active:scale-[0.97] transition-all"
                >
                  <Eye className="mr-2 h-4 w-4" /> Hiển thị đáp án
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="action-btns"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex gap-6 w-full"
              >
                <Button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 h-16 rounded-[2rem] bg-rose-500/5 text-rose-500 font-black border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all uppercase text-[10px] tracking-widest active:scale-95"
                >
                  <X className="mr-2 h-5 w-5" /> QUÊN RỒI
                </Button>
                <Button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 h-16 rounded-[2rem] bg-emerald-500 text-white font-black shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all uppercase text-[10px] tracking-widest active:scale-95"
                >
                  <Check className="mr-2 h-5 w-5" /> ĐÃ THUỘC
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>
    </div>
  );
}

function ResultStat({ label, value, color, bg }: any) {
  return (
    <div
      className={cn(
        "p-5 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center shadow-inner transition-all hover:scale-105",
        bg,
      )}
    >
      <div className={cn("text-2xl font-black mb-1 tracking-tighter", color)}>
        {value}
      </div>
      <div className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}
