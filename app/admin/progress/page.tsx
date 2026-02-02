"use client";

import { LayoutGrid } from "lucide-react";
import { StatsCards } from "@/components/admin/progress/stats-cards";
import { PerformanceTracker } from "@/components/admin/progress/performance-tracker";

export default function ProgressPage() {
  return (
    <div className="w-full space-y-8 pb-10 font-mono text-zinc-100">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FF7A00] mb-2">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Phân tích học tập
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-white">
            Tiến độ <span className="text-zinc-700">Học viên</span>
          </h1>
          <p className="text-zinc-500 text-xs font-medium italic">
            Phân tích chi tiết lộ trình và hiệu suất thực tế của học viên trên
            hệ thống.
          </p>
        </div>
      </header>

      {/* --- QUICK STATS SECTION --- */}
      <section aria-label="Thống kê nhanh">
        <StatsCards />
      </section>

      {/* --- TABLE SECTION --- */}
      <section aria-label="Bảng theo dõi hiệu suất chi tiết">
        <PerformanceTracker />
      </section>
    </div>
  );
}
