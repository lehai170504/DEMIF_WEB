"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, PlayCircle, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Lesson {
  lessonId: string;
  title: string;
  progress: number;
  level: string;
  duration: number;
  category: string;
}

interface ContinueLearningProps {
  lessons: Lesson[];
}

export function ContinueLearning({ lessons }: ContinueLearningProps) {
  // Style cho badge level - Dark mode neon style
  const levelStyles = {
    beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    advanced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="space-y-4">
      {/* Header section - Minimal & Functional */}
      <div className="flex items-end justify-between px-1">
        <div /> {/* Spacer để đẩy nút xem tất cả sang phải */}
        <Link
          href="/dictation"
          className="group flex items-center gap-1 text-[10px] font-bold text-orange-500 transition-colors hover:text-orange-400 uppercase tracking-widest"
        >
          Xem tất cả
          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Scrollable Container */}
      <div
        className="flex gap-5 overflow-x-auto pb-8 pt-2 px-1 no-scrollbar 
        cursor-grab active:cursor-grabbing scroll-smooth snap-x snap-mandatory"
      >
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.lessonId}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="snap-start"
          >
            <Link href={`/dictation/${lesson.lessonId}`}>
              {/* 3D Glass Card */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-[280px] flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-5 shadow-xl transition-all hover:shadow-[0_15px_30px_-10px_rgba(255,122,0,0.15)] hover:border-orange-500/30"
              >
                {/* Background Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full -mr-12 -mt-12 pointer-events-none group-hover:bg-orange-500/10 transition-colors duration-500" />

                <div className="relative z-10 space-y-4">
                  {/* Top Section: Category & Level */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">
                        {lesson.category}
                      </span>
                      <h4 className="line-clamp-2 font-bold text-base text-gray-900 dark:text-white leading-snug group-hover:text-orange-500 dark:group-hover:text-orange-100 transition-colors">
                        {lesson.title}
                      </h4>
                    </div>

                    {/* Level Badge */}
                    <span
                      className={cn(
                        "rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider backdrop-blur-md flex-shrink-0 ml-2",
                        levelStyles[lesson.level as keyof typeof levelStyles],
                      )}
                    >
                      {lesson.level}
                    </span>
                  </div>

                  {/* Progress Bar - Neon Style */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider">
                      <span className="text-gray-500 dark:text-zinc-500 group-hover:text-gray-600 dark:group-hover:text-zinc-400 transition-colors">
                        Tiến độ
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {Math.round(lesson.progress * 100)}%
                      </span>
                    </div>
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lesson.progress * 100}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                        className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] shadow-[0_0_8px_rgba(255,122,0,0.6)]"
                      />
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-white/5">
                    <div className="flex items-center gap-3 text-[10px] font-medium text-gray-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-500 dark:text-zinc-500" />
                        <span>{lesson.duration}p</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-orange-500 fill-orange-500/20" />
                        <span className="text-gray-700 dark:text-zinc-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          +{Math.round(lesson.progress * 100)} XP
                        </span>
                      </div>
                    </div>

                    {/* Play Button - Glowing on Hover */}
                    <div className="rounded-full bg-gray-100 dark:bg-white/5 p-1.5 text-gray-600 dark:text-zinc-300 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,122,0,0.5)]">
                      <PlayCircle className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
