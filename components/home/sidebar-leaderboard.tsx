"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Crown, ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
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
            "bg-gradient-to-r from-amber-50 to-transparent border-l-4 border-amber-500",
          rankBadge: "bg-amber-500 text-white ring-4 ring-amber-100",
          name: "text-amber-900 font-black",
          icon: <Crown className="h-4 w-4 fill-amber-500 text-amber-500" />,
        };
      case 2:
        return {
          container:
            "bg-gradient-to-r from-slate-50 to-transparent border-l-4 border-slate-400",
          rankBadge: "bg-slate-400 text-white ring-4 ring-slate-100",
          name: "text-slate-800 font-bold",
          icon: <Star className="h-4 w-4 fill-slate-400 text-slate-400" />,
        };
      case 3:
        return {
          container:
            "bg-gradient-to-r from-orange-50 to-transparent border-l-4 border-orange-400",
          rankBadge: "bg-orange-400 text-white ring-4 ring-orange-100",
          name: "text-orange-900 font-bold",
          icon: <Trophy className="h-4 w-4 fill-orange-400 text-orange-400" />,
        };
      default:
        return {
          container: "hover:bg-slate-50 border-l-4 border-transparent",
          rankBadge: "bg-slate-100 text-slate-500",
          name: "text-slate-700 font-semibold",
          icon: null,
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      {/* 1. Glassmorphism Card */}
      <Card className="overflow-hidden border-none bg-white/80 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem]">
        <div className="space-y-6">
          {/* 2. Enhanced Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-2">
                Bảng vàng tuần
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Cập nhật 5 phút trước
              </p>
            </div>
            <Link
              href="/leaderboard"
              className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 3. Leaderboard List */}
          <div className="space-y-1">
            {entries.slice(0, 5).map((entry, index) => {
              const styles = getRankStyles(entry.rank);

              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                    styles.container
                  )}
                >
                  {/* Rank Position */}
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black transition-transform group-hover:scale-110",
                      styles.rankBadge
                    )}
                  >
                    {entry.rank}
                  </div>

                  {/* Avatar with Glow for Top 1 */}
                  <div className="relative">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-inner border-2 border-white",
                        entry.rank === 1
                          ? "bg-amber-500"
                          : "bg-slate-200 text-slate-500"
                      )}
                    >
                      {entry.avatar || entry.name[0]}
                    </div>
                    {entry.rank === 1 && (
                      <div className="absolute -top-1 -right-1 animate-pulse">
                        <Crown className="h-4 w-4 text-amber-500 fill-amber-500 drop-shadow-md" />
                      </div>
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
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />
                        <span className="text-[11px] font-bold text-slate-500">
                          {entry.streak}
                        </span>
                      </div>
                      <div className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[11px] font-medium text-slate-400">
                        Streak
                      </span>
                    </div>
                  </div>

                  {/* XP Score - High Contrast */}
                  <div className="text-right shrink-0">
                    <p className="text-[14px] font-black text-slate-900 tracking-tight">
                      {entry.xp.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-black uppercase text-slate-400 leading-none">
                      XP
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 4. Interactive Call-to-Action */}
          <button className="w-full py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95">
            Thách đấu ngay
          </button>
        </div>
      </Card>

      {/* Decorative Blur Background */}
      <div className="absolute -z-10 top-0 right-0 h-32 w-32 bg-orange-200/20 blur-[60px] rounded-full" />
    </motion.div>
  );
}
