"use client";

import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, Row } from "@tanstack/react-table";

import { TableCell, TableRow } from "@/components/ui/table";
import { LessonDto } from "@/types/lesson.type";
import { cn } from "@/lib/utils";

interface DraggableRowProps {
  row: Row<LessonDto>;
}

export default function DraggableRow({ row }: DraggableRowProps) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    zIndex: isDragging ? 100 : "auto", // Tăng z-index để hàng đang kéo nổi hẳn lên trên
    position: isDragging ? "relative" : "static",
  };

  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      style={style}
      className={cn(
        "group transition-colors border-b border-slate-100 dark:border-white/5 bg-white dark:bg-transparent",
        "hover:bg-slate-50/80 dark:hover:bg-orange-500/[0.02]",

        isDragging && [
          "opacity-95 shadow-2xl scale-[1.01] transition-none z-50 relative",
          "bg-orange-50 dark:bg-zinc-900",
          "border-orange-200 dark:border-orange-500/30",
          "cursor-grabbing",
        ],
      )}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="py-3 px-4">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}
