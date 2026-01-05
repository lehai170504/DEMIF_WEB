"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, PlayCircle, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Giả định bạn dùng shadcn utility

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
  const levelStyles = {
    beginner: "bg-emerald-50 text-emerald-600 border-emerald-100",
    intermediate: "bg-amber-50 text-amber-600 border-amber-100",
    advanced: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="space-y-6">
      {/* Header section tinh tế hơn */}
      <div className="flex items-end justify-between px-1">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-slate-800">
            Tiếp tục học
          </h3>
          <p className="text-sm text-slate-500">
            Hoàn thành các bài học còn dang dở
          </p>
        </div>
        <Link
          href="/dictation"
          className="group flex items-center gap-1 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
        >
          Xem tất cả
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Container với snap scroll và padding để không bị mất bóng shadow */}
      <div
        className="flex gap-5 overflow-x-auto pb-6 pt-2 px-1 no-scrollbar 
        cursor-grab active:cursor-grabbing scroll-smooth snap-x snap-mandatory"
      >
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.lessonId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="snap-start"
          >
            <Link href={`/dictation/${lesson.lessonId}`}>
              <Card className="group relative w-[280px] flex-shrink-0 overflow-hidden border-none bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                {/* Trang trí góc card tạo cảm giác hiện đại */}
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-orange-50 transition-transform group-hover:scale-150" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                        {lesson.category}
                      </span>
                      <h4 className="line-clamp-1 font-display text-lg font-bold text-slate-800">
                        {lesson.title}
                      </h4>
                    </div>
                    <span
                      className={cn(
                        "rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase",
                        levelStyles[lesson.level as keyof typeof levelStyles]
                      )}
                    >
                      {lesson.level}
                    </span>
                  </div>

                  {/* Phần Progress Bar được làm mới */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-400">
                        Tiến độ
                      </span>
                      <span className="font-bold text-slate-700">
                        {Math.round(lesson.progress * 100)}%
                      </span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lesson.progress * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-orange-400 to-rose-500"
                      />
                    </div>
                  </div>

                  {/* Footer của card: Icon trực quan hơn */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{lesson.duration}p</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="font-medium text-slate-600">
                          +{Math.round(lesson.progress * 100)} XP
                        </span>
                      </div>
                    </div>

                    {/* Nút Play ảo tạo cảm giác Action */}
                    <div className="rounded-full bg-slate-900 p-2 text-white shadow-lg transition-transform group-hover:scale-110 group-active:scale-95">
                      <PlayCircle className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
