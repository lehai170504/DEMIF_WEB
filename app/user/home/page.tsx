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

  return (
    <div className="min-h-screen bg-card/50 dark:bg-slate-950">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 font-mono">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN - Main Content Area (8/12) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Banner nổi bật */}
            <HeroBanner
              title={homeData.featured.title}
              description={homeData.featured.desc}
              image={homeData.featured.image}
              participants={homeData.featured.participants}
              daysLeft={homeData.featured.daysLeft}
            />

            {/* Mục quan trọng nhất: Học tiếp */}
            <section className="space-y-4">
              <ContinueLearning lessons={homeData.continueLearning} />
            </section>

            {/* Banner quảng cáo/khuyến mãi xen kẽ để giảm bớt sự nhàm chán */}
            <PromotionalBanner />

            {/* Đề xuất bài học mới */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                Gợi ý cho bạn hôm nay
              </h2>
              <RecommendedLessons
                lessonsByCategory={homeData.lessonsByCategory}
              />
            </section>

            {/* Lịch sử học tập */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-700 tracking-tight">
                Vừa học gần đây
              </h2>
              <RecentLessons lessons={recentLessons} />
            </section>
          </div>

          {/* RIGHT COLUMN - Sidebar Statistics (4/12) */}
          <aside className="lg:col-span-4 w-full">
            {/* sticky: Giữ sidebar đứng yên khi scroll
                top-24: Cách mép trên một khoảng (thường để chừa chỗ cho Navbar)
            */}
            <div className="sticky top-24 space-y-6">
              <SidebarReview reviewDue={homeData.reminders.reviewDue} />

              <SidebarLeaderboard entries={homeData.leaderboard} />

              <SidebarArticles articles={homeData.blog} />

              {/* Footer phụ cho Sidebar (Tùy chọn) */}
              <div className="px-4 text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-2">
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Điều khoản
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Quyền riêng tư
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Trung tâm trợ giúp
                </a>
                <p>© 2024 Learning App</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
