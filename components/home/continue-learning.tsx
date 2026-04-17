"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, PlayCircle, ChevronRight, Zap, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

const formatDuration = (seconds: number): string => {
  if (!seconds || seconds <= 0) return "--";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};

interface Lesson {
  lessonId: string;
  title: string;
  progress: number;
  level: string;
  duration: number;
  lessonType: string;
  category: string;
  isPremiumOnly?: boolean;
  thumbnailUrl?: string;
}

interface ContinueLearningProps {
  lessons: Lesson[];
  isPremiumUser: boolean;
}

export function ContinueLearning({ lessons, isPremiumUser }: ContinueLearningProps) {
  const router = useRouter();

  const LEVEL_STYLES: Record<string, { bg: string; text: string }> = {
    Beginner:     { bg: "bg-emerald-500/90", text: "text-white" },
    Intermediate: { bg: "bg-blue-500/90",    text: "text-white" },
    Advanced:     { bg: "bg-purple-500/90",  text: "text-white" },
  };

  if (lessons.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group h-[260px] flex flex-col items-center justify-center rounded-[2.5rem] border-[3px] border-dashed border-gray-200/50 dark:border-white/10 bg-gray-50/30 dark:bg-white/[0.01] hover:bg-gray-100/50 dark:hover:bg-white/[0.04] transition-all duration-500 shadow-sm hover:shadow-xl"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] opacity-20 group-hover:opacity-30 transition-opacity">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/20 blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-600/20 blur-[80px]" />
        </div>

        <div className="flex flex-col items-center gap-4 relative z-10 px-6 text-center">
          <div className="p-4 rounded-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500">
            <PlayCircle className="w-8 h-8 text-orange-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">Chưa có bài học nào đang dang dở</p>
            <p className="text-xs text-gray-500 dark:text-zinc-500 max-w-[280px]">Hãy khám phá kho bài học và bắt đầu hành trình chinh phục tiếng Anh ngay hôm nay!</p>
          </div>
          
          <Link 
            href="/dictation"
            className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10 dark:shadow-white/5"
          >
            Bắt đầu học ngay
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    );
  }

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
        {lessons.map((lesson, index) => {
          const isLocked = lesson.isPremiumOnly && !isPremiumUser;
          
          return (
          <motion.div
            key={lesson.lessonId}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="snap-start"
          >
            <div
              onClick={() => {
                if (isLocked) {
                  toast.error("Nội dung Premium", { description: "Vui lòng nâng cấp tài khoản." });
                  router.push("/subscription");
                } else {
                  const path = lesson.lessonType === "Shadowing" ? "shadowing" : "dictation";
                  router.push(`/${path}/${lesson.lessonId}`);
                }
              }}
              className="cursor-pointer"
            >
              <div
                className={cn(
                  "relative w-[280px] h-[260px] flex flex-col rounded-3xl bg-white dark:bg-[#111113] border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                  isLocked
                    ? "border-gray-200 dark:border-zinc-800"
                    : "border-gray-100 dark:border-white/5 hover:border-orange-500/30",
                )}
              >
                {/* Image Section */}
                <div className="relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-gray-100 dark:border-white/5 shrink-0">
                  <img src={lesson.thumbnailUrl || "/video-placeholder.png"} alt={lesson.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  
                  {/* Overlay / Lock */}
                  {isLocked && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                      <div className="bg-white dark:bg-zinc-900 flex items-center justify-center rounded-full p-3 shadow-lg shadow-black/50">
                        <Lock className="h-5 w-5 text-orange-500" />
                      </div>
                    </div>
                  )}
                  
                  {/* Pro Badge */}
                  {lesson.isPremiumOnly && (
                    <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-orange-400 border border-orange-500/30">
                      PRO
                    </div>
                  )}

                  {/* Level Badge */}
                  {lesson.level && (() => {
                    const s = LEVEL_STYLES[lesson.level] ?? { bg: "bg-gray-500/80", text: "text-white" };
                    return (
                      <div className={cn("absolute bottom-2 left-2 z-10 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black tracking-wider border border-white/10", s.bg, s.text)}>
                        {lesson.level.toUpperCase()}
                      </div>
                    );
                  })()}
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-4 justify-between">
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors mb-2">
                      {lesson.title}
                    </h4>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[11px] font-medium text-gray-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(lesson.duration)}
                      </span>
                      <span className="font-bold text-orange-500 text-[10px]">
                        {Math.round(lesson.progress * 100)}%
                      </span>
                    </div>
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/5 mt-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lesson.progress * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] shadow-[0_0_8px_rgba(255,122,0,0.6)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )})}
      </div>
    </div>
  );
}
