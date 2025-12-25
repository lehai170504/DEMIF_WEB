"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Trophy,
  BookOpen,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Target,
  Medal,
  Calendar,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const summary = {
  totalUsers: 532,
  totalLessons: 2410,
  avgScore: 87.2,
  feedbackCount: 54,
};

const performanceData = [
  { month: "Th1", score: 75, accuracy: 70 },
  { month: "Th2", score: 80, accuracy: 78 },
  { month: "Th3", score: 85, accuracy: 82 },
  { month: "Th4", score: 83, accuracy: 80 },
  { month: "Th5", score: 90, accuracy: 88 },
  { month: "Th6", score: 88, accuracy: 92 },
];

const topStudents = [
  { name: "pro_listener", score: 95.1, lessons: 580, rank: 1 },
  { name: "student_vip", score: 88.9, lessons: 350, rank: 2 },
  { name: "newbie_user", score: 72.4, lessons: 120, rank: 3 },
];

export default function AdminStatsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 font-mono">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-3">
            System <span className="text-orange-500">Statistics</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium italic">
            Phân tích dữ liệu học tập chuyên sâu trên toàn hệ thống.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit h-8 px-4 rounded-full border-orange-200 text-orange-600 bg-orange-50 font-bold"
        >
          <Calendar className="mr-2 h-3 w-3" /> Cập nhật: 25/12/2025
        </Badge>
      </div>

      {/* Grid 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {[
          {
            label: "Tổng học viên",
            val: summary.totalUsers,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Hoàn thành",
            val: summary.totalLessons,
            icon: BookOpen,
            color: "text-orange-500",
            bg: "bg-orange-50",
          },
          {
            label: "Điểm trung bình",
            val: `${summary.avgScore}%`,
            icon: Target,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
          },
          {
            label: "Feedback",
            val: summary.feedbackCount,
            icon: MessageSquare,
            color: "text-purple-500",
            bg: "bg-purple-50",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="border-none shadow-sm rounded-[2rem] bg-white dark:bg-slate-900 transition-transform hover:scale-[1.02]"
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {item.label}
              </CardTitle>
              <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black tracking-tighter italic">
                {item.val}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Top Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        {/* Biểu đồ hiệu suất */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-slate-900 p-6">
          <CardHeader className="px-2">
            <div className="flex items-center gap-2 mb-2 text-emerald-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Growth Analytics
              </span>
            </div>
            <CardTitle className="text-xl font-black italic uppercase">
              Hiệu suất trung bình
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
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
                    tick={{ fontSize: 12, fontWeight: "bold" }}
                    dy={10}
                  />
                  <YAxis hide domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      fontFamily: "monospace",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#f97316"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorScore)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Học Viên Bảng Vàng */}
        <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-900 text-white p-6 relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] h-40 w-40 bg-orange-500 opacity-20 blur-[80px]" />
          <CardHeader className="relative px-0">
            <div className="flex items-center gap-2 mb-2 text-orange-400">
              <Medal className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Top Performers
              </span>
            </div>
            <CardTitle className="text-xl font-black italic uppercase">
              Bảng Vàng Học Viên
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 relative">
            <div className="space-y-4 mt-4">
              {topStudents.map((s, i) => (
                <div
                  key={i}
                  className="group flex justify-between items-center p-4 rounded-3xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-2xl flex items-center justify-center font-black text-lg ${
                        i === 0
                          ? "bg-orange-500 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-sm tracking-tight">
                        {s.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                        {s.lessons} Lessons
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-black italic ${
                        i === 0 ? "text-orange-500" : "text-white"
                      }`}
                    >
                      {s.score}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-4 rounded-2xl bg-white text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
              Xem bảng xếp hạng đầy đủ
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
