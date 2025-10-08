import { HeroBanner } from "@/components/home/hero-banner"
import { ContinueLearning } from "@/components/home/continue-learning"
import { RecentLessons } from "@/components/home/recent-lessons"
import { RecommendedLessons } from "@/components/home/recommended-lessons"
import { PromotionalBanner } from "@/components/home/promotional-banner"
import { SidebarReview } from "@/components/home/sidebar-review"
import { SidebarLeaderboard } from "@/components/home/sidebar-leaderboard"
import { SidebarArticles } from "@/components/home/sidebar-articles"
import { homeData } from "@/lib/data/home-data"
import { Button } from "@/components/ui/button"
import { HeaderUser } from "@/components/layouts/User/HeaderUser"

export default function HomePage() {
  const recentLessons = [
    { lessonId: "0001", title: "[Oxford3000] Ep7: Office Work", code: "ESL 25313107" },
    { lessonId: "0002", title: "[Business] Meeting Basics", code: "BUS 18291045" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20">
      {/* Header */}
      <HeaderUser />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 font-mono">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <HeroBanner
              title={homeData.featured.title}
              description={homeData.featured.desc}
              image={homeData.featured.image}
              participants={homeData.featured.participants}
              daysLeft={homeData.featured.daysLeft}
            />

            <RecentLessons lessons={recentLessons} />

            <PromotionalBanner />

            <ContinueLearning lessons={homeData.continueLearning} />

            <RecommendedLessons lessonsByCategory={homeData.lessonsByCategory} />
          </div>

          {/* Right Column - Sidebar (1/3) */}
          <div className="space-y-6">
            <SidebarReview reviewDue={homeData.reminders.reviewDue} />

            <SidebarArticles articles={homeData.blog} />

            <SidebarLeaderboard entries={homeData.leaderboard} />
          </div>
        </div>
      </main>
    </div>
  )
}
