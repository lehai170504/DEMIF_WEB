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
    gradient: "from-blue-500/10 to-transparent",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-600",
  },
  {
    title: "Câu đã chép",
    value: "45,672",
    description: "+5.2% hôm nay",
    icon: Headphones,
    trend: "up",
    gradient: "from-orange-500/10 to-transparent",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500",
  },
  {
    title: "Giờ Shadowing",
    value: "1,120h",
    description: "-2% tuần trước",
    icon: Mic2,
    trend: "down",
    gradient: "from-purple-500/10 to-transparent",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500",
  },
  {
    title: "Hoàn thành",
    value: "84.2%",
    description: "Mục tiêu: 90%",
    icon: FileCheck,
    trend: "up",
    gradient: "from-emerald-500/10 to-transparent",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500",
  },
];

export default function SectionCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-2">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden border-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
        >
          {/* Decorative Gradient */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              stat.gradient
            )}
          />

          <CardHeader className="relative flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/80">
              {stat.title}
            </CardTitle>
            <div
              className={cn(
                "p-2 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                "bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700",
                stat.iconColor
              )}
            >
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-black tracking-tighter italic">
              {stat.value}
            </div>
            <div className="flex items-center mt-1">
              <div
                className={cn(
                  "flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                  stat.trend === "up"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                )}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-0.5 h-3 w-3" />
                )}
                {stat.description.split(" ")[0]}
              </div>
              <span className="ml-2 text-[10px] text-muted-foreground font-medium">
                {stat.description.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
