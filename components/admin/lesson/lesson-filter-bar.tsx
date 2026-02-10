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
  FileText,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- DEFINITIONS ---
export type LessonStatus = "all" | "Published" | "Draft" | "Review";
export type LessonType = "all" | "Dictation" | "Shadowing" | "Test";

// Cấu hình Options
const TYPE_OPTIONS: {
  value: LessonType;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "all", label: "Tất cả thể loại", icon: LayoutGrid },
  { value: "Dictation", label: "Dictation (Nghe chép)", icon: Headphones },
  { value: "Shadowing", label: "Shadowing (Nói đuổi)", icon: Video },
  { value: "Test", label: "Final Test (Kiểm tra)", icon: FileText },
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
  return (
    // FIX: Bỏ overflow-hidden để Dropdown không bị cắt
    // Thêm z-index thấp (10) để nằm dưới Header/Dropdown của table nếu cần
    <Card className="rounded-[2.5rem] border border-white/10 bg-[#18181b] p-8 space-y-6 mx-2 shadow-2xl relative z-10">
      {/* Glow Effect - Giữ nguyên nhưng đảm bảo pointer-events-none */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-6 items-center relative">
        {/* --- SEARCH BAR --- */}
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

        {/* --- TYPE SELECTOR --- */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5">
            <ListFilter className="h-5 w-5 text-zinc-400" />
          </div>

          <Select
            value={activeType}
            onValueChange={(val) => onTypeChange(val as LessonType)}
          >
            <SelectTrigger className="h-12 w-full lg:w-[240px] rounded-2xl bg-black/20 border-white/10 text-white font-bold hover:bg-white/5 transition-colors focus:ring-orange-500/50">
              <SelectValue placeholder="Chọn thể loại" />
            </SelectTrigger>
            {/* FIX: Thêm z-index cao cho Content để nổi lên trên các thành phần khác */}
            <SelectContent
              className="bg-[#18181b] border-white/10 text-white rounded-2xl font-mono shadow-2xl z-[100]"
              position="popper" // Dùng popper để định vị linh hoạt hơn
              sideOffset={5}
            >
              {TYPE_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer focus:bg-white/10 focus:text-white py-3 pl-4"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          option.value === "all"
                            ? "text-zinc-500"
                            : option.value === "Dictation"
                              ? "text-blue-400"
                              : option.value === "Shadowing"
                                ? "text-purple-400"
                                : "text-emerald-400",
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

      {/* --- STATUS PILLS --- */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10 relative">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mr-2 flex items-center gap-2 italic">
          <Filter className="h-3 w-3" /> Lọc trạng thái:
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
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20 transform scale-105"
                    : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white hover:border-white/10",
                )}
              >
                {status === "all" ? "Tất cả" : status}
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-md text-[9px] font-black min-w-[20px] text-center",
                    isActive
                      ? "bg-black/20 text-white"
                      : "bg-white/10 text-zinc-500",
                  )}
                >
                  {lessonCounts[status] || 0}
                </span>
              </button>
            );
          },
        )}
      </div>
    </Card>
  );
}
