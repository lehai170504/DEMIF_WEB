"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <Card className="p-16 text-center bg-white dark:bg-[#18181b] border-2 border-dashed border-gray-300 dark:border-white/10 rounded-[2rem] shadow-xl">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center animate-pulse">
          <SearchX className="h-10 w-10 text-gray-400 dark:text-zinc-500" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Không tìm thấy bài viết
      </h3>
      <p className="text-gray-600 dark:text-zinc-400 mb-8 max-w-sm mx-auto">
        Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem tất cả bài viết.
      </p>
      <Button
        onClick={onReset}
        className="h-12 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/20"
      >
        Xem tất cả bài viết
      </Button>
    </Card>
  );
}
