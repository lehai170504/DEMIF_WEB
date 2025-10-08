import { Button } from "@/components/ui/button"
import { UserProfileCard } from "@/components/dashboard/user-profile-card"
import { LessonCardSmall } from "@/components/dashboard/lesson-card-small"
import { ScoreCard } from "@/components/dashboard/score-card"
import { StatsRow } from "@/components/dashboard/stats-row"
import { AchievementCards } from "@/components/dashboard/achievement-cards"
import { StreakCalendar } from "@/components/dashboard/streak-calendar"
import { TimeAccuracyCards } from "@/components/dashboard/time-accuracy-cards"
import { LearningAnalyticsChart } from "@/components/dashboard/learning-analytics-chart"
import { SkillBreakdownChart } from "@/components/dashboard/skill-breakdown-chart"
import { HeaderUser } from "@/components/layouts/User/HeaderUser"

export default function DashboardPage() {
  const recentLessons = [
    {
      id: "1",
      title: "[Oxford3000] Ep7: Office Work",
      code: "ESL 25313107",
      views: 921,
      source: "WELE",
      thumbnail: "/lesson-1.jpg",
    },
    {
      id: "2",
      title: "Always Alone: The Story of Japan's Hikikomori",
      code: "ESL 40280200",
      views: 9373,
      source: "Spotlight English",
      thumbnail: "/lesson-2.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-orange-100/50">
      <HeaderUser />

      <main className="container mx-auto px-6 py-6 font-mono">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-4">
          <div className="space-y-3">
            <UserProfileCard />

            <div className="space-y-2">
              {recentLessons.map((lesson) => (
                <LessonCardSmall key={lesson.id} {...lesson} />
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-orange-200 hover:bg-orange-50 text-red-500 bg-transparent"
              >
                Xem tất cả (2)
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <ScoreCard />
            <StatsRow />
            <AchievementCards />
            <LearningAnalyticsChart />
            <StreakCalendar />
          </div>

          <div className="space-y-3">
            <TimeAccuracyCards />
            <SkillBreakdownChart />
          </div>
        </div>
      </main>
    </div>
  )
}
