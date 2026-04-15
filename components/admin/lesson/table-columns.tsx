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
  IconHash,
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

// --- HELPERS ---
export const normalizeStatus = (status?: string | null) =>
  status?.toLowerCase() || "draft";
export const normalizeType = (type?: string | number | null) =>
  String(type || "Dictation");
export const normalizeLevel = (level?: string | number | null) =>
  String(level || "Beginner");

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-slate-400 hover:text-slate-900 dark:hover:text-white size-7 hover:bg-slate-100 dark:hover:bg-white/10 cursor-grab active:cursor-grabbing transition-colors"
    >
      <IconGripVertical className="size-4" />
    </Button>
  );
}

// --- COLUMNS DEFINITION ---
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
          className="border-slate-300 dark:border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center pl-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="border-slate-300 dark:border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "displayOrder",
    header: "Ưu tiên",
    cell: ({ row }) => (
      <div className="font-mono text-[10px] font-black text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 w-7 h-7 flex items-center justify-center rounded-lg">
        {row.getValue("displayOrder") ?? 0}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Bài học",
    cell: ({ row }) => {
      const lesson = row.original;
      return (
        <div className="flex flex-col gap-1 min-w-[200px]">
          <span className="font-bold truncate max-w-[300px] text-slate-900 dark:text-slate-100">
            {lesson.title || "Chưa có tiêu đề"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-black">
              {lesson.category || "General"}
            </span>
            {lesson.isPremiumOnly && (
              <IconCrown className="size-3 text-amber-500" />
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
        row.original.mediaType?.toLowerCase() === "youtube" ||
        row.original.mediaType?.toLowerCase() === "video";

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
              "px-2 py-0.5 text-[9px] font-black uppercase",
              type === "Dictation"
                ? "border-blue-200 text-blue-600 bg-blue-50/50"
                : "border-purple-200 text-purple-600 bg-purple-50/50",
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
        Expert:
          "text-purple-600 border-purple-200 bg-purple-50 dark:bg-purple-500/10",
        Advanced:
          "text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-500/10",
        Intermediate:
          "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-500/10",
        Beginner:
          "text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10",
      };

      return (
        <Badge
          variant="secondary"
          className={cn(
            "border font-black px-2.5 py-0.5 rounded-full uppercase text-[9px] tracking-widest",
            colors[level] || "text-slate-600 bg-slate-50",
          )}
        >
          {level}
        </Badge>
      );
    },
  },
  {
    accessorKey: "durationSeconds",
    header: "Thời lượng",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-slate-500 font-bold font-mono text-[11px]">
        <IconClock className="size-3.5" />
        {formatDuration(row.original.durationSeconds || 0)}
      </div>
    ),
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
          icon: <div className="size-2 rounded-full bg-slate-400 mx-1" />,
          color: "text-slate-500",
          label: "Draft",
        },
        archived: {
          icon: <IconArchive className="size-4 text-slate-400" />,
          color: "text-slate-400 italic line-through",
          label: "Archived",
        },
      };
      const config = statusConfig[status] || statusConfig.draft;
      return (
        <div className="flex items-center gap-2">
          {config.icon}
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-widest",
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
                className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors"
              >
                <IconDotsVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl p-1.5"
            >
              <DropdownMenuItem
                onClick={() => router.push(`/admin/lessons/${lesson.id}`)}
                className="cursor-pointer py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wide focus:bg-slate-100 dark:focus:bg-white/5"
              >
                <IconEdit className="mr-2 h-4 w-4 text-slate-400" /> Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  updateStatus({
                    id: lesson.id,
                    status:
                      currentStatus === "published" ? "draft" : "published",
                  })
                }
                className="cursor-pointer py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wide focus:bg-slate-100 dark:focus:bg-white/5"
              >
                <IconStar
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentStatus !== "published"
                      ? "text-orange-500 fill-orange-500/20"
                      : "text-slate-400",
                  )}
                />
                {currentStatus === "published"
                  ? "Gỡ bài (Draft)"
                  : "Đăng bài (Publish)"}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5" />
              <DropdownMenuItem
                onClick={() =>
                  toast("Xác nhận xóa bài học này?", {
                    description: "Hành động này không thể hoàn tác.",
                    action: {
                      label: "Xóa ngay",
                      onClick: () => deleteLesson(lesson.id),
                    },
                  })
                }
                disabled={isDeleting}
                className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-500/10 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wide"
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
