"use client";

import { Target, Clock, Trophy, Flame, Loader2 } from "lucide-react";
import { useStatsSummary } from "@/hooks/use-stats";
import { cn } from "@/lib/utils";

export function StatsRow() {
  const { data: statsData, isLoading } = useStatsSummary();

  const stats = [
    {
      icon: Flame,
      label: "Ngày liên tiếp",
      value: statsData?.currentStreak ?? 0,
      color: "text-orange-500",
      border: "border-orange-500/20",
      bg: "bg-orange-500/10",
      glow: "shadow-orange-500/20",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Trophy,
      label: "Kinh nghiệm",
      value: statsData?.totalXp ?? 0,
      color: "text-blue-500",
      border: "border-blue-500/20",
      bg: "bg-blue-500/10",
      glow: "shadow-blue-500/20",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      label: "Chuỗi dài nhất",
      value: statsData?.longestStreak ?? 0,
      color: "text-emerald-500",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
      glow: "shadow-emerald-500/20",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Clock,
      label: "Phút đã học",
      value: statsData?.totalPracticeMinutes ?? 0,
      color: "text-purple-500",
      border: "border-purple-500/20",
      bg: "bg-purple-500/10",
      glow: "shadow-purple-500/20",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 font-mono">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative overflow-hidden p-6 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-white/5 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-black/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
        >
          {/* Background Glow Effect */}
          <div
            className={cn(
              "absolute -top-10 -right-10 w-32 h-32 blur-[50px] rounded-full pointer-events-none opacity-30 dark:opacity-40 group-hover:opacity-100 transition-opacity duration-500",
              stat.bg,
            )}
          />

          {/* Background Icon Decor */}
          <stat.icon
            className={cn(
              "absolute -right-4 -bottom-4 h-28 w-28 opacity-[0.03] dark:opacity-[0.04] group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none",
              stat.color,
            )}
          />

          <div className="relative z-10">
            {/* Icon Box */}
            <div className="flex items-start justify-between mb-6">
              <div
                className={cn(
                  "p-3 rounded-2xl border shadow-lg transition-transform duration-300 group-hover:scale-110",
                  stat.bg,
                  stat.color,
                  stat.border,
                  stat.glow,
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>

            {/* Value & Label */}
            <div className="space-y-1">
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                ) : (
                  stat.value.toLocaleString("vi-VN")
                )}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors">
                {stat.label}
              </div>
            </div>
          </div>

          {/* Bottom highlight bar */}
          <div
            className={cn(
              "absolute bottom-0 left-0 h-1.5 w-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r",
              stat.gradient,
            )}
          />
        </div>
      ))}
    </div>
  );
}
