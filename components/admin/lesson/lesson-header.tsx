"use client";

import { LayoutGrid } from "lucide-react";

export function LessonHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-orange-600 mb-2">
          <div className="p-1.5 rounded-lg bg-orange-100 border border-orange-200">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Quản lý khóa học</span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900">
          Kho bài học{" "}
          <span className="text-slate-400 font-medium">hệ thống</span>
        </h1>

        {/* Mô tả */}
        <p className="text-slate-500 text-sm font-medium max-w-lg mt-2">
          Quản lý và biên tập nội dung luyện nghe, shadowing của hệ thống.
        </p>
      </div>
    </div>
  );
}
