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
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 px-4 md:px-8 font-mono text-zinc-100 relative">
      {/* Background Glow Effect - Local Scope for Dashboard */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Hệ thống quản trị
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
              Analytics <span className="text-zinc-600">Center</span>
            </h1>
            <p className="text-zinc-400 text-xs font-medium max-w-md leading-relaxed">
              Giám sát thời gian thực hoạt động luyện nghe và nói của học viên
              toàn hệ thống.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-11 px-6 font-bold border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
            >
              <Download className="mr-2 h-4 w-4" /> CSV
            </Button>
            <Button className="h-11 px-6 bg-white text-black hover:bg-zinc-200 font-bold rounded-2xl shadow-lg shadow-white/10 transition-all active:scale-95">
              <Plus className="mr-2 h-4 w-4" /> Bài học mới
            </Button>
          </div>
        </div>

        <SectionCards />

        {/* Main Grid Section */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Chart Container */}
          <div className="lg:col-span-8 group rounded-[2.5rem] border border-white/10 bg-[#18181b] p-8 shadow-2xl relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h2 className="font-black text-xl italic uppercase text-white">
                    Hoạt động tuần này
                  </h2>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-0.5">
                    Xu hướng Dictation vs Shadowing
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[400px] w-full relative z-10">
              <ChartAreaInteractive />
            </div>
          </div>

          {/* AI Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-[#18181b] to-black p-8 text-white shadow-2xl relative overflow-hidden group border border-white/10">
              {/* Neon effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Sparkles className="absolute -top-4 -right-4 h-32 w-32 text-orange-500/10 group-hover:text-orange-500/20 group-hover:scale-125 transition-all duration-700" />

              <div className="relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  AI Feedback Engine
                </h3>

                <div className="space-y-8">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-tight text-zinc-400">
                      Engine: <span className="text-white">Whisper v3</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg font-black italic uppercase">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />{" "}
                      Active
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-7xl font-black italic tracking-tighter text-white leading-none">
                      94.8%
                    </div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">
                      Độ chính xác trung bình
                    </div>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-600">
                      <span>Storage Usage</span>
                      <span>2TB / 5TB</span>
                    </div>
                    <div className="h-2 w-full bg-black rounded-full overflow-hidden p-[1px] border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                        style={{ width: "65%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-[#18181b] p-8 flex flex-col items-center text-center shadow-xl group hover:border-white/20 transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

              <div className="h-16 w-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:bg-blue-500/20">
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
                Học viên Online
              </h4>
              <p className="text-6xl font-black text-white italic tracking-tighter leading-none">
                42
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10">
                Realtime sync active
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-[2.5rem] border border-white/10 bg-[#18181b] shadow-xl overflow-hidden transition-all hover:shadow-2xl relative">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

          <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                <FileText className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h2 className="font-black text-xl italic uppercase text-white">
                  Bài nộp gần đây
                </h2>
                <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-0.5">
                  Cập nhật theo giây
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-colors rounded-xl h-10"
            >
              Xem báo cáo chi tiết
            </Button>
          </div>
          <div className="relative z-10">
            <DataTable data={submissionsData} />
          </div>
        </div>
      </div>
    </div>
  );
}
