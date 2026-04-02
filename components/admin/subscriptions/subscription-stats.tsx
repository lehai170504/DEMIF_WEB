"use client";

import { DollarSign, Package, Users, TrendingUp } from "lucide-react";
import { StatCard } from "./stat-card";

interface SubscriptionStatsProps {
  totalPlans: number;
  totalSubscribers: number;
  activeSubscribers: number;
  totalRevenue: number;
}

export function SubscriptionStats({
  totalPlans,
  totalSubscribers,
  activeSubscribers,
  totalRevenue,
}: SubscriptionStatsProps) {
  // Chuẩn hóa định dạng tiền tệ Việt Nam
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
      <StatCard
        icon={Package}
        label="Tổng Số Gói Dịch Vụ"
        value={totalPlans}
        subtext="Số gói khả dụng trên hệ thống"
        color="text-blue-600"
      />
      <StatCard
        icon={Users}
        label="Người Dùng Đăng Ký"
        value={totalSubscribers}
        subtext={`${activeSubscribers} học viên đang hoạt động`}
        color="text-orange-600"
      />
      <StatCard
        icon={DollarSign}
        label="Tổng Doanh Thu Hệ Thống"
        value={formatCurrency(totalRevenue)}
        subtext="Tổng giá trị giao dịch thành công"
        color="text-emerald-600"
        isCurrency
      />
    </div>
  );
}
