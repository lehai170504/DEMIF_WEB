// components/dashboardAdmin/draggable-row.tsx

import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { flexRender, Row } from "@tanstack/react-table"
import { z } from "zod"

import { TableCell, TableRow } from "@/components/ui/table"
import { schema } from "./table-columns" // Import schema đã định nghĩa trước đó

interface DraggableRowProps {
  row: Row<z.infer<typeof schema>>
}

export default function DraggableRow({ row }: DraggableRowProps) {  
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id, // ID là khóa duy nhất của dòng
  })

  return (  
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      // Áp dụng CSS cho hiệu ứng kéo thả
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 transition-shadow duration-150 ease-in-out hover:shadow-lg"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {/* Render từng ô trong dòng */}
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}