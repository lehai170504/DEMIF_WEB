"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Target,
  Medal,
  Calendar,
  LayoutGrid,
  Download,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const summary = {
  totalUsers: 532,
  totalLessons: 2410,
  avgScore: 87.2,
  feedbackCount: 54,
};

const performanceData = [
  { month: "T1", score: 75 },
  { month: "T2", score: 82 },
  { month: "T3", score: 78 },
  { month: "T4", score: 85 },
  { month: "T5", score: 92 },
  { month: "T6", score: 88 },
];

const topStudents = [
  { name: "pro_listener", score: 95.1, lessons: 580 },
  { name: "student_vip", score: 88.9, lessons: 350 },
  { name: "newbie_user", score: 72.4, lessons: 120 },
];

export default function AdminStatsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-10 px-4 md:px-8 font-mono">
      {/* 1. Header & Actions */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500 mb-1">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Báo cáo thống kê
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
            Hệ thống{" "}
            <span className="text-slate-300 dark:text-slate-700">Insights</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="h-10 px-4 rounded-xl border-slate-200 font-bold bg-white dark:bg-slate-900"
          >
            <Calendar className="mr-2 h-4 w-4 text-orange-500" /> 25/12/2025
          </Badge>
          <Button className="h-10 px-6 bg-slate-900 dark:bg-orange-500 hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95">
            <Download className="mr-2 h-4 w-4" /> Xuất Báo cáo
          </Button>
        </div>
      </header>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Người dùng",
            val: summary.totalUsers,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            label: "Bài học",
            val: summary.totalLessons,
            icon: BookOpen,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
          },
          {
            label: "Điểm trung bình",
            val: `${summary.avgScore}%`,
            icon: Target,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Feedback",
            val: summary.feedbackCount,
            icon: MessageSquare,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="border border-slate-100 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  {item.label}
                </p>
                <div className="text-3xl font-black tracking-tighter italic">
                  {item.val}
                </div>
              </div>
              <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Main Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Large Chart Area (Col 8) */}
        <Card className="lg:col-span-8 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black italic uppercase flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Đường cong hiệu suất
              </CardTitle>
              <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-1">
                Hệ thống đang tăng trưởng +12.4%
              </p>
            </div>
            {/* Quick Online Widget Integrated */}
            <div className="hidden sm:flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-tight">
                128 Hoạt động ngay bây giờ
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
                  />
                  <Tooltip
                    cursor={{ stroke: "#f97316", strokeWidth: 2 }}
                    contentStyle={{
                      borderRadius: "15px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#f97316"
                    strokeWidth={4}
                    fill="url(#chartGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Ranking (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-slate-900 text-white p-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-32 w-32 bg-orange-500 opacity-20 blur-[60px]" />
            <CardHeader className="p-7 pb-4 relative">
              <div className="flex items-center gap-2 text-orange-400 mb-1">
                <Medal className="h-4 w-4" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                  Bảng xếp hạng
                </span>
              </div>
              <CardTitle className="text-lg font-black italic uppercase">
                Bảng Vàng
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-3 relative">
              {topStudents.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xl font-black italic ${
                        i === 0 ? "text-orange-500" : "text-slate-600"
                      }`}
                    >
                      #0{i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-sm leading-tight">
                        {s.name}
                      </p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">
                        {s.lessons} Bài học
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-black italic ${
                      i === 0 ? "text-orange-500" : "text-white"
                    }`}
                  >
                    {s.score}%
                  </div>
                </div>
              ))}
              <Button className="w-full mt-2 h-12 rounded-2xl bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
                Xem toàn bộ
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats Widget */}
          <div className="bg-orange-500 rounded-[2.5rem] p-8 text-white shadow-lg shadow-orange-500/20 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
                Trạng thái đồng bộ
              </p>
              <p className="text-2xl font-black italic tracking-tighter uppercase">
                Trực tuyến
              </p>
            </div>
            <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Activity className="h-6 w-6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
