"use client";

import { LayoutGrid } from "lucide-react";

export function LessonHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500 mb-2">
          <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-widest text-[10px]">
            Quản lý khóa học
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight text-slate-900 dark:text-white tracking-tight">
          Kho bài học{" "}
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            hệ thống
          </span>
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-lg mt-2 leading-relaxed">
          Quản lý và biên tập nội dung luyện nghe, shadowing của hệ thống.
        </p>
      </div>
    </div>
  );
}
