// src/components/dashboardAdmin/draggable-row.tsx

import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, Row } from "@tanstack/react-table";

import { TableCell, TableRow } from "@/components/ui/table";
import { LessonDto } from "@/types/lesson.type";

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
    zIndex: isDragging ? 10 : "auto",
    position: isDragging ? "relative" : "static",
  };

  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      style={style}
      className={`
        group transition-colors border-b border-white/5 hover:bg-white/5
        ${isDragging ? "opacity-50 bg-white/10 shadow-2xl border-orange-500/50" : ""}
      `}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="py-3 px-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
