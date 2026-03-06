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

// --- HELPERS (Chuẩn hóa dữ liệu hiển thị) ---

export const normalizeStatus = (status?: string | null) => {
  if (!status) return "Draft";
  const s = status.toLowerCase();
  if (s === "published") return "Published";
  if (s === "archived") return "Archived";
  if (s === "review") return "Review";
  return "Draft";
};

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

// --- DRAG HANDLE COMPONENT ---
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
      const title = row.original.title || "Chưa có tiêu đề";
      const category = row.original.category || "Chưa phân loại";

      return (
        <div className="flex flex-col gap-1 min-w-[200px]">
          <span
            className={cn(
              "font-bold truncate max-w-[300px]",
              !row.original.title ? "text-gray-400 italic" : "text-gray-900",
            )}
            title={title}
          >
            {title}
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
            {category}
          </span>
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
        row.original.mediaType === "video" || row.original.mediaUrl;

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
              "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap bg-white",
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
      let colorClass = "text-gray-600 border-gray-200 bg-gray-50";

      if (level === "Advanced")
        colorClass = "text-orange-600 border-orange-200 bg-orange-50";
      else if (level === "Intermediate")
        colorClass = "text-yellow-600 border-yellow-200 bg-yellow-50";
      else if (level === "Beginner")
        colorClass = "text-emerald-600 border-emerald-200 bg-emerald-50";

      return (
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn(
              "border transition-colors whitespace-nowrap",
              colorClass,
            )}
          >
            {level}
          </Badge>
          {row.original.isPremiumOnly && (
            <IconCrown
              className="size-4 text-yellow-500 shrink-0"
              title="Premium Only"
            />
          )}
        </div>
      );
    },
  },
  {
    id: "details",
    header: "Thông tin",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1.5 text-[11px] text-gray-500 font-medium whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <IconClock className="size-3.5 text-gray-400" />
          {formatDuration(row.original.durationSeconds || 0)}
        </div>
        <div className="flex items-center gap-1.5">
          <IconCalendar className="size-3.5 text-gray-400" />
          {row.original.createdAt
            ? formatDate(row.original.createdAt)
            : "--/--/----"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = normalizeStatus(row.original.status);
      return (
        <div className="flex items-center gap-2">
          {status === "Published" && (
            <IconCircleCheckFilled className="size-4 text-emerald-500" />
          )}
          {status === "Draft" && (
            <div className="size-2 rounded-full bg-gray-400 ml-1 mr-1" />
          )}
          {status === "Archived" && (
            <IconArchive className="size-4 text-gray-400" />
          )}
          {status === "Review" && (
            <IconAlertCircle className="size-4 text-yellow-500" />
          )}

          <span
            className={cn(
              "text-xs font-bold uppercase tracking-wider",
              status === "Published" && "text-emerald-600",
              status === "Draft" && "text-gray-500",
              status === "Archived" && "text-gray-400 italic line-through",
              status === "Review" && "text-yellow-600",
            )}
          >
            {status}
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

      // --- HANDLERS ---

      const handleToggleStatus = () => {
        // Luân chuyển giữa Draft và Published
        const newStatus = currentStatus === "Published" ? "draft" : "published";
        updateStatus({ id: lesson.id, status: newStatus });
      };

      const handleArchive = () => {
        updateStatus({ id: lesson.id, status: "archived" });
      };

      const handleDelete = () => {
        toast("Xác nhận xóa bài học?", {
          description: `Bài học "${lesson.title || "Không tên"}" sẽ bị xóa vĩnh viễn.`,
          action: {
            label: "Xóa ngay",
            onClick: () => deleteLesson(lesson.id),
          },
          cancel: { label: "Hủy", onClick: () => {} },
          actionButtonStyle: { backgroundColor: "#ef4444", color: "white" },
        });
      };

      return (
        <div className="flex justify-end pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              >
                <IconDotsVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white border border-gray-200 text-gray-700 shadow-xl rounded-2xl p-1.5"
            >
              {/* CHUYỂN HƯỚNG SANG PAGE CHI TIẾT [ID] */}
              <DropdownMenuItem
                onClick={() => router.push(`/admin/lessons/${lesson.id}`)}
                className="cursor-pointer hover:bg-gray-50 rounded-lg py-2"
              >
                <IconEdit className="mr-2 h-4 w-4 text-gray-400" /> Chỉnh sửa
                chi tiết
              </DropdownMenuItem>

              {/* PATCH STATUS: PUBLISH/DRAFT */}
              <DropdownMenuItem
                onClick={handleToggleStatus}
                className="cursor-pointer hover:bg-gray-50 rounded-lg py-2"
              >
                <IconStar
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentStatus !== "Published"
                      ? "text-orange-500 fill-orange-500/20"
                      : "text-gray-400",
                  )}
                />
                {currentStatus === "Published"
                  ? "Gỡ bài (Draft)"
                  : "Đăng bài (Publish)"}
              </DropdownMenuItem>

              {/* PATCH STATUS: ARCHIVE */}
              {currentStatus !== "Archived" && (
                <DropdownMenuItem
                  onClick={handleArchive}
                  className="cursor-pointer hover:bg-gray-50 text-gray-500 rounded-lg py-2"
                >
                  <IconArchive className="mr-2 h-4 w-4" /> Lưu trữ bài học
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator className="my-1 bg-gray-100" />

              {/* DELETE */}
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer rounded-lg py-2"
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
