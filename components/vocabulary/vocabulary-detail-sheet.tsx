"use client";

import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  BookText,
  CalendarDays,
  Clock,
  CheckCircle2,
  Tag,
  History,
  Info,
  NotebookPen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VocabularyDetailSheetProps {
  item: any;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Chưa có";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function VocabularyDetailSheet({ item }: VocabularyDetailSheetProps) {
  return (
    <SheetContent
      onClick={(e) => e.stopPropagation()}
      className="bg-white dark:bg-[#080808] border-l border-white/5 font-mono sm:max-w-[540px] w-full overflow-y-auto no-scrollbar p-0" // Reset padding mặc định của SheetContent để tự custom
    >
      {/* Header với Padding riêng */}
      <SheetHeader className="p-8 pb-0 text-left">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500 shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <SheetTitle className="text-3xl font-black uppercase tracking-tighter dark:text-white leading-none">
              Thông số <span className="text-orange-500">Định danh</span>
            </SheetTitle>
            {/* Đã bỏ ID ở đây */}
          </div>
        </div>
      </SheetHeader>

      {/* Nội dung chính với Padding px-8 để không sát viền */}
      <div className="p-8 space-y-10">
        {/* Section 1: Thông tin từ vựng chính */}
        <div className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 space-y-4 shadow-sm">
          <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter break-words">
            {item.word}
          </h2>
          <p className="text-xl font-bold text-orange-500">{item.meaning}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge
              variant="outline"
              className="rounded-lg px-3 py-1 uppercase text-[9px] font-black border-orange-500/20 bg-orange-500/5 text-orange-500"
            >
              <Tag className="w-3 h-3 mr-1.5" /> {item.topic}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-lg px-3 py-1 uppercase text-[9px] font-black border-white/10 dark:text-zinc-400"
            >
              {item.lessonCategory || "Chưa phân loại"}
            </Badge>
          </div>
        </div>

        {/* Section 2: Ngữ cảnh & Ghi chú */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-zinc-500 pl-1">
            <NotebookPen className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Ngữ cảnh & Ghi chú
            </span>
          </div>
          <div className="grid gap-4">
            <div className="p-6 rounded-[1.8rem] bg-blue-500/[0.03] border border-blue-500/10 space-y-3">
              <span className="text-[8px] font-black uppercase text-blue-500 tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                Câu ví dụ
              </span>
              <p className="text-[15px] text-zinc-500 dark:text-zinc-400 italic leading-relaxed">
                "{item.contextSentence || "Chưa cập nhật ví dụ cho từ này..."}"
              </p>
            </div>

            {item.note && (
              <div className="p-6 rounded-[1.8rem] bg-emerald-500/[0.03] border border-emerald-500/10 space-y-3">
                <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">
                  Ghi chú cá nhân
                </span>
                <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {item.note}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Nguồn gốc */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-500 pl-1">
            <BookText className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Nguồn học thuật
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-snug font-bold uppercase">
              {item.lessonTitle || "Bài học tự do"}
            </p>
          </div>
        </div>

        {/* Section 4: Chỉ số ôn tập */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-zinc-500 pl-1">
            <History className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Dữ liệu hệ thống
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DetailStatCard
              icon={<History />}
              label="Lượt ôn tập"
              value={`${item.reviewCount} lần`}
            />
            <DetailStatCard
              icon={<CheckCircle2 />}
              label="Chính xác"
              value={`${item.correctReviews} lần`}
              color="emerald"
            />
            <DetailStatCard
              icon={<CalendarDays />}
              label="Ngày khởi tạo"
              value={formatDate(item.createdAt)}
            />
            <DetailStatCard
              icon={<Clock />}
              label="Lần cuối ôn"
              value={formatDate(item.lastReviewedAt)}
            />
          </div>
        </div>

        {/* Section 5: Lịch ôn kế tiếp */}
        <div className="p-8 rounded-[2.5rem] bg-orange-500 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 opacity-90">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Lịch ôn tập kế tiếp
              </span>
            </div>
            <p className="text-3xl font-black tracking-tight">
              {formatDate(item.nextReviewAt)}
            </p>
          </div>
          <Clock className="absolute -right-6 -bottom-6 w-40 h-40 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
        </div>
      </div>
    </SheetContent>
  );
}

function DetailStatCard({
  icon,
  label,
  value,
  color = "zinc",
}: {
  icon: any;
  label: string;
  value: string;
  color?: string;
}) {
  const colorMap: any = {
    emerald: "text-emerald-500 bg-emerald-500/10",
    zinc: "text-zinc-500 bg-gray-100 dark:bg-white/5",
  };

  return (
    <div className="p-5 rounded-[1.5rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 space-y-3">
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center mb-1",
          colorMap[color] || colorMap.zinc,
        )}
      >
        {React.cloneElement(icon, { className: "w-5 h-5" })}
      </div>
      <div className="space-y-1">
        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
          {label}
        </p>
        <p className="text-[12px] font-black dark:text-zinc-200 uppercase leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}
