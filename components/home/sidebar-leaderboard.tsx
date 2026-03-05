"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Crown, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  avatar: string;
}

interface SidebarLeaderboardProps {
  entries: LeaderboardEntry[];
}

export function SidebarLeaderboard({ entries }: SidebarLeaderboardProps) {
  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          container:
            "bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-500",
          rankBadge: "text-amber-400 font-black",
          name: "text-amber-100 font-bold",
          icon: <Crown className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />,
          avatarBorder: "border-amber-500",
        };
      case 2:
        return {
          container:
            "bg-gradient-to-r from-zinc-500/10 to-transparent border-l-2 border-zinc-400",
          rankBadge: "text-zinc-300 font-black",
          name: "text-zinc-200 font-bold",
          icon: <Star className="h-3.5 w-3.5 fill-zinc-400 text-zinc-400" />,
          avatarBorder: "border-zinc-400",
        };
      case 3:
        return {
          container:
            "bg-gradient-to-r from-orange-500/10 to-transparent border-l-2 border-orange-500",
          rankBadge: "text-orange-400 font-black",
          name: "text-orange-100 font-bold",
          icon: (
            <Trophy className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
          ),
          avatarBorder: "border-orange-500",
        };
      default:
        return {
          container: "hover:bg-white/5 border-l-2 border-transparent",
          rankBadge: "text-zinc-500 font-bold",
          name: "text-zinc-400 font-medium",
          icon: null,
          avatarBorder: "border-white/10",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      {/* Glass Card */}
      <div className="overflow-hidden bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-5 rounded-[2rem] shadow-xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                Bảng vàng tuần
              </h3>
              <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                Cập nhật 5 phút trước
              </p>
            </div>
            <Link
              href="/leaderboard"
              className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-400 hover:bg-orange-500 hover:text-white transition-all border border-gray-200 dark:border-white/5"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* List */}
          <div className="space-y-2">
            {entries.slice(0, 5).map((entry, index) => {
              const styles = getRankStyles(entry.rank);

              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group relative flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300",
                    styles.container,
                  )}
                >
                  {/* Rank Number */}
                  <div
                    className={cn("w-4 text-center text-sm", styles.rankBadge)}
                  >
                    {entry.rank}
                  </div>

                  {/* Avatar */}
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full border-2 bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-gray-900 dark:text-white overflow-hidden",
                      styles.avatarBorder,
                    )}
                  >
                    {entry.avatar ? (
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{entry.name[0]}</span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className={cn("truncate text-[13px]", styles.name)}>
                        {entry.name}
                      </p>
                      {styles.icon}
                    </div>
                    {/* Streak Info (Optional) */}
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500 fill-orange-500/20" />
                      <span className="text-[10px] text-gray-500 dark:text-zinc-500 font-mono">
                        {entry.streak} 🔥
                      </span>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <p className="text-[12px] font-black text-gray-900 dark:text-white tracking-tight">
                      {entry.xp.toLocaleString()}
                    </p>
                    <p className="text-[8px] font-bold uppercase text-zinc-500">
                      XP
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <button className="w-full py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-zinc-300 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-lg hover:shadow-orange-500/25">
            Thách đấu ngay
          </button>
        </div>
      </div>
    </motion.div>
  );
}
