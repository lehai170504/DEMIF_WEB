"use client";

import {
  ArrowRight,
  LayoutDashboard,
  History,
  BookOpen,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfileCard } from "@/components/dashboard/user-profile-card";
import { ScoreCard } from "@/components/dashboard/score-card";
import { StatsRow } from "@/components/dashboard/stats-row";
import { StreakCalendar } from "@/components/dashboard/streak-calendar";
import { LearningAnalyticsChart } from "@/components/dashboard/learning-analytics-chart";
import { SkillBreakdownChart } from "@/components/dashboard/skill-breakdown-chart";
import { motion } from "framer-motion";
import { useUserLessons } from "@/hooks/use-lesson";
import { useRouter } from "next/navigation";

// Glass card component
const GlassCard = ({
  children,
  className = "",
  hoverEffect = false,
}: {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}) => (
  <motion.div
    whileHover={hoverEffect ? { y: -3, scale: 1.004 } : {}}
    transition={{ type: "spring", stiffness: 300 }}
    className={`
      relative overflow-hidden
      bg-white dark:bg-white/5 backdrop-blur-xl
      border border-gray-200 dark:border-white/10
      rounded-[2rem]
      shadow-lg shadow-gray-200/50 dark:shadow-black/20
      ${className}
    `}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 dark:from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    {children}
  </motion.div>
);

// Small lesson card
function SuggestedLessonCard({ lesson }: { lesson: any }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/dictation/${lesson.id}`)}
      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-[#FF7A00]/30 transition-all cursor-pointer group"
    >
      <div className="relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-zinc-800">
        {lesson.thumbnailUrl ? (
          <img src={lesson.thumbnailUrl} alt={lesson.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-gray-900 border-b-[4px] border-b-transparent ml-0.5" />
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[10px] font-black text-gray-900 dark:text-white truncate leading-tight">{lesson.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[8px] font-bold text-[#FF7A00] bg-orange-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
            {lesson.source ?? "DEMIF"}
          </span>
          {lesson.viewCount != null && (
            <span className="text-[8px] text-gray-400 dark:text-zinc-600">
              {lesson.viewCount.toLocaleString("vi-VN")} lượt
            </span>
          )}
        </div>
      </div>
      <ArrowRight className="h-3 w-3 text-gray-400 dark:text-zinc-600 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all flex-shrink-0" />
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: lessonsData, isLoading: isLoadingLessons } = useUserLessons({ page: 1, pageSize: 3 });
  const suggestedLessons = (lessonsData?.items ?? []).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="w-full font-mono pb-20">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 space-y-6">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#FF7A00]">
              <LayoutDashboard className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">Trung tâm điều khiển</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-gray-900 dark:text-white">
              Tổng quan <span className="text-gray-400 dark:text-zinc-600">Học tập</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/5">
            <History className="h-3 w-3" /> Cập nhật: Vừa xong
          </div>
        </motion.div>

        {/* ── CONTENT GRID ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >

          {/* ══ ROW 1: Profile (3) | Score (9) ══ */}
          <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Profile */}
            <div className="lg:col-span-3">
              <GlassCard className="p-0 h-full" hoverEffect>
                <UserProfileCard />
              </GlassCard>
            </div>

            {/* Score — uses its own Card internally */}
            <div className="lg:col-span-9">
              <motion.div
                className="h-full"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ScoreCard />
              </motion.div>
            </div>
          </motion.div>

          {/* ══ ROW 2: Stats (full width) ══ */}
          <motion.div variants={item}>
            <StatsRow />
          </motion.div>

          {/* ══ ROW 3: Analytics (8) | Skills + Suggested stacked (4) ══ */}
          <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Analytics Chart — internal Cards */}
            <div className="lg:col-span-8">
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
                <LearningAnalyticsChart />
              </motion.div>
            </div>

            {/* Right side: SkillBreakdown + SuggestedLessons stacked */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Skill Breakdown — internal Card */}
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
                <SkillBreakdownChart />
              </motion.div>

              {/* Suggested Lessons */}
              <GlassCard className="p-5 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                    Gợi ý bài học
                  </h3>
                  <div className="p-1.5 bg-orange-500/20 rounded-md">
                    <BookOpen className="h-3.5 w-3.5 text-[#FF7A00]" />
                  </div>
                </div>

                <div className="space-y-2">
                  {isLoadingLessons ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                    </div>
                  ) : suggestedLessons.length > 0 ? (
                    suggestedLessons.map((lesson: any) => (
                      <SuggestedLessonCard key={lesson.id} lesson={lesson} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 gap-2">
                      <BookOpen className="w-8 h-8 text-gray-300 dark:text-zinc-700" />
                      <p className="text-xs text-gray-400 dark:text-zinc-600 text-center">
                        Không có bài học nào
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  onClick={() => router.push("/dictation")}
                  className="w-full mt-4 h-9 border border-gray-200 dark:border-white/10 rounded-lg font-bold text-[9px] uppercase tracking-widest text-gray-500 dark:text-zinc-400 hover:bg-[#FF7A00] hover:text-white hover:border-[#FF7A00] transition-all duration-300"
                >
                  Xem tất cả bài học <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </GlassCard>
            </div>
          </motion.div>

          {/* ══ ROW 4: Streak Calendar (full width) ══ */}
          <motion.div variants={item}>
            <StreakCalendar />
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
