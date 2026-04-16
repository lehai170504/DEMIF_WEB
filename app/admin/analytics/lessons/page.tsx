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
} from "recharts";

const COLORS = [
  "#f59e0b",
  "#3b82f6",
  "#10b981",
  "#6366f1",
  "#ef4444",
  "#8b5cf6",
];

export default function LessonsAnalyticsPage() {
  const { data, isLoading } = useAdminLessons();

  return (
    <div className="space-y-8 pb-10">
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
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 self-start mb-6">
            <PieIcon className="w-5 h-5 text-orange-500" />
            <h2 className="font-black text-lg uppercase">Phân bổ Trình độ</h2>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.byLevel}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="key"
                >
                  {/* Fix: Định nghĩa index là number và _ là bất kỳ (any) hoặc KeyCountDto */}
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

        {/* 3. Biểu đồ cột đứng (Bar Chart) cho Loại bài học */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <h2 className="font-black text-lg uppercase">
              Thống kê theo Loại bài học
            </h2>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.byType}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#333"
                />
                <XAxis dataKey="key" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
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
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Danh sách bảng xếp hạng - Tận dụng grid để tiết kiệm không gian */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            <h2 className="font-black text-lg uppercase">Top Thịnh Hành</h2>
          </div>
          <div className="bg-slate-50/50 dark:bg-white/5 rounded-3xl p-4 border border-slate-100 dark:border-white/5">
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
          <div className="flex items-center gap-2">
            <List className="w-5 h-5 text-red-500" />
            <h2 className="font-black text-lg uppercase">Thử thách nhất</h2>
          </div>
          <div className="bg-slate-50/50 dark:bg-white/5 rounded-3xl p-4 border border-slate-100 dark:border-white/5">
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
