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
export const normalizeStatus = (status?: string | null) => {
  if (!status) return "draft";
  const s = status.toLowerCase();
  if (s === "published") return "published";
  if (s === "archived") return "archived";
  if (s === "review") return "review";
  return "draft";
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
  if (l === "3" || l === "expert") return "Expert";
  return "Beginner";
};

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
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <IconHash className="size-3 text-orange-500" />
        <span>Ưu tiên</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-mono text-[10px] font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 w-7 h-7 flex items-center justify-center rounded-lg">
        {row.getValue("displayOrder")}
      </div>
    ),
    enableSorting: true,
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
              "font-bold truncate max-w-[300px] text-slate-900 dark:text-slate-100",
              !lesson.title && "text-slate-400 italic",
            )}
          >
            {lesson.title || "Chưa có tiêu đề"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-black">
              {lesson.category || "Chưa phân loại"}
            </span>
            {lesson.isPremiumOnly && (
              <IconCrown className="size-3 text-amber-500 shadow-sm" />
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
            <IconVideo className="size-4 text-blue-500 dark:text-blue-400" />
          ) : (
            <IconHeadphones className="size-4 text-purple-500 dark:text-purple-400" />
          )}
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-0.5 text-[9px] font-black uppercase transition-colors",
              type === "Dictation"
                ? "border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/10"
                : "border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-500/10",
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
          "text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10",
        Advanced:
          "text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10",
        Intermediate:
          "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10",
        Beginner:
          "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10",
      };

      return (
        <Badge
          variant="secondary"
          className={cn(
            "border transition-all duration-300 font-black px-2.5 py-0.5 rounded-full uppercase text-[9px] tracking-widest whitespace-nowrap",
            colors[level] ||
              "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-white/5",
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
      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-bold font-mono">
        <IconClock className="size-3.5" />
        <span className="text-[11px]">
          {formatDuration(row.original.durationSeconds || 0)}
        </span>
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
          icon: (
            <IconCircleCheckFilled className="size-4 text-emerald-500 dark:text-emerald-400" />
          ),
          color: "text-emerald-600 dark:text-emerald-400",
          label: "Published",
        },
        draft: {
          icon: (
            <div className="size-2 rounded-full bg-slate-400 dark:bg-slate-600 mx-1" />
          ),
          color: "text-slate-500 dark:text-slate-500",
          label: "Draft",
        },
        archived: {
          icon: (
            <IconArchive className="size-4 text-slate-400 dark:text-slate-600" />
          ),
          color: "text-slate-400 dark:text-slate-600 italic line-through",
          label: "Archived",
        },
        review: {
          icon: (
            <IconAlertCircle className="size-4 text-amber-500 dark:text-amber-400" />
          ),
          color: "text-amber-600 dark:text-amber-400",
          label: "Review",
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
