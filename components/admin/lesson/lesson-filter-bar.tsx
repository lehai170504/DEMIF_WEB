"use client";

import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LESSON_STATUSES } from "./lesson.constants";

export type LessonStatus = "all" | "draft" | "published" | "archived";

interface LessonFilterBarProps {
  activeStatus: LessonStatus;
  onStatusChange: (value: LessonStatus) => void;
}

export function LessonFilterBar({
  activeStatus,
  onStatusChange,
}: LessonFilterBarProps) {
  // Đồng bộ với file constants
  const statusOptions = [
    { label: "Tất cả bài học", value: "all" as const },
    ...LESSON_STATUSES,
  ];

  return (
    <Card className="rounded-[2.5rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 p-8 space-y-4 shadow-sm relative z-10 overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/10 dark:via-orange-500/20 to-transparent pointer-events-none" />

      <div className="flex flex-wrap items-center gap-3 relative">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mr-2 flex items-center gap-2">
          <Filter className="h-3 w-3" /> Lọc trạng thái:
        </span>

        {statusOptions.map((item) => {
          const isActive = activeStatus === item.value;

          return (
            <button
              key={item.value}
              onClick={() => onStatusChange(item.value as LessonStatus)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase transition-colors relative flex items-center gap-2 outline-none",
                isActive
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30 dark:shadow-orange-500/10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}

              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
