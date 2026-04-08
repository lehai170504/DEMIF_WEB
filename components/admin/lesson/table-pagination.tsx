"use client";

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { Table } from "@tanstack/react-table";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export default function TablePagination<TData>({
  table,
}: TablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;

  const getVisiblePages = () => {
    const total = pageCount;
    const current = pageIndex + 1;
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    if (current <= 3) return [1, 2, 3, 4, "ellipsis", total];
    if (current >= total - 2)
      return [1, "ellipsis", total - 3, total - 2, total - 1, total];

    return [
      1,
      "ellipsis",
      current - 1,
      current,
      current + 1,
      "ellipsis",
      total,
    ];
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 pt-4 pb-6 gap-6 font-mono border-t border-slate-100 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-b-[2rem] transition-colors duration-300">
      {/* PHẦN 1: TRẠNG THÁI LỰA CHỌN */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wide uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
          Hàng đã chọn: {table.getFilteredSelectedRowModel().rows.length} /{" "}
          {table.getFilteredRowModel().rows.length}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
        {/* PHẦN 2: CẤU HÌNH SỐ HÀNG */}
        <div className="flex items-center space-x-3 bg-slate-100/50 dark:bg-white/5 p-1 pl-3 rounded-2xl border border-slate-200/60 dark:border-white/10">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-tight uppercase">
            Số hàng mỗi trang
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px] bg-white dark:bg-zinc-800 border-none shadow-sm rounded-xl font-bold text-xs focus:ring-orange-500 focus:ring-offset-0 font-mono dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-mono rounded-xl shadow-2xl bg-white dark:bg-zinc-950 border-slate-200 dark:border-white/10">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem
                  key={size}
                  value={`${size}`}
                  className="text-xs font-bold focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-600 dark:focus:text-orange-400 font-mono"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* PHẦN 3: ĐIỀU HƯỚNG SỐ TRANG */}
        <nav className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200/50 dark:border-white/10 shadow-inner font-mono">
          <PaginationNavButton
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            icon={ChevronsLeft}
          />

          <PaginationNavButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={ChevronLeftIcon}
          />

          <div className="flex items-center gap-1 mx-1">
            {getVisiblePages().map((page, idx) => {
              if (page === "ellipsis") {
                return (
                  <div
                    key={`ellipsis-${idx}`}
                    className="w-6 flex justify-center text-slate-400 dark:text-slate-600"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </div>
                );
              }
              const isCurrent = pageIndex === (page as number) - 1;
              return (
                <motion.button
                  key={`page-${page}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => table.setPageIndex((page as number) - 1)}
                  className={cn(
                    "h-8 min-w-[32px] px-2 rounded-xl text-[11px] font-bold transition-all relative font-mono outline-none",
                    isCurrent
                      ? "text-white"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white",
                  )}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="activePagePill"
                      className="absolute inset-0 bg-slate-900 dark:bg-orange-500 rounded-xl shadow-md dark:shadow-orange-500/20"
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10">{page}</span>
                </motion.button>
              );
            })}
          </div>

          <PaginationNavButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={ChevronRightIcon}
          />

          <PaginationNavButton
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            icon={ChevronsRight}
          />
        </nav>
      </div>
    </div>
  );
}

function PaginationNavButton({
  onClick,
  disabled,
  icon: Icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: any;
}) {
  return (
    <motion.div whileTap={!disabled ? { scale: 0.9 } : {}}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-xl transition-all outline-none",
          !disabled
            ? "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm hover:text-orange-600 dark:hover:text-orange-400"
            : "text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50",
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
