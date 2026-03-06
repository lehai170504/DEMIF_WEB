"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  ListFilter,
  LayoutGrid,
  Headphones,
  Video,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type LessonStatus =
  | "all"
  | "Published"
  | "Draft"
  | "Review"
  | "Archived";
export type LessonType = "all" | "Dictation" | "Shadowing";

const TYPE_OPTIONS: {
  value: LessonType;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "all", label: "Tất cả thể loại", icon: LayoutGrid },
  { value: "Dictation", label: "Dictation (Nghe chép)", icon: Headphones },
  { value: "Shadowing", label: "Shadowing (Nói đuổi)", icon: Video },
];

interface LessonFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeType: LessonType;
  onTypeChange: (value: LessonType) => void;
  activeStatus: LessonStatus;
  onStatusChange: (value: LessonStatus) => void;
  lessonCounts: Record<LessonStatus, number>;
}

export function LessonFilterBar({
  searchTerm,
  onSearchChange,
  activeType,
  onTypeChange,
  activeStatus,
  onStatusChange,
  lessonCounts,
}: LessonFilterBarProps) {
  const totalLessons = Object.entries(lessonCounts).reduce(
    (acc, [key, value]) => {
      if (key !== "all") {
        return acc + value;
      }
      return acc;
    },
    0,
  );

  return (
    <Card className="rounded-[2.5rem] border border-gray-200 bg-white p-8 space-y-6 shadow-sm relative z-10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-6 items-center relative">
        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
          <Input
            placeholder="Tìm kiếm tiêu đề bài học..."
            className="h-12 pl-12 bg-gray-50 border-gray-200 text-gray-900 rounded-2xl font-bold focus-visible:ring-orange-500/50 focus-visible:border-orange-500 placeholder:text-gray-400 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="h-8 w-px bg-gray-200 hidden lg:block" />

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
            <ListFilter className="h-5 w-5 text-gray-400" />
          </div>

          <Select
            value={activeType}
            onValueChange={(val) => onTypeChange(val as LessonType)}
          >
            <SelectTrigger className="h-12 w-full lg:w-[240px] rounded-2xl bg-gray-50 border-gray-200 text-gray-700 font-bold hover:bg-gray-100 shadow-sm transition-colors focus:ring-orange-500/50">
              <SelectValue placeholder="Chọn thể loại" />
            </SelectTrigger>
            <SelectContent
              className="bg-white border-gray-200 text-gray-700 rounded-2xl font-mono shadow-xl z-[100]"
              position="popper"
              sideOffset={5}
            >
              {TYPE_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer focus:bg-orange-50 focus:text-orange-600 py-3 pl-4"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          option.value === "all"
                            ? "text-gray-500"
                            : option.value === "Dictation"
                              ? "text-blue-500"
                              : "text-purple-500",
                        )}
                      />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100 relative">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2 flex items-center gap-2 italic">
          <Filter className="h-3 w-3" /> Lọc trạng thái:
        </span>
        {(
          ["all", "Published", "Draft", "Review", "Archived"] as LessonStatus[]
        ).map((status) => {
          const isActive = activeStatus === status;
          const count =
            status === "all" ? totalLessons : lessonCounts[status] || 0;

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
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-md text-[9px] font-black min-w-[20px] text-center",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
