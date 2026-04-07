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
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data,
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
    <div className="w-full flex flex-col gap-6 font-mono">
      {/* Toolbar: Chỉ giữ lại bộ lọc cột hiển thị */}
      <div className="flex items-center justify-end px-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl h-10 shadow-sm font-bold"
            >
              <IconLayoutColumns className="mr-2 h-4 w-4" />
              <span className="uppercase text-[10px] tracking-widest">
                Cấu hình cột
              </span>
              <IconChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white dark:bg-zinc-950 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 shadow-xl rounded-2xl p-2"
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
                  className="capitalize focus:bg-slate-100 dark:focus:bg-white/5 cursor-pointer rounded-lg font-bold text-[10px] uppercase tracking-wider"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id === "lessonType"
                    ? "Loại bài"
                    : column.id === "displayOrder"
                      ? "Thứ tự"
                      : column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bảng dữ liệu chính */}
      <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b border-slate-100 dark:border-white/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-none"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 h-14 px-6"
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
                  className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 last:border-none transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
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
                  colSpan={columns.length}
                  className="h-60 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 opacity-50">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      Hệ thống trống
                    </p>
                    <p className="text-xs font-bold text-slate-400">
                      Chưa ghi nhận dữ liệu bài học nào.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="px-2">
        <TablePagination table={table} />
      </div>
    </div>
  );
}
