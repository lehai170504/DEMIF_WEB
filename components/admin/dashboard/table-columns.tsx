// components/dashboardAdmin/table-columns.tsx

import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import {
  IconCircleCheckFilled,
  IconGripVertical,
  IconLoader,
  IconDotsVertical,
  IconAlertCircle,
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
import { useState } from "react";
import { cn } from "@/lib/utils";

// --- Import Component Viewer ---
import TableCellViewer from "./table-cell-viewer";
import LessonDetailDialog from "@/components/admin/lesson/lesson-detail-dialog";
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
  highlighted: z.boolean().optional().default(false),
});

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
      className="text-zinc-500 hover:text-white size-7 hover:bg-white/10 cursor-grab active:cursor-grabbing transition-colors"
    >
      <IconGripVertical className="size-4" />
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
          className="border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Chọn dòng"
          className="border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Tiêu đề Bài tập",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Loại Bài Tập",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge
          variant="outline"
          className={cn(
            "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
            row.original.type === "Dictation"
              ? "border-blue-500/30 text-blue-400 bg-blue-500/5"
              : "border-purple-500/30 text-purple-400 bg-purple-500/5",
          )}
        >
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
        className={cn(
          "bg-white/5 text-zinc-400 hover:bg-white/10 transition-colors border border-transparent",
          row.original.level === "Advanced" &&
            "text-orange-400 border-orange-500/20 bg-orange-500/5",
          row.original.level === "Intermediate" &&
            "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
          row.original.level === "Beginner" &&
            "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        )}
      >
        {row.original.level}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.status === "Published" ? (
          <IconCircleCheckFilled className="size-4 text-emerald-500" />
        ) : row.original.status === "Draft" ? (
          <div className="size-2 rounded-full bg-zinc-600 ml-1 mr-1" />
        ) : (
          <IconAlertCircle className="size-4 text-yellow-500" />
        )}
        <span
          className={cn(
            "text-xs font-medium",
            row.original.status === "Published"
              ? "text-emerald-400"
              : row.original.status === "Draft"
                ? "text-zinc-500"
                : "text-yellow-400",
          )}
        >
          {row.original.status}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "min_accuracy",
    header: () => (
      <div className="w-full text-right text-xs font-bold text-zinc-500 uppercase">
        Min Acc
      </div>
    ),
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
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border-orange-500 focus-visible:bg-white/5 text-zinc-300 font-mono text-xs hover:bg-white/5 transition-all"
          defaultValue={row.original.min_accuracy}
          id={`${row.original.id}-min_accuracy`}
        />
      </form>
    ),
  },
  {
    accessorKey: "max_attempts",
    header: () => (
      <div className="w-full text-right text-xs font-bold text-zinc-500 uppercase">
        Max Try
      </div>
    ),
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
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border-orange-500 focus-visible:bg-white/5 text-zinc-300 font-mono text-xs hover:bg-white/5 transition-all"
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
        return (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                row.original.reviewer === "AI Voice Check"
                  ? "bg-purple-500 shadow-[0_0_5px_#a855f7]"
                  : "bg-blue-500",
              )}
            />
            <span className="text-xs text-zinc-300">
              {row.original.reviewer}
            </span>
          </div>
        );
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Người/AI Review
          </Label>
          <Select defaultValue={row.original.reviewer}>
            <SelectTrigger
              className="w-32 h-8 text-xs bg-white/5 border-white/10 text-zinc-400 focus:ring-orange-500/50"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Chỉ định" />
            </SelectTrigger>
            <SelectContent
              align="end"
              className="bg-[#18181b] border-white/10 text-zinc-300"
            >
              <SelectItem value="AI Voice Check">AI Voice Check</SelectItem>
              <SelectItem value="Admin A">Admin A</SelectItem>
              <SelectItem value="Admin B">Admin B</SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lesson = row.original;
      const [open, setOpen] = useState(false);

      const handleSave = (updatedLesson: any) => {
        console.log("Updated lesson:", updatedLesson);
        toast.success("Đã cập nhật bài học!");
      };

      const handleDelete = (id: string) => {
        console.log("Deleted lesson ID:", id);
        toast.success("Đã xóa bài học!");
      };

      const handleDuplicate = () => {
        const newLesson = {
          ...lesson,
          id: Date.now(),
          title: `${lesson.title} (Copy)`,
        };
        console.log("Duplicated lesson:", newLesson);
        toast.success(`Đã sao chép bài học "${lesson.title}"`);
      };

      const handleHighlight = () => {
        const updated = { ...lesson, highlighted: !lesson.highlighted };
        console.log("Highlight toggled:", updated);
        toast.success(
          updated.highlighted
            ? `Đã làm nổi bật bài "${lesson.title}"`
            : `Đã bỏ nổi bật bài "${lesson.title}"`,
        );
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white"
                size="icon"
              >
                <IconDotsVertical className="size-4" />
                <span className="sr-only">Mở menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-[#18181b] border-white/10 text-zinc-300"
            >
              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="focus:bg-white/10 focus:text-white cursor-pointer"
              >
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDuplicate}
                className="focus:bg-white/10 focus:text-white cursor-pointer"
              >
                Sao chép
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleHighlight}
                className="focus:bg-white/10 focus:text-white cursor-pointer"
              >
                {lesson.highlighted ? "Bỏ nổi bật" : "Làm nổi bật"}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={() => handleDelete(lesson.id.toString())}
                className="text-red-500 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
              >
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <LessonDetailDialog
            open={open}
            onClose={() => setOpen(false)}
            data={{
              id: lesson.id.toString(),
              title: lesson.title,
              type: lesson.type,
              level: lesson.level,
              status: lesson.status,
            }}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </>
      );
    },
  },
];
