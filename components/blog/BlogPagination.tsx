"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalPosts: number;
}

// Hàm tính toán các trang sẽ hiển thị (rút gọn bằng dấu ...)
const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

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
      <Pagination>
        <PaginationContent className="gap-2">
          {/* Nút Previous */}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={cn(
                "h-12 w-12 p-0 flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all cursor-pointer",
                currentPage === 1 ? "pointer-events-none opacity-30" : "",
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </PaginationLink>
          </PaginationItem>

          {/* Danh sách trang với dấu ... */}
          {generatePagination(currentPage, totalPages).map((page, i) => (
            <PaginationItem key={i}>
              {page === "..." ? (
                <PaginationEllipsis className="h-12 w-12 flex items-center justify-center text-slate-400" />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(Number(page))}
                  isActive={currentPage === page}
                  className={cn(
                    "h-12 w-12 flex items-center justify-center rounded-xl font-bold text-base transition-all duration-300 cursor-pointer border",
                    currentPage === page
                      ? "bg-orange-500 text-white hover:bg-orange-600 border-none shadow-lg shadow-orange-500/25 scale-110"
                      : "bg-transparent border-gray-200 dark:border-white/10 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-100 dark:hover:bg-white/5",
                  )}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Nút Next */}
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              className={cn(
                "h-12 w-12 p-0 flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all cursor-pointer",
                currentPage === totalPages
                  ? "pointer-events-none opacity-30"
                  : "",
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Dòng tóm tắt hiển thị */}
      <p className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest text-center">
        Hiển thị{" "}
        <span className="text-gray-900 dark:text-white">
          {startIndex + 1}-{Math.min(endIndex, totalPosts)}
        </span>{" "}
        trong{" "}
        <span className="text-gray-900 dark:text-white">{totalPosts}</span> bài
        viết
      </p>
    </div>
  );
}
