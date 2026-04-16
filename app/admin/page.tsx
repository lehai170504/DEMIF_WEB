"use client";

import {
  LayoutGrid,
  Users,
  Wallet,
  Flame,
  AlertTriangle,
  UsersRound,
  Crown,
  BellRing,
  BookOpen,
  Dumbbell,
  Languages,
  BadgeCheck,
  Clock,
  Receipt,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useAdminOverview } from "@/hooks/use-admin-analytics";
import { cn } from "@/lib/utils";

import {
  MiniMetricCard,
  SubMetric,
  PulseRow,
} from "@/components/admin/dashboard/stat-cards";
import {
  LessonRow,
  SkeletonRow,
} from "@/components/admin/dashboard/lesson-row";

export default function AdminDashboard() {
  // Thay thế bằng hook overview mới
  const { data: analytics, isLoading: isDataLoading } = useAdminOverview();

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-16 px-4 md:px-8 font-mono relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50/50 to-transparent dark:from-[#111]/50" />
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-orange-400/5 dark:bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-blue-400/5 dark:bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-12 pt-8">
        {/* ================= 1. HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-orange-500 pl-6 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500 mb-2">
              <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[10px]">
                Trung tâm điều hành
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight text-slate-900 dark:text-white tracking-tight">
              Dashboard{" "}
              <span className="text-slate-400 dark:text-zinc-500 font-medium">
                Tổng Quan
              </span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 text-sm font-medium max-w-lg mt-2">
              Báo cáo thời gian thực về lưu lượng truy cập, tài chính và tương
              tác học tập.
            </p>
          </div>
        </div>

        {/* ================= 2. ALERTS (ACTIONABLE) ================= */}
        {!isDataLoading && analytics?.alerts && analytics.alerts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-700 delay-100">
            {analytics.alerts.map((alert, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-4 rounded-2xl border flex items-start gap-4 shadow-sm backdrop-blur-md",
                  alert.severity === "warning"
                    ? "bg-orange-50/50 border-orange-200 text-orange-800 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-200"
                    : alert.severity === "critical" ||
                        alert.severity === "error"
                      ? "bg-red-50/50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-200"
                      : "bg-blue-50/50 border-blue-200 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-200",
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-full shrink-0",
                    alert.severity === "warning"
                      ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600"
                      : alert.severity === "critical" ||
                          alert.severity === "error"
                        ? "bg-red-100 dark:bg-red-500/20 text-red-600"
                        : "bg-blue-100 dark:bg-blue-500/20 text-blue-600",
                  )}
                >
                  {alert.severity === "warning" ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : alert.severity === "critical" ||
                    alert.severity === "error" ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <BellRing className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">
                    {alert.title}{" "}
                    <span className="opacity-60 text-xs font-medium ml-1">
                      ({alert.count})
                    </span>
                  </h4>
                  <p className="text-xs opacity-80 font-medium">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= 3. HERO KPIs (NORTH STAR METRICS) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
          <div className="lg:col-span-8 bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-[3rem] p-8 md:p-12 shadow-xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-6 text-orange-500">
                <Wallet className="w-5 h-5" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">
                  Tổng Doanh Thu Lũy Kế
                </h3>
              </div>
              <div className="flex items-baseline gap-3">
                {isDataLoading ? (
                  <div className="h-16 bg-slate-100 dark:bg-zinc-800/50 rounded-2xl w-2/3 animate-pulse" />
                ) : (
                  <>
                    <span className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                      {analytics?.summary?.totalRevenue?.toLocaleString(
                        "vi-VN",
                      ) || "0"}
                    </span>
                    <span className="text-lg md:text-2xl font-black text-slate-400 uppercase tracking-widest">
                      VND
                    </span>
                  </>
                )}
              </div>
            </div>
            {/* Đã đổi các sub-metric để dùng dữ liệu có sẵn trong DashboardSummaryDto */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-100 dark:border-white/5 relative z-10">
              <SubMetric
                icon={Crown}
                label="Sub Active"
                value={analytics?.summary?.activeSubscriptions}
                color="text-emerald-500"
                isLoading={isDataLoading}
              />
              <SubMetric
                icon={AlertCircle}
                label="Sub Sắp hết hạn"
                value={analytics?.summary?.expiringSubscriptionsSoon}
                color="text-orange-500"
                isLoading={isDataLoading}
              />
              <SubMetric
                icon={Clock}
                label="Giao dịch chờ"
                value={analytics?.summary?.pendingPayments}
                color="text-blue-500"
                isLoading={isDataLoading}
              />
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 dark:bg-[#0A0A0A]/80 border border-slate-800 dark:border-white/5 rounded-[3rem] p-8 md:p-12 shadow-xl flex flex-col relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-10 relative z-10">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                Nhịp đập Hệ thống
              </h3>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                  Trực tuyến
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-8 relative z-10 flex-1 justify-center">
              <PulseRow
                icon={Users}
                label="Active Users"
                value={analytics?.summary?.activeUsers}
                isLoading={isDataLoading}
              />
              <div className="h-[1px] w-full bg-slate-800 dark:bg-white/5" />
              <PulseRow
                icon={UsersRound}
                label="Tổng Người dùng"
                value={analytics?.summary?.totalUsers}
                isLoading={isDataLoading}
              />
              <div className="h-[1px] w-full bg-slate-800 dark:bg-white/5" />
              <PulseRow
                icon={BadgeCheck}
                label="Đăng ký mới (Hôm nay)"
                value={analytics?.summary?.newUsersToday}
                isLoading={isDataLoading}
                color="text-orange-400"
              />
            </div>
          </div>
        </div>

        {/* ================= 4. SUMMARY KPIs ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-1000 delay-300">
          <MiniMetricCard
            icon={BookOpen}
            title="Tổng Bài học"
            value={analytics?.summary?.totalLessons}
            subText={`${analytics?.summary?.publishedLessons} đã Public`}
            isLoading={isDataLoading}
          />
          <MiniMetricCard
            icon={Dumbbell}
            title="Tổng Bài tập"
            value={analytics?.summary?.totalExercises}
            isLoading={isDataLoading}
          />
          <MiniMetricCard
            icon={Languages}
            title="Từ vựng"
            value={analytics?.summary?.totalVocabulary}
            subText={`${analytics?.summary?.dueVocabulary} tới hạn ôn`}
            isLoading={isDataLoading}
          />
          <MiniMetricCard
            icon={FileText}
            title="Tổng Blog"
            value={analytics?.summary?.totalBlogs}
            isLoading={isDataLoading}
          />
        </div>

        {/* ================= 5. RECENT ACTIVITY & LISTS ================= */}
        <div className="grid gap-8 xl:grid-cols-3 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400 pt-6">
          {/* Cột 1: Giao dịch gần đây */}
          <div className="space-y-8 xl:col-span-1">
            <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl">
                  <Receipt className="h-5 w-5 text-blue-500" />
                </div>
                <h2 className="font-black text-lg uppercase tracking-tight">
                  Giao dịch gần đây
                </h2>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                {isDataLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))
                  : analytics?.recentPayments
                      ?.slice(0, 5)
                      .map((pay: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-[#111111] border border-slate-100 dark:border-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            <div>
                              <p className="text-sm font-bold">
                                {pay.planName}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {new Date(pay.completedAt).toLocaleString(
                                  "vi-VN",
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black">
                              {pay.amount.toLocaleString("vi-VN")} đ
                            </p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">
                              {pay.paymentMethod}
                            </p>
                          </div>
                        </div>
                      ))}
              </div>
            </div>
          </div>

          {/* Cột 2 & 3: Bảng xếp hạng Lesson */}
          <div className="space-y-8 xl:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              {/* Thịnh hành */}
              <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl">
                    <Flame className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h2 className="font-black text-lg uppercase tracking-tight">
                      Thịnh hành
                    </h2>
                    <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">
                      Được luyện tập nhiều nhất
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  {isDataLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <SkeletonRow key={i} />
                      ))
                    : analytics?.popularLessons?.map(
                        (lesson: any, idx: number) => (
                          <LessonRow
                            key={lesson.lessonId}
                            lesson={lesson}
                            index={idx + 1}
                            type="popular"
                          />
                        ),
                      )}
                </div>
              </div>

              {/* Thử thách */}
              <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="font-black text-lg uppercase tracking-tight">
                      Thử thách
                    </h2>
                    <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">
                      Điểm trung bình thấp nhất
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  {isDataLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <SkeletonRow key={i} />
                      ))
                    : analytics?.difficultLessons?.map(
                        (lesson: any, idx: number) => (
                          <LessonRow
                            key={lesson.lessonId}
                            lesson={lesson}
                            index={idx + 1}
                            type="difficult"
                          />
                        ),
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
