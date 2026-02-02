"use client";

import { HeroBanner } from "@/components/home/hero-banner";
import { ContinueLearning } from "@/components/home/continue-learning";
import { RecentLessons } from "@/components/home/recent-lessons";
import { RecommendedLessons } from "@/components/home/recommended-lessons";
import { PromotionalBanner } from "@/components/home/promotional-banner";
import { SidebarReview } from "@/components/home/sidebar-review";
import { SidebarLeaderboard } from "@/components/home/sidebar-leaderboard";
import { SidebarArticles } from "@/components/home/sidebar-articles";
import { homeData } from "@/lib/data/home-data";
import { motion, Variants } from "framer-motion";

export default function HomePage() {
  const recentLessons = [
    {
      lessonId: "0001",
      title: "[Oxford3000] Ep7: Office Work",
      code: "ESL 25313107",
    },
    {
      lessonId: "0002",
      title: "[Business] Meeting Basics",
      code: "BUS 18291045",
    },
  ];

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
              title={homeData.featured.title}
              description={homeData.featured.desc}
              participants={homeData.featured.participants}
              daysLeft={homeData.featured.daysLeft}
            />
          </motion.div>

          {/* Học tiếp */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full inline-block shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              Tiếp tục học
            </h2>
            <ContinueLearning lessons={homeData.continueLearning} />
          </motion.section>

          {/* Banner quảng cáo */}
          <motion.div variants={itemVariants}>
            <PromotionalBanner />
          </motion.div>

          {/* Đề xuất bài học */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Gợi ý hôm nay
            </h2>
            <RecommendedLessons
              lessonsByCategory={homeData.lessonsByCategory}
            />
          </motion.section>

          {/* Lịch sử học tập */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-zinc-700 rounded-full inline-block" />
              Vừa học gần đây
            </h2>
            <RecentLessons lessons={recentLessons} />
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
              <SidebarReview reviewDue={homeData.reminders.reviewDue} />
            </motion.div>

            <motion.div variants={sidebarItemVariants}>
              <SidebarLeaderboard entries={homeData.leaderboard} />
            </motion.div>

            <motion.div variants={sidebarItemVariants}>
              <SidebarArticles articles={homeData.blog} />
            </motion.div>

            {/* Footer phụ */}
            <motion.div
              variants={sidebarItemVariants}
              className="px-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest flex flex-wrap gap-x-6 gap-y-3"
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
