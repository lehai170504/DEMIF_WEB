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
    <Card className="rounded-[2.5rem] border border-gray-200 bg-white p-8 space-y-4 shadow-sm relative z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent pointer-events-none" />

      <div className="flex flex-wrap items-center gap-3 relative">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2 flex items-center gap-2">
          <Filter className="h-3 w-3" /> Lọc trạng thái:
        </span>

        {statusOptions.map((item) => {
          const isActive = activeStatus === item.value;

          return (
            <button
              key={item.value}
              onClick={() => onStatusChange(item.value as LessonStatus)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase transition-colors relative flex items-center gap-2",
                isActive ? "text-white" : "text-gray-500 hover:text-gray-900",
              )}
            >
              {/* Lớp nền hiệu ứng chuyển động */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30"
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
