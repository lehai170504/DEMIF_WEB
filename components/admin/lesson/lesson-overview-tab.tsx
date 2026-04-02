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

interface LessonOverviewTabProps {
  lesson: LessonDto;
}

// Hàm format thời gian (Giây -> Phút:Giây)
const formatDuration = (seconds: number) => {
  if (!seconds) return "0 phút 0 giây";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m} phút ${s} giây`;
};

// Hàm định dạng ngày tháng tiếng Việt
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
  // Xử lý Tags hiển thị
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
    <div className="space-y-6 font-mono">
      {/* HÀNG 1: CHỈ SỐ STATS CHÍNH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-3">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Thời lượng
            </span>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">
              {formatDuration(lesson.durationSeconds)}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              ({lesson.durationSeconds} giây)
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-3">
            <BarChart className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Lượt hoàn thành
            </span>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">
              {lesson.completionsCount.toLocaleString("vi-VN")}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              Học viên đã học
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-3">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Điểm trung bình
            </span>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">
              {lesson.avgScore.toFixed(1)}{" "}
              <span className="text-sm text-slate-400">/ 100</span>
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              Hệ thống đánh giá
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-3">
            <Crown className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Gói nội dung
            </span>
          </div>
          <div>
            {lesson.isPremiumOnly ? (
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none font-bold px-3 py-1 text-sm">
                Premium
              </Badge>
            ) : (
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none font-bold px-3 py-1 text-sm">
                Miễn phí (Basic)
              </Badge>
            )}
            <p className="text-[10px] text-slate-400 font-medium mt-1.5">
              Quyền truy cập
            </p>
          </div>
        </div>
      </div>

      {/* HÀNG 2: THÔNG TIN PHÂN LOẠI & MEDIA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Khối Phân Loại */}
        <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-5">
          <div className="flex items-center gap-2 text-slate-800 border-b border-slate-200 pb-3">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Phân loại & Nội dung
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Tiêu đề:</span>
              <span
                className="font-bold text-slate-900 text-right max-w-[60%] truncate"
                title={lesson.title}
              >
                {lesson.title}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Loại bài học:</span>
              <Badge variant="outline" className="bg-white">
                {lesson.lessonType}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Cấp độ:</span>
              <Badge variant="outline" className="bg-white">
                {lesson.level}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Danh mục:</span>
              <span className="font-bold text-slate-800 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                {lesson.category || "Chưa phân loại"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">
                Thứ tự hiển thị:
              </span>
              <span className="font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-xs font-bold">
                {lesson.displayOrder}
              </span>
            </div>

            {/* Tags hiển thị dạng viên thuốc */}
            <div className="pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Tags className="w-3.5 h-3.5" />{" "}
                <span className="text-xs font-medium">Thẻ Tags:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {displayTags.length > 0 && displayTags[0] !== "" ? (
                  displayTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-1 rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Không có thẻ nào
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Khối Media & Kỹ Thuật */}
        <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-5">
          <div className="flex items-center gap-2 text-slate-800 border-b border-slate-200 pb-3">
            <Video className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Media & Kỹ thuật
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">
                Loại Media chính:
              </span>
              <span className="font-bold text-slate-800 uppercase bg-white px-2 py-1 rounded-md border border-slate-200">
                {lesson.mediaType || "Chưa xác định"}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5" /> Media URL:
              </span>
              <a
                href={lesson.mediaUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 truncate text-xs bg-white p-2 rounded-lg border border-slate-200 transition-colors"
              >
                {lesson.mediaUrl || "Không có dữ liệu"}
              </a>
            </div>

            {(lesson.audioUrl || lesson.videoId || lesson.embedUrl) && (
              <div className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                {lesson.audioUrl && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Audio:</span>
                    <span className="font-mono text-slate-600 truncate max-w-[200px]">
                      {lesson.audioUrl}
                    </span>
                  </div>
                )}
                {lesson.videoId && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Youtube ID:</span>
                    <span className="font-mono text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                      {lesson.videoId}
                    </span>
                  </div>
                )}
                {lesson.embedUrl && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Embed URL:</span>
                    <span className="font-mono text-slate-600 truncate max-w-[150px]">
                      {lesson.embedUrl}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Dictation Templates:
              </span>
              <span className="font-bold">
                {lesson.hasDictationTemplates ? (
                  <span className="text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                    <CheckCircle className="w-3.5 h-3.5" /> Sẵn sàng
                  </span>
                ) : (
                  <span className="text-rose-500 flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                    <XCircle className="w-3.5 h-3.5" /> Chưa tạo
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HÀNG 3: MÔ TẢ & THỜI GIAN LOG */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Khối Mô Tả (Chiếm 2 cột) */}
        <div className="md:col-span-2 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Mô tả chi tiết
            </span>
          </div>
          <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-[150px] overflow-y-auto custom-scrollbar">
            {lesson.description || (
              <span className="italic text-slate-400">Không có mô tả.</span>
            )}
          </div>
        </div>

        {/* Khối Hệ thống Tracking (Chiếm 1 cột) */}
        <div className="p-6 rounded-2xl border border-slate-100 bg-slate-900 text-white shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-slate-300 border-b border-slate-700 pb-3">
            <CalendarDays className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Nhật ký hệ thống
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-medium block">
                Ngày khởi tạo:
              </span>
              <span className="font-mono text-emerald-400 font-bold block bg-black/30 p-2 rounded-lg border border-white/5">
                {formatDate(lesson.createdAt)}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-medium block">
                Cập nhật lần cuối:
              </span>
              <span className="font-mono text-blue-400 font-bold block bg-black/30 p-2 rounded-lg border border-white/5">
                {formatDate(lesson.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
