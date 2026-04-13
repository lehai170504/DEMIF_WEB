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
import { SuggestedLessonCard } from "@/components/dashboard/suggested-lesson-card"; // Import mới
import { motion, Variants } from "framer-motion";
import { useUserLessons } from "@/hooks/use-lesson";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Glass card component (Wrapper chuẩn)
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
    whileHover={hoverEffect ? { y: -4 } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={cn(
      "relative overflow-hidden bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-white/5 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-black/20",
      className,
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/50 dark:from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    {children}
  </motion.div>
);

export default function DashboardPage() {
  const router = useRouter();
  const { data: lessonsData, isLoading: isLoadingLessons } = useUserLessons({
    page: 1,
    pageSize: 4,
  });

  const suggestedLessons = (lessonsData?.items ?? []).slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="w-full min-h-screen font-mono pb-24 bg-gray-50/50 dark:bg-[#050505]">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200 dark:border-white/5"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#FF7A00]">
              <LayoutDashboard className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Trung tâm điều khiển
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none text-gray-900 dark:text-white flex items-center gap-3">
              Tổng quan
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 p-2 rounded-lg">
                Học tập
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 dark:text-zinc-500 uppercase tracking-widest bg-white dark:bg-[#0D0D0D] px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
            <History className="h-3.5 w-3.5 text-orange-500" /> Cập nhật: Vừa
            xong
          </div>
        </motion.div>

        {/* ── CONTENT GRID ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
        >
          {/* CỘT TRÁI */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8">
            <motion.div
              variants={itemVariant}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8"
            >
              <div className="md:col-span-4 h-full">
                <GlassCard className="p-0 h-full" hoverEffect>
                  <UserProfileCard />
                </GlassCard>
              </div>
              <div className="md:col-span-8 h-full">
                <GlassCard className="p-0 h-full" hoverEffect>
                  <ScoreCard />
                </GlassCard>
              </div>
            </motion.div>

            <motion.div variants={itemVariant}>
              <StatsRow />
            </motion.div>

            <motion.div variants={itemVariant}>
              <GlassCard className="p-0">
                <LearningAnalyticsChart />
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariant}>
              <GlassCard className="p-0">
                <StreakCalendar />
              </GlassCard>
            </motion.div>
          </div>

          {/* CỘT PHẢI */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 sticky top-8">
            <motion.div variants={itemVariant}>
              <GlassCard className="p-0">
                <SkillBreakdownChart />
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariant} className="flex-1 flex flex-col">
              <GlassCard className="p-6 md:p-8 flex flex-col h-full flex-1">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/20 shadow-inner">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">
                      Tiếp tục học
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 flex-1 relative z-10">
                  {isLoadingLessons ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                  ) : suggestedLessons.length > 0 ? (
                    suggestedLessons.map((lesson: any) => (
                      <SuggestedLessonCard key={lesson.id} lesson={lesson} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 opacity-60">
                      <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-full">
                        <BookOpen className="w-8 h-8 text-gray-400 dark:text-zinc-600" />
                      </div>
                      <p className="text-[10px] font-black text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                        Chưa có bài học nào
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => router.push("/dictation")}
                  className="w-full mt-8 h-14 bg-gray-100 dark:bg-white/[0.02] hover:bg-orange-500 border border-gray-200 dark:border-white/5 text-gray-600 dark:text-zinc-400 hover:text-white hover:border-orange-500 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 group relative z-10 shadow-sm"
                >
                  Khám phá thêm
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
