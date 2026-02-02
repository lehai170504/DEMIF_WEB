"use client";

import { useState } from "react";
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header";
import { TopPodium } from "@/components/leaderboard/top-podium";
import { LeaderboardList } from "@/components/leaderboard/leaderboard-list";
import { UserSidebar } from "@/components/leaderboard/user-sidebar";
import { SortControls } from "@/components/leaderboard/sort-controls";
import { leaderboardData } from "@/lib/data/leaderboard";

// Mock data extension & types logic (giữ nguyên logic của bạn nhưng gọn hơn)
type SortKey = "totalScore" | "dictationAccuracy" | "shadowingMatchRate";

const extendedLeaderboardData = leaderboardData.map((entry: any) => ({
  ...entry,
  dictationAccuracy:
    entry.userId === "user-1" ? 92 : Math.floor(Math.random() * 25 + 70),
  shadowingMatchRate:
    entry.userId === "user-1" ? 88 : Math.floor(Math.random() * 25 + 65),
  avgFeedbackScore: entry.userId === "user-1" ? 4.7 : Math.random() * 1.5 + 3.5,
  completedLessons: entry.userId === "user-1" ? 42 : entry.completedLessons,
  currentStreak: entry.userId === "user-1" ? 15 : entry.currentStreak,
}));

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<SortKey>("totalScore");

  // Sorting Logic
  const sortedData = [...extendedLeaderboardData].sort((a, b) => {
    if (sortBy === "totalScore") return b.totalScore - a.totalScore;
    if (sortBy === "dictationAccuracy")
      return b.dictationAccuracy - a.dictationAccuracy;
    return b.shadowingMatchRate - a.shadowingMatchRate;
  });

  // Re-calculate ranks based on current sort
  const rankedData = sortedData.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));

  const topThree = rankedData.slice(0, 3);
  const restOfList = rankedData.slice(3, 10); // Show top 10 total
  const currentUser = rankedData.find((u) => u.userId === "user-1");

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-zinc-100 selection:bg-orange-500/30 pb-20">
      <main className="container mx-auto px-4 pt-8 md:pt-12 max-w-6xl">
        {/* Header */}
        <LeaderboardHeader />

        {/* Sort Controls */}
        <SortControls sortBy={sortBy} onSortChange={setSortBy} />

        {/* Podium Area */}
        <TopPodium topThree={topThree} />

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Leaderboard List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-zinc-500 border-b border-white/10 pb-4 mb-4">
              Top Chiến Binh
            </h3>

            {/* Show Current User pinned if not in top 10 (Optional UI UX choice) */}
            {currentUser && currentUser.rank > 10 && (
              <div className="mb-6">
                <p className="text-xs text-orange-500 font-bold mb-2 uppercase tracking-wider">
                  Thứ hạng của bạn
                </p>
                <LeaderboardList data={[currentUser]} currentUserId="user-1" />
                <div className="my-4 border-t border-dashed border-white/10" />
              </div>
            )}

            <LeaderboardList data={restOfList} currentUserId="user-1" />
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1 sticky top-8">
            {currentUser && (
              <UserSidebar
                stats={{
                  completedLessons: currentUser.completedLessons,
                  currentStreak: currentUser.currentStreak,
                  avgFeedbackScore: currentUser.avgFeedbackScore,
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
