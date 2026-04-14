"use client";

import { HeroBanner } from "@/components/home/hero-banner";
import { ContinueLearning } from "@/components/home/continue-learning";
import { RecentLessons } from "@/components/home/recent-lessons";
import { RecommendedLessons } from "@/components/home/recommended-lessons";
import { PromotionalBanner } from "@/components/home/promotional-banner";
import { SidebarReview } from "@/components/home/sidebar-review";
import { SidebarLeaderboard } from "@/components/home/sidebar-leaderboard";
import { SidebarArticles } from "@/components/home/sidebar-articles";
import { SidebarStreak } from "@/components/home/sidebar-streak";

import { motion, Variants } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { statsService } from "@/services/stats.service";
import { blogService } from "@/services/blog.service";
import { lessonService } from "@/services/lesson.service";
import { useLessonHistory } from "@/hooks/use-lesson";
import { useMySubscription } from "@/hooks/use-subscription";
import { vocabularyService } from "@/services/vocabulary.service";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  
  const { data: mySubscription } = useMySubscription();
  const isPremiumUser =
    mySubscription?.status === "Active" &&
    mySubscription?.tier &&
    mySubscription.tier !== "Free";
  
  // Leaderboard
  const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => statsService.getLeaderboard(5),
  });

  // Blogs
  const { data: blogData, isLoading: isLoadingBlogs } = useQuery({
    queryKey: ["blogs-home"],
    queryFn: () => blogService.getBlogs(),
  });

  // Lessons (Recommended - simplified as all latest lessons for now)
  const { data: lessonsData, isLoading: isLoadingLessons } = useQuery({
    queryKey: ["lessons-home", user?.currentLevel],
    queryFn: () =>
      lessonService.getUserLessons({
        pageSize: 10,
        level: user?.currentLevel, // Filter by user level
      }),
  });

  // Vocabulary Overview (Review Due)
  const { data: vocabOverview, isLoading: isLoadingVocab } = useQuery({
    queryKey: ["vocab-overview"],
    queryFn: () => vocabularyService.getOverview(),
  });

  // Progress (Stats Summary)
  const { data: statsSummary, isLoading: isLoadingStats } = useQuery({
    queryKey: ["stats-summary"],
    queryFn: () => statsService.getSummary(),
  });

  // Daily Practice (for progress bar)
  const { data: dailyPracticeData } = useQuery({
    queryKey: ["daily-practice-today"],
    queryFn: () => statsService.getDailyPractice(1),
  });

  // Recent History
  const { data: lessonHistory, isLoading: isLoadingHistory } = useLessonHistory({ pageSize: 5 });

  // Mapping dynamic data
  const leaderboardItems = leaderboardData?.data || leaderboardData;
  const leaderboard = Array.isArray(leaderboardItems)
    ? leaderboardItems.map((entry: any, index: number) => ({
        rank: entry.rank || index + 1,
        name: entry.username || entry.userName || entry.fullName || "Unknown",
        xp: entry.totalPoints || entry.totalXp || 0,
        streak: entry.currentStreak || 0,
        avatar: entry.avatarUrl || null,
      }))
    : [];

  // Calculate Progress Percent
  const todayMinutes = dailyPracticeData?.data?.[0]?.minutes || 0;
  const dailyGoal = user?.dailyGoalMinutes || 30; // Default 30 if not set
  const progressPercent = Math.min(Math.round((todayMinutes / dailyGoal) * 100), 100);

  const articles =
    blogData?.map((blog: any) => ({
      title: blog.title,
      excerpt: blog.summary || "",
      link: `/blog/${blog.id}`,
      image: blog.thumbnailUrl || "/listening-tips-illustration.jpg",
      date: new Date(blog.createdAt).toLocaleDateString("vi-VN"),
    })) || [];

  const mapLessonToComponent = (lesson: any) => ({
    lessonId: lesson.id,
    title: lesson.title,
    progress: Math.random() * 0.5 + 0.1, // Mock progress for now as API doesn't return it yet
    level: (lesson.level || "beginner").toLowerCase(),
    duration: Math.floor(lesson.durationSeconds / 60) || 0,
    category: lesson.category || "General",
    rating: lesson.avgScore || 4.5,
    isPremiumOnly: lesson.isPremiumOnly || false,
  });

  // Continue Learning (Latest 4)
  const continueLearning =
    lessonsData?.items?.slice(0, 4).map(mapLessonToComponent) || [];

  // Recommended (By Category)
  const recommendedByCategory = {
    all: lessonsData?.items?.map(mapLessonToComponent) || [],
    beginner:
      lessonsData?.items
        ?.filter((l: any) => l.level === "Beginner")
        .map(mapLessonToComponent) || [],
    intermediate:
      lessonsData?.items
        ?.filter((l: any) => l.level === "Intermediate")
        .map(mapLessonToComponent) || [],
    advanced:
      lessonsData?.items
        ?.filter((l: any) => l.level === "Advanced")
        .map(mapLessonToComponent) || [],
  };

  const recentLessonsFormatted =
    lessonHistory?.items?.slice(0, 4).map((lesson: any) => ({
      lessonId: lesson.lessonId,
      title: lesson.title,
      code: lesson.lessonId.substring(0, 8).toUpperCase(),
    })) || [];

  // 1. Container variants: Điều phối các phần tử con xuất hiện lần lượt
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Thời gian trễ giữa các phần tử con
        delayChildren: 0.1,
      },
    },
  };

  // 2. Item variants: Hiệu ứng 3D nhẹ (trượt lên + mờ -> rõ + scale)
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)", // Hiệu ứng mờ ảo futuristic
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 1,
      },
    },
  };

  // 3. Sidebar variants: Trượt từ phải sang nhẹ nhàng
  const sidebarItemVariants: Variants = {
    hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const featuredCampaign = {
    title: "Chiến lược luyện nghe hiệu quả",
    desc: "Cùng DEMIF chinh phục kỹ năng nghe chép chính tả mỗi ngày!",
    participants: 173,
    daysLeft: 24,
  };

  return (
    <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* --- LEFT COLUMN (8/12) --- */}
        <motion.div
          className="lg:col-span-8 space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Banner (Animation riêng trong component con, giữ nguyên thẻ wrapper để layout) */}
          <motion.div variants={itemVariants}>
            <HeroBanner
              title={featuredCampaign.title}
              description={featuredCampaign.desc}
              participants={featuredCampaign.participants}
              daysLeft={featuredCampaign.daysLeft}
            />
          </motion.div>

          {/* Học tiếp */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full inline-block shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              Tiếp tục học
            </h2>
            <ContinueLearning lessons={continueLearning} isPremiumUser={isPremiumUser} />
          </motion.section>

          {/* Banner quảng cáo */}
          <motion.div variants={itemVariants}>
            <PromotionalBanner />
          </motion.div>

          {/* Đề xuất bài học */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Gợi ý hôm nay
            </h2>
            <RecommendedLessons
              lessonsByCategory={recommendedByCategory}
              isPremiumUser={isPremiumUser}
            />
          </motion.section>

          {/* Lịch sử học tập */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-600 dark:text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gray-400 dark:bg-zinc-700 rounded-full inline-block" />
              Vừa học gần đây
            </h2>
            <RecentLessons lessons={recentLessonsFormatted} />
          </motion.section>
        </motion.div>

        {/* --- RIGHT COLUMN (4/12) --- */}
        <aside className="lg:col-span-4 w-full">
          <motion.div
            className="sticky top-28 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={sidebarItemVariants}>
              <SidebarReview
                reviewDue={vocabOverview?.dueCount ?? 0}
                progressPercent={progressPercent}
              />
            </motion.div>

            <motion.div variants={sidebarItemVariants}>
              <SidebarLeaderboard entries={leaderboard} />
            </motion.div>

            <motion.div variants={sidebarItemVariants}>
              <SidebarArticles articles={articles} />
            </motion.div>

            <motion.div variants={sidebarItemVariants}>
              <SidebarStreak
                currentStreak={statsSummary?.currentStreak ?? 0}
              />
            </motion.div>

            {/* Footer phụ */}
            <motion.div
              variants={sidebarItemVariants}
              className="px-4 text-[10px] text-gray-500 dark:text-zinc-600 font-bold uppercase tracking-widest flex flex-wrap gap-x-6 gap-y-3"
            >
              <a href="#" className="hover:text-orange-500 transition-colors">
                Điều khoản
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Quyền riêng tư
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Trợ giúp
              </a>
              <p>© 2024 DEMIF INC.</p>
            </motion.div>
          </motion.div>
        </aside>
      </div>
    </main>
  );
}
