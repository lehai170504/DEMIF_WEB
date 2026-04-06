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
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { useDailyPractice } from "@/hooks/use-stats";
import { Loader2 } from "lucide-react";

export function LearningAnalyticsChart() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const { data: dailyStats, isLoading } = useDailyPractice(
    30,
    filterType === "ALL" ? undefined : filterType
  );

  // Parse weekly data (Last 7 days from the API data)
  const chartData = dailyStats?.data || [];
  const weeklyDataRaw = chartData.slice(-7);
  const weeklyData = weeklyDataRaw.map((item) => ({
    day: format(parseISO(item.date), "dd/MM"),
    lessons: item.sessionsCount,
    minutes: item.minutes,
  }));

  // Parse monthly data (All 30 days for Area chart)
  const monthlyData = chartData.map((item) => ({
    date: format(parseISO(item.date), "dd/MM"),
    xpEarned: item.xpEarned,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 font-mono relative">
      {/* Filter Toggle */}
      <div className="absolute top-[-70px] right-2 z-20 flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
        {["ALL", "Dictation", "Shadowing"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              filterType === type
                ? "bg-white dark:bg-zinc-800 text-orange-500 shadow-sm"
                : "text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {type === "ALL" ? "Tất cả" : type}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-[2.5rem]">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
      )}

      {/* 1. Biểu đồ Tuần - Bar Chart */}
      <Card className="p-8 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] shadow-2xl rounded-[2.5rem] relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 border border-orange-400/20">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tighter italic text-gray-900 dark:text-white">
                TIẾN ĐỘ TUẦN
              </h3>
              <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
                Hoạt động 7 ngày gần nhất
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
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
                stroke="rgba(0,0,0,0.05)"
                className="dark:stroke-white/5"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#71717a" }}
                className="dark:fill-zinc-600"
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#71717a" }}
                className="dark:fill-zinc-600"
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.02)", radius: 8 }}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                  fontSize: "11px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  color: "#18181b",
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
      <Card className="p-8 border border-gray-200 dark:border-white/10 bg-white dark:bg-black shadow-2xl rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <Activity className="w-32 h-32 text-gray-900 dark:text-white" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20 border border-emerald-400/20">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tighter italic text-gray-900 dark:text-white">
                ĐIỂM KINH NGHIỆM (XP)
              </h3>
              <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
                Biểu đồ gia tăng XP trong 30 ngày
              </p>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorXp"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(0,0,0,0.05)"
                  className="dark:stroke-white/5"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: "bold", fill: "#71717a" }}
                  className="dark:fill-zinc-600"
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    fontSize: "11px",
                    color: "#18181b",
                    fontFamily: "monospace",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="xpEarned"
                  stroke="#f97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorXp)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
