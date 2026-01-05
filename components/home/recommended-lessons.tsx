"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Star, Sparkles, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Lesson {
  lessonId: string;
  title: string;
  duration: number;
  level: string;
  category: string;
  rating?: number;
}

interface RecommendedLessonsProps {
  lessonsByCategory: {
    all: Lesson[];
    beginner: Lesson[];
    intermediate: Lesson[];
    advanced: Lesson[];
  };
}

export function RecommendedLessons({
  lessonsByCategory,
}: RecommendedLessonsProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");

  const levelStyles = {
    beginner: "text-emerald-600 bg-emerald-50 border-emerald-100",
    intermediate: "text-amber-600 bg-amber-50 border-amber-100",
    advanced: "text-rose-600 bg-rose-50 border-rose-100",
  };

  const currentLessons = lessonsByCategory[activeTab];

  return (
    <div className="space-y-8">
      {/* 1. HEADER: Thêm icon trang trí và subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-600">
            <Sparkles className="h-5 w-5 fill-current" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Dành riêng cho bạn
            </span>
          </div>
          <h3 className="text-3xl font-black tracking-tight text-slate-900">
            Bài học đề xuất
          </h3>
        </div>

        {/* 2. TABS: Thiết kế bo tròn hoàn toàn (Pill-shaped) */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full grid-cols-4 h-11 bg-slate-100/80 p-1 rounded-full border border-slate-200">
            {["all", "beginner", "intermediate", "advanced"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-full text-xs font-bold capitalize transition-all data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm"
              >
                {tab === "all"
                  ? "Tất cả"
                  : tab === "beginner"
                  ? "Cơ bản"
                  : tab === "intermediate"
                  ? "Trung cấp"
                  : "Nâng cao"}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* 3. GRID & CARDS: Sử dụng AnimatePresence để các card trượt mượt mà khi đổi tab */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {currentLessons.slice(0, 6).map((lesson, index) => (
            <motion.div
              key={lesson.lessonId}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              <Link
                href={`/dictation/${lesson.lessonId}`}
                className="group block h-full"
              >
                <Card className="relative flex flex-col justify-between h-full border-none bg-white p-6 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 rounded-[2rem] overflow-hidden">
                  {/* Decor Gradient ẩn dưới card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-wider border",
                          levelStyles[lesson.level as keyof typeof levelStyles]
                        )}
                      >
                        {lesson.level}
                      </div>

                      {lesson.rating && (
                        <div className="flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-black text-slate-700">
                            {lesson.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                      {lesson.title}
                    </h4>
                  </div>

                  <div className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                      <Clock className="h-4 w-4 text-slate-300" />
                      <span>{lesson.duration} phút học</span>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 4. EMPTY STATE: Thiết kế chuyên nghiệp hơn */}
      {currentLessons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200"
        >
          <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-bold">
            Chưa có bài học cho cấp độ này
          </p>
          <p className="text-sm text-slate-400">
            Vui lòng quay lại sau bạn nhé!
          </p>
        </motion.div>
      )}
    </div>
  );
}
