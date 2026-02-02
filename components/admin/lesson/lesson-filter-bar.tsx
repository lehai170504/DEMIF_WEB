"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, ListFilter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Định nghĩa lại Type để dùng chung hoặc import từ file constants nếu có
export type LessonStatus = "all" | "Published" | "Draft" | "Review";
export type LessonType = "all" | "Dictation" | "Shadowing" | "Test";

interface LessonFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeType: LessonType;
  onTypeChange: (value: LessonType) => void;
  activeStatus: LessonStatus;
  onStatusChange: (value: LessonStatus) => void;
  lessonCounts: Record<LessonStatus, number>; // Để hiển thị số lượng
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
  return (
    <Card className="rounded-[2.5rem] border border-white/10 bg-[#18181b] p-8 space-y-6 mx-2 shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="flex flex-col lg:flex-row gap-6 items-center relative z-10">
        {/* Search Bar */}
        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
          <Input
            placeholder="Tìm kiếm tiêu đề bài học..."
            className="h-12 pl-12 bg-black/20 border-white/10 text-white rounded-2xl font-bold focus-visible:ring-orange-500/50 focus-visible:border-orange-500 placeholder:text-zinc-600 transition-all"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="h-8 w-px bg-white/10 hidden lg:block" />

        {/* Type Selector */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <ListFilter className="h-4 w-4 text-zinc-500" />
          <Select value={activeType} onValueChange={onTypeChange}>
            <SelectTrigger className="h-12 w-full lg:w-[220px] rounded-2xl bg-black/20 border-white/10 text-white font-bold italic focus:ring-orange-500/50">
              <SelectValue placeholder="Thể loại" />
            </SelectTrigger>
            <SelectContent className="bg-[#18181b] border-white/10 text-white rounded-2xl font-mono">
              <SelectItem value="all">Tất cả thể loại</SelectItem>
              <SelectItem value="Dictation">Dictation</SelectItem>
              <SelectItem value="Shadowing">Shadowing</SelectItem>
              <SelectItem value="Test">Final Test</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Status Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mr-2 flex items-center gap-2 italic">
          <Filter className="h-3 w-3" /> Lọc theo trạng thái:
        </span>
        {(["all", "Published", "Draft", "Review"] as LessonStatus[]).map(
          (status) => {
            const isActive = activeStatus === status;
            return (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={cn(
                  "px-5 py-2 rounded-xl text-[11px] font-bold uppercase transition-all duration-300 flex items-center gap-2 border",
                  isActive
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20"
                    : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white hover:border-white/10",
                )}
              >
                {status}
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-md text-[9px] font-black",
                    isActive
                      ? "bg-black/20 text-white"
                      : "bg-white/10 text-zinc-500",
                  )}
                >
                  {lessonCounts[status]}
                </span>
              </button>
            );
          },
        )}
      </div>
    </Card>
  );
}
