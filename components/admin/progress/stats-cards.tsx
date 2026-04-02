"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Mic, Headphones, Clock, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
}

const stats: StatItem[] = [
  {
    label: "Tổng học viên",
    value: 128,
    icon: BarChart3,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    label: "Trung bình AI",
    value: "86%",
    icon: Mic,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    label: "Luyện nghe TB",
    value: "42m",
    icon: Headphones,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    label: "Xong hôm nay",
    value: 37,
    icon: Clock,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
      {stats.map((item, idx) => (
        <Card
          key={idx}
          className="border border-white/5 shadow-2xl rounded-[2rem] bg-white/5 backdrop-blur-md transition-all hover:scale-[1.05] hover:bg-white/10 group"
        >
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic group-hover:text-zinc-300 transition-colors">
              {item.label}
            </CardTitle>
            <div
              className={cn(
                "p-2 rounded-xl border",
                item.bg,
                item.color,
                item.border,
              )}
            >
              <item.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter italic text-white">
              {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
