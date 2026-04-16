"use client";

import { useAdminLessons } from "@/hooks/use-admin-analytics";
import { MiniMetricCard } from "@/components/admin/dashboard/stat-cards";
import {
  LessonRow,
  SkeletonRow,
} from "@/components/admin/dashboard/lesson-row";
import {
  BookOpen,
  PlayCircle,
  Activity,
  Headphones,
  Youtube,
  BarChart3,
  PieChart as PieIcon,
  List,
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

// Nâng cấp bộ màu Gradient đồng bộ với toàn hệ thống
const GRADIENTS = [
  { id: "grad-orange", from: "#f97316", to: "#f59e0b" },
  { id: "grad-blue", from: "#3b82f6", to: "#8b5cf6" },
  { id: "grad-emerald", from: "#10b981", to: "#059669" },
  { id: "grad-rose", from: "#f43f5e", to: "#e11d48" },
  { id: "grad-indigo", from: "#6366f1", to: "#a855f7" },
  { id: "grad-teal", from: "#14b8a6", to: "#0ea5e9" },
];

export default function LessonsAnalyticsPage() {
  const { data, isLoading } = useAdminLessons();

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

      {/* 1. KPI Cards - Giữ nguyên vì nó là chuẩn mực để xem số nhanh */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MiniMetricCard
          icon={BookOpen}
          title="Tổng Bài học"
          value={data?.totalLessons}
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={PlayCircle}
          title="Đã Xuất bản"
          value={data?.publishedLessons}
          color="text-emerald-500"
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={Activity}
          title="Lượt Hoàn thành"
          value={data?.totalCompletions}
          color="text-orange-500"
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={Headphones}
          title="Bài Audio"
          value={data?.audioLessons}
          color="text-blue-500"
          isLoading={isLoading}
        />
        <MiniMetricCard
          icon={Youtube}
          title="Bài Youtube"
          value={data?.youtubeLessons}
          color="text-red-500"
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Biểu đồ tròn (Donut Chart) cho Trình độ */}
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col items-center shadow-xl shadow-black/5 dark:shadow-black/20 transition-all hover:border-orange-500/30">
          <div className="flex items-center gap-2 self-start mb-6">
            <div className="p-2 bg-orange-500/10 rounded-xl">
              <PieIcon className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
              Phân bổ Trình độ
            </h2>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.byLevel}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="count"
                  nameKey="key"
                  stroke="none"
                  cornerRadius={8}
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

        {/* 3. Biểu đồ cột đứng (Bar Chart) cho Loại bài học */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all hover:border-blue-500/30">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <BarChart3 className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
              Thống kê theo Loại bài học
            </h2>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.byType}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(150,150,150,0.15)"
                />
                <XAxis
                  dataKey="key"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12, fontWeight: 800 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(150,150,150,0.05)" }}
                  contentStyle={customTooltipStyle}
                  itemStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="count"
                  radius={[10, 10, 0, 0]}
                  barSize={45}
                  background={{
                    fill: "rgba(150,150,150,0.05)",
                    radius: 10,
                  }} /* Đã fix lỗi TS number[] ở đây */
                >
                  {/* Tô màu Gradient cho từng cột Bar */}
                  {data?.byType?.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#${GRADIENTS[(index + 1) % GRADIENTS.length].id})`}
                    />
                  ))}
                  {/* Hiển thị số lượng ngay trên đỉnh cột */}
                  <LabelList
                    dataKey="count"
                    position="top"
                    fill="#888"
                    fontSize={12}
                    fontWeight="bold"
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Danh sách bảng xếp hạng - Tận dụng grid để tiết kiệm không gian */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
              Top Thịnh Hành
            </h2>
          </div>
          <div className="bg-slate-50/50 dark:bg-white/5 rounded-3xl p-4 border border-slate-100 dark:border-white/5 shadow-lg shadow-black/5">
            <div className="flex flex-col gap-3">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))
                : data?.popularLessons?.map((lesson: any, idx: number) => (
                    <LessonRow
                      key={lesson.lessonId}
                      lesson={lesson}
                      index={idx + 1}
                      type="popular"
                    />
                  ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="p-2 bg-rose-500/10 rounded-xl">
              <List className="w-5 h-5 text-rose-500" />
            </div>
            <h2 className="font-black text-[13px] uppercase tracking-wider text-gray-800 dark:text-slate-200">
              Thử thách nhất
            </h2>
          </div>
          <div className="bg-slate-50/50 dark:bg-white/5 rounded-3xl p-4 border border-slate-100 dark:border-white/5 shadow-lg shadow-black/5">
            <div className="flex flex-col gap-3">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))
                : data?.difficultLessons?.map((lesson: any, idx: number) => (
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
