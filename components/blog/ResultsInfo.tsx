"use client";

import { blogCategories } from "@/lib/data/blog";

interface ResultsInfoProps {
  totalResults: number;
  searchQuery: string;
  selectedCategory: string;
}

export function ResultsInfo({
  totalResults,
  searchQuery,
  selectedCategory,
}: ResultsInfoProps) {
  if (!searchQuery && selectedCategory === "all") return null;

  return (
    <div className="p-4 bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20 rounded-2xl">
      <p className="text-sm text-orange-700 dark:text-orange-200/80 font-medium">
        <span className="text-orange-600 dark:text-orange-400 font-bold">
          Tìm thấy {totalResults} bài viết
        </span>
        {searchQuery && (
          <span>
            {" "}
            cho từ khóa "
            <span className="text-gray-900 dark:text-white font-bold">{searchQuery}</span>"
          </span>
        )}
        {selectedCategory !== "all" && (
          <span>
            {" "}
            trong danh mục{" "}
            <span className="text-gray-900 dark:text-white font-bold uppercase text-xs tracking-wider border border-gray-200 dark:border-white/10 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5">
              {blogCategories.find((c) => c.slug === selectedCategory)?.name}
            </span>
          </span>
        )}
      </p>
    </div>
  );
}
