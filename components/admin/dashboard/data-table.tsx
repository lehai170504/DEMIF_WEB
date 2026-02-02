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
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  IconChevronDown,
  IconLayoutColumns,
  IconPlus,
} from "@tabler/icons-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
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

import DraggableRow from "./draggable-row";
import TablePagination from "./table-pagination";
import { columns, schema } from "./table-columns";

export default function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6 font-mono"
    >
      <div className="flex items-center justify-between px-1">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit bg-white/5 border-white/10 text-white h-9 rounded-xl @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Chọn chế độ xem" />
          </SelectTrigger>
          <SelectContent className="bg-[#18181b] border-white/10 text-white">
            <SelectItem value="outline">Danh sách Bài Tập</SelectItem>
            <SelectItem value="past-performance">
              Phân tích Hiệu suất
            </SelectItem>
            <SelectItem value="key-personnel">Quản lý Reviewer</SelectItem>
            <SelectItem value="focus-documents">Bài tập Nổi bật</SelectItem>
          </SelectContent>
        </Select>

        <TabsList className="hidden h-10 items-center justify-start gap-2 bg-transparent p-0 @4xl/main:flex">
          <TabsTrigger
            value="outline"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500 hover:text-zinc-300 rounded-xl px-4 py-2 font-bold transition-all border border-transparent data-[state=active]:border-white/5"
          >
            Danh sách
          </TabsTrigger>
          <TabsTrigger
            value="past-performance"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500 hover:text-zinc-300 rounded-xl px-4 py-2 font-bold transition-all border border-transparent data-[state=active]:border-white/5 group"
          >
            Hiệu suất
            <Badge
              variant="secondary"
              className="ml-2 bg-white/5 text-zinc-400 group-data-[state=active]:bg-orange-500 group-data-[state=active]:text-white transition-colors"
            >
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="key-personnel"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500 hover:text-zinc-300 rounded-xl px-4 py-2 font-bold transition-all border border-transparent data-[state=active]:border-white/5 group"
          >
            Reviewer
            <Badge
              variant="secondary"
              className="ml-2 bg-white/5 text-zinc-400 group-data-[state=active]:bg-blue-500 group-data-[state=active]:text-white transition-colors"
            >
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="focus-documents"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500 hover:text-zinc-300 rounded-xl px-4 py-2 font-bold transition-all border border-transparent data-[state=active]:border-white/5"
          >
            Nổi bật
          </TabsTrigger>
        </TabsList>

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
                  Tùy chỉnh Cột
                </span>
                <span className="lg:hidden font-bold uppercase text-xs tracking-wider">
                  Cột
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
                      Không có kết quả.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <TablePagination table={table} />
      </TabsContent>

      <TabsContent value="past-performance" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-[1.5rem] border border-white/10 border-dashed bg-white/5 flex items-center justify-center text-zinc-500 font-bold uppercase tracking-widest text-xs">
          Biểu đồ phân tích hiệu suất sẽ hiển thị tại đây.
        </div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-[1.5rem] border border-white/10 border-dashed bg-white/5 flex items-center justify-center text-zinc-500 font-bold uppercase tracking-widest text-xs">
          Quản lý nhân sự Reviewer/AI
        </div>
      </TabsContent>
      <TabsContent value="focus-documents" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-[1.5rem] border border-white/10 border-dashed bg-white/5 flex items-center justify-center text-zinc-500 font-bold uppercase tracking-widest text-xs">
          Các Bài Tập đang được chú trọng
        </div>
      </TabsContent>
    </Tabs>
  );
}
