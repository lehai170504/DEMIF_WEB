"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DraggableRow from "@/components/admin/lesson/draggable-row";
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
  data: initialData,
  pageCount,
  pageIndex,
  pageSize,
  onPaginationChange,
}: LessonTableWrapperProps) {
  // Quản lý dữ liệu local để phục vụ việc kéo thả (reorder)
  const [data, setData] = React.useState<LessonDto[]>(initialData || []);

  React.useEffect(() => {
    setData(initialData || []);
  }, [initialData]);

  // States cho React Table
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  // Cấu hình Sensors cho Dnd-kit
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map((item) => item.id) || [],
    [data],
  );

  // Khởi tạo Table instance
  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    manualPagination: true, // Vì chúng ta phân trang từ phía Server (API)
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater(pagination);
        onPaginationChange(newState.pageIndex, newState.pageSize);
      } else {
        onPaginationChange(updater.pageIndex, updater.pageSize);
      }
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Xử lý khi kết thúc kéo thả
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      // Gợi ý: Gọi API Patch 'displayOrder' tại đây nếu cần lưu thứ tự vào Database
    }
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex flex-col gap-6 font-mono"
    >
      <div className="flex items-center justify-between px-1">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>

        {/* Mobile View Selector */}
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit bg-white border-gray-200 text-gray-900 h-10 rounded-xl lg:hidden shadow-sm font-bold"
            id="view-selector"
          >
            <SelectValue placeholder="Chế độ xem" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 text-gray-900">
            <SelectItem value="outline">Danh sách Bài Tập</SelectItem>
            <SelectItem value="analytics" disabled>
              Phân tích (Sắp có)
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Desktop View Selector */}
        <TabsList className="hidden h-12 items-center justify-start gap-2 bg-gray-100/50 p-1.5 rounded-2xl lg:flex">
          <TabsTrigger
            value="outline"
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500 rounded-xl px-6 font-bold transition-all h-full"
          >
            Danh sách
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            disabled
            className="text-gray-400 rounded-xl px-6 font-bold opacity-50 cursor-not-allowed"
          >
            Phân tích
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          {/* Menu ẩn hiện cột */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-white border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl h-10 shadow-sm font-bold"
              >
                <IconLayoutColumns className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline uppercase text-xs tracking-wider">
                  Cột hiển thị
                </span>
                <IconChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border-gray-200 text-gray-700 shadow-xl rounded-2xl p-2"
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
                    className="capitalize focus:bg-gray-100 cursor-pointer rounded-lg font-medium"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "lessonType" ? "Loại bài" : column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TabsContent
        value="outline"
        className="m-0 border-none p-0 outline-none flex flex-col gap-4"
      >
        <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-md">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent border-gray-200"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 h-14 px-4"
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
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={columns.length}
                      className="h-40 text-center text-gray-400 font-bold uppercase tracking-widest text-xs"
                    >
                      Hệ thống chưa có dữ liệu bài học.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        {/* Phân trang */}
        <div className="mt-2">
          <TablePagination table={table} />
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-[2rem] border border-gray-200 border-dashed bg-gray-50 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">
          Tính năng Analytics đang được phát triển...
        </div>
      </TabsContent>
    </Tabs>
  );
}
