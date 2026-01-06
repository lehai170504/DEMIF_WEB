"use client";

import {
  Sparkles,
  History,
  ArrowRight,
  LayoutDashboard,
  Target,
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

export default function DashboardPage() {
  const recentLessons = [
    {
      id: "1",
      title: "[Oxford3000] Ep7: Office Work",
      code: "ESL 25313107",
      views: 921,
      source: "DEMIF",
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
  ];

  return (
    <div className="min-h-screen bg-card/50 dark:bg-slate-950 font-mono">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <LayoutDashboard className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Hệ thống học tập
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-slate-900">
              My <span className="text-slate-300">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <History className="h-3 w-3" /> Cập nhật lần cuối: 2 phút trước
          </div>
        </div>

        {/* Main Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT SIDEBAR (Col: 3/12) */}
          <div className="md:col-span-12 lg:col-span-3 space-y-6">
            <UserProfileCard />

            {/* Recent Lessons Box */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Bài học gần đây
                </h3>
                <Target className="h-4 w-4 text-orange-500" />
              </div>
              <div className="space-y-4">
                {recentLessons.map((lesson) => (
                  <div key={lesson.id} className="group cursor-pointer">
                    <LessonCardSmall {...lesson} />
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-6 border-slate-200 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-orange-50 hover:text-orange-600 transition-all"
              >
                Xem tất cả bài học <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* MAIN CONTENT (Col: 6/12) */}
          <div className="md:col-span-8 lg:col-span-6 space-y-6">
            <ScoreCard />
            <StatsRow />

            {/* Analytics Row */}
            <div className="grid grid-cols-1 gap-6">
              <LearningAnalyticsChart />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AchievementCards />
                <StreakCalendar />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (Col: 3/12) */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <TimeAccuracyCards />
            <SkillBreakdownChart />

            {/* AI Insight Widget (Mới) */}
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group">
              <div className="absolute top-[-20px] right-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Sparkles className="w-24 h-24 text-orange-500" />
              </div>
              <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-4">
                  Gợi ý từ AI
                </h4>
                <p className="text-sm font-bold leading-relaxed italic mb-6">
                  "Kỹ năng Shadowing của bạn đang cải thiện rõ rệt. Hãy thử
                  thách với các bài học có tốc độ nhanh hơn để đột phá!"
                </p>
                <Button className="w-full bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-orange-500 hover:text-white transition-all">
                  Luyện tập ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
