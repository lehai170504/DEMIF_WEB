"use client";

import { useAdminLessons } from "@/hooks/use-admin-analytics";
import { MiniMetricCard } from "@/components/admin/dashboard/stat-cards";
import { TailwindChartCard } from "@/components/admin/dashboard/chart-card";
import {
  LessonRow,
  SkeletonRow,
} from "@/components/admin/dashboard/lesson-row";
import {
  BookOpen,
  PlayCircle,
  BarChart3,
  Activity,
  Layers,
  Headphones,
  Youtube,
} from "lucide-react";

export default function LessonsAnalyticsPage() {
  const { data, isLoading } = useAdminLessons();

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TailwindChartCard
          title="Theo Trình độ"
          icon={BarChart3}
          data={data?.byLevel}
          colorTheme="orange"
          isLoading={isLoading}
        />
        <TailwindChartCard
          title="Loại Bài học (Type)"
          icon={Layers}
          data={data?.byType}
          colorTheme="blue"
          isLoading={isLoading}
        />
        <TailwindChartCard
          title="Danh mục (Category)"
          icon={BookOpen}
          data={data?.byCategory}
          colorTheme="indigo"
          isLoading={isLoading}
        />
      </div>

      {/* Lists */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6">
          <h2 className="font-black text-lg uppercase mb-4">
            Bài học Thịnh hành
          </h2>
          <div className="flex flex-col gap-3">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
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
        <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6">
          <h2 className="font-black text-lg uppercase mb-4">
            Bài học Thử thách (Khó)
          </h2>
          <div className="flex flex-col gap-3">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
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
  );
}
