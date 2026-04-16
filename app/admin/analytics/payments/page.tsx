"use client";

import { useAdminPayments } from "@/hooks/use-admin-analytics";
import { MiniMetricCard } from "@/components/admin/dashboard/stat-cards";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Crown,
  Receipt,
  BarChart3,
  PieChart as PieIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

// Bảng màu cho biểu đồ tròn [cite: 237]
const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6366f1", "#ef4444"];

export default function PaymentsAnalyticsPage() {
  const { data, isLoading } = useAdminPayments();

  // Hàm helper để format tiền Việt [cite: 32, 172]
  const formatVND = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="space-y-8 pb-10">
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
          isCurrency={true}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ 1: Donut Chart cho Phương thức thanh toán (Dễ nhìn tỷ lệ %) [cite: 120, 324] */}
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 self-start mb-6">
            <PieIcon className="w-5 h-5 text-emerald-500" />
            <h2 className="font-black text-lg uppercase text-slate-800 dark:text-slate-200">
              Cổng Thanh toán
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.byMethod}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="key"
                >
                  {data?.byMethod?.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ 2: Bar Chart cho Doanh thu theo Gói (Nhìn rõ độ chênh lệch tiền) [cite: 110, 120] */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            <h2 className="font-black text-lg uppercase text-slate-800 dark:text-slate-200">
              Doanh thu theo Gói & Chu kỳ
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.revenueByTier?.map((i: any) => ({
                  name: i.key,
                  amount: i.amount,
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#333"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value / 1000000}M`}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  formatter={(value: any) => {
                    if (value === undefined || value === null) return "0₫";
                    return formatVND(Number(value));
                  }}
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "none",
                    borderRadius: "12px",
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="#f59e0b"
                  radius={[10, 10, 0, 0]}
                  barSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================= 3. CHI TIẾT CHU KỲ ================= */}
      <div className="bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Receipt className="w-5 h-5 text-blue-500" />
          <h2 className="font-black text-lg uppercase text-slate-800 dark:text-slate-200">
            Phân bổ Chu kỳ Thanh toán
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.revenueByBillingCycle?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-[#111] border border-slate-100 dark:border-white/10 shadow-sm"
            >
              <p className="text-sm text-slate-500 dark:text-zinc-400 mb-1">
                {item.key}
              </p>
              <p className="text-xl font-bold text-blue-500">
                {formatVND(item.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
