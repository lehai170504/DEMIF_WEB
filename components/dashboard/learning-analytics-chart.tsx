"use client";

import { TrendingUp, Activity, Calendar } from "lucide-react";
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
import { cn } from "@/lib/utils";

const FILTER_OPTIONS = [
  { key: "ALL", label: "Tất cả" },
  { key: "Dictation", label: "Dictation" },
  { key: "Shadowing", label: "Shadowing" },
];

export function LearningAnalyticsChart() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const { data: dailyStats, isLoading } = useDailyPractice(
    30,
    filterType === "ALL" ? undefined : filterType,
  );

  const chartData = dailyStats?.data || [];
  const weeklyDataRaw = chartData.slice(-7);
  const weeklyData = weeklyDataRaw.map((item) => ({
    day: format(parseISO(item.date), "dd/MM"),
    lessons: item.sessionsCount,
    minutes: item.minutes,
  }));

  const monthlyData = chartData.map((item) => ({
    date: format(parseISO(item.date), "dd/MM"),
    xpEarned: item.xpEarned,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 p-3 rounded-2xl shadow-xl">
          <p className="text-[10px] font-black uppercase text-gray-500 dark:text-zinc-400 mb-2 tracking-widest">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 mb-1 text-xs"
            >
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-bold text-gray-600 dark:text-zinc-300">
                  {entry.name === "lessons"
                    ? "Bài học"
                    : entry.name === "minutes"
                      ? "Phút học"
                      : "Kinh nghiệm"}
                </span>
              </div>
              <span
                className="font-black text-gray-900 dark:text-white"
                style={{ color: entry.color }}
              >
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 md:p-8 font-mono h-full flex flex-col relative z-10">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">
              Phân tích học tập
            </h3>
            <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
              Thống kê 30 ngày qua
            </p>
          </div>
        </div>

        <div className="flex bg-gray-50 dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/5">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilterType(opt.key)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                filterType === opt.key
                  ? "bg-white dark:bg-zinc-800 text-orange-500 shadow-md"
                  : "text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {/* ── 1. BAR CHART ── */}
          <div className="p-5 md:p-6 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[2rem] relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-tight text-gray-900 dark:text-white">
                    Tần suất luyện tập
                  </h4>
                  <p className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                    7 ngày gần nhất
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Bài
                  học
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 dark:bg-zinc-600" />{" "}
                  Phút học
                </div>
              </div>
            </div>

            <div className="h-[240px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                  barGap={8} // Tăng khoảng cách giữa 2 cột trong cùng 1 ngày
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(156, 163, 175, 0.15)"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: "bold", fill: "#71717a" }}
                    dy={10}
                    padding={{ left: 20, right: 20 }} // Tạo khoảng trống 2 đầu để các cột không sát biên
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: "bold", fill: "#71717a" }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(156, 163, 175, 0.05)", radius: 12 }}
                  />
                  <Bar
                    dataKey="lessons"
                    name="lessons"
                    fill="#f97316"
                    radius={[4, 4, 4, 4]}
                    barSize={12} // Giảm size cột để tạo khoảng trống (gap) rộng hơn
                  />
                  <Bar
                    dataKey="minutes"
                    name="minutes"
                    fill="#3f3f46"
                    radius={[4, 4, 4, 4]}
                    barSize={12}
                    className="dark:fill-zinc-600"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── 2. AREA CHART ── */}
          <div className="p-5 md:p-6 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.02] dark:opacity-[0.03]">
              <Activity className="w-32 h-32 text-gray-900 dark:text-white" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-tight text-gray-900 dark:text-white">
                  Tăng trưởng XP
                </h4>
                <p className="text-[9px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                  Chu kỳ 30 ngày
                </p>
              </div>
            </div>

            <div className="h-[220px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(156, 163, 175, 0.15)"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fontWeight: "bold", fill: "#71717a" }}
                    dy={10}
                    minTickGap={20}
                    interval="preserveStartEnd"
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="xpEarned"
                    stroke="#f97316"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorXp)"
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
