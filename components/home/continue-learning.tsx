"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, PlayCircle, ChevronRight, Zap, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Lesson {
  lessonId: string;
  title: string;
  progress: number;
  level: string;
  category: string;
  isPremiumOnly?: boolean;
  thumbnailUrl?: string; // New field for thumbnails
}

interface ContinueLearningProps {
  lessons: Lesson[];
  isPremiumUser: boolean;
}

export function ContinueLearning({ lessons, isPremiumUser }: ContinueLearningProps) {
  const router = useRouter();
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
                  router.push(`/dictation/${lesson.lessonId}`);
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

                  {/* Category Badge */}
                  {lesson.category && (
                    <div className="absolute bottom-2 left-2 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white max-w-[80%] truncate">
                      {lesson.category.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-4 justify-between">
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors mb-2">
                      {lesson.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-1.5 mt-2">
                    <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider">
                      <span className="text-gray-500 dark:text-zinc-500">Tiến độ</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {Math.round(lesson.progress * 100)}%
                      </span>
                    </div>
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
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
