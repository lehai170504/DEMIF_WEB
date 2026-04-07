"use client";

import {
  LayoutGrid,
  Download,
  Plus,
  Users,
  BookOpen,
  Headphones,
  Mic,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 px-4 md:px-8 font-mono relative">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-orange-400/5 dark:bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-blue-400/5 dark:bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10 pt-4">
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-[#FF7A00] pl-6 animate-in fade-in slide-in-from-left-8 duration-700 ease-out">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 dark:text-[#FF7A00] mb-2">
              <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">Hệ thống quản trị</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900 dark:text-white">
              Tổng quan{" "}
              <span className="text-slate-400 dark:text-zinc-500 font-medium">
                hệ thống
              </span>
            </h1>

            <p className="text-slate-500 dark:text-zinc-400 text-sm font-medium max-w-lg mt-2">
              Báo cáo tổng hợp số liệu hoạt động, tiến trình học tập và trạng
              thái máy chủ.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-12 px-6 font-bold border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all shadow-sm"
              disabled // Disable tạm chờ API
            >
              <Download className="mr-2 h-4 w-4" /> Báo cáo CSV
            </Button>
            <Button
              className="h-12 px-6 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-zinc-200 font-bold rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-white/10 transition-all active:scale-95"
              onClick={() => console.log("Navigate to create lesson")}
            >
              <Plus className="mr-2 h-4 w-4" /> Tạo bài học
            </Button>
          </div>
        </div>

        {/* ================= SUMMARY STATS CARDS ================= */}
        {/* Khu vực này để cắm API đếm tổng User, Bài học, v.v. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-both">
          <StatCardSkeleton icon={Users} label="Tổng Học Viên" />
          <StatCardSkeleton icon={BookOpen} label="Tổng Bài Học" />
          <StatCardSkeleton icon={Headphones} label="Lượt Nghe (Dictation)" />
          <StatCardSkeleton icon={Mic} label="Lượt Nói (Shadowing)" />
        </div>

        {/* ================= MAIN DASHBOARD GRID ================= */}
        <div className="grid gap-8 lg:grid-cols-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          {/* CỘT TRÁI: Khu vực cắm BIỂU ĐỒ (Chart) */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 rounded-[3rem] p-8 shadow-sm flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 dark:bg-zinc-800 rounded-xl">
                  <Activity className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <h2 className="font-black text-xl uppercase text-slate-900 dark:text-white tracking-tight">
                    Lưu lượng hoạt động
                  </h2>
                  <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">
                    Đang chờ kết nối API
                  </p>
                </div>
              </div>
            </div>

            {/* Chỗ cắm Chart */}
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[2rem] bg-slate-50 dark:bg-zinc-900/50">
              <div className="w-16 h-16 bg-slate-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
                <Activity className="h-8 w-8 text-slate-400 dark:text-zinc-600" />
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                Khu vực hiển thị Biểu đồ
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: Khu vực cắm LIST/WIDGET (Ví dụ: Học viên mới, Bài học mới) */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 rounded-[3rem] p-8 shadow-sm flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-black text-lg uppercase text-slate-900 dark:text-white tracking-tight">
                Hoạt động gần đây
              </h2>
            </div>

            {/* Chỗ cắm List Data */}
            <div className="flex-1 flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-900/50"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-zinc-800 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded-full w-3/4 animate-pulse" />
                    <div className="h-2 bg-slate-100 dark:bg-zinc-800/50 rounded-full w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
              <Button
                variant="ghost"
                className="mt-auto w-full rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Xem tất cả <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component khung xương cho các thẻ thống kê chờ API
function StatCardSkeleton({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-slate-50 dark:bg-zinc-800 rounded-xl border border-slate-100 dark:border-white/5">
          <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
      {/* Giả lập con số đang load */}
      <div className="h-10 bg-slate-100 dark:bg-zinc-800 rounded-xl w-1/2 animate-pulse mt-2" />
    </div>
  );
}
