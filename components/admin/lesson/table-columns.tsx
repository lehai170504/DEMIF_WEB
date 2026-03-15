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
  IconArchive,
  IconClock,
  IconCalendar,
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
import { cn } from "@/lib/utils";
import { LessonDto } from "@/types/lesson.type";
import { useLessonActions } from "@/hooks/use-lesson";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// --- HELPERS (Fix khớp 100% với Enum của BE) ---

export const normalizeStatus = (status?: string | null) => {
  if (!status) return "draft";
  const s = status.toLowerCase();
  // Trả về đúng string BE quy định để logic so sánh ở dưới chính xác
  if (s === "published") return "published";
  if (s === "archived") return "archived";
  if (s === "review") return "review";
  return "draft";
};

// ... (normalizeType và normalizeLevel giữ nguyên)
export const normalizeType = (type?: string | number | null) => {
  const t = String(type).toLowerCase();
  if (t === "0" || t === "dictation") return "Dictation";
  if (t === "1" || t === "shadowing") return "Shadowing";
  return "Dictation";
};

export const normalizeLevel = (level?: string | number | null) => {
  const l = String(level).toLowerCase();
  if (l === "0" || l === "beginner") return "Beginner";
  if (l === "1" || l === "intermediate") return "Intermediate";
  if (l === "2" || l === "advanced") return "Advanced";
  return "Beginner";
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
};

function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-gray-400 hover:text-gray-900 size-7 hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
    >
      <IconGripVertical className="size-4" />
    </Button>
  );
}

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
      <div className="flex items-center justify-center pl-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          className="border-gray-300 data-[state=checked]:bg-orange-500"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center pl-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="border-gray-300 data-[state=checked]:bg-orange-500"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Bài học",
    cell: ({ row }) => {
      const lesson = row.original;
      return (
        <div className="flex flex-col gap-1 min-w-[200px]">
          <span
            className={cn(
              "font-bold truncate max-w-[300px] text-gray-900",
              !lesson.title && "text-gray-400 italic",
            )}
          >
            {lesson.title || "Chưa có tiêu đề"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
              {lesson.category || "Chưa phân loại"}
            </span>
            {lesson.isPremiumOnly && (
              <IconCrown className="size-3 text-yellow-500" />
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "lessonType",
    header: "Loại bài",
    cell: ({ row }) => {
      const type = normalizeType(row.original.lessonType);
      const isVideo =
        row.original.mediaType?.toLowerCase() === "video" ||
        !!row.original.videoId;
      return (
        <div className="flex items-center gap-2">
          {isVideo ? (
            <IconVideo className="size-4 text-blue-500" />
          ) : (
            <IconHeadphones className="size-4 text-purple-500" />
          )}
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-0.5 text-[10px] font-bold uppercase bg-white",
              type === "Dictation"
                ? "border-blue-200 text-blue-600"
                : "border-purple-200 text-purple-600",
            )}
          >
            {type}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Cấp độ",
    cell: ({ row }) => {
      const level = normalizeLevel(row.original.level);
      const colors: Record<string, string> = {
        Advanced: "text-orange-600 border-orange-200 bg-orange-50",
        Intermediate: "text-yellow-600 border-yellow-200 bg-yellow-50",
        Beginner: "text-emerald-600 border-emerald-200 bg-emerald-50",
      };
      return (
        <Badge
          variant="secondary"
          className={cn(
            "border transition-colors whitespace-nowrap",
            colors[level] || "text-gray-600",
          )}
        >
          {level}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = normalizeStatus(row.original.status);
      const statusConfig: Record<string, any> = {
        published: {
          icon: <IconCircleCheckFilled className="size-4 text-emerald-500" />,
          color: "text-emerald-600",
          label: "Published",
        },
        draft: {
          icon: <div className="size-2 rounded-full bg-gray-400 mx-1" />,
          color: "text-gray-500",
          label: "Draft",
        },
        archived: {
          icon: <IconArchive className="size-4 text-gray-400" />,
          color: "text-gray-400 italic line-through",
          label: "Archived",
        },
        review: {
          icon: <IconAlertCircle className="size-4 text-yellow-500" />,
          color: "text-yellow-600",
          label: "Review",
        },
      };
      const config = statusConfig[status] || statusConfig.draft;
      return (
        <div className="flex items-center gap-2">
          {config.icon}
          <span
            className={cn(
              "text-xs font-bold uppercase tracking-wider",
              config.color,
            )}
          >
            {config.label}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lesson = row.original;
      const router = useRouter();
      const { updateStatus, deleteLesson, isDeleting } = useLessonActions();
      const currentStatus = normalizeStatus(lesson.status);

      return (
        <div className="flex justify-end pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-900 rounded-full"
              >
                <IconDotsVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white shadow-xl rounded-2xl p-1.5"
            >
              <DropdownMenuItem
                onClick={() => router.push(`/admin/lessons/${lesson.id}`)}
                className="cursor-pointer py-2"
              >
                <IconEdit className="mr-2 h-4 w-4 text-gray-400" /> Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  updateStatus({
                    id: lesson.id,
                    status:
                      currentStatus === "published" ? "draft" : "published",
                  })
                }
                className="cursor-pointer py-2"
              >
                <IconStar
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentStatus !== "published" &&
                      "text-orange-500 fill-orange-500/20",
                  )}
                />
                {currentStatus === "published"
                  ? "Gỡ bài (Draft)"
                  : "Đăng bài (Publish)"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  toast("Xác nhận xóa?", {
                    action: {
                      label: "Xóa",
                      onClick: () => deleteLesson(lesson.id),
                    },
                  })
                }
                disabled={isDeleting}
                className="text-red-600 focus:bg-red-50 py-2"
              >
                <IconTrash className="mr-2 h-4 w-4" /> Xóa bài học
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
