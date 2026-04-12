"use client";

import { useState } from "react";
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header";
import { TopPodium } from "@/components/leaderboard/top-podium";
import { LeaderboardList } from "@/components/leaderboard/leaderboard-list";
import { UserSidebar } from "@/components/leaderboard/user-sidebar";
import { SortControls } from "@/components/leaderboard/sort-controls";
import { useQuery } from "@tanstack/react-query";
import { statsService } from "@/services/stats.service";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

type SortKey = "totalScore" | "dictationAccuracy" | "shadowingMatchRate";

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState<SortKey>("totalScore");

  const { data: leaderboardData, isLoading, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => statsService.getLeaderboard(20),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  // Map API data to component needs
  const mappedData = (leaderboardData || []).map((entry: any, index: number) => ({
    userId: entry.userId,
    rank: index + 1,
    username: entry.username || "Unknown",
    avatar: entry.avatarUrl,
    country: entry.level || "Beginner", // Using level as a subtitle/country placeholder
    totalScore: entry.totalPoints || 0,
    currentStreak: entry.currentStreak || 0,
    dictationAccuracy: 0, // Not provided by new API
    shadowingMatchRate: 0, // Not provided by new API
    avgFeedbackScore: 0,   // Not provided by new API
    completedLessons: 0,   // Not provided by new API
  }));

  const topThree = mappedData.slice(0, 3);
  const restOfList = mappedData.slice(3); 
  const currentUser = mappedData.find((u: any) => u.userId === user?.id);

  return (
    <div className="min-h-screen font-mono selection:bg-orange-500/30 pb-20">
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
            <h3 className="text-lg font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 border-b border-gray-200 dark:border-white/10 pb-4 mb-4">
              Top Chiến Binh
            </h3>

            {/* Show Current User pinned if not in top 10 */}
            {currentUser && currentUser.rank > 20 && (
              <div className="mb-6">
                <p className="text-xs text-orange-500 font-bold mb-2 uppercase tracking-wider">
                  Thứ hạng của bạn
                </p>
                <LeaderboardList data={[currentUser]} currentUserId={user?.id || ""} />
                <div className="my-4 border-t border-dashed border-white/10" />
              </div>
            )}

            <LeaderboardList data={restOfList} currentUserId={user?.id || ""} />
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
