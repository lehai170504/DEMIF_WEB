"use client";

import { useAdminPayments } from "@/hooks/use-admin-analytics";
import { MiniMetricCard } from "@/components/admin/dashboard/stat-cards";
import { TailwindChartCard } from "@/components/admin/dashboard/chart-card";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Crown,
  Receipt,
} from "lucide-react";

export default function PaymentsAnalyticsPage() {
  const { data, isLoading } = useAdminPayments();

  return (
    <div className="space-y-8">
      {/* ================= 1. KPI CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MiniMetricCard
          icon={Wallet}
          title="Tổng Giao dịch"
          value={data?.totalPayments}
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={TrendingUp}
          title="Doanh thu Tháng"
          value={data?.monthlyRevenue}
          color="text-emerald-500"
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={AlertCircle}
          title="Đang xử lý (Pending)"
          value={data?.pendingPayments}
          color="text-yellow-500"
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={AlertCircle}
          title="Thất bại / Hoàn tiền"
          value={(data?.failedPayments || 0) + (data?.refundedPayments || 0)}
          color="text-red-500"
          isLoading={isLoading}
        />
      </div>

      {/* ================= 2. CHARTS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Biểu đồ 1: Số lượng giao dịch theo phương thức */}
        <TailwindChartCard
          title="Phương thức Thanh toán"
          icon={CreditCard}
          data={data?.byMethod}
          colorTheme="emerald"
          isLoading={isLoading}
        />

        {/* Biểu đồ 2: Doanh thu theo gói (Premium, Basic...) */}
        <TailwindChartCard
          title="Doanh thu theo Gói"
          icon={Crown}
          data={data?.revenueByTier?.map((i: any) => ({
            key: i.key,
            count: i.amount,
          }))}
          colorTheme="orange"
          isLoading={isLoading}
          isCurrency={true}
        />

        {/* Biểu đồ 3: Doanh thu theo chu kỳ (Monthly, Lifetime...) */}
        <TailwindChartCard
          title="Chu kỳ Thanh toán"
          icon={Receipt}
          data={data?.revenueByBillingCycle?.map((i: any) => ({
            key: i.key,
            count: i.amount,
          }))}
          colorTheme="blue"
          isLoading={isLoading}
          isCurrency={true}
        />
      </div>
    </div>
  );
}
