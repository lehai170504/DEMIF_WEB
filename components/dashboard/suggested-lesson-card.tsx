"use client";

import { BookOpen, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SuggestedLessonCardProps {
  lesson: any;
}

export function SuggestedLessonCard({ lesson }: SuggestedLessonCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dictation/${lesson.id}`)}
      className="flex items-center gap-4 p-3.5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.05] hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      {/* Thumbnail với nút Play 3D */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-[#111113] border border-gray-200 dark:border-white/5 shadow-inner">
        {lesson.thumbnailUrl ? (
          <img
            src={lesson.thumbnailUrl}
            alt={lesson.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]">
            <BookOpen className="w-6 h-6 text-gray-400 dark:text-zinc-600" />
          </div>
        )}

        {/* Nút Play mờ ảo */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_15px_rgba(249,115,22,0.6)]">
            <PlayCircle className="w-5 h-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Thông tin bài học */}
      <div className="flex-1 min-w-0 text-left py-1">
        <p className="text-xs font-black text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-orange-500 transition-colors">
          {lesson.title || "Chưa có tiêu đề"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[9px] font-black text-[#FF7A00] bg-orange-500/10 px-2 py-0.5 rounded-md uppercase tracking-widest border border-orange-500/20">
            {lesson.source ?? "DEMIF"}
          </span>
          {lesson.viewCount != null && (
            <span className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
              • {lesson.viewCount.toLocaleString("vi-VN")} Lượt học
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
