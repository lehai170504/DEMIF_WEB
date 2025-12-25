"use client";

import {
  TrendingUp,
  Sparkles,
  Activity,
  FileText,
  Download,
  LayoutGrid,
  Plus,
} from "lucide-react";
import SectionCards from "@/components/admin/dashboard/section-cards";
import ChartAreaInteractive from "@/components/admin/dashboard/chart-area-interactive";
import DataTable from "@/components/admin/dashboard/DataTable";
import { Button } from "@/components/ui/button";

// Dữ liệu mẫu (Thực tế sẽ fetch từ API)
const submissionsData = [
  {
    id: "1",
    user: "Lê Hoàng Hải",
    lesson: "IELTS Listening Part 1",
    type: "Dictation",
    score: 98,
    status: "Vừa xong",
  },
  {
    id: "2",
    user: "Nguyễn Minh",
    lesson: "Business Meeting Skills",
    type: "Shadowing",
    score: 85,
    status: "2 phút trước",
  },
  {
    id: "3",
    user: "Trần An",
    lesson: "Daily Conversation #4",
    type: "Dictation",
    score: 72,
    status: "5 phút trước",
  },
  {
    id: "4",
    user: "Phạm Bình",
    lesson: "Shadowing với Steve Jobs",
    type: "Shadowing",
    score: 92,
    status: "10 phút trước",
  },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 px-4 md:px-8 font-mono">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Hệ thống quản trị
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
            Analytics{" "}
            <span className="text-slate-300 dark:text-slate-700">Center</span>
          </h1>
          <p className="text-muted-foreground text-xs font-medium max-w-md">
            Giám sát thời gian thực hoạt động luyện nghe và nói của học viên
            toàn hệ thống.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-11 px-6 font-bold border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 transition-all"
          >
            <Download className="mr-2 h-4 w-4" /> CSV
          </Button>
          <Button className="h-11 px-6 bg-slate-900 dark:bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-95">
            <Plus className="mr-2 h-4 w-4" /> Bài học mới
          </Button>
        </div>
      </div>

      <SectionCards />

      {/* Main Grid Section */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Chart Container */}
        <div className="lg:col-span-8 group rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-2xl">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-black text-xl italic uppercase">
                  Hoạt động tuần này
                </h2>
                <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-0.5">
                  Xu hướng Dictation vs Shadowing
                </p>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ChartAreaInteractive />
          </div>
        </div>

        {/* AI Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-2xl relative overflow-hidden group border border-white/5">
            <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10 group-hover:scale-125 transition-transform duration-700" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400 mb-6">
              AI Feedback Engine
            </h3>

            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-tight opacity-70">
                  Engine: Whisper v3
                </span>
                <span className="flex items-center gap-1.5 text-[9px] bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg font-black italic uppercase">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />{" "}
                  Active
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-6xl font-black italic tracking-tighter">
                  94.8%
                </div>
                <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">
                  Độ chính xác trung bình
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-40">
                  Audio Storage (2TB)
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col items-center text-center shadow-sm">
            <div className="h-16 w-16 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 transition-transform hover:scale-110">
              <Activity className="h-8 w-8 text-slate-400" />
            </div>
            <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Học viên Online
            </h4>
            <p className="text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter">
              42
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
              Realtime sync active
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
        <div className="p-8 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-2xl">
              <FileText className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h2 className="font-black text-xl italic uppercase">
                Bài nộp gần đây
              </h2>
              <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-0.5">
                Cập nhật theo giây
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors"
          >
            Xem báo cáo chi tiết
          </Button>
        </div>
        <DataTable data={submissionsData} />
      </div>
    </div>
  );
}
