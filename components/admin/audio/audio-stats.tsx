"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, HardDrive, ListPlus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatProps {
  count: number;
  duration: string;
  usage: number;
}

interface StatCardProps {
  label: string;
  val: string | number;
  sub: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  glow: string;
}

export function AudioStats({ count, duration, usage }: StatProps) {
  const statsData = [
    {
      label: "Tổng số Files",
      val: count,
      sub: "Files sẵn dùng",
      icon: HardDrive,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      glow: "group-hover:shadow-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Tổng thời lượng",
      val: duration,
      sub: "Nội dung luyện tập",
      icon: Clock,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      glow: "group-hover:shadow-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      label: "Tỷ lệ sử dụng",
      val: usage,
      sub: "Lượt trong bài học",
      icon: ListPlus,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      glow: "group-hover:shadow-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className={cn(
            "group border border-white/10 shadow-lg rounded-[2rem] bg-[#18181b] overflow-hidden transition-all duration-300 hover:-translate-y-1",
            stat.glow,
          )}
        >
          <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
              {stat.label}
            </CardTitle>
            <div
              className={cn(
                "p-2.5 rounded-xl transition-transform group-hover:scale-110 border",
                stat.bg,
                stat.color,
                stat.border,
              )}
            >
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black italic tracking-tighter text-white">
              {stat.val}
            </div>
            <p className="text-[10px] text-zinc-500 font-bold mt-1 uppercase tracking-tighter group-hover:text-zinc-400">
              {stat.sub}
            </p>
          </CardContent>

          {/* Background Gradient */}
          <div
            className={cn(
              "absolute top-0 right-0 w-24 h-24 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none",
              stat.bg.replace("/10", "/20"),
            )}
          />
        </Card>
      ))}
    </div>
  );
}
