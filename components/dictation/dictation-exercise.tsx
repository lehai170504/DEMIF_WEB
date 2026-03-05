"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trophy, Volume2, Info } from "lucide-react";
import type { Lesson } from "@/lib/data/lessons";
import { AudioPlayer } from "./audio-player";
import { TranscriptBox } from "./transcript-box";
import { NotesPanel } from "./notes-panel";
import { VocabularyPanel } from "./vocabulary-panel";
import { LeaderboardTop } from "./leaderboard-top";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export function DictationExercise({ lesson }: { lesson: Lesson }) {
  const [playCount, setPlayCount] = useState(0);
  const maxPlays = 3;

  // Animation Configurations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Thời gian trễ giữa các phần tử
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  const headerVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 pb-20 bg-white dark:bg-[#050505]">
      {/* 1. GLASS HEADER - Animated Slide Down */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="show"
        className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl"
      >
        <div className="container mx-auto max-w-[1600px] h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Link href="/user/dictation">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>

            <div className="space-y-0.5">
              <h1 className="text-sm md:text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                {lesson.title}
              </h1>
              <div className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-500 dark:text-zinc-500 uppercase font-black tracking-widest">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-md border text-[9px]",
                    lesson.level === "beginner"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : lesson.level === "intermediate"
                        ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                        : "border-rose-500/20 bg-rose-500/10 text-rose-400",
                  )}
                >
                  {lesson.level === "beginner"
                    ? "Sơ cấp"
                    : lesson.level === "intermediate"
                      ? "Trung cấp"
                      : "Nâng cao"}
                </span>
                <span className="flex items-center gap-1">
                  <Volume2 className="h-3 w-3" /> {lesson.duration}s Audio
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20">
            <Trophy className="h-4 w-4 text-amber-500 fill-amber-500/20" />
            <span className="text-xs font-bold text-amber-400">Level 12</span>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto max-w-[1600px] px-6 py-8">
        {/* TOP LEADERBOARD - Animated Fade In */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <LeaderboardTop />
        </motion.div>

        {/* 2. MAIN GRID LAYOUT - Staggered Animation */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* --- LEFT COLUMN: INFO & NOTES --- */}
          <motion.aside
            variants={itemVariants}
            className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24"
          >
            {/* Progress Card */}
            <div className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-6 shadow-xl">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2 font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em]">
                  <Info className="h-4 w-4 text-orange-500" />
                  Tiến độ bài học
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5">
                    <span className="text-xs font-bold text-gray-600 dark:text-zinc-400">
                      Lượt nghe
                    </span>
                    <div className="flex items-baseline gap-1 text-orange-500">
                      <span className="text-xl font-black">{playCount}</span>
                      <span className="text-xs font-bold text-gray-400 dark:text-zinc-600">
                        / {maxPlays}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase">
                      <span>Completion</span>
                      <span className="text-gray-900 dark:text-white">33%</span>
                    </div>
                    <Progress
                      value={33}
                      className="h-2 bg-gray-200 dark:bg-white/5"
                      indicatorClassName="bg-gradient-to-r from-orange-500 to-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Panel Component */}
            <NotesPanel />
          </motion.aside>

          {/* --- CENTER COLUMN: MAIN EXERCISE --- */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-6 space-y-8"
          >
            {/* Audio Player Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-8 md:p-12 text-center shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex p-6 rounded-[2.5rem] bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/20 text-orange-500 mb-8 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                  <Volume2 className="h-12 w-12" />
                </div>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                  Nghe & Chép lại
                </h2>
                <p className="text-sm text-gray-600 dark:text-zinc-500 mb-10 max-w-md mx-auto">
                  Lắng nghe kỹ đoạn hội thoại và điền vào chỗ trống bên dưới.
                  Bạn có thể nghe lại tối đa 3 lần.
                </p>

                <AudioPlayer
                  audioUrl={lesson.audioUrl}
                  duration={lesson.duration}
                  maxPlays={maxPlays}
                  onPlayCountChange={setPlayCount}
                />
              </div>
            </div>

            {/* Transcript Input Area */}
            <TranscriptBox
              correctTranscript={lesson.transcript}
              onSubmit={(val) => console.log(val)}
            />
          </motion.div>

          {/* --- RIGHT COLUMN: VOCABULARY --- */}
          <motion.aside
            variants={itemVariants}
            className="col-span-1 lg:col-span-3 space-y-6 sticky top-24"
          >
            <VocabularyPanel lessonVocab={lesson.vocabulary} />

            {/* Tip Card (Optional) */}
            <div className="p-5 rounded-[1.5rem] bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 text-blue-600 dark:text-blue-200 text-xs font-medium leading-relaxed">
              <p>
                <span className="text-blue-500 dark:text-blue-400 font-bold uppercase tracking-wider block mb-1">
                  Mẹo nhỏ:
                </span>{" "}
                Hãy chú ý đến các từ nối âm (linking sounds) để nghe chính xác
                hơn.
              </p>
            </div>
          </motion.aside>
        </motion.div>
      </main>
    </div>
  );
}
