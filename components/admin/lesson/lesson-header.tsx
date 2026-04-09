"use client";

import { LayoutGrid } from "lucide-react";

export function LessonHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-[#FF7A00] pl-6 py-2 transition-all">
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-[#FF7A00] mb-2">
          <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.2em]">
            Quản trị đào tạo
          </span>
        </div>

        {/* Title chính */}
        <h1 className="text-3xl md:text-4xl font-black uppercase text-slate-900 dark:text-white leading-tight tracking-tighter">
          Kho bài học{" "}
          <span className="text-slate-400 font-medium text-2xl md:text-3xl lowercase">
            hệ thống
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-500 dark:text-zinc-400 text-sm font-medium mt-1 max-w-xl leading-relaxed">
          Quản lý và biên tập nội dung luyện nghe, shadowing của hệ thống Demif
          AI Mentor.
        </p>
      </div>
    </div>
  );
}
