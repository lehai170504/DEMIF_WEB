"use client";

import { LayoutGrid } from "lucide-react";

export function LessonHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-orange-600 mb-2">
          <div className="p-1.5 rounded-lg bg-orange-100 border border-orange-200">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Course Management
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-gray-900">
          Lesson <span className="text-gray-400">Repository</span>
        </h1>
        <p className="text-gray-500 text-xs font-medium italic max-w-lg mt-2">
          Quản lý và biên tập nội dung luyện nghe, shadowing hệ thống.
        </p>
      </div>
    </div>
  );
}
