"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { IconChevronDown, IconLayoutColumns } from "@tabler/icons-react";
import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TablePagination from "@/components/admin/lesson/table-pagination";
import { columns } from "@/components/admin/lesson/table-columns";
import { LessonDto } from "@/types/lesson.type";
interface LessonTableWrapperProps {
  data: LessonDto[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
}

export function LessonTableWrapper({
  data,
  pageCount,
  pageIndex,
  pageSize,
  onPaginationChange,
}: LessonTableWrapperProps) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "displayOrder", desc: false },
  ]);

  const pagination = React.useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data,
    // Lọc bỏ cột select nếu ông không dùng, hoặc giữ nguyên tùy logic
    columns: columns.filter((col) => col.id !== "select"),
    pageCount: pageCount,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater(pagination);
        onPaginationChange(newState.pageIndex, newState.pageSize);
      } else {
        onPaginationChange(updater.pageIndex, updater.pageSize);
      }
    },
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 font-mono transition-colors duration-300">
      {/* Toolbar: Responsive căn chỉnh lại nút */}
      <div className="flex items-center justify-end px-1 animate-in fade-in slide-in-from-top-4 duration-500">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl h-9 sm:h-11 shadow-sm font-bold transition-all active:scale-95 px-3 sm:px-4"
            >
              <IconLayoutColumns className="sm:mr-2 h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span className="uppercase text-[9px] sm:text-[10px] tracking-widest font-black hidden sm:inline">
                Cấu hình cột
              </span>
              <IconChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white dark:bg-zinc-950 border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl p-2"
          >
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide(),
              )
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize focus:bg-slate-100 dark:focus:bg-white/5 cursor-pointer rounded-xl font-black text-[10px] uppercase tracking-widest py-2.5"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {/* Map tên cột cho dễ đọc trong menu config */}
                  {column.id === "lessonType"
                    ? "Loại bài"
                    : column.id === "displayOrder"
                      ? "Thứ tự"
                      : column.id === "durationSeconds"
                        ? "Thời lượng"
                        : column.id === "status"
                          ? "Trạng thái"
                          : column.id === "level"
                            ? "Cấp độ"
                            : column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bảng dữ liệu chính: Bổ sung overflow-x-auto cực kỳ quan trọng */}
      <div className="rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900/40 shadow-sm backdrop-blur-sm overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="overflow-x-auto">
          {" "}
          {/* Thêm lớp này bọc ngoài Table */}
          <Table>
            <TableHeader className="bg-slate-50/80 dark:bg-zinc-900/80 border-b border-slate-100 dark:border-white/5">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-transparent border-none"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-slate-400 dark:text-slate-500 h-12 sm:h-14 px-3 sm:px-6 whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group hover:bg-slate-50/80 dark:hover:bg-orange-500/[0.03] border-b border-slate-100 dark:border-white/5 last:border-none transition-colors duration-200"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-3 sm:px-6 py-3 sm:py-4"
                      >
                        <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-60 sm:h-72 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 opacity-60 px-4">
                      <div className="p-3 sm:p-4 bg-slate-100 dark:bg-zinc-800/50 rounded-full border border-slate-200 dark:border-white/5">
                        <Inbox className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 dark:text-slate-500" />
                      </div>
                      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mt-2">
                        Hệ thống trống
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination: Căn chỉnh lại spacing */}
      <div className="px-1 sm:px-2 animate-in fade-in duration-700">
        <TablePagination table={table} />
      </div>
    </div>
  );
}
