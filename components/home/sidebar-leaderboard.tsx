"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Crown, ChevronRight, Medal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
            "bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 shadow-[inset_4px_0_0_0_rgba(245,158,11,0.5)]",
          rankBadge:
            "bg-amber-500 text-white font-black shadow-lg shadow-amber-500/30",
          name: "text-amber-600 dark:text-amber-400 font-black",
          icon: (
            <Crown className="h-4 w-4 fill-amber-500 text-amber-500 drop-shadow-sm" />
          ),
          avatarBorder: "border-amber-500 ring-2 ring-amber-500/20",
        };
      case 2:
        return {
          container:
            "bg-gradient-to-r from-zinc-400/10 to-transparent border-l-4 border-zinc-400 shadow-[inset_4px_0_0_0_rgba(161,161,170,0.5)]",
          rankBadge:
            "bg-zinc-400 text-white font-black shadow-lg shadow-zinc-400/30",
          name: "text-zinc-600 dark:text-zinc-300 font-bold",
          icon: <Medal className="h-4 w-4 fill-zinc-400 text-zinc-400" />,
          avatarBorder: "border-zinc-400 ring-2 ring-zinc-400/20",
        };
      case 3:
        return {
          container:
            "bg-gradient-to-r from-orange-600/10 dark:from-orange-700/20 to-transparent border-l-4 border-orange-600 dark:border-orange-700 shadow-[inset_4px_0_0_0_rgba(234,88,12,0.5)]",
          rankBadge:
            "bg-orange-600 dark:bg-orange-700 text-white font-black shadow-lg shadow-orange-600/30",
          name: "text-orange-700 dark:text-orange-500 font-bold",
          icon: (
            <Trophy className="h-4 w-4 fill-orange-600 dark:fill-orange-700 text-orange-600 dark:text-orange-700" />
          ),
          avatarBorder:
            "border-orange-600 dark:border-orange-700 ring-2 ring-orange-600/20",
        };
      default:
        return {
          container:
            "hover:bg-gray-50 dark:hover:bg-white/5 border-l-4 border-transparent transition-colors",
          rankBadge:
            "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-zinc-400 font-bold",
          name: "text-gray-700 dark:text-zinc-300 font-medium",
          icon: null,
          avatarBorder: "border-gray-200 dark:border-white/10",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      {/* Glass Card Background */}
      <div className="absolute inset-0 bg-white dark:bg-[#0D0D0D] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-black/20 pointer-events-none" />

      {/* Content Container */}
      <div className="relative p-6 md:p-8 space-y-6">
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/20">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white leading-tight">
                Bảng vàng
              </h3>
              <p className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
                Top 5 tuần này
              </p>
            </div>
          </div>
          <Link
            href="/leaderboard"
            className="group h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/[0.02] text-gray-400 dark:text-zinc-500 hover:bg-orange-500 hover:text-white transition-all border border-gray-200 dark:border-white/5 shadow-sm"
          >
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── LIST ── */}
        <div className="space-y-3">
          {entries.slice(0, 5).map((entry, index) => {
            const styles = getRankStyles(entry.rank);

            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={cn(
                  "group relative flex items-center gap-3.5 py-3 px-3 rounded-2xl transition-all duration-300",
                  styles.container,
                )}
              >
                {/* Rank Number (Badge Style) */}
                <div
                  className={cn(
                    "flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-xs",
                    styles.rankBadge,
                  )}
                >
                  {entry.rank}
                </div>

                {/* Avatar */}
                <div
                  className={cn(
                    "flex-shrink-0 h-10 w-10 rounded-full border-2 bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-black text-gray-900 dark:text-white overflow-hidden",
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
                <div className="flex-1 min-w-0 py-0.5">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className={cn("truncate text-sm", styles.name)}>
                      {entry.name}
                    </p>
                    {styles.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />
                    <span className="text-[10px] text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest">
                      {entry.streak} Ngày
                    </span>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right flex-shrink-0">
                  <p className="text-base font-black text-gray-900 dark:text-white tracking-tighter leading-none">
                    {entry.xp.toLocaleString()}
                  </p>
                  <p className="text-[9px] font-black uppercase text-orange-500 tracking-widest mt-1">
                    XP
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA BUTTON ── */}
        <Link href="/leaderboard" className="block pt-2">
          <Button className="w-full h-12 gap-2">
            Đấu trường huyền thoại
            <Trophy className="h-3.5 w-3.5 group-hover:scale-125 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
