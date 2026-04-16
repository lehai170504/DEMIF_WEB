"use client";

import { useAdminUsers } from "@/hooks/use-admin-analytics";
import { MiniMetricCard } from "@/components/admin/dashboard/stat-cards";
import { TailwindChartCard } from "@/components/admin/dashboard/chart-card";
import {
  Users,
  UserCheck,
  UserX,
  UserMinus,
  PieChart,
  Globe,
  Shield,
} from "lucide-react";

export default function UsersAnalyticsPage() {
  const { data, isLoading } = useAdminUsers();

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TailwindChartCard
          title="Trình độ Học viên"
          icon={PieChart}
          data={data?.byLevel}
          colorTheme="orange"
          isLoading={isLoading}
        />
        <TailwindChartCard
          title="Quốc gia"
          icon={Globe}
          data={data?.byCountry}
          colorTheme="blue"
          isLoading={isLoading}
        />
        <TailwindChartCard
          title="Trạng thái Tài khoản"
          icon={Shield}
          data={data?.byStatus}
          colorTheme="emerald"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
