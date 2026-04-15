"use client";

import { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export default function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const currentPage = pageIndex + 1;

  const getVisiblePages = () => {
    if (pageCount <= 5)
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "ellipsis", pageCount];
    if (currentPage >= pageCount - 2)
      return [
        1,
        "ellipsis",
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
        pageCount,
      ];
    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      pageCount,
    ];
  };

  return (
    <div className="flex items-center justify-between px-2 w-full">
      <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400">
        Đã chọn {table.getFilteredSelectedRowModel().rows.length} /{" "}
        {table.getFilteredRowModel().rows.length} hàng
      </div>

      <Pagination className="w-auto mx-0">
        <PaginationContent className="gap-1.5 p-1 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-[1.25rem]">
          {/* Về trang đầu */}
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-9 w-9 rounded-xl"
            >
              <ChevronsLeft className="h-4 w-4 stroke-[3px]" />
            </Button>
          </PaginationItem>

          {/* Trang trước */}
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-9 w-9 rounded-xl"
            >
              <ChevronLeft className="h-4 w-4 stroke-[3px]" />
            </Button>
          </PaginationItem>

          {/* Các con số */}
          {getVisiblePages().map((page, idx) => (
            <PaginationItem key={idx}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => table.setPageIndex((page as number) - 1)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Trang sau */}
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-9 w-9 rounded-xl"
            >
              <ChevronRight className="h-4 w-4 stroke-[3px]" />
            </Button>
          </PaginationItem>

          {/* Trang cuối */}
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
              className="h-9 w-9 rounded-xl"
            >
              <ChevronsRight className="h-4 w-4 stroke-[3px]" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
