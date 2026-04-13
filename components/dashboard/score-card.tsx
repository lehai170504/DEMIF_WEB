"use client";

import {
  Trophy,
  TrendingUp,
  Info,
  Loader2,
  BookCheck,
  Star,
  Target,
} from "lucide-react";
import { useProgress } from "@/hooks/use-stats";
import { cn } from "@/lib/utils";

export function ScoreCard() {
  const { data: progress, isLoading } = useProgress();

  const totalPoints = progress?.totalPoints ?? 0;
  const levelProgress = progress?.levelProgress ?? 0;
  const currentLevel = progress?.currentLevel ?? "—";
  const lessonsCompleted = progress?.lessonsCompleted ?? 0;
  const dictationCompleted = progress?.dictationCompleted ?? 0;
  const shadowingCompleted = progress?.shadowingCompleted ?? 0;

  const hasData = !isLoading && progress != null;

  return (
    <div className="p-6 md:p-8 h-full relative overflow-hidden group font-mono flex flex-col justify-between">
      {/* ── BACKGROUND EFFECTS ── */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-orange-500/20 transition-all duration-700" />
      <Trophy className="absolute -bottom-10 -right-6 h-48 w-48 text-orange-500/5 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700 pointer-events-none drop-shadow-2xl" />

      <div className="relative z-10">
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-orange-500/20 border border-orange-400 dark:border-white/10">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white leading-tight">
                Global Score
              </h3>
              <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
                Điểm tích lũy DEMIF
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Info className="h-3.5 w-3.5" />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Đang hoạt động
            </span>
          </div>
        </div>

        {/* ── MAIN SCORE & LEVEL ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            {isLoading ? (
              <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-2" />
            ) : (
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-zinc-500 leading-none drop-shadow-sm">
                {totalPoints.toLocaleString("vi-VN")}
              </div>
            )}
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              EXP Points
            </p>
          </div>

          <div className="text-left sm:text-right p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 shadow-sm min-w-[140px]">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 mb-1">
              Cấp độ hiện tại
            </p>
            <div className="text-2xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto sm:ml-auto" />
              ) : (
                currentLevel
              )}
            </div>
          </div>
        </div>

        {/* ── STATS MINI-ROW ── */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: BookCheck,
              label: "Tổng bài",
              value: lessonsCompleted,
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
            },
            {
              icon: Star,
              label: "Chính tả",
              value: dictationCompleted,
              color: "text-emerald-600 dark:text-emerald-400",
              bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
            },
            {
              icon: Target,
              label: "Shadowing",
              value: shadowingCompleted,
              color: "text-purple-600 dark:text-purple-400",
              bg: "bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/20",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-transform hover:scale-105",
                stat.bg,
              )}
            >
              <stat.icon className={cn("h-5 w-5 mb-2", stat.color)} />
              <span
                className={cn(
                  "text-xl sm:text-2xl font-black leading-none mb-1 tracking-tighter",
                  stat.color,
                )}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  stat.value
                )}
              </span>
              <span className="text-[9px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── LEVEL PROGRESS BAR ── */}
      <div className="relative z-10 w-full mt-auto">
        <div className="flex justify-between items-center mb-3 px-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400">
            Tiến trình thăng cấp
          </span>
          <span className="text-xs font-black text-orange-500">
            {isLoading ? "—" : `${Math.round(levelProgress)}%`}
          </span>
        </div>
        <div className="h-4 w-full bg-gray-100 dark:bg-[#111113] rounded-full overflow-hidden p-1 border border-gray-200 dark:border-white/5 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${Math.min(levelProgress, 100)}%` }}
          >
            {/* Shimmer effect inside progress bar */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent rounded-full" />
          </div>
        </div>
        <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 text-right mt-3 uppercase tracking-widest px-1">
          {!hasData
            ? "Bắt đầu học để tích lũy XP!"
            : levelProgress >= 100
              ? "🌟 Đã hoàn thành cấp độ này!"
              : totalPoints === 0
                ? "Hãy hoàn thành bài học đầu tiên!"
                : `Còn ${Math.round(100 - levelProgress)}% nữa để thăng cấp`}
        </p>
      </div>
    </div>
  );
}
