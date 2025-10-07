import { HeroBanner } from "@/components/home/hero-banner"
import { ContinueLearning } from "@/components/home/continue-learning"
import { RecentLessons } from "@/components/home/recent-lessons"
import { RecommendedLessons } from "@/components/home/recommended-lessons"
import { PromotionalBanner } from "@/components/home/promotional-banner"
import { SidebarReview } from "@/components/home/sidebar-review"
import { SidebarLeaderboard } from "@/components/home/sidebar-leaderboard"
import { SidebarArticles } from "@/components/home/sidebar-articles"
import { homeData } from "@/lib/data/home-data"

export default function HomePage() {
  const recentLessons = [
    { lessonId: "0001", title: "[Oxford3000] Ep7: Office Work", code: "ESL 25313107" },
    { lessonId: "0002", title: "[Business] Meeting Basics", code: "BUS 18291045" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <h1 className="font-display text-2xl font-bold text-orange-600">DEMIF</h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/home" className="text-sm font-medium text-gray-700 hover:text-orange-600">
                Bài nghe
              </a>
              <a href="/shadowing" className="text-sm font-medium text-gray-700 hover:text-orange-600">
                Thử thách
              </a>
              <a href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-orange-600">
                Lớp học
              </a>
              <a href="/blog" className="text-sm font-medium text-gray-700 hover:text-orange-600">
                Blog
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
              Nâng cấp
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white">
              Hu
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
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
