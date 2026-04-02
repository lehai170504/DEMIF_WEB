"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SortKey = "totalScore" | "dictationAccuracy" | "shadowingMatchRate";

interface SortControlsProps {
  sortBy: SortKey;
  onSortChange: (key: SortKey) => void;
}

const tabs = [
  { id: "totalScore", label: "Điểm Tổng" },
  { id: "dictationAccuracy", label: "Chính tả" },
  { id: "shadowingMatchRate", label: "Shadowing" },
];

export function SortControls({ sortBy, onSortChange }: SortControlsProps) {
  return (
    <div className="flex justify-center mb-10">
      <div className="flex p-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSortChange(tab.id as SortKey)}
            className={cn(
              "relative px-6 py-2.5 text-sm font-bold rounded-full transition-colors z-10",
              sortBy === tab.id
                ? "text-black"
                : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white",
            )}
          >
            {sortBy === tab.id && (
              <motion.div
                layoutId="active-sort"
                className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
