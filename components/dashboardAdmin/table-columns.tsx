// components/dashboardAdmin/table-columns.tsx

import { z } from "zod";
import { ColumnDef, Row, flexRender } from "@tanstack/react-table";
import {
  IconCircleCheckFilled,
  IconGripVertical,
  IconLoader,
  IconDotsVertical,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useSortable } from "@dnd-kit/sortable";

// --- Import Component Viewer ---
import TableCellViewer from "./table-cell-viewer";
// -----------------------------

export const schema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.enum(["Dictation", "Shadowing", "Test"]),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  status: z.enum(["Published", "Draft", "Review"]),
  min_accuracy: z.string(),
  max_attempts: z.string(),
  reviewer: z.enum(["AI Voice Check", "Admin A", "Admin B", "Chỉ định"]),
});

// Tạo component DragHandle ở đây hoặc trong file riêng
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Kéo để sắp xếp</span>
    </Button>
  );
}

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Chọn tất cả"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Chọn dòng"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Tiêu đề Bài tập",
    cell: ({ row }) => {
      // Dùng TableCellViewer đã tách
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Loại Bài Tập",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "level",
    header: "Cấp độ",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={
          row.original.level === "Advanced"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground"
        }
      >
        {row.original.level}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5">
        {row.original.status === "Published" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader className="animate-spin" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "min_accuracy",
    header: () => <div className="w-full text-right">Độ chính xác Y/C</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Đang lưu...`,
            success: "Đã lưu",
            error: "Lỗi",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-min_accuracy`} className="sr-only">
          Độ chính xác Y/C
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.min_accuracy}
          id={`${row.original.id}-min_accuracy`}
        />
      </form>
    ),
  },
  {
    accessorKey: "max_attempts",
    header: "Số lần thử TĐ",
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Đang lưu...`,
            success: "Đã lưu",
            error: "Lỗi",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-max_attempts`} className="sr-only">
          Số lần thử TĐ
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.max_attempts}
          id={`${row.original.id}-max_attempts`}
        />
      </form>
    ),
  },
  {
    accessorKey: "reviewer",
    header: "Người/AI Review",
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Chỉ định";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Người/AI Review
          </Label>
          <Select defaultValue={row.original.reviewer}>
          <SelectTrigger
            className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
            size="sm"
            id={`${row.original.id}-reviewer`}
          >
            <SelectValue placeholder="Chỉ định" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="AI Voice Check">AI Voice Check</SelectItem>
            <SelectItem value="Admin A">Admin A</SelectItem>F
            <SelectItem value="Admin B">Admin B</SelectItem>
          </SelectContent>
        </Select>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Mở menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
          <DropdownMenuItem>Sao chép</DropdownMenuItem>
          <DropdownMenuItem>Làm nổi bật</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
