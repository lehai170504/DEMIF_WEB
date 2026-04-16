import { cn } from "@/lib/utils";
import { PlayCircle, Activity } from "lucide-react";

interface LessonRowProps {
  lesson: any;
  index: number;
  type: "popular" | "difficult" | "recent";
}

export function LessonRow({ lesson, index, type }: LessonRowProps) {
  const isDifficult = type === "difficult";
  const isRecent = type === "recent";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#111111] hover:bg-white dark:hover:bg-zinc-800/80 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-zinc-800/80 flex items-center justify-center font-black text-slate-500 shrink-0 hidden sm:flex">
        {index}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">
            {lesson.title}
          </h3>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300">
            {lesson.level || "ALL"}
          </span>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-500/20 text-blue-600">
            {lesson.lessonType}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {!isRecent && (
            <>
              <span className="flex items-center gap-1">
                <PlayCircle className="w-3 h-3" /> {lesson.completionsCount}{" "}
                lượt
              </span>
              <span
                className={cn(
                  "flex items-center gap-1",
                  isDifficult ? "text-red-500" : "text-emerald-500",
                )}
              >
                <Activity className="w-3 h-3" /> TB:{" "}
                {lesson.avgScore?.toFixed(1)}
              </span>
            </>
          )}
          {lesson.category && (
            <span className="flex items-center gap-1 text-slate-400">
              #{lesson.category}
            </span>
          )}
          {isRecent && (
            <span className="flex items-center gap-1 text-orange-500">
              {new Date(lesson.createdAt).toLocaleDateString("vi-VN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#111111]">
      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-zinc-800/80 animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-zinc-800/80 rounded-full w-3/4 animate-pulse" />
        <div className="h-3 bg-slate-100 dark:bg-zinc-800/40 rounded-full w-1/3 animate-pulse" />
      </div>
    </div>
  );
}
