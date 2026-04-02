"use client";

import {
  Headphones,
  Mic2,
  Users,
  FileCheck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Tổng học viên",
    value: "1,284",
    description: "+12% tháng này",
    icon: Users,
    trend: "up",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    title: "Câu đã chép",
    value: "45,672",
    description: "+5.2% hôm nay",
    icon: Headphones,
    trend: "up",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "group-hover:shadow-orange-500/20",
  },
  {
    title: "Giờ Shadowing",
    value: "1,120h",
    description: "-2% tuần trước",
    icon: Mic2,
    trend: "down",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "group-hover:shadow-purple-500/20",
  },
  {
    title: "Hoàn thành",
    value: "84.2%",
    description: "Mục tiêu: 90%",
    icon: FileCheck,
    trend: "up",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "group-hover:shadow-emerald-500/20",
  },
];

export default function SectionCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-2">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={cn(
            "group relative overflow-hidden border border-white/10 bg-[#18181b] backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-[1.5rem]",
            stat.glow,
          )}
        >
          {/* Background Glow */}
          <div
            className={cn(
              "absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              stat.bg.replace("/10", "/20"),
            )}
          />

          <CardHeader className="relative flex flex-row items-center justify-between pb-2 space-y-0 z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
              {stat.title}
            </CardTitle>
            <div
              className={cn(
                "p-2 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border",
                stat.bg,
                stat.border,
                stat.color,
              )}
            >
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black tracking-tighter italic text-white mb-2">
              {stat.value}
            </div>
            <div className="flex items-center">
              <div
                className={cn(
                  "flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold border",
                  stat.trend === "up"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20",
                )}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-0.5 h-3 w-3" />
                )}
                {stat.description.split(" ")[0]}
              </div>
              <span className="ml-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                {stat.description.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
