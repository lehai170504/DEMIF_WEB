"use client";

import { Card } from "@/components/ui/card";
import { Target, FileText, CheckCircle, Headphones, Flame } from "lucide-react";

export function StatsRow() {
  const stats = [
    {
      icon: Flame,
      label: "Ngày liên tiếp",
      value: "0",
      color: "text-orange-500",
      border: "border-orange-500/20",
      bg: "bg-orange-500/10",
      glow: "shadow-orange-500/20",
    },
    {
      icon: FileText,
      label: "Từ đã nghe",
      value: "9",
      color: "text-blue-500",
      border: "border-blue-500/20",
      bg: "bg-blue-500/10",
      glow: "shadow-blue-500/20",
    },
    {
      icon: CheckCircle,
      label: "Bài đã nộp",
      value: "1",
      color: "text-emerald-500",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
      glow: "shadow-emerald-500/20",
    },
    {
      icon: Headphones,
      label: "Đang nghe",
      value: "1",
      color: "text-purple-500",
      border: "border-purple-500/20",
      bg: "bg-purple-500/10",
      glow: "shadow-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`relative overflow-hidden p-5 border border-white/5 bg-[#18181b] rounded-[2rem] transition-all hover:-translate-y-1 hover:border-white/10 group`}
        >
          {/* Background Icon Decor */}
          <stat.icon
            className={`absolute -right-4 -bottom-4 h-24 w-24 opacity-[0.05] group-hover:scale-110 transition-transform duration-500 ${stat.color} blur-sm`}
          />

          <div className="flex flex-col items-start relative z-10">
            {/* Icon Box */}
            <div
              className={`p-3 rounded-2xl ${stat.bg} ${stat.color} mb-4 border ${stat.border} shadow-lg ${stat.glow}`}
            >
              <stat.icon className="h-5 w-5" />
            </div>

            {/* Value & Label */}
            <div className="space-y-1">
              <div
                className={`text-4xl font-black italic tracking-tighter text-white`}
              >
                {stat.value}
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {stat.label}
              </div>
            </div>
          </div>

          {/* Bottom highlight bar */}
          <div
            className={`absolute bottom-0 left-0 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity ${stat.bg.replace("/10", "")}`}
          />
        </Card>
      ))}
    </div>
  );
}
