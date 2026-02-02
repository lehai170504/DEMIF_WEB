"use client";

import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Activity,
  Calendar,
  BarChart as BarIcon,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  AreaChart,
  Area,
} from "recharts";

// ... (Giữ nguyên weeklyData và monthlyProgress)
const weeklyData = [
  { day: "T2", lessons: 3, accuracy: 75, minutes: 25 },
  { day: "T3", lessons: 5, accuracy: 82, minutes: 40 },
  { day: "T4", lessons: 2, accuracy: 68, minutes: 15 },
  { day: "T5", lessons: 4, accuracy: 88, minutes: 35 },
  { day: "T6", lessons: 6, accuracy: 91, minutes: 50 },
  { day: "T7", lessons: 3, accuracy: 85, minutes: 28 },
  { day: "CN", lessons: 4, accuracy: 89, minutes: 42 },
];

const monthlyProgress = [
  { month: "JAN", completed: 45, accuracy: 78 },
  { month: "FEB", completed: 52, accuracy: 81 },
  { month: "MAR", completed: 48, accuracy: 79 },
  { month: "APR", completed: 65, accuracy: 85 },
  { month: "MAY", completed: 72, accuracy: 88 },
  { month: "JUN", completed: 68, accuracy: 86 },
];

export function LearningAnalyticsChart() {
  return (
    <div className="grid grid-cols-1 gap-6 font-mono">
      {/* 1. Biểu đồ Tuần - Bar Chart */}
      <Card className="p-8 border border-white/10 bg-[#18181b] shadow-2xl rounded-[2.5rem] relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 border border-orange-400/20">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tighter italic text-white">
                TIẾN ĐỘ TUẦN
              </h3>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                Hoạt động 7 ngày gần nhất
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]" />{" "}
              Bài học
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-700" /> Phút học
            </div>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyData}
              margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#52525b" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#52525b" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.02)", radius: 8 }}
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                  fontSize: "11px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  color: "#e4e4e7",
                }}
              />
              <Bar
                dataKey="lessons"
                fill="#f97316"
                radius={[4, 4, 4, 4]}
                barSize={12}
              />
              <Bar
                dataKey="minutes"
                fill="#3f3f46"
                radius={[4, 4, 4, 4]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 2. Biểu đồ Tháng - Area Chart */}
      <Card className="p-8 border border-white/10 bg-black shadow-2xl rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <Activity className="w-32 h-32 text-white" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20 border border-emerald-400/20">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tighter italic text-white">
                ĐỘ CHÍNH XÁC
              </h3>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                Phân tích hiệu suất theo tháng
              </p>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyProgress}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorAccuracy"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: "bold", fill: "#52525b" }}
                  dy={10}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "11px",
                    color: "white",
                    fontFamily: "monospace",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAccuracy)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#f97316"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="none"
                  opacity={0.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
