"use client";

import { useAdminUsers } from "@/hooks/use-admin-analytics";
import { MiniMetricCard } from "@/components/admin/dashboard/stat-cards";
import {
  Users,
  UserCheck,
  UserX,
  UserMinus,
  PieChart as PieIcon,
  Globe,
  Shield,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

// Nâng cấp bộ màu lên Gradient để có chiều sâu
const GRADIENTS = [
  { id: "grad-orange", from: "#f97316", to: "#f59e0b" },
  { id: "grad-blue", from: "#3b82f6", to: "#8b5cf6" },
  { id: "grad-emerald", from: "#10b981", to: "#059669" },
  { id: "grad-rose", from: "#f43f5e", to: "#e11d48" },
  { id: "grad-indigo", from: "#6366f1", to: "#a855f7" },
  { id: "grad-teal", from: "#14b8a6", to: "#0ea5e9" },
];

export default function UsersAnalyticsPage() {
  const { data, isLoading } = useAdminUsers();

  // Style chung cho Tooltip xịn xò
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

      {/* 1. KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MiniMetricCard
          icon={Users}
          title="Tổng Users"
          value={data?.totalUsers}
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={UserCheck}
          title="Active Users"
          value={data?.activeUsers}
          color="text-emerald-500"
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={UserMinus}
          title="Pending/Inactive"
          value={(data?.pendingUsers || 0) + (data?.inactiveUsers || 0)}
          color="text-yellow-500"
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={UserX}
          title="Banned/Suspended"
          value={(data?.bannedUsers || 0) + (data?.suspendedUsers || 0)}
          color="text-red-500"
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Trình độ học viên - Donut Chart */}
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col items-center shadow-xl shadow-black/5 dark:shadow-black/20 transition-all hover:border-orange-500/30">
          <div className="flex items-center gap-2 self-start mb-6">
            <div className="p-2 bg-orange-500/10 rounded-xl">
              <PieIcon className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
              Trình độ Học viên
            </h2>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.byLevel}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8} /* Tăng khoảng cách giữa các miếng */
                  dataKey="count"
                  nameKey="key"
                  stroke="none" /* Bỏ viền thô */
                  cornerRadius={8} /* Bo góc siêu đẹp */
                >
                  {data?.byLevel?.map((_: any, index: number) => (
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

        {/* 3. Quốc gia - Bar Chart ngang */}
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all hover:border-blue-500/30">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <Globe className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
              Phân bổ Quốc gia
            </h2>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.byCountry}
                layout="vertical"
                margin={{ left: 10, right: 30, top: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  stroke="rgba(150,150,150,0.15)"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="key"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={85}
                  tick={{ fill: "#888", fontSize: 11, fontWeight: 800 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(150,150,150,0.05)" }}
                  contentStyle={customTooltipStyle}
                  itemStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="count"
                  radius={[0, 10, 10, 0]}
                  barSize={18}
                  background={{
                    fill: "rgba(150,150,150,0.05)",
                    radius: 10,
                  }}
                >
                  {data?.byCountry?.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#${GRADIENTS[index % GRADIENTS.length].id})`}
                    />
                  ))}
                  {/* Hiển thị số lượng ngay đuôi thanh Bar */}
                  <LabelList
                    dataKey="count"
                    position="right"
                    fill="#888"
                    fontSize={11}
                    fontWeight="bold"
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Trạng thái tài khoản - Donut Chart */}
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col items-center shadow-xl shadow-black/5 dark:shadow-black/20 transition-all hover:border-emerald-500/30">
          <div className="flex items-center gap-2 self-start mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
              Trạng thái Tài khoản
            </h2>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.byStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="count"
                  nameKey="key"
                  stroke="none"
                  cornerRadius={8}
                >
                  {data?.byStatus?.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#${GRADIENTS[(index + 2) % GRADIENTS.length].id})`}
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
      </div>
    </div>
  );
}
