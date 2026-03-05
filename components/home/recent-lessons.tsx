"use client";

import { motion } from "framer-motion";
import { Play, Headset, ChevronRight, History } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RecentLesson {
  lessonId: string;
  title: string;
  code: string;
}

interface RecentLessonsProps {
  lessons: RecentLesson[];
}

export function RecentLessons({ lessons }: RecentLessonsProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div />
        <Link
          href="/dictation"
          className="group text-[10px] font-bold text-orange-500 hover:text-orange-400 transition-all flex items-center gap-1 uppercase tracking-widest"
        >
          Tất cả
          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-3">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.lessonId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={`/dictation/${lesson.lessonId}`}
              className="group block"
            >
              <div
                className={cn(
                  "relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                  "bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/5",
                  "hover:bg-gray-50 dark:hover:bg-[#202023] hover:border-orange-500/30 hover:shadow-[0_0_30px_-10px_rgba(255,122,0,0.15)]",
                )}
              >
                {/* Active Indicator Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon Box */}
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 group-hover:border-orange-500/20 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 transition-all duration-300">
                  <Headset className="h-5 w-5 text-gray-600 dark:text-zinc-400 group-hover:text-orange-500 transition-colors" />

                  {/* Audio Wave Animation */}
                  <div className="absolute bottom-1.5 flex gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                    {[1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-0.5 animate-bounce bg-orange-500 rounded-full"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded border border-gray-200 dark:border-white/5 group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:border-orange-500/20 transition-colors">
                      {lesson.code}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-200 truncate group-hover:text-orange-600 dark:group-hover:text-white transition-colors">
                    {lesson.title}
                  </h4>
                </div>

                {/* Play Action */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/40">
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {lessons.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 rounded-2xl border border-dashed border-white/10 bg-white/5">
            <History className="h-8 w-8 text-zinc-600 mb-2" />
            <p className="text-zinc-500 text-sm font-medium">
              Chưa có hoạt động gần đây
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
