"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Star, Sparkles, ArrowUpRight, Lock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Lesson {
  lessonId: string;
  title: string;
  duration: number;
  level: string;
  category: string;
  rating?: number;
  isPremiumOnly?: boolean;
}

interface RecommendedLessonsProps {
  lessonsByCategory: {
    all: Lesson[];
    beginner: Lesson[];
    intermediate: Lesson[];
    advanced: Lesson[];
  };
  isPremiumUser: boolean;
}

export function RecommendedLessons({
  lessonsByCategory,
  isPremiumUser,
}: RecommendedLessonsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");

  const levelStyles = {
    beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    advanced: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  const currentLessons = lessonsByCategory[activeTab];

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

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full grid-cols-4 h-10 bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/10">
            {["all", "beginner", "intermediate", "advanced"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-full text-[10px] font-bold uppercase tracking-wider transition-all 
                data-[state=active]:bg-[#FF7A00] data-[state=active]:text-white data-[state=active]:shadow-lg
                text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
              >
                {tab === "all" ? "Tất cả" : tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* GRID LAYOUT */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {currentLessons.slice(0, 6).map((lesson, index) => {
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
                    router.push(`/dictation/${lesson.lessonId}`);
                  }
                }}
                className="group block h-full cursor-pointer"
              >
                <div className="relative flex flex-col justify-between h-full border border-gray-200 dark:border-white/5 bg-white dark:bg-[#18181b] p-6 transition-all duration-500 rounded-[2rem] overflow-hidden group-hover:border-orange-500/30 group-hover:bg-gray-50 dark:group-hover:bg-[#202023]">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider border backdrop-blur-md",
                          levelStyles[lesson.level as keyof typeof levelStyles],
                        )}
                      >
                        {lesson.level}
                      </div>

                      {lesson.rating && (
                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-full px-2 py-1 border border-gray-200 dark:border-white/5">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-[10px] font-bold text-gray-900 dark:text-white">
                            {lesson.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 dark:text-zinc-100 leading-snug group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                      {lesson.title}
                    </h4>
                  </div>

                  <div className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-white/5">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-zinc-500 font-medium text-xs group-hover:text-gray-700 dark:group-hover:text-zinc-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{lesson.duration} phút</span>
                    </div>

                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:shadow-lg",
                      isLocked
                        ? "bg-red-500/10 text-red-500"
                        : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white group-hover:bg-orange-500 group-hover:text-white"
                    )}>
                      {isLocked ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </AnimatePresence>
      </motion.div>

      {/* EMPTY STATE */}
      {currentLessons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10"
        >
          <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-zinc-600" />
          </div>
          <p className="text-zinc-400 font-bold">
            Chưa có bài học cho cấp độ này
          </p>
        </motion.div>
      )}
    </div>
  );
}
