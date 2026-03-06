"use client";

import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// LƯU Ý: Nếu BE yêu cầu chữ thường, hãy đổi thành "published" | "draft" | ...
export type LessonStatus =
  | "all"
  | "Published"
  | "Draft"
  | "Review"
  | "Archived";

interface LessonFilterBarProps {
  activeStatus: LessonStatus;
  onStatusChange: (value: LessonStatus) => void;
}

export function LessonFilterBar({
  activeStatus,
  onStatusChange,
}: LessonFilterBarProps) {
  return (
    <Card className="rounded-[2.5rem] border border-gray-200 bg-white p-8 space-y-4 shadow-sm relative z-10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none" />

      {/* Khu vực Lọc Trạng thái */}
      <div className="flex flex-wrap items-center gap-2 relative">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2 flex items-center gap-2 italic">
          <Filter className="h-3 w-3" /> Lọc trạng thái:
        </span>
        {(
          ["all", "Published", "Draft", "Review", "Archived"] as LessonStatus[]
        ).map((status) => {
          const isActive = activeStatus === status;

          return (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={cn(
                "px-5 py-2 rounded-xl text-[11px] font-bold uppercase transition-all duration-300 flex items-center gap-2 border",
                isActive
                  ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20 transform scale-105"
                  : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              {status === "all" ? "Tất cả" : status}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
