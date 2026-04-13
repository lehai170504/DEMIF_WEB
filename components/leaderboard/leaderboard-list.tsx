"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Medal } from "lucide-react"; // Đảm bảo đã import Medal
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  userId: string;
  rank: number;
  username: string;
  avatar?: string;
  country: string;
  totalScore: number;
}

export function LeaderboardList({
  data,
  currentUserId,
}: {
  data: LeaderboardEntry[];
  currentUserId: string;
}) {
  // Hàm phụ trợ tạo màu cho Top 3
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case 2:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
      case 3:
        return "text-amber-700 bg-amber-700/10 border-amber-700/20";
      default:
        return "text-gray-400 dark:text-zinc-600 bg-transparent border-transparent";
    }
  };

  // Icon cho Top 3
  const renderRankIndicator = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 mb-0.5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 mb-0.5 text-slate-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 mb-0.5 text-amber-700" />;
    return rank;
  };

  return (
    <div className="space-y-3">
      {data.map((entry, index) => {
        const isMe = entry.userId === currentUserId;
        const rankStyle = getRankStyle(entry.rank);

        return (
          <motion.div
            key={`${entry.userId}-${entry.rank}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
            className={cn(
              "group relative flex items-center gap-4 md:gap-6 p-4 md:px-6 rounded-[2rem] border transition-all duration-300",
              isMe
                ? "bg-orange-500/10 border-orange-500/30 shadow-[0_4px_20px_rgba(249,115,22,0.1)]"
                : "bg-white dark:bg-[#111113] border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.02]",
            )}
          >
            {/* Rank Indicator */}
            <div
              className={cn(
                "w-10 h-10 shrink-0 flex flex-col items-center justify-center rounded-2xl border font-black text-lg transition-colors",
                rankStyle,
                isMe &&
                  entry.rank > 3 &&
                  "text-orange-500 bg-orange-500/10 border-orange-500/20",
              )}
            >
              {renderRankIndicator(entry.rank)}
            </div>

            {/* Avatar */}
            <div className="relative">
              <Avatar
                className={cn(
                  "h-12 w-12 border-2 shadow-md transition-transform duration-300 group-hover:scale-105",
                  isMe
                    ? "border-orange-500 shadow-orange-500/30"
                    : "border-white dark:border-[#111113]",
                )}
              >
                <AvatarImage src={entry.avatar} />
                <AvatarFallback className="bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 font-bold">
                  {entry.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Vòng sáng cho Top 1 */}
              {entry.rank === 1 && (
                <div className="absolute inset-0 rounded-full border-2 border-yellow-500 animate-ping opacity-50" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-bold text-sm md:text-base truncate transition-colors",
                    isMe
                      ? "text-orange-600 dark:text-orange-500"
                      : "text-gray-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white",
                  )}
                >
                  {entry.username}
                </span>
                {isMe && (
                  <span className="px-2 py-0.5 rounded-md bg-orange-500 text-[9px] font-black text-white uppercase tracking-widest shadow-sm shadow-orange-500/20">
                    Bạn
                  </span>
                )}
              </div>
              <p className="text-[11px] md:text-xs text-gray-500 dark:text-zinc-500 font-medium truncate mt-0.5">
                Cấp độ: {entry.country}
              </p>
            </div>

            {/* Score Badge */}
            <div className="text-right shrink-0">
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 px-4 py-2 rounded-2xl flex flex-col items-end group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-colors">
                <div
                  className={cn(
                    "text-lg md:text-xl font-black tracking-tighter leading-none mb-1",
                    isMe
                      ? "text-orange-600 dark:text-orange-500"
                      : "text-gray-900 dark:text-white",
                  )}
                >
                  {entry.totalScore.toLocaleString()}
                </div>
                <div className="text-[8px] md:text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
                  Exp Points
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
