"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface CategoryFilterProps {
  categories: BlogCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Nút "Tất cả" mặc định (có thể thêm vào mảng categories hoặc xử lý riêng) */}
      <Button
        variant="ghost"
        onClick={() => onCategoryChange("all")}
        className={cn(
          "h-10 rounded-xl px-5 font-bold text-sm transition-all duration-300",
          selectedCategory === "all"
            ? "bg-orange-500 dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-zinc-200"
            : "bg-transparent text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5",
        )}
      >
        Tất cả
      </Button>

      {categories.map((category) => {
        const isActive = selectedCategory === category.slug;
        return (
          <Button
            key={category.id}
            variant="ghost"
            onClick={() => onCategoryChange(category.slug)}
            className={cn(
              "h-10 rounded-xl px-4 font-bold text-sm transition-all duration-300 border border-transparent",
              isActive
                ? "bg-orange-500 dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-zinc-200 shadow-lg shadow-orange-500/20 dark:shadow-white/5"
                : "bg-transparent text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-200 dark:hover:border-white/10",
            )}
          >
            <span className="flex items-center gap-2">
              {category.name}
              <Badge
                className={cn(
                  "px-1.5 py-0 rounded-md text-[10px] min-w-[20px] justify-center transition-colors h-5",
                  isActive
                    ? "bg-white dark:bg-black text-orange-600 dark:text-white"
                    : "bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white",
                )}
              >
                {category.count}
              </Badge>
            </span>
          </Button>
        );
      })}
    </div>
  );
}
