"use client";

import {
  Sparkles,
  History,
  ArrowRight,
  LayoutDashboard,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfileCard } from "@/components/dashboard/user-profile-card";
import { LessonCardSmall } from "@/components/dashboard/lesson-card-small";
import { ScoreCard } from "@/components/dashboard/score-card";
import { StatsRow } from "@/components/dashboard/stats-row";
import { AchievementCards } from "@/components/dashboard/achievement-cards";
import { StreakCalendar } from "@/components/dashboard/streak-calendar";
import { TimeAccuracyCards } from "@/components/dashboard/time-accuracy-cards";
import { LearningAnalyticsChart } from "@/components/dashboard/learning-analytics-chart";
import { SkillBreakdownChart } from "@/components/dashboard/skill-breakdown-chart";
import { motion } from "framer-motion";

// Component con tạo hiệu ứng Glass/3D dùng chung
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
    whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
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
    {/* Hiệu ứng ánh sáng viền khi hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 dark:from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    {children}
  </motion.div>
);

export default function DashboardPage() {
  const recentLessons = [
    {
      id: "1",
      title: "[Oxford3000] Ep7: Office Work",
      code: "ESL 25313107",
      views: 921,
      source: "DEMIF",
      thumbnail: "/lesson-1.jpg",
      duration: "15:30",
    },
    {
      id: "2",
      title: "Always Alone: The Story of Japan's Hikikomori",
      code: "ESL 40280200",
      views: 9373,
      source: "Spotlight English",
      thumbnail: "/lesson-2.jpg",
      duration: "12:45",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    // Đã xóa các class global thừa (bg, text color, selection).
    // Giữ lại `font-mono` và `pb-20` để style riêng cho dashboard.
    <div className="w-full font-mono pb-20">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* --- HEADER TITLE SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#FF7A00] mb-1">
              <LayoutDashboard className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] glow-text">
                Trung tâm điều khiển
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-gray-900 dark:text-white">
              Tổng quan <span className="text-gray-400 dark:text-zinc-600">Học tập</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/5">
            <History className="h-3 w-3" /> Cập nhật: Vừa xong
          </div>
        </motion.div>

        {/* --- MAIN GRID STRUCTURE --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
        >
          {/* === LEFT SIDEBAR (Col: 3/12) === */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col gap-6">
            {/* 1. User Profile Card */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-0 hoverEffect">
                <UserProfileCard />
              </GlassCard>
            </motion.div>

            {/* 2. Recent Lessons Box */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                    Bài học gần đây
                  </h3>
                  <div className="p-1.5 bg-orange-500/20 rounded-md">
                    <Target className="h-3.5 w-3.5 text-[#FF7A00]" />
                  </div>
                </div>

                <div className="space-y-3">
                  {recentLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="transition-transform hover:scale-[1.02] active:scale-95 duration-200"
                    >
                      <LessonCardSmall {...lesson} />
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="w-full mt-4 h-9 border border-gray-200 dark:border-white/10 rounded-lg font-bold text-[9px] uppercase tracking-widest text-gray-500 dark:text-zinc-400 hover:bg-[#FF7A00] hover:text-white hover:border-[#FF7A00] transition-all duration-300"
                >
                  Xem tất cả <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </GlassCard>
            </motion.div>
          </div>

          {/* === MAIN CONTENT (Col: 6/12) === */}
          <div className="md:col-span-8 lg:col-span-6 flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <GlassCard className="p-1" hoverEffect>
                <ScoreCard />
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatsRow />
            </motion.div>

            {/* Analytics Row */}
            <div className="grid grid-cols-1 gap-6">
              <motion.div variants={itemVariants}>
                <GlassCard className="p-6 bg-gray-50 dark:bg-black/20" hoverEffect>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-[#FF7A00]" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      Biểu đồ học tập
                    </h3>
                  </div>
                  <LearningAnalyticsChart />
                </GlassCard>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <GlassCard className="h-full p-4" hoverEffect>
                    <AchievementCards />
                  </GlassCard>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <GlassCard className="h-full p-4" hoverEffect>
                    <StreakCalendar />
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          </div>

          {/* === RIGHT SIDEBAR (Col: 3/12) === */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <GlassCard className="p-4" hoverEffect>
                <TimeAccuracyCards />
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="p-4" hoverEffect>
                <SkillBreakdownChart />
              </GlassCard>
            </motion.div>

            {/* AI Insight Widget */}
            <motion.div variants={itemVariants}>
              <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-b from-[#FF7A00] to-transparent overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF7A00]/20 to-transparent blur-xl transition-opacity opacity-50 group-hover:opacity-100" />

                <div className="relative p-6 bg-white dark:bg-[#121212]/80 backdrop-blur-md rounded-[1.9rem] h-full overflow-hidden">
                  <div className="absolute top-[-20px] right-[-20px] opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                    <Sparkles className="w-24 h-24 text-orange-500" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 dark:text-orange-400">
                        AI Assistant
                      </h4>
                    </div>

                    <p className="text-sm font-medium leading-relaxed text-gray-700 dark:text-zinc-300 italic mb-6 border-l-2 border-orange-500/50 pl-3">
                      "Kỹ năng{" "}
                      <span className="text-gray-900 dark:text-white font-bold">Shadowing</span>{" "}
                      của bạn đang cải thiện rõ rệt. Hãy thử thách với các bài
                      học có tốc độ nhanh hơn để đột phá!"
                    </p>

                    <Button className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-orange-900/20 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-300">
                      Luyện tập ngay <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
