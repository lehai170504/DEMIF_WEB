"use client";

import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header";
import { TopPodium } from "@/components/leaderboard/top-podium";
import { LeaderboardList } from "@/components/leaderboard/leaderboard-list";
import { UserSidebar } from "@/components/leaderboard/user-sidebar";
import { useQuery } from "@tanstack/react-query";
import { statsService } from "@/services/stats.service";
import { Loader2, AlertCircle, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function LeaderboardPage() {
  const { user } = useAuth();

  const {
    data: leaderboardData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => statsService.getLeaderboard(20),
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50/50 dark:bg-[#050505]">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  // --- XỬ LÝ LỖI ---
  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center font-mono bg-gray-50/50 dark:bg-[#050505]">
        <AlertCircle className="h-12 w-12 text-rose-500 mb-4" />
        <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-2">
          Lỗi kết nối vệ tinh
        </h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Không thể lấy danh sách bảng xếp hạng lúc này. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  // Map API data
  const mappedData = (leaderboardData || []).map(
    (entry: any, index: number) => ({
      userId: entry.userId,
      rank: index + 1,
      username: entry.username || "Unknown",
      avatar: entry.avatarUrl,
      country: entry.level || "Beginner",
      totalScore: entry.totalPoints || 0,
      currentStreak: entry.currentStreak || 0,
      dictationAccuracy: 0,
      shadowingMatchRate: 0,
      avgFeedbackScore: 0,
      completedLessons: 0,
    }),
  );

  const topThree = mappedData.slice(0, 3);
  const restOfList = mappedData.slice(3);
  const currentUser = mappedData.find((u: any) => u.userId === user?.id);

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen flex flex-col font-mono selection:bg-orange-500/30 bg-gray-50 dark:bg-[#050505] lg:overflow-hidden">
      <main className="flex-1 flex flex-col min-h-0 container mx-auto px-4 lg:px-6 pt-4 lg:pt-6 max-w-7xl pb-4">
        <div className="shrink-0 mb-2">
          <LeaderboardHeader />
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CỘT TRÁI (8/12) */}
          <div className="lg:col-span-8 flex flex-col h-full min-h-0 gap-6">
            {topThree.length > 0 && (
              <div className="shrink-0 pt-2">
                <TopPodium topThree={topThree} />
              </div>
            )}

            {/* Bảng Vàng Card - Ép sát xuống dưới */}
            <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#0D0D0D] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-5 lg:p-7 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

              <div className="shrink-0 flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 mb-4 relative z-10">
                <h3 className="text-lg lg:text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                    <Trophy className="h-5 w-5" />
                  </div>
                  Bảng Vàng
                </h3>
                <span className="text-[10px] font-black bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-zinc-400 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                  Top 20
                </span>
              </div>

              {currentUser && currentUser.rank > 20 && (
                <div className="shrink-0 mb-4 p-4 rounded-[2rem] bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20 relative z-10 shadow-inner">
                  <p className="text-[10px] text-orange-600 dark:text-orange-500 font-black mb-2 uppercase tracking-widest flex items-center gap-2">
                    Vị trí hiện tại của bạn
                  </p>
                  <LeaderboardList
                    data={[currentUser]}
                    currentUserId={user?.id || ""}
                  />
                </div>
              )}

              {/* Danh sách cuộn */}
              <div className="flex-1 min-h-0 overflow-y-auto pb-4 relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <LeaderboardList
                  data={restOfList}
                  currentUserId={user?.id || ""}
                />
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (4/12) */}
          <div className="lg:col-span-4 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-2">
            {currentUser ? (
              <UserSidebar
                stats={{
                  completedLessons: currentUser.completedLessons,
                  currentStreak: currentUser.currentStreak,
                  avgFeedbackScore: currentUser.avgFeedbackScore,
                }}
              />
            ) : (
              <div className="bg-white dark:bg-[#0D0D0D] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 text-center shadow-xl">
                <p className="text-sm font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                  Vui lòng đăng nhập
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
