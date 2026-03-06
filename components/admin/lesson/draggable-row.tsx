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
        group transition-colors border-b border-gray-100 hover:bg-gray-50/80 bg-white
        ${isDragging ? "opacity-90 bg-orange-50 shadow-xl border-orange-200 z-50 relative" : ""}
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
