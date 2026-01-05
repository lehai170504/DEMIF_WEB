"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, Activity, Calendar } from "lucide-react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  AreaChart,
  Area,
} from "recharts";

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
      <Card className="p-8 border-none bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/20">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                TIẾN ĐỘ TUẦN
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Hoạt động 7 ngày gần nhất
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-500" /> Bài học
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-200" /> Phút học
            </div>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyData}
              margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  fontSize: "11px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              />
              <Bar
                dataKey="lessons"
                fill="#f97316"
                radius={[6, 6, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="minutes"
                fill="#e2e8f0"
                radius={[6, 6, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 2. Biểu đồ Tháng - Area Chart (Độ chính xác) */}
      <Card className="p-8 border-none bg-slate-900 shadow-2xl rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Activity className="w-24 h-24 text-orange-500" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tighter italic text-white">
                ĐỘ CHÍNH XÁC
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
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
                  stroke="#1e293b"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: "bold", fill: "#475569" }}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderRadius: "16px",
                    border: "1px solid #334155",
                    fontSize: "11px",
                    color: "white",
                    fontFamily: "monospace",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10b981"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorAccuracy)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#f97316"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
