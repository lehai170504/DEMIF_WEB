"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, BookOpen, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useVocabularyOverview } from "@/hooks/use-vocabulary";

type FilterType = "all" | "due" | "mastered" | "learning" | "new" | "overdue";

interface ReviewFilterProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dueCount: number;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  selectedLesson: string;
  setSelectedLesson: (lessonId: string) => void;
}

export function ReviewFilter({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  dueCount,
  selectedTopic,
  setSelectedTopic,
  selectedLesson,
  setSelectedLesson,
}: ReviewFilterProps) {
  const { data: overview } = useVocabularyOverview();

  const uniqueTopics = useMemo(() => {
    if (!overview?.recentItems || overview.recentItems.length === 0) {
      return ["academic", "business", "daily", "technology"];
    }
    const topics = overview.recentItems
      .map((item: any) => item.topic)
      .filter(Boolean);
    return Array.from(new Set(topics));
  }, [overview]);

  const uniqueLessons = useMemo(() => {
    if (!overview?.recentItems) return [];
    const lessonsMap = new Map();
    overview.recentItems.forEach((item: any) => {
      if (item.lessonId && item.lessonTitle) {
        lessonsMap.set(item.lessonId, item.lessonTitle);
      }
    });
    return Array.from(lessonsMap.entries()).map(([id, title]) => ({
      id,
      title,
    }));
  }, [overview]);

  return (
    <div className="sticky top-0 z-40 py-4 mb-8 backdrop-blur-md -mx-4 px-4 transition-all duration-300 border-b border-white/5">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-white/90 dark:bg-[#111]/90 border border-gray-200 dark:border-white/5 shadow-2xl">
        {/* Cột Trái: Chế độ ôn tập */}
        <div className="flex flex-wrap gap-1.5 w-full xl:w-auto overflow-x-auto no-scrollbar">
          <div className="hidden md:flex items-center gap-2 mr-3 text-zinc-500 font-black text-[9px] uppercase tracking-[0.2em] shrink-0 ml-2">
            <Filter className="h-3 w-3 text-orange-500" /> Chế độ
          </div>
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="Tất cả"
          />
          <FilterButton
            active={filter === "due"}
            onClick={() => setFilter("due")}
            label="Cần ôn"
            count={overview?.dueCount || 0}
            color="bg-orange-500 shadow-orange-500/20"
          />
          <FilterButton
            active={filter === "overdue"}
            onClick={() => setFilter("overdue")}
            label="Quá hạn"
            count={overview?.overdueCount || 0}
            color="bg-red-500 shadow-red-500/20"
          />
          <FilterButton
            active={filter === "learning"}
            onClick={() => setFilter("learning")}
            label="Đang học"
            count={overview?.learningCount || 0}
            color="bg-blue-500 shadow-blue-500/20"
          />
          <FilterButton
            active={filter === "new"}
            onClick={() => setFilter("new")}
            label="Mới"
            count={overview?.newCount || 0}
            color="bg-indigo-500 shadow-indigo-500/20"
          />
          <FilterButton
            active={filter === "mastered"}
            onClick={() => setFilter("mastered")}
            label="Đã thuộc"
            count={overview?.masteredCount || 0}
            color="bg-emerald-500 shadow-emerald-500/20"
          />
        </div>

        {/* Cột Phải: Bộ lọc chi tiết */}
        <div className="flex flex-wrap md:flex-nowrap w-full xl:w-auto gap-2 items-center">
          {/* Lọc theo Chủ đề */}
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full md:w-[150px] h-10 rounded-xl bg-gray-50 dark:bg-white/5 border-none text-[10px] font-black uppercase text-gray-900 dark:text-white truncate">
              <Hash className="w-3.5 h-3.5 mr-2 text-orange-500 shrink-0" />
              <SelectValue placeholder="CHỦ ĐỀ" />
            </SelectTrigger>
            <SelectContent className="font-mono bg-white dark:bg-[#0D0D0D] border-white/10">
              <SelectItem
                value="all"
                className="text-[10px] font-black uppercase"
              >
                TẤT CẢ CHỦ ĐỀ
              </SelectItem>
              {uniqueTopics.map((topic) => (
                <SelectItem
                  key={topic}
                  value={topic}
                  className="text-[10px] uppercase font-bold"
                >
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Lọc theo Bài học */}
          <Select value={selectedLesson} onValueChange={setSelectedLesson}>
            <SelectTrigger className="w-full md:w-[180px] h-10 rounded-xl bg-gray-50 dark:bg-white/5 border-none text-[10px] font-black uppercase text-gray-900 dark:text-white truncate">
              <BookOpen className="w-3.5 h-3.5 mr-2 text-emerald-500 shrink-0" />
              <SelectValue placeholder="BÀI HỌC" />
            </SelectTrigger>
            <SelectContent className="font-mono bg-white dark:bg-[#0D0D0D] border-white/10">
              <SelectItem
                value="all"
                className="text-[10px] font-black uppercase"
              >
                TẤT CẢ BÀI HỌC
              </SelectItem>
              {uniqueLessons.map((lesson) => (
                <SelectItem
                  key={lesson.id}
                  value={lesson.id}
                  className="text-[10px] uppercase font-bold"
                >
                  <span className="truncate block max-w-[150px]">
                    {lesson.title}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Ô Tìm kiếm */}
          <div className="relative w-full md:w-56 group shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 group-hover:text-orange-500 transition-colors" />
            <Input
              placeholder="TÌM NHANH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl border-none bg-gray-50 dark:bg-white/5 pl-10 text-[10px] font-black text-gray-900 dark:text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/50 uppercase shadow-inner"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
  color = "bg-zinc-500",
}: any) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "relative rounded-xl px-4 h-9 font-black text-[10px] uppercase tracking-widest transition-all overflow-hidden shrink-0",
        active
          ? "text-gray-900 dark:text-white"
          : "text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-white/5",
      )}
    >
      {active && (
        <motion.div
          layoutId="active-filter"
          className="absolute inset-0 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-100/50 dark:bg-white/10 shadow-inner"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      {count !== undefined && count > 0 && (
        <span
          className={cn(
            "ml-2 rounded-md px-1.5 py-0.5 text-[8px] text-white relative z-10 font-black shadow-sm",
            color,
          )}
        >
          {count}
        </span>
      )}
    </Button>
  );
}
