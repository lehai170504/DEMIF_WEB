"use client";

import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FilterType = "all" | "due" | "mastered" | "learning";

interface ReviewFilterProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dueCount: number;
}

export function ReviewFilter({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  dueCount,
}: ReviewFilterProps) {
  return (
    <div className="sticky top-28 z-30 mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-[2rem] bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="hidden md:flex items-center gap-2 mr-4 text-gray-500 dark:text-zinc-500 font-bold text-xs uppercase tracking-wider">
            <Filter className="h-4 w-4" /> Bộ lọc
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
            count={dueCount}
            color="bg-orange-500"
          />
          <FilterButton
            active={filter === "learning"}
            onClick={() => setFilter("learning")}
            label="Đang học"
            color="bg-blue-500"
          />
          <FilterButton
            active={filter === "mastered"}
            onClick={() => setFilter("mastered")}
            label="Đã thuộc"
            color="bg-emerald-500"
          />
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-white transition-colors" />
          <Input
            placeholder="Tìm kiếm từ vựng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 rounded-2xl border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 pl-11 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-zinc-600 focus-visible:ring-orange-500/50 transition-all group-hover:bg-gray-100 dark:group-hover:bg-black/30"
          />
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
        "relative rounded-xl px-5 h-10 font-bold text-xs transition-all overflow-hidden",
        active
          ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15"
          : "text-gray-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-white/5",
      )}
    >
      {active && (
        <motion.div
          layoutId="active-filter"
          className="absolute inset-0 border border-gray-300 dark:border-white/20 rounded-xl bg-gray-50 dark:bg-white/5"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "ml-2 rounded-md px-1.5 py-0.5 text-[9px] text-white relative z-10",
            color,
          )}
        >
          {count}
        </span>
      )}
    </Button>
  );
}
