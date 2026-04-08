"use client";

import { Users2 } from "lucide-react";

export function UserHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8 px-2 font-mono transition-colors duration-300">
      <div className="space-y-2">
        {/* Label phụ (Eyebrow) */}
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500 mb-3">
          <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 shadow-sm">
            <Users2 className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">
            Hệ thống quản trị
          </span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-3xl md:text-4xl font-black leading-tight text-slate-900 dark:text-white uppercase tracking-tighter">
          Cộng đồng{" "}
          <span className="text-slate-400 dark:text-zinc-500 font-medium">
            Demif
          </span>
        </h1>

        {/* Mô tả */}
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-lg mt-4 border-l-4 border-orange-500 pl-4 leading-relaxed">
          Nơi quản lý tập trung toàn bộ hồ sơ, tiến độ và quyền hạn truy cập của
          cộng đồng học viên hệ thống.
        </p>
      </div>
    </div>
  );
}
