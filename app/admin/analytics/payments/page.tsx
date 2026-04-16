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
  LabelList,
} from "recharts";

// Nâng cấp bộ màu Gradient chuyên cho Tiền bạc/Tài chính
const GRADIENTS = [
  { id: "grad-emerald", from: "#10b981", to: "#059669" }, // Xanh tiền
  { id: "grad-blue", from: "#3b82f6", to: "#1d4ed8" }, // Xanh dương
  { id: "grad-orange", from: "#f59e0b", to: "#d97706" }, // Vàng cam
  { id: "grad-indigo", from: "#6366f1", to: "#4338ca" }, // Tím
  { id: "grad-rose", from: "#ef4444", to: "#be123c" }, // Đỏ
];

export default function PaymentsAnalyticsPage() {
  const { data, isLoading } = useAdminPayments();

  // Hàm helper format full tiền Việt (Dùng cho Tooltip)
  const formatVND = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  // Hàm helper rút gọn tiền (Dùng cho nhãn trục Y và Label trên Bar)
  const formatCompactVND = (value: number) => {
    if (value >= 1000000) return `${+(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${+(value / 1000).toFixed(1)}K`;
    return `${value}`;
  };

  // Style chung cho Tooltip kính mờ xịn xò
  const customTooltipStyle = {
    backgroundColor: "rgba(17, 17, 17, 0.95)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    color: "#fff",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
    fontWeight: "bold",
    padding: "12px 16px",
  };

  return (
    <div className="space-y-8 pb-10">
      {/* KHAI BÁO GRADIENTS CHO RECHARTS */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {GRADIENTS.map((g) => (
            <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={g.from} />
              <stop offset="100%" stopColor={g.to} />
            </linearGradient>
          ))}
        </defs>
      </svg>

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
        {/* Biểu đồ 1: Donut Chart cho Phương thức thanh toán */}
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col items-center shadow-xl shadow-black/5 dark:shadow-black/20 transition-all hover:border-emerald-500/30">
          <div className="flex items-center gap-2 self-start mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <PieIcon className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
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
                  innerRadius={75}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="count"
                  nameKey="key"
                  stroke="none"
                  cornerRadius={8}
                >
                  {data?.byMethod?.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#${GRADIENTS[index % GRADIENTS.length].id})`}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={customTooltipStyle}
                  itemStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    paddingTop: "20px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ 2: Bar Chart cho Doanh thu theo Gói */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all hover:border-orange-500/30">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-orange-500/10 rounded-xl">
              <BarChart3 className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
              Doanh thu theo Gói
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.revenueByTier?.map((i: any) => ({
                  name: i.key,
                  amount: i.amount,
                }))}
                margin={{ top: 25, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(150,150,150,0.15)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12, fontWeight: 800 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatCompactVND}
                  tick={{ fill: "#888", fontSize: 11 }}
                  width={60}
                />
                <Tooltip
                  cursor={{ fill: "rgba(150,150,150,0.05)" }}
                  formatter={(value: any) => {
                    if (value === undefined || value === null) return "0₫";
                    return formatVND(Number(value));
                  }}
                  contentStyle={customTooltipStyle}
                  itemStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="amount"
                  radius={[10, 10, 0, 0]}
                  barSize={55}
                  background={{ fill: "rgba(150,150,150,0.05)", radius: 10 }}
                >
                  {/* Tô màu Gradient cho từng cột Bar */}
                  {data?.revenueByTier?.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#${GRADIENTS[(index + 2) % GRADIENTS.length].id})`}
                    />
                  ))}
                  {/* Hiển thị số lượng rút gọn (VD: 1.5M) ngay trên đỉnh cột */}
                  <LabelList
                    dataKey="amount"
                    position="top"
                    fill="#888"
                    fontSize={12}
                    fontWeight="bold"
                    offset={10}
                    formatter={(value: any) =>
                      formatCompactVND(Number(value) || 0)
                    }
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================= 3. CHI TIẾT CHU KỲ ================= */}
      <div className="bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <Receipt className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
            Phân bổ Chu kỳ Thanh toán
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.revenueByBillingCycle?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="relative p-5 rounded-2xl bg-white dark:bg-[#111] border border-slate-100 dark:border-white/10 shadow-sm overflow-hidden group hover:shadow-md transition-all"
            >
              {/* Highlight bar bên trái */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  idx % 3 === 0
                    ? "bg-blue-500"
                    : idx % 3 === 1
                      ? "bg-emerald-500"
                      : "bg-orange-500"
                }`}
              />

              <div className="pl-2">
                <p className="text-[11px] uppercase font-black tracking-widest text-slate-500 dark:text-zinc-400 mb-1">
                  {item.key}
                </p>
                <p
                  className={`text-2xl font-black tracking-tight ${
                    idx % 3 === 0
                      ? "text-blue-500"
                      : idx % 3 === 1
                        ? "text-emerald-500"
                        : "text-orange-500"
                  }`}
                >
                  {formatVND(item.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
