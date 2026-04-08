"use client";

import { LessonDto } from "@/types/lesson.type";
import {
  Clock,
  BarChart,
  Video,
  CalendarDays,
  CheckCircle,
  Activity,
  FileText,
  Tags,
  Layers,
  Link as LinkIcon,
  XCircle,
  Crown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface LessonOverviewTabProps {
  lesson: LessonDto;
}

const formatDuration = (seconds: number) => {
  if (!seconds) return "0 phút 0 giây";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m} phút ${s} giây`;
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "Chưa xác định";
  try {
    return format(new Date(dateString), "dd MMMM, yyyy - HH:mm", {
      locale: vi,
    });
  } catch {
    return dateString;
  }
};

export function LessonOverviewTab({ lesson }: LessonOverviewTabProps) {
  let displayTags: string[] = [];
  if (lesson.tags) {
    try {
      const parsed = JSON.parse(lesson.tags);
      displayTags = Array.isArray(parsed) ? parsed : lesson.tags.split(",");
    } catch {
      displayTags = lesson.tags.split(",");
    }
  }

  return (
    <div className="space-y-6 font-mono transition-colors duration-300">
      {/* HÀNG 1: CHỈ SỐ STATS CHÍNH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Clock,
            color: "text-orange-500",
            label: "Thời lượng",
            value: formatDuration(lesson.durationSeconds),
            sub: `(${lesson.durationSeconds} giây)`,
          },
          {
            icon: BarChart,
            color: "text-blue-500",
            label: "Lượt hoàn thành",
            value: lesson.completionsCount.toLocaleString("vi-VN"),
            sub: "Học viên đã học",
          },
          {
            icon: Activity,
            color: "text-emerald-500",
            label: "Điểm trung bình",
            value: `${lesson.avgScore.toFixed(1)} / 100`,
            sub: "Hệ thống đánh giá",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
              <stat.icon className={cn("w-4 h-4", stat.color)} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 dark:text-white leading-none">
                {stat.value}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1 uppercase">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}

        <div className="p-5 rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
            <Crown className="w-4 h-4 text-purple-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Gói nội dung
            </span>
          </div>
          <div>
            {lesson.isPremiumOnly ? (
              <Badge className="bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-none font-black px-3 py-1 text-[10px] uppercase tracking-widest">
                Premium
              </Badge>
            ) : (
              <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-none font-black px-3 py-1 text-[10px] uppercase tracking-widest">
                Free
              </Badge>
            )}
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-2 uppercase tracking-tight">
              Quyền truy cập
            </p>
          </div>
        </div>
      </div>

      {/* HÀNG 2: THÔNG TIN PHÂN LOẠI & MEDIA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Khối Phân Loại */}
        <div className="p-6 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-900/30 space-y-5">
          <div className="flex items-center gap-2 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/5 pb-3">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-black uppercase tracking-widest">
              Phân loại & Nội dung
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {[
              { label: "Tiêu đề", value: lesson.title, isBold: true },
              {
                label: "Loại bài học",
                value: lesson.lessonType,
                isBadge: true,
              },
              { label: "Cấp độ", value: lesson.level, isBadge: true },
              {
                label: "Danh mục",
                value: lesson.category || "Chưa phân loại",
                isBox: true,
              },
              { label: "Thứ tự", value: lesson.displayOrder, isMono: true },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-bold">
                  {item.label}:
                </span>
                {item.isBadge ? (
                  <Badge
                    variant="outline"
                    className="bg-white dark:bg-zinc-800 dark:border-white/10 dark:text-slate-200 font-black text-[9px] uppercase tracking-widest"
                  >
                    {item.value}
                  </Badge>
                ) : item.isBox ? (
                  <span className="font-black text-[10px] uppercase tracking-widest text-slate-800 dark:text-slate-200 bg-white dark:bg-zinc-800 px-2 py-1 rounded-md border border-slate-200 dark:border-white/10 shadow-sm">
                    {item.value}
                  </span>
                ) : item.isMono ? (
                  <span className="font-mono bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded text-[10px] font-black">
                    {item.value}
                  </span>
                ) : (
                  <span
                    className={cn(
                      "font-bold text-slate-900 dark:text-slate-100 truncate max-w-[60%]",
                      item.isBold && "font-black",
                    )}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}

            <div className="pt-2 border-t border-slate-200/60 dark:border-white/5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                <Tags className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Thẻ Tags:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {displayTags.length > 0 && displayTags[0] !== "" ? (
                  displayTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-black uppercase tracking-widest bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full border border-transparent dark:border-white/5"
                    >
                      {tag.trim()}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-slate-400 italic">
                    Không có thẻ nào
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Khối Media & Kỹ Thuật */}
        <div className="p-6 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-900/30 space-y-5">
          <div className="flex items-center gap-2 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/5 pb-3">
            <Video className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-black uppercase tracking-widest">
              Media & Kỹ thuật
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-bold">
                Loại Media chính:
              </span>
              <span className="font-black text-[10px] uppercase tracking-widest text-slate-800 dark:text-slate-200 bg-white dark:bg-zinc-800 px-2 py-1 rounded-md border border-slate-200 dark:border-white/10">
                {lesson.mediaType || "Chưa xác định"}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5" /> Media URL:
              </span>
              <a
                href={lesson.mediaUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 truncate text-[10px] bg-white dark:bg-zinc-800 p-2 rounded-xl border border-slate-200 dark:border-white/10 transition-colors font-bold uppercase tracking-tighter"
              >
                {lesson.mediaUrl || "Không có dữ liệu"}
              </a>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 dark:border-white/5">
              <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Dictation Templates:
              </span>
              <span>
                {lesson.hasDictationTemplates ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-100 dark:border-emerald-500/20 font-black text-[9px] uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3" /> Sẵn sàng
                  </span>
                ) : (
                  <span className="text-rose-500 dark:text-rose-400 flex items-center gap-1 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-lg border border-rose-100 dark:border-rose-500/20 font-black text-[9px] uppercase tracking-widest">
                    <XCircle className="w-3 h-3" /> Chưa tạo
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HÀNG 3: MÔ TẢ & THỜI GIAN LOG */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-3xl border border-slate-100 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest">
              Mô tả chi tiết
            </span>
          </div>
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-white/5 max-h-[150px] overflow-y-auto custom-scrollbar italic">
            {lesson.description || "Không có mô tả."}
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-900 dark:bg-zinc-950 text-white shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-slate-300 dark:text-slate-400 border-b border-slate-700 dark:border-white/10 pb-3">
            <CalendarDays className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-black uppercase tracking-widest">
              Nhật ký hệ thống
            </span>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Ngày khởi tạo",
                value: formatDate(lesson.createdAt),
                color: "text-emerald-400",
              },
              {
                label: "Cập nhật lần cuối",
                value: formatDate(lesson.updatedAt),
                color: "text-blue-400",
              },
            ].map((log, i) => (
              <div key={i} className="space-y-1.5">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                  {log.label}:
                </span>
                <span
                  className={cn(
                    "font-mono block bg-black/40 p-2.5 rounded-xl border border-white/5 text-[10px] font-black",
                    log.color,
                  )}
                >
                  {log.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
