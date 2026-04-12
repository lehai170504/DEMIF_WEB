"use client";

import {
  LayoutGrid,
  Users,
  TrendingUp,
  Wallet,
  Activity,
  Flame,
  AlertTriangle,
  PlayCircle,
  UsersRound,
  CreditCard,
  Crown,
  Layers,
} from "lucide-react";
import { useAdminAnalytics } from "@/hooks/use-admin-analytics";
import { usePaymentStats } from "@/hooks/use-admin-payments";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { data: analytics, isLoading: isAnalyticsLoading } =
    useAdminAnalytics();
  const { data: paymentStats, isLoading: isPaymentLoading } = usePaymentStats();

  const isDataLoading = isAnalyticsLoading || isPaymentLoading;

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-10 px-4 md:px-8 font-mono relative">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-orange-400/5 dark:bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-blue-400/5 dark:bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-[#FF7A00] pl-6 animate-in fade-in slide-in-from-left-8 duration-700 ease-out">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 dark:text-[#FF7A00] mb-2">
              <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[10px]">
                Hệ thống quản trị
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight text-slate-900 dark:text-white tracking-tight">
              Trung tâm{" "}
              <span className="text-slate-400 dark:text-zinc-500 font-medium">
                Điều hành
              </span>
            </h1>

            <p className="text-slate-500 dark:text-zinc-400 text-sm font-medium max-w-lg mt-2">
              Báo cáo thời gian thực về lưu lượng truy cập, tài chính và tương
              tác học tập.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 fill-mode-both">
          <div className="lg:col-span-8 bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
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
                      {analytics?.revenueStats?.totalRevenue?.toLocaleString(
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-100 dark:border-white/5 relative z-10">
              <SubMetric
                icon={TrendingUp}
                label="Tháng này"
                value={paymentStats?.currentMonthRevenue}
                color="text-emerald-500"
                isLoading={isDataLoading}
              />
              <SubMetric
                icon={Crown}
                label="Gói Premium"
                value={analytics?.revenueStats?.premiumRevenue}
                color="text-orange-500"
                isLoading={isDataLoading}
              />
              <SubMetric
                icon={Layers}
                label="Gói Khác / Pro"
                value={
                  (analytics?.revenueStats?.proRevenue || 0) +
                  (analytics?.revenueStats?.otherRevenue || 0)
                }
                color="text-blue-500"
                isLoading={isDataLoading}
              />
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 dark:bg-[#0A0A0A]/80 border border-slate-800 dark:border-white/5 rounded-[3rem] p-10 md:p-12 shadow-2xl flex flex-col relative overflow-hidden">
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
                label="Người dùng hàng ngày"
                value={analytics?.dailyActiveUsers}
                isLoading={isDataLoading}
              />
              <div className="h-[1px] w-full bg-slate-800 dark:bg-white/5" />
              <PulseRow
                icon={UsersRound}
                label="Tổng số Người dùng"
                value={analytics?.totalUsers}
                isLoading={isDataLoading}
              />
              <div className="h-[1px] w-full bg-slate-800 dark:bg-white/5" />
              <PulseRow
                icon={CreditCard}
                label="Lượt Giao dịch"
                value={paymentStats?.totalTransactions}
                isLoading={isDataLoading}
              />
            </div>
          </div>
        </div>

        {/* ================= LESSONS ANALYTICS ================= */}
        <div className="grid gap-8 lg:grid-cols-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          {/* CỘT 1: POPULAR LESSONS */}
          <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-[3rem] p-8 shadow-sm flex flex-col min-h-[500px]">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h2 className="font-black text-xl uppercase text-slate-900 dark:text-white tracking-tight">
                  Bài học thịnh hành
                </h2>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">
                  Được luyện tập nhiều nhất
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              {isDataLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <LessonSkeleton key={i} />
                  ))
                : analytics?.popularLessons.map((lesson, idx) => (
                    <LessonRow
                      key={lesson.lessonId}
                      lesson={lesson}
                      index={idx + 1}
                      type="popular"
                    />
                  ))}
            </div>
          </div>

          {/* CỘT 2: DIFFICULT LESSONS */}
          <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-[3rem] p-8 shadow-sm flex flex-col min-h-[500px]">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h2 className="font-black text-xl uppercase text-slate-900 dark:text-white tracking-tight">
                  Bài học thử thách
                </h2>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">
                  Điểm trung bình thấp nhất
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              {isDataLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <LessonSkeleton key={i} />
                  ))
                : analytics?.difficultLessons.map((lesson, idx) => (
                    <LessonRow
                      key={lesson.lessonId}
                      lesson={lesson}
                      index={idx + 1}
                      type="difficult"
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubMetric({ icon: Icon, label, value, color, isLoading }: any) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <Icon className={cn("w-4 h-4", color)} /> {label}
      </span>
      {isLoading ? (
        <div className="h-8 bg-slate-100 dark:bg-zinc-800/50 rounded-lg w-2/3 animate-pulse" />
      ) : (
        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
          {value !== undefined && value !== null ? value.toLocaleString("vi-VN") : "0"}
        </span>
      )}
    </div>
  );
}

function PulseRow({ icon: Icon, label, value, isLoading }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-800 dark:bg-white/5 rounded-lg border border-slate-700 dark:border-white/10">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </span>
      </div>
      {isLoading ? (
        <div className="h-6 bg-slate-800 dark:bg-white/5 rounded w-16 animate-pulse" />
      ) : (
        <span className="text-2xl font-black text-white tracking-tighter">
          {value !== undefined && value !== null ? value.toLocaleString("vi-VN") : "0"}
        </span>
      )}
    </div>
  );
}

function LessonRow({ lesson, index, type }: any) {
  const isDifficult = type === "difficult";
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#111111] hover:bg-white dark:hover:bg-zinc-800/80 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-zinc-800/80 flex items-center justify-center font-black text-slate-500 shrink-0">
        {index}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">
          {lesson.title}
        </h3>
        <div className="flex items-center gap-4 mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <span className="flex items-center gap-1.5">
            <PlayCircle className="w-3 h-3" /> {lesson.completionsCount} lượt học
          </span>
          <span
            className={cn(
              "flex items-center gap-1.5",
              isDifficult ? "text-red-500" : "text-emerald-500",
            )}
          >
            <Activity className="w-3 h-3" /> Điểm TB:{" "}
            {lesson.avgScore.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

function LessonSkeleton() {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#111111]">
      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-zinc-800/80 animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-zinc-800/80 rounded-full w-3/4 animate-pulse" />
        <div className="h-3 bg-slate-100 dark:bg-zinc-800/40 rounded-full w-1/3 animate-pulse" />
      </div>
    </div>
  );
}