// components/dashboardAdmin/table-pagination.tsx

import * as React from "react";
import { Table } from "@tanstack/react-table";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { schema } from "./table-columns";

interface TablePaginationProps {
  table: Table<z.infer<typeof schema>>;
}

export default function TablePagination({ table }: TablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-[#18181b]/50">
      <div className="text-zinc-500 hidden flex-1 text-xs font-medium lg:flex">
        Đã chọn {table.getFilteredSelectedRowModel().rows.length} /{" "}
        {table.getFilteredRowModel().rows.length} hàng.
      </div>

      <div className="flex w-full items-center gap-6 lg:w-fit">
        {/* Rows per page */}
        <div className="hidden items-center gap-2 lg:flex">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Hàng/trang
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] bg-white/5 border-white/10 text-white text-xs rounded-lg">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent
              side="top"
              className="bg-[#18181b] border-white/10 text-white"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Page Info */}
        <div className="flex w-fit items-center justify-center text-xs font-bold text-white uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
          Trang {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()}
        </div>

        {/* Navigation Buttons */}
        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Trang đầu</span>
            <IconChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Trước</span>
            <IconChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Sau</span>
            <IconChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Trang cuối</span>
            <IconChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
