"use client";

import { HeroBanner } from "@/components/home/hero-banner";
import { ContinueLearning } from "@/components/home/continue-learning";
import { RecentVocabulary } from "@/components/home/recent-vocabulary";
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
import { useAuth } from "@/contexts/AuthContext";
import { useVocabularyOverview } from "@/hooks/use-vocabulary";
import { useLessonHistory } from "@/hooks/use-lesson";

export default function HomePage() {
  const { user } = useAuth();

  // ===== SUBSCRIPTION =====
  const { data: mySubscription } = useQuery({
    queryKey: ["my-subscription"],
    queryFn: () => Promise.resolve({ status: "Active", tier: "Free" }),
  });

  const isPremiumUser =
    mySubscription?.status === "Active" &&
    (mySubscription?.tier ?? "Free") !== "Free";

  // ===== LEADERBOARD =====
  const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => statsService.getLeaderboard(5),
  });

  // ===== BLOG =====
  const { data: blogData, isLoading: isLoadingBlogs } = useQuery({
    queryKey: ["blogs-home"],
    queryFn: () => blogService.getBlogs(),
  });

  // ===== LESSON =====
  const { data: lessonsData, isLoading: isLoadingLessons } = useQuery({
    queryKey: ["lessons-home", user?.currentLevel],
    queryFn: () =>
      lessonService.getUserLessons({
        pageSize: 15,
        level: user?.currentLevel,
      }),
    enabled: !!user,
  });

  // ===== VOCAB OVERVIEW (FIX CHUẨN) =====
  const { data: vocabOverview, isLoading: isLoadingVocab } =
    useVocabularyOverview();

  // ===== STATS =====
  const { data: statsSummary, isLoading: isLoadingStats } = useQuery({
    queryKey: ["stats-summary"],
    queryFn: () => statsService.getSummary(),
  });

  // ===== DAILY PRACTICE =====
  const { data: dailyPracticeData, isLoading: isLoadingPractice } = useQuery({
    queryKey: ["daily-practice-today"],
    queryFn: () => statsService.getDailyPractice(1),
  });

  // ===== HISTORY =====
  const { data: lessonHistory, isLoading: isLoadingHistory } = useLessonHistory({ pageSize: 15 });

  // ===== GLOBAL LOADING =====
  const isPageLoading =
    isLoadingLeaderboard ||
    isLoadingBlogs ||
    isLoadingLessons ||
    isLoadingVocab ||
    isLoadingStats ||
    isLoadingPractice ||
    isLoadingHistory;

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // ===== LEADERBOARD MAP =====
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

  // ===== DAILY PROGRESS =====
  const todayMinutes = dailyPracticeData?.data?.[0]?.minutes || 0;
  const dailyGoal = user?.dailyGoalMinutes || 30;

  const progressPercent = Math.min(
    Math.round((todayMinutes / dailyGoal) * 100),
    100,
  );

  // ===== BLOG MAP =====
  const articles =
    blogData?.map((blog: any) => ({
      title: blog.title,
      excerpt: blog.summary || "",
      link: `/blog/${blog.id}`,
      image: blog.thumbnailUrl || "/listening-tips-illustration.jpg",
      date: new Date(blog.createdAt).toLocaleDateString("vi-VN"),
    })) || [];

  // ===== LESSON MAP =====
  const mapLessonToComponent = (lesson: any, progressPercent?: number) => ({
    lessonId: lesson.id,
    title: lesson.title,
    progress: progressPercent !== undefined ? progressPercent : 0, 
    level: (lesson.level || "beginner").toLowerCase(),
    duration: Math.floor(lesson.durationSeconds / 60) || 0,
    category: lesson.category || "General",
    rating: lesson.avgScore || 4.5,
    isPremiumOnly: lesson.isPremiumOnly || false,
    thumbnailUrl: lesson.thumbnailUrl || (lesson.videoId ? `https://i.ytimg.com/vi/${lesson.videoId}/hqdefault.jpg` : "/video-placeholder.png"),
  });

  const historyMap = new Map();
  if (lessonHistory?.items) {
    lessonHistory.items.forEach((h: any) => {
      historyMap.set(h.lessonId, {
        status: h.status,
        progressPercent: h.progressPercent ?? (h.status === "Completed" ? 1 : 0.5)
      });
    });
  }

  // Continue Learning: map history with lesson data
  const continueLearning =
    lessonsData?.items
      ?.filter((lesson: any) => historyMap.has(lesson.id))
      .map((lesson: any) => {
        const historyData = historyMap.get(lesson.id);
        return mapLessonToComponent(lesson, historyData.progressPercent);
      })
      .slice(0, 4) || [];

  // Recommended: ONLY lessons NOT in history
  const recommendedLessons =
    lessonsData?.items
      ?.filter((lesson: any) => !historyMap.has(lesson.id))
      .map((lesson: any) => mapLessonToComponent(lesson)) || [];

  const recentVocabsFormatted =
    vocabOverview?.recentItems?.slice(0, 4).map((vocab: any) => ({
      id: vocab.id,
      word: vocab.word,
      meaning: vocab.meaning,
      topic: vocab.topic || vocab.lessonCategory || "Vocabulary",
    })) || [];

  const hasRecentVocab = recentVocabsFormatted.length > 0;

  // ===== ANIMATION =====
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  const sidebarItemVariants: Variants = {
    hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5 },
    },
  };

  const featuredCampaign = {
    title: "Chiến lược luyện nghe hiệu quả",
    description: "Cùng DEMIF chinh phục kỹ năng nghe chép chính tả mỗi ngày!",
    participants: 173,
    daysLeft: 24,
  };

  // ===== UI =====
  return (
    <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <motion.div
          className="lg:col-span-8 space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <HeroBanner {...featuredCampaign} />
          </motion.div>

          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold">Tiếp tục học</h2>
            <ContinueLearning
              lessons={continueLearning}
              isPremiumUser={isPremiumUser}
            />
          </motion.section>

          <motion.div variants={itemVariants}>
            <PromotionalBanner />
          </motion.div>

          {/* Đề xuất bài học (Chưa học) */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold">Gợi ý hôm nay</h2>
            <RecommendedLessons
              lessons={recommendedLessons}
              isPremiumUser={isPremiumUser}
            />
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold">Lịch sử từ vựng</h2>

            {hasRecentVocab ? (
              <RecentVocabulary vocabularies={recentVocabsFormatted} />
            ) : (
              <p className="text-sm text-gray-500">Chưa có từ vựng gần đây</p>
            )}
          </motion.section>
        </motion.div>

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
              <SidebarStreak currentStreak={statsSummary?.currentStreak ?? 0} />
            </motion.div>
          </motion.div>
        </aside>
      </div>
    </main>
  );
}
