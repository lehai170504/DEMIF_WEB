"use client";

import { DollarSign, Package, Users, Loader2, TrendingUp } from "lucide-react";
import { StatCard } from "./stat-card";
import { useSubscriptionStats } from "@/hooks/use-subscription-stats";

export function SubscriptionStats() {
  const { data, isLoading } = useSubscriptionStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = data || {
    totalPlans: 0,
    totalSubscribers: 0,
    activeSubscribers: 0,
    totalRevenue: 0,
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-36 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 dark:via-white/5 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
            <Loader2 className="w-6 h-6 animate-spin text-slate-300 dark:text-zinc-700 relative z-10" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
      {/* Card 1: Inventory Stats */}
      <div className="group relative">
        <StatCard
          icon={Package}
          label="Inventory Core"
          value={stats.totalPlans}
          subtext="Gói dịch vụ khả dụng"
          color="text-blue-600"
        />
      </div>

      {/* Card 2: User Metrics */}
      <div className="group relative">
        <StatCard
          icon={Users}
          label="Active Community"
          value={stats.totalSubscribers.toLocaleString("vi-VN")}
          subtext={`${stats.activeSubscribers} học viên đang trực tuyến`}
          color="text-[#FF7A00]"
        />
        <div className="absolute top-4 right-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]"></span>
          </span>
        </div>
      </div>

      {/* Card 3: Revenue Stream */}
      <div className="group relative">
        <StatCard
          icon={DollarSign}
          label="Revenue Stream"
          value={formatCurrency(stats.totalRevenue)}
          subtext="Tổng giá trị giao dịch"
          color="text-emerald-600"
          isCurrency
        />
        <TrendingUp className="absolute top-6 right-6 h-4 w-4 text-emerald-500/20 group-hover:text-emerald-500 transition-all duration-500 group-hover:translate-y-[-2px]" />
      </div>
    </div>
  );
}
