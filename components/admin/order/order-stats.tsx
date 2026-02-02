"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";

interface OrderStatsProps {
  totalRevenue: string;
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export function OrderStats({ totalRevenue, stats }: OrderStatsProps) {
  const statItems = [
    {
      label: "Tổng doanh thu",
      val: totalRevenue,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      glow: "group-hover:shadow-emerald-500/20",
    },
    {
      label: "Tổng đơn hàng",
      val: stats.total,
      icon: ShoppingBag,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      glow: "group-hover:shadow-blue-500/20",
    },
    {
      label: "Đã hoàn thành",
      val: stats.completed,
      icon: CheckCircle,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      glow: "group-hover:shadow-orange-500/20",
    },
    {
      label: "Đang chờ xử lý",
      val: stats.pending,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      glow: "group-hover:shadow-yellow-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
      {statItems.map((item, i) => (
        <Card
          key={i}
          className={cn(
            "group border border-white/10 bg-[#18181b] backdrop-blur-xl shadow-lg rounded-[2rem] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden",
            item.glow,
          )}
        >
          {/* Background Glow */}
          <div
            className={cn(
              "absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              item.bg.replace("/10", "/20"),
            )}
          />

          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic group-hover:text-zinc-300 transition-colors">
              {item.label}
            </CardTitle>
            <div
              className={cn(
                "p-2 rounded-xl border transition-transform group-hover:scale-110 group-hover:rotate-3",
                item.bg,
                item.color,
                item.border,
              )}
            >
              <item.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-black tracking-tighter italic text-white">
              {item.val}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
