"use client";

import { Activity, BookOpen } from "lucide-react";
import DataTable from "@/components/admin/dashboard/data-table";

interface LessonTableWrapperProps {
  data: any[]; // Bạn có thể thay 'any' bằng type cụ thể của Lesson nếu có
}

export function LessonTableWrapper({ data }: LessonTableWrapperProps) {
  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-[#18181b] mx-2 shadow-xl overflow-hidden relative transition-all hover:shadow-2xl hover:shadow-purple-500/5">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20">
            <BookOpen className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h2 className="font-black text-xl italic uppercase text-white leading-none">
              Lessons Database
            </h2>
            <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1.5">
              Hiển thị {data.length} kết quả phù hợp
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase italic animate-pulse">
          <Activity className="h-3 w-3" /> System Live
        </div>
      </div>

      <div className="relative z-10">
        <DataTable data={data} />
      </div>
    </div>
  );
}
