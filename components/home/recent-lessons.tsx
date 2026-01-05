"use client";

import { motion } from "framer-motion";
import { Play, Headset, ChevronRight, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
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
    <div className="space-y-6">
      {/* Header với Icon minh họa */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-100 rounded-lg">
            <History className="h-5 w-5 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-800">
            Nghe gần đây
          </h3>
        </div>
        <Link
          href="/dictation"
          className="group text-sm font-bold text-orange-600 hover:text-orange-700 transition-all flex items-center gap-1"
        >
          Tất cả
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              <Card
                className={cn(
                  "relative flex items-center gap-4 border-none p-3 pr-5 transition-all",
                  "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
                  "before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-1 before:rounded-r-full before:bg-orange-500 before:opacity-0 group-hover:before:opacity-100"
                )}
              >
                {/* Thumbnail ảo hoặc Icon đại diện */}
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 group-hover:bg-orange-600 transition-colors duration-300">
                  <Headset className="h-6 w-6 text-slate-500 group-hover:text-white transition-colors" />

                  {/* Indicator sóng âm ảo khi hover */}
                  <div className="absolute bottom-2 flex gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span
                      className="h-2 w-1 animate-bounce bg-white/60 rounded-full"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="h-3 w-1 animate-bounce bg-white/80 rounded-full"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="h-2 w-1 animate-bounce bg-white/60 rounded-full"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 bg-orange-50 px-2 py-0.5 rounded">
                      {lesson.code}
                    </span>
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-slate-700 truncate group-hover:text-orange-600 transition-colors">
                    {lesson.title}
                  </h4>
                </div>

                {/* Nút Play tinh tế ở cuối */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}

        {lessons.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50">
            <History className="h-10 w-10 text-slate-300 mb-2" />
            <p className="text-slate-400 font-medium tracking-tight">
              Chưa có hoạt động gần đây
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
