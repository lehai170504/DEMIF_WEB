import { DollarSign, Package, Users } from "lucide-react";
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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={Package}
        label="Tổng số gói"
        value={totalPlans}
        subtext="Gói đang hoạt động"
        color="text-blue-500"
      />
      <StatCard
        icon={Users}
        label="Người đăng ký"
        value={totalSubscribers}
        subtext={`${activeSubscribers} đang kích hoạt`}
        color="text-orange-500"
      />
      <StatCard
        icon={DollarSign}
        label="Tổng doanh thu"
        value={formatCurrency(totalRevenue)}
        subtext="Doanh thu trọn đời"
        color="text-emerald-500"
        isCurrency
      />
    </div>
  );
}
