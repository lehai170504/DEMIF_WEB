"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  IconCircleCheckFilled,
  IconGripVertical,
  IconDotsVertical,
  IconAlertCircle,
  IconTrash,
  IconEdit,
  IconStar,
  IconHeadphones,
  IconVideo,
  IconCrown,
  IconArchive, // --- IMPORT THÊM ICON ARCHIVE ---
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LessonDto } from "@/types/lesson.type";
import LessonDetailDialog from "@/components/admin/lesson/lesson-detail-drawer";
import { useLessonActions } from "@/hooks/use-lesson";
import { toast } from "sonner";

// Helper Drag Handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-zinc-500 hover:text-white size-7 hover:bg-white/10 cursor-grab active:cursor-grabbing transition-colors"
    >
      <IconGripVertical className="size-4" />
    </Button>
  );
}

// === COLUMN DEFINITIONS ===
export const columns: ColumnDef<LessonDto>[] = [
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
          className="border-white/20 data-[state=checked]:bg-orange-500"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="border-white/20 data-[state=checked]:bg-orange-500"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // --- TITLE & CATEGORY ---
  {
    accessorKey: "title",
    header: "Bài học",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span
          className="font-bold text-white truncate max-w-[250px]"
          title={row.original.title}
        >
          {row.original.title}
        </span>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
          {row.original.category}
        </span>
      </div>
    ),
  },
  // --- TYPE (Media Icon) ---
  {
    accessorKey: "lessonType",
    header: "Loại",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.mediaType === "video" ? (
          <IconVideo className="size-4 text-blue-400" />
        ) : (
          <IconHeadphones className="size-4 text-purple-400" />
        )}
        <Badge
          variant="outline"
          className={cn(
            "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
            row.original.lessonType === "Dictation"
              ? "border-blue-500/30 text-blue-400 bg-blue-500/5"
              : "border-purple-500/30 text-purple-400 bg-purple-500/5",
          )}
        >
          {row.original.lessonType}
        </Badge>
      </div>
    ),
  },
  // --- LEVEL & PREMIUM ---
  {
    accessorKey: "level",
    header: "Cấp độ",
    cell: ({ row }) => {
      const level = row.original.level;
      let colorClass = "text-zinc-400 border-zinc-500/20 bg-white/5";
      if (level === "Advanced")
        colorClass = "text-orange-400 border-orange-500/20 bg-orange-500/5";
      else if (level === "Intermediate")
        colorClass = "text-yellow-400 border-yellow-500/20 bg-yellow-500/5";
      else if (level === "Beginner")
        colorClass = "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";

      return (
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn("border transition-colors", colorClass)}
          >
            {level}
          </Badge>
          {row.original.isPremiumOnly && (
            <IconCrown
              className="size-4 text-yellow-500 animate-pulse"
              title="Premium Only"
            />
          )}
        </div>
      );
    },
  },
  // --- STATUS (ĐÃ CHỈNH SỬA) ---
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex items-center gap-2">
          {/* Logic hiển thị Icon theo status */}
          {status === "Published" && (
            <IconCircleCheckFilled className="size-4 text-emerald-500" />
          )}
          {status === "Draft" && (
            <div className="size-2 rounded-full bg-zinc-600 ml-1 mr-1" />
          )}
          {status === "Archived" && (
            <IconArchive className="size-4 text-zinc-500" />
          )}
          {status === "Review" && (
            <IconAlertCircle className="size-4 text-yellow-500" />
          )}

          {/* Logic hiển thị Text màu theo status */}
          <span
            className={cn(
              "text-xs font-medium",
              status === "Published" && "text-emerald-400",
              status === "Draft" && "text-zinc-500",
              status === "Archived" && "text-zinc-600 italic line-through", // Style riêng cho Archived
              status === "Review" && "text-yellow-400",
            )}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  // --- STATS (Completions) ---
  {
    accessorKey: "completionsCount",
    header: () => <div className="text-right">Lượt học</div>,
    cell: ({ row }) => (
      <div className="text-right font-mono text-zinc-300">
        {row.original.completionsCount}
      </div>
    ),
  },
  // --- ACTIONS ---
  {
    id: "actions",
    cell: ({ row }) => {
      const lesson = row.original;
      const [openDetail, setOpenDetail] = useState(false);
      const { deleteLesson, updateLesson, isDeleting } = useLessonActions();

      // --- LOGIC XÓA DÙNG TOAST ---
      const handleDelete = () => {
        toast("Xác nhận xóa bài học?", {
          description: `Bài học "${lesson.title}" sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.`,
          action: {
            label: "Xóa ngay",
            onClick: () => deleteLesson(lesson.id),
          },
          cancel: {
            label: "Hủy",
            onClick: () => console.log("Cancelled delete"),
          },
          actionButtonStyle: {
            backgroundColor: "#ef4444",
            color: "white",
          },
        });
      };

      // Đổi trạng thái Publish/Draft
      const handleToggleStatus = () => {
        const newStatus = lesson.status === "Published" ? "Draft" : "Published";
        updateLesson({ id: lesson.id, data: { status: newStatus } });
      };

      // Chuyển sang Archived
      const handleArchive = () => {
        updateLesson({ id: lesson.id, data: { status: "Archived" } });
        toast.success(`Đã lưu trữ bài học "${lesson.title}"`);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-500 hover:text-white"
              >
                <IconDotsVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-[#18181b] border-white/10 text-zinc-300"
            >
              <DropdownMenuItem
                onClick={() => setOpenDetail(true)}
                className="cursor-pointer hover:bg-white/10"
              >
                <IconEdit className="mr-2 h-4 w-4" /> Chỉnh sửa
              </DropdownMenuItem>

              {/* Toggle Publish/Draft */}
              <DropdownMenuItem
                onClick={handleToggleStatus}
                className="cursor-pointer hover:bg-white/10"
              >
                <IconStar className="mr-2 h-4 w-4" />
                {lesson.status === "Published"
                  ? "Gỡ bài (Draft)"
                  : "Đăng bài (Publish)"}
              </DropdownMenuItem>

              {/* Toggle Archive (Chỉ hiện khi chưa Archive) */}
              {lesson.status !== "Archived" && (
                <DropdownMenuItem
                  onClick={handleArchive}
                  className="cursor-pointer hover:bg-white/10 text-zinc-400"
                >
                  <IconArchive className="mr-2 h-4 w-4" /> Lưu trữ
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-500 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
              >
                <IconTrash className="mr-2 h-4 w-4" /> Xóa bài học
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Drawer Chi Tiết */}
          <LessonDetailDialog
            open={openDetail}
            onOpenChange={setOpenDetail}
            lesson={lesson}
          />
        </>
      );
    },
  },
];
