"use client";

import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, Info, Loader2, BookCheck, Star } from "lucide-react";
import { useProgress } from "@/hooks/use-stats";

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
    <Card className="p-8 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] rounded-[2.5rem] shadow-2xl relative overflow-hidden group font-mono">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
      <Trophy className="absolute -bottom-8 -right-8 h-40 w-40 text-orange-500/5 -rotate-12 transition-transform group-hover:rotate-0 duration-700 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg shadow-orange-500/20 border border-orange-300 dark:border-white/10">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">
            DEMIF <span className="text-orange-500">Global Score</span>
          </h3>
        </div>

        {/* Main Score + Level */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            {isLoading ? (
              <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
            ) : (
              <div className="text-7xl font-black tracking-tighter italic text-gray-900 dark:text-white leading-none drop-shadow-lg">
                {totalPoints.toLocaleString("vi-VN")}
              </div>
            )}
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 w-fit px-2 py-1 rounded-md border border-emerald-500/20">
              <Info className="h-3 w-3" /> Điểm tích lũy
            </p>
          </div>

          <div className="text-right space-y-2 w-full md:w-auto">
            <div className="text-sm font-black italic uppercase text-gray-600 dark:text-zinc-300">
              Cấp độ{" "}
              <span className="text-orange-500 text-2xl ml-1">
                {isLoading ? "—" : currentLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Stats mini-row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: BookCheck, label: "Bài hoàn thành", value: lessonsCompleted, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
            { icon: Star, label: "Chính tả", value: dictationCompleted, color: "text-violet-500", bg: "bg-violet-500/10 border-violet-500/20" },
            { icon: Trophy, label: "Shadowing", value: shadowingCompleted, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
          ].map((stat) => (
            <div key={stat.label} className={`flex flex-col items-center p-3 rounded-2xl border ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 mb-1 ${stat.color}`} />
              <span className={`text-xl font-black ${stat.color}`}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : stat.value}
              </span>
              <span className="text-[8px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider text-center mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Level Progress Bar */}
        <div className="space-y-3 p-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
              Tiến trình cấp độ
            </span>
            <span className="text-[10px] font-black italic text-orange-500">
              {isLoading ? "—" : `${Math.round(levelProgress)}%`}
            </span>
          </div>
          <div className="h-3 w-full bg-gray-300 dark:bg-black rounded-full overflow-hidden p-0.5 border border-gray-400 dark:border-white/10">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
              style={{ width: `${Math.min(levelProgress, 100)}%` }}
            />
          </div>
          <p className="text-[9px] font-medium text-gray-500 dark:text-zinc-500 italic text-right">
            {!hasData
              ? "Bắt đầu học để tích điểm!"
              : levelProgress >= 100
              ? "✓ Đã hoàn thành cấp độ này!"
              : totalPoints === 0
              ? "Hãy hoàn thành bài học đầu tiên để tích điểm!"
              : `Còn ${Math.round(100 - levelProgress)}% nữa để thăng cấp`}
          </p>
        </div>
      </div>
    </Card>
  );
}
