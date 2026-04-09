"use client";

import { Card } from "@/components/ui/card";
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

const FILTER_OPTIONS = [
  { key: "ALL", label: "Tất cả" },
  { key: "Dictation", label: "Dictation" },
  { key: "Shadowing", label: "Shadowing" },
];

export function LearningAnalyticsChart() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const { data: dailyStats, isLoading } = useDailyPractice(
    30,
    filterType === "ALL" ? undefined : filterType
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

  return (
    <div className="p-6 font-mono">
      {/* Header with filter toggle inline */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#FF7A00]" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Biểu đồ học tập
          </h3>
        </div>

        {/* Filter Toggle — inline, no absolute */}
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/5">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilterType(opt.key)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                filterType === opt.key
                  ? "bg-white dark:bg-zinc-800 text-orange-500 shadow-sm"
                  : "text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 gap-6">
          {/* 1. Bar Chart - Weekly */}
          <Card className="p-6 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] shadow-xl rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 blur-[60px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-tight italic text-gray-900 dark:text-white">
                    Tiến độ tuần
                  </h4>
                  <p className="text-[9px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                    Hoạt động 7 ngày gần nhất
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500" /> Bài học
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-600" /> Phút học
                </div>
              </div>
            </div>

            <div className="h-[220px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" className="dark:stroke-white/5" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: "bold", fill: "#71717a" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: "bold", fill: "#71717a" }} />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.02)", radius: 8 }}
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", color: "#18181b" }}
                  />
                  <Bar dataKey="lessons" fill="#f97316" radius={[4, 4, 4, 4]} barSize={12} />
                  <Bar dataKey="minutes" fill="#3f3f46" radius={[4, 4, 4, 4]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* 2. Area Chart - Monthly XP */}
          <Card className="p-6 border border-gray-200 dark:border-white/10 bg-white dark:bg-black shadow-xl rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
              <Activity className="w-28 h-28 text-gray-900 dark:text-white" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-tight italic text-gray-900 dark:text-white">
                  Điểm kinh nghiệm (XP)
                </h4>
                <p className="text-[9px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                  Biểu đồ tăng trưởng 30 ngày
                </p>
              </div>
            </div>

            <div className="h-[220px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" className="dark:stroke-white/5" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: "bold", fill: "#71717a" }} dy={10} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "11px", color: "#18181b", fontFamily: "monospace" }}
                  />
                  <Area type="monotone" dataKey="xpEarned" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
