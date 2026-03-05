"use client";

import { Card } from "@/components/ui/card";
import {
  Trophy,
  Flame,
  Zap,
  ArrowRight,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AchievementCards() {
  const achievements = [
    {
      icon: Trophy,
      title: "Nhập môn",
      subtitle: "Bài nộp đầu tiên",
      color: "text-pink-500",
      bg: "bg-pink-500/10 border-pink-500/20",
      isUnlocked: true,
    },
    {
      icon: Flame,
      title: "Ghi điểm",
      subtitle: "10 bài nộp",
      color: "text-zinc-600",
      bg: "bg-[#18181b] border-white/5",
      isUnlocked: false,
    },
    {
      icon: Zap,
      title: "Bất tận",
      subtitle: "20 bài nộp",
      color: "text-zinc-600",
      bg: "bg-[#18181b] border-white/5",
      isUnlocked: false,
    },
  ];

  return (
    <div className="font-mono">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500 flex items-center gap-2">
            Danh hiệu{" "}
            <span className="text-orange-500 bg-orange-500/10 px-1.5 rounded">
              (1 / 20)
            </span>
          </h3>
          <div className="h-1.5 w-32 bg-gray-200 dark:bg-[#18181b] rounded-full mt-2 overflow-hidden border border-gray-300 dark:border-white/5">
            <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 w-[5%] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors group bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-transparent hover:border-gray-300 dark:hover:border-white/10">
          Tất cả{" "}
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-3 gap-4">
        {achievements.map((item, index) => (
          <Card
            key={index}
            className={cn(
              "relative p-5 border rounded-[1.5rem] transition-all duration-300 group overflow-hidden flex flex-col items-center text-center",
              item.isUnlocked
                ? `bg-gradient-to-br from-white to-gray-50 dark:from-[#18181b] dark:to-black border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:-translate-y-1 hover:shadow-pink-500/20`
                : "bg-gray-100 dark:bg-[#0a0a0a] border-gray-200 dark:border-white/5 opacity-60 grayscale hover:opacity-100 transition-opacity",
            )}
          >
            {/* Status Icons */}
            {item.isUnlocked ? (
              <div className="absolute top-3 right-3 text-pink-500 animate-pulse">
                <CheckCircle2 className="w-3 h-3" />
              </div>
            ) : (
              <Lock className="absolute top-3 right-3 h-3 w-3 text-gray-400 dark:text-zinc-700" />
            )}

            {/* Icon Badge */}
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-inner",
                item.bg,
                item.color,
              )}
            >
              <item.icon className="h-6 w-6" />
            </div>

            {/* Text Info */}
            <h4
              className={cn(
                "font-black text-[10px] uppercase tracking-wider mb-1 leading-none",
                item.isUnlocked ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-zinc-500",
              )}
            >
              {item.title}
            </h4>
            <p className="text-[9px] font-bold text-gray-500 dark:text-zinc-600 leading-tight">
              {item.subtitle}
            </p>

            {/* Shine effect for unlocked items */}
            {item.isUnlocked && (
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-200/50 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
