"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  X,
  Trophy,
  Volume2,
  Zap,
  Loader2,
  Keyboard,
  Target,
  BrainCircuit,
  Lightbulb,
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

  const { mutate: submitReview } = useReviewVocabulary();

  const [reviewQueue, setReviewQueue] = useState<any[]>([]);
  const [totalCards, setTotalCards] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState({ correct: 0, incorrect: 0 });
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (data?.items && totalCards === 0) {
      setReviewQueue(
        data.items.map((item: any) => ({ ...item, _queueKey: Math.random() })),
      );
      setTotalCards(data.items.length);
    }
  }, [data, totalCards]);

  const isComplete = totalCards > 0 && reviewQueue.length === 0;
  const currentItem = reviewQueue[0];

  const completedCount = totalCards - reviewQueue.length;
  const progress = totalCards > 0 ? (completedCount / totalCards) * 100 : 0;

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (!currentItem || isAnimating) return;
      setIsAnimating(true);

      submitReview({ id: currentItem.id, isCorrect });
      setDirection(isCorrect ? 1 : -1);

      setResults((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      }));

      setTimeout(() => {
        setReviewQueue((prev) => {
          const newQueue = [...prev];
          const item = newQueue.shift();

          // Nhét lại xuống cuối hàng đợi với key mới nếu QUÊN
          if (!isCorrect && item) {
            newQueue.push({ ...item, _queueKey: Math.random() });
          }

          return newQueue;
        });
        setShowAnswer(false);
        setIsAnimating(false);
      }, 300);
    },
    [currentItem, submitReview, isAnimating],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete || isLoading || isAnimating) return;

      if (e.code === "Space") {
        e.preventDefault();
        if (!showAnswer) setShowAnswer(true);
      } else if (showAnswer) {
        if (e.code === "ArrowLeft" || e.code === "Digit1") {
          handleAnswer(false);
        } else if (e.code === "ArrowRight" || e.code === "Digit2") {
          handleAnswer(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAnswer, handleAnswer, isComplete, isLoading, isAnimating]);

  // --- UI LOADING ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center font-mono">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF7A00] mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 animate-pulse">
          Đang chuẩn bị lộ trình học...
        </p>
      </div>
    );
  }

  // --- UI EMPTY ---
  if (totalCards === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-emerald-500/20">
          <Check className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black mb-3 uppercase tracking-tighter text-slate-900 dark:text-white">
          Sạch bóng quân thù!
        </h2>
        <p className="text-slate-500 dark:text-zinc-500 text-sm mb-10 max-w-xs mx-auto">
          Tất cả từ vựng đều đang trong trạng thái chờ. Bạn đã hoàn thành xuất
          sắc mục tiêu hôm nay.
        </p>
        <Button
          asChild
          className="rounded-2xl bg-[#FF7A00] hover:bg-orange-600 text-white h-14 px-10 font-black uppercase tracking-widest text-[11px] shadow-xl shadow-orange-500/20 transition-all"
        >
          <Link href="/review">Quay lại Trang Chủ</Link>
        </Button>
      </div>
    );
  }

  // --- UI KẾT QUẢ ---
  if (isComplete) {
    const totalClicks = results.correct + results.incorrect;
    const accuracy =
      totalClicks > 0 ? Math.round((results.correct / totalClicks) * 100) : 0;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex items-center justify-center p-6 font-mono relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-lg relative z-10"
        >
          <div className="relative overflow-hidden rounded-[3rem] bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 p-10 text-center shadow-2xl">
            <div className="mx-auto mb-8 h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FF7A00] to-amber-600 shadow-orange-500/30">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h2 className="mb-2 text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
              RECALL ENDED
            </h2>
            <p className="mb-10 text-slate-500 dark:text-zinc-500 text-sm font-medium uppercase tracking-widest">
              Dữ liệu đã được đồng bộ với máy chủ
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <ResultStat
                label="Thẻ Nhớ"
                value={results.correct}
                color="text-emerald-500 dark:text-emerald-400"
                bg="bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
              />
              <ResultStat
                label="Độ chính xác"
                value={`${accuracy}%`}
                color="text-orange-600 dark:text-[#FF7A00]"
                bg="bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20"
              />
              <ResultStat
                label="Vòng Lặp"
                value={results.incorrect}
                color="text-rose-500 dark:text-rose-400"
                bg="bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20"
              />
            </div>

            <Button
              asChild
              className="w-full h-16 rounded-2xl bg-[#FF7A00] hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[11px] shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
            >
              <Link href="/review">Kết thúc phiên học</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- UI CHÍNH (3-Column Layout cho Desktop) ---
  return (
    <div className="min-h-screen lg:h-screen bg-slate-50 dark:bg-[#050505] font-mono text-slate-900 dark:text-white flex flex-col lg:flex-row overflow-hidden">
      {/* 🟢 CỘT TRÁI: Tiến độ & Stats (Khoảng 300px) */}
      <aside className="hidden lg:flex flex-col w-[300px] xl:w-[320px] flex-shrink-0 border-r border-slate-200 dark:border-white/10 p-8 bg-white dark:bg-[#0a0a0a] z-20 shadow-xl overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="rounded-full text-slate-400 dark:text-zinc-400 mb-10 hover:bg-slate-100 dark:hover:bg-white/5"
        >
          <Link href="/review">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-[#FF7A00]">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-black uppercase tracking-widest">
              Phiên Ôn Tập
            </h1>
          </div>
        </div>

        <div className="space-y-8 flex-1">
          {/* Progress */}
          <div>
            <div className="flex justify-between mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span className="flex items-center gap-2">
                <Target className="w-3 h-3" /> Hoàn thành
              </span>
              <span className="text-orange-600 dark:text-[#FF7A00]">
                {completedCount} / {totalCards}
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-slate-100 dark:bg-white/5"
              indicatorClassName="bg-orange-500"
            />
          </div>

          {/* Stats Box */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/5">
              <div className="text-[10px] font-black text-emerald-600/70 dark:text-emerald-500 uppercase tracking-widest">
                Đã Nhớ
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {results.correct}
              </div>
            </div>
            <div className="flex items-center justify-between p-5 rounded-2xl border border-rose-100 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/5">
              <div className="text-[10px] font-black text-rose-600/70 dark:text-rose-500 uppercase tracking-widest">
                Cần Ôn Lại
              </div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
                {results.incorrect}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 🟢 CỘT GIỮA: Flashcard & Nút bấm (Tự động co giãn giãn) */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-y-auto">
        {/* Mobile Header (Chỉ hiện trên điện thoại) */}
        <div className="lg:hidden w-full max-w-md mx-auto mb-8 flex items-center justify-between z-20">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full text-slate-400 dark:text-zinc-400"
          >
            <Link href="/review">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div className="flex-1 px-6">
            <div className="flex justify-between mb-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span>Tiến độ</span>
              <span className="text-orange-600 dark:text-[#FF7A00]">
                {completedCount}/{totalCards}
              </span>
            </div>
            <Progress
              value={progress}
              className="h-1.5 bg-slate-100 dark:bg-white/5"
              indicatorClassName="bg-orange-500"
            />
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent dark:from-white" />

        <div className="w-full max-w-lg z-10 flex flex-col items-center">
          <div className="w-full relative h-[420px] sm:h-[480px] perspective-1000">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentItem?._queueKey || "empty"}
                initial={{ opacity: 0, x: 50 * direction, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{
                  opacity: 0,
                  x: -50 * direction,
                  rotateY: -10,
                  scale: 0.9,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 cursor-pointer"
                style={{ perspective: 1200 }}
                onClick={() => !showAnswer && setShowAnswer(true)}
              >
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: showAnswer ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {/* MẶT TRƯỚC (Từ vựng) */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-10 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-[3.5rem] shadow-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="absolute top-8 bg-orange-500/10 text-orange-600 dark:text-orange-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {currentItem?.topic || "Vocabulary"}
                    </span>

                    <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-8 text-center uppercase text-slate-900 dark:text-white">
                      {currentItem?.word}
                    </h2>

                    <button className="p-4 sm:p-5 rounded-full bg-slate-50 dark:bg-white/5 hover:bg-orange-500 hover:text-white dark:hover:bg-[#FF7A00] transition-all mb-8 group shadow-sm border border-slate-100 dark:border-transparent">
                      <Volume2 className="h-7 w-7 group-active:scale-90" />
                    </button>

                    <p className="text-center text-slate-500 dark:text-zinc-400 font-medium italic text-sm sm:text-base px-4">
                      "{currentItem?.contextSentence}"
                    </p>

                    <div className="absolute bottom-10 flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] animate-pulse">
                      Chạm để lật thẻ
                    </div>
                  </div>

                  {/* MẶT SAU (Nghĩa) */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-10 bg-slate-900 dark:bg-zinc-900 border border-slate-800 dark:border-white/10 rounded-[3.5rem] shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="mb-6 flex items-center gap-2 text-orange-400 font-black uppercase tracking-[0.3em] text-[10px]">
                      <Zap className="w-4 h-4" /> Định Nghĩa
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-black mb-8 text-center text-emerald-400 uppercase leading-tight">
                      {currentItem?.meaning}
                    </h3>

                    {currentItem?.note && (
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 w-full">
                        <p className="text-slate-300 dark:text-zinc-400 text-center text-xs leading-relaxed italic">
                          <span className="font-bold text-orange-400">
                            Note:
                          </span>{" "}
                          {currentItem.note}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="w-full h-24 mt-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!showAnswer ? (
                <motion.div
                  key="show-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full"
                >
                  <Button
                    onClick={() => setShowAnswer(true)}
                    className="w-full h-16 rounded-[2rem] bg-white border border-slate-200 dark:border-transparent dark:bg-white text-slate-900 dark:text-black font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-slate-50 active:scale-[0.97] transition-all"
                  >
                    Lật thẻ để xem kết quả
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="action-btns"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 sm:gap-6 w-full"
                >
                  <Button
                    onClick={() => handleAnswer(false)}
                    disabled={isAnimating}
                    className="flex-1 h-16 rounded-[2rem] bg-white dark:bg-rose-500/5 text-rose-600 dark:text-rose-500 font-black border-2 border-rose-100 dark:border-rose-500/20 hover:bg-rose-50 hover:border-rose-200 dark:hover:bg-rose-500 dark:hover:text-white transition-all uppercase text-[10px] sm:text-xs tracking-widest active:scale-95 shadow-md"
                  >
                    <X className="mr-2 h-5 w-5" /> Quên (1)
                  </Button>
                  <Button
                    onClick={() => handleAnswer(true)}
                    disabled={isAnimating}
                    className="flex-1 h-16 rounded-[2rem] bg-emerald-500 text-white font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all uppercase text-[10px] sm:text-xs tracking-widest active:scale-95"
                  >
                    <Check className="mr-2 h-5 w-5" /> Nhớ (2)
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* 🟢 CỘT PHẢI: Hướng dẫn & Shortcuts (Khoảng 300px) */}
      <aside className="hidden lg:flex flex-col w-[300px] xl:w-[320px] flex-shrink-0 border-l border-slate-200 dark:border-white/10 p-8 bg-white dark:bg-[#0a0a0a] z-20 shadow-xl overflow-y-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Lightbulb className="w-4 h-4 text-amber-500" /> Mẹo học tập
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
            <p className="text-xs text-amber-700 dark:text-amber-500 font-medium leading-relaxed">
              Hãy cố gắng nhớ lại nghĩa của từ trước khi lật thẻ. Điều này giúp
              não bộ ghi nhớ sâu hơn nhờ cơ chế{" "}
              <span className="font-bold">Active Recall</span>.
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Keyboard className="w-4 h-4" /> Thao tác nhanh
          </div>
          <div className="space-y-4 text-xs font-medium text-slate-500 dark:text-zinc-400">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <span>Lật thẻ</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-black shadow-sm border border-slate-200 dark:border-white/10 font-sans font-bold text-slate-700 dark:text-slate-300">
                Space
              </kbd>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <span>Đánh dấu Quên</span>
              <div className="flex gap-1">
                <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-black shadow-sm border border-slate-200 dark:border-white/10 font-sans font-bold text-slate-700 dark:text-slate-300">
                  ←
                </kbd>
                <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-black shadow-sm border border-slate-200 dark:border-white/10 font-sans font-bold text-slate-700 dark:text-slate-300">
                  1
                </kbd>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <span>Đánh dấu Nhớ</span>
              <div className="flex gap-1">
                <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-black shadow-sm border border-slate-200 dark:border-white/10 font-sans font-bold text-slate-700 dark:text-slate-300">
                  →
                </kbd>
                <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-black shadow-sm border border-slate-200 dark:border-white/10 font-sans font-bold text-slate-700 dark:text-slate-300">
                  2
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ResultStat({ label, value, color, bg }: any) {
  return (
    <div
      className={cn(
        "p-5 rounded-[2rem] border flex flex-col items-center justify-center shadow-sm",
        bg,
      )}
    >
      <div className={cn("text-2xl font-black mb-1 tracking-tighter", color)}>
        {value}
      </div>
      <div className="text-[9px] font-black text-slate-500 dark:text-zinc-500 uppercase tracking-[0.1em]">
        {label}
      </div>
    </div>
  );
}
