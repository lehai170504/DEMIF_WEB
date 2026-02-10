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

// Import components và type
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
  // Sync data khi props thay đổi (quan trọng khi fetch API)
  const [data, setData] = React.useState<LessonDto[]>(initialData);

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Pagination state cục bộ để đồng bộ với React Table
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

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

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount, // Tổng số trang từ BE
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    manualPagination: true, // Kích hoạt Server-side pagination
    onPaginationChange: (updater) => {
      // Xử lý cập nhật pagination state
      if (typeof updater === "function") {
        const newState = updater(pagination);
        onPaginationChange(newState.pageIndex, newState.pageSize);
      } else {
        onPaginationChange(updater.pageIndex, updater.pageSize);
      }
    },
    getRowId: (row) => row.id, // ID là string UUID
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      // TODO: Gọi API cập nhật thứ tự (displayOrder) tại đây nếu cần
    }
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6 font-mono"
    >
      {/* TOOLBAR */}
      <div className="flex items-center justify-between px-1">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>

        {/* Mobile View Selector */}
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit bg-white/5 border-white/10 text-white h-9 rounded-xl lg:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Chọn chế độ xem" />
          </SelectTrigger>
          <SelectContent className="bg-[#18181b] border-white/10 text-white">
            <SelectItem value="outline">Danh sách Bài Tập</SelectItem>
            <SelectItem value="analytics">Phân tích (Sắp có)</SelectItem>
          </SelectContent>
        </Select>

        {/* Desktop Tabs List */}
        <TabsList className="hidden h-10 items-center justify-start gap-2 bg-transparent p-0 lg:flex">
          <TabsTrigger
            value="outline"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500 hover:text-zinc-300 rounded-xl px-4 py-2 font-bold transition-all border border-transparent data-[state=active]:border-white/5"
          >
            Danh sách
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            disabled
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500 hover:text-zinc-300 rounded-xl px-4 py-2 font-bold transition-all border border-transparent data-[state=active]:border-white/5 opacity-50 cursor-not-allowed"
          >
            Phân tích (Sắp có)
          </TabsTrigger>
        </TabsList>

        {/* Column Visibility */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl h-9"
              >
                <IconLayoutColumns className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline font-bold uppercase text-xs tracking-wider">
                  Cột hiển thị
                </span>
                <IconChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-[#18181b] border-white/10 text-zinc-300"
            >
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide(),
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize focus:bg-white/10 focus:text-white cursor-pointer"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* TABLE CONTENT */}
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#18181b]/50 shadow-xl">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent border-white/5"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 h-12"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
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
                      className="h-24 text-center text-zinc-500"
                    >
                      Không có bài học nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        {/* Pagination Control */}
        <TablePagination table={table} />
      </TabsContent>

      <TabsContent value="analytics" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-[1.5rem] border border-white/10 border-dashed bg-white/5 flex items-center justify-center text-zinc-500 font-bold uppercase tracking-widest text-xs">
          Tính năng đang phát triển...
        </div>
      </TabsContent>
    </Tabs>
  );
}
