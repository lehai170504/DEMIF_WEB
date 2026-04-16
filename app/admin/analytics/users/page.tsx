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
} from "recharts";

const COLORS = [
  "#f59e0b",
  "#3b82f6",
  "#10b981",
  "#6366f1",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

export default function UsersAnalyticsPage() {
  const { data, isLoading } = useAdminUsers();

  return (
    <div className="space-y-8 pb-10">
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
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 self-start mb-6">
            <PieIcon className="w-5 h-5 text-orange-500" />
            <h2 className="font-black text-lg uppercase">Trình độ</h2>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.byLevel}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="key"
                >
                  {data?.byLevel?.map((_: any, index: number) => (
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

        {/* 3. Quốc gia - Bar Chart ngang (Dễ đọc tên quốc gia dài) */}
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-blue-500" />
            <h2 className="font-black text-lg uppercase">Quốc gia</h2>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.byCountry}
                layout="vertical"
                margin={{ left: 10, right: 30 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  stroke="#333"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="key"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={80}
                  style={{ fontSize: "12px", fontWeight: "bold" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "none",
                    borderRadius: "12px",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[0, 10, 10, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Trạng thái tài khoản - Donut Chart */}
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 self-start mb-6">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h2 className="font-black text-lg uppercase">Trạng thái</h2>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.byStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="key"
                >
                  {data?.byStatus?.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[(index + 3) % COLORS.length]}
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
      </div>
    </div>
  );
}
