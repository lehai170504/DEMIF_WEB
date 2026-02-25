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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LessonDto } from "@/types/lesson.type";
import LessonDetailDialog from "@/components/admin/lesson/lesson-detail-drawer";
import { useLessonActions } from "@/hooks/use-lesson";
import { toast } from "sonner";

// --- HELPERS (Chuẩn hóa dữ liệu từ API) ---

export const normalizeStatus = (status?: string | null) => {
  if (!status) return "Draft";
  const s = status.toLowerCase();
  if (s === "published") return "Published";
  if (s === "archived") return "Archived";
  if (s === "review") return "Review";
  return "Draft";
};

// Chuyển đổi Số (từ BE) thành Chữ (để FE hiển thị)
export const normalizeType = (type?: string | number | null) => {
  const t = String(type).toLowerCase(); // Ép về chuỗi để dễ so sánh
  if (t === "0" || t === "dictation") return "Dictation";
  if (t === "1" || t === "shadowing") return "Shadowing";
  return "Dictation"; // Mặc định nếu bị lỗi
};

// Chuyển đổi Số (từ BE) thành Chữ (để FE hiển thị)
export const normalizeLevel = (level?: string | number | null) => {
  const l = String(level).toLowerCase(); // Ép về chuỗi để dễ so sánh
  if (l === "0" || l === "beginner") return "Beginner";
  if (l === "1" || l === "intermediate") return "Intermediate";
  if (l === "2" || l === "advanced") return "Advanced";
  return "Beginner"; // Mặc định nếu bị lỗi
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

// --- DRAG HANDLE ---
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
      <div className="flex items-center justify-center pl-2">
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
      <div className="flex items-center justify-center pl-2">
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
    cell: ({ row }) => {
      const title = row.original.title || "Chưa có tiêu đề";
      const category = row.original.category || "Chưa phân loại";

      return (
        <div className="flex flex-col gap-1 min-w-[200px]">
          <span
            className={cn(
              "font-bold truncate max-w-[300px]",
              !row.original.title ? "text-zinc-500 italic" : "text-white",
            )}
            title={title}
          >
            {title}
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
            {category}
          </span>
        </div>
      );
    },
  },
  // --- TYPE ---
  {
    accessorKey: "lessonType",
    header: "Loại bài",
    cell: ({ row }) => {
      // Đã tự động dịch từ số sang chữ qua hàm normalizeType
      const type = normalizeType(row.original.lessonType);
      const isVideo =
        row.original.mediaType === "video" || row.original.mediaUrl;

      return (
        <div className="flex items-center gap-2">
          {isVideo ? (
            <IconVideo className="size-4 text-blue-400" />
          ) : (
            <IconHeadphones className="size-4 text-purple-400" />
          )}
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap",
              type === "Dictation"
                ? "border-blue-500/30 text-blue-400 bg-blue-500/5"
                : "border-purple-500/30 text-purple-400 bg-purple-500/5",
            )}
          >
            {type}
          </Badge>
        </div>
      );
    },
  },
  // --- LEVEL & PREMIUM ---
  {
    accessorKey: "level",
    header: "Cấp độ",
    cell: ({ row }) => {
      // Đã tự động dịch từ số sang chữ qua hàm normalizeLevel
      const level = normalizeLevel(row.original.level);
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
            className={cn(
              "border transition-colors whitespace-nowrap",
              colorClass,
            )}
          >
            {level}
          </Badge>
          {row.original.isPremiumOnly && (
            <IconCrown
              className="size-4 text-yellow-500 animate-pulse shrink-0"
              title="Premium Only"
            />
          )}
        </div>
      );
    },
  },
  // --- THÔNG TIN BỔ SUNG (DURATION & DATE) ---
  {
    id: "details",
    header: "Thông tin",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1.5 text-[11px] text-zinc-400 font-medium whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <IconClock className="size-3.5 text-zinc-500" />
          {formatDuration(row.original.durationSeconds || 0)}
        </div>
        <div className="flex items-center gap-1.5">
          <IconCalendar className="size-3.5 text-zinc-500" />
          {row.original.createdAt
            ? formatDate(row.original.createdAt)
            : "--/--/----"}
        </div>
      </div>
    ),
  },
  // --- STATUS ---
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
            <div className="size-2 rounded-full bg-zinc-600 ml-1 mr-1" />
          )}
          {status === "Archived" && (
            <IconArchive className="size-4 text-zinc-500" />
          )}
          {status === "Review" && (
            <IconAlertCircle className="size-4 text-yellow-500" />
          )}

          <span
            className={cn(
              "text-xs font-medium uppercase tracking-wider",
              status === "Published" && "text-emerald-400",
              status === "Draft" && "text-zinc-500",
              status === "Archived" && "text-zinc-600 italic line-through",
              status === "Review" && "text-yellow-400",
            )}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  // --- ACTIONS ---
  {
    id: "actions",
    cell: ({ row }) => {
      const lesson = row.original;
      const [openDetail, setOpenDetail] = useState(false);
      const { deleteLesson, updateLesson, isDeleting } = useLessonActions();
      const currentStatus = normalizeStatus(lesson.status);

      const handleDelete = () => {
        toast("Xác nhận xóa bài học?", {
          description: `Bài học "${lesson.title || "Không tên"}" sẽ bị xóa vĩnh viễn.`,
          action: { label: "Xóa ngay", onClick: () => deleteLesson(lesson.id) },
          cancel: { label: "Hủy", onClick: () => {} },
          actionButtonStyle: { backgroundColor: "#ef4444", color: "white" },
        });
      };

      // ĐÃ FIX: Gửi toàn bộ payload cũ kèm theo status mới để BE không xóa mất dữ liệu
      const handleToggleStatus = () => {
        const newStatus = currentStatus === "Published" ? "draft" : "published";

        const payload: any = {
          ...lesson,
          status: newStatus,
        };

        // Ép kiểu lại lessonType và level về Number để khớp với DB
        if (typeof payload.lessonType === "string") {
          payload.lessonType =
            payload.lessonType === "Shadowing" || payload.lessonType === "1"
              ? 1
              : 0;
        }
        if (typeof payload.level === "string") {
          payload.level =
            payload.level === "Advanced" || payload.level === "2"
              ? 2
              : payload.level === "Intermediate" || payload.level === "1"
                ? 1
                : 0;
        }

        updateLesson({ id: lesson.id, data: payload });
      };

      // ĐÃ FIX: Tương tự như trên cho chức năng Archive
      const handleArchive = () => {
        const payload: any = {
          ...lesson,
          status: "archived",
        };

        // Ép kiểu
        if (typeof payload.lessonType === "string") {
          payload.lessonType =
            payload.lessonType === "Shadowing" || payload.lessonType === "1"
              ? 1
              : 0;
        }
        if (typeof payload.level === "string") {
          payload.level =
            payload.level === "Advanced" || payload.level === "2"
              ? 2
              : payload.level === "Intermediate" || payload.level === "1"
                ? 1
                : 0;
        }

        updateLesson({ id: lesson.id, data: payload });
        toast.success(`Đã lưu trữ bài học`);
      };

      return (
        <div className="flex justify-end pr-2">
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

              <DropdownMenuItem
                onClick={handleToggleStatus}
                className="cursor-pointer hover:bg-white/10"
              >
                <IconStar className="mr-2 h-4 w-4" />
                {currentStatus === "Published"
                  ? "Gỡ bài (Draft)"
                  : "Đăng bài (Publish)"}
              </DropdownMenuItem>

              {currentStatus !== "Archived" && (
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

          <LessonDetailDialog
            open={openDetail}
            onOpenChange={setOpenDetail}
            lesson={lesson}
          />
        </div>
      );
    },
  },
];
