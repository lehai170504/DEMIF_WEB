"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalPosts: number;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalPosts,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-16 flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-12 w-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => onPageChange(page)}
              className={cn(
                "h-12 w-12 rounded-xl font-bold text-base transition-all duration-300",
                currentPage === page
                  ? "bg-orange-500 text-white hover:bg-orange-600 border-none shadow-lg shadow-orange-500/25"
                  : "bg-transparent border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5",
              )}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="h-12 w-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-30 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
        Hiển thị{" "}
        <span className="text-white">
          {startIndex + 1}-{Math.min(endIndex, totalPosts)}
        </span>{" "}
        trong <span className="text-white">{totalPosts}</span> bài viết
      </p>
    </div>
  );
}
