"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Star, Sparkles, ArrowUpRight, Lock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const LEVEL_STYLES: Record<string, { bg: string; text: string }> = {
  Beginner:     { bg: "bg-emerald-500/90", text: "text-white" },
  Intermediate: { bg: "bg-blue-500/90",    text: "text-white" },
  Advanced:     { bg: "bg-purple-500/90",  text: "text-white" },
};

interface Lesson {
  lessonId: string;
  title: string;
  duration: number;
  level: string;
  lessonType: string;
  category: string;
  isPremiumOnly?: boolean;
  thumbnailUrl?: string;
}

interface RecommendedLessonsProps {
  lessons: Lesson[];
  isPremiumUser: boolean;
}

export function RecommendedLessons({
  lessons,
  isPremiumUser,
}: RecommendedLessonsProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* HEADER & TABS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500">
            <Sparkles className="h-4 w-4 fill-current animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] glow-text">
              Recommended
            </span>
          </div>
          <h3 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Dành riêng cho bạn
          </h3>
        </div>
      </div>

      {/* GRID LAYOUT */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {lessons.slice(0, 8).map((lesson, index) => {
            const isLocked = lesson.isPremiumOnly && !isPremiumUser;
            
            return (
            <motion.div
              key={lesson.lessonId}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div
                onClick={() => {
                  if (isLocked) {
                    toast.error("Nội dung Premium", { description: "Vui lòng nâng cấp tài khoản để học bài này." });
                    router.push("/subscription");
                  } else {
                    const path = lesson.lessonType === "Shadowing" ? "shadowing" : "dictation";
                    router.push(`/${path}/${lesson.lessonId}`);
                  }
                }}
                className="group block h-full cursor-pointer"
              >
                <div
                  className={cn(
                    "relative h-full flex flex-col rounded-3xl bg-white dark:bg-[#111113] border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                    isLocked
                      ? "border-gray-200 dark:border-zinc-800"
                      : "border-gray-100 dark:border-white/5 hover:border-orange-500/30",
                  )}
                >
                  {/* Image Section */}
                  <div className="relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-gray-100 dark:border-white/5">
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

                    {/* Lesson Type Badge */}
                    <div className={cn(
                      "absolute top-2 left-2 z-10 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-black tracking-widest border",
                      lesson.lessonType === "Shadowing"
                        ? "bg-blue-500/80 text-white border-blue-400/30"
                        : "bg-orange-500/80 text-white border-orange-400/30"
                    )}>
                      {lesson.lessonType === "Shadowing" ? "SHADOW" : "DICTATION"}
                    </div>

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
                  <div className="flex-1 flex flex-col p-4">
                    <h4 className="text-[13px] font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors mb-2">
                      {lesson.title}
                    </h4>
                    
                    <div className="mt-auto flex items-center text-[11px] font-medium text-gray-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(lesson.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </AnimatePresence>
      </motion.div>

      {/* EMPTY STATE */}
      {lessons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10"
        >
          <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-zinc-600" />
          </div>
          <p className="text-zinc-400 font-bold">
            Chưa có bài học đề xuất mới
          </p>
        </motion.div>
      )}
    </div>
  );
}
