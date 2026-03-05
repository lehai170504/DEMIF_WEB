"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  return (
    <div className="space-y-3">
      {data.map((entry, index) => {
        const isMe = entry.userId === currentUserId;
        return (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300",
              isMe
                ? "bg-orange-500/10 border-orange-500/50 shadow-[0_0_20px_rgba(255,122,0,0.1)]"
                : "bg-white dark:bg-[#18181b] border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-[#202023]",
            )}
          >
            {/* Rank Number */}
            <div className="w-8 text-center font-black text-lg text-gray-400 dark:text-zinc-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {entry.rank}
            </div>

            {/* Avatar */}
            <Avatar
              className={cn(
                "h-10 w-10 border-2",
                isMe
                  ? "border-orange-500"
                  : "border-transparent group-hover:border-white/20",
              )}
            >
              <AvatarImage src={entry.avatar} />
              <AvatarFallback>{entry.username[0]}</AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-bold text-sm truncate",
                    isMe
                      ? "text-orange-400"
                      : "text-gray-900 dark:text-zinc-200 group-hover:text-gray-900 dark:group-hover:text-white",
                  )}
                >
                  {entry.username}
                </span>
                {isMe && (
                  <span className="px-1.5 py-0.5 rounded bg-orange-500 text-[9px] font-bold text-black uppercase">
                    Bạn
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-zinc-500">{entry.country}</p>
            </div>

            {/* Score */}
            <div className="text-right">
              <div className="text-base font-black text-gray-900 dark:text-white tracking-tight">
                {entry.totalScore.toLocaleString()}
              </div>
              <div className="text-[9px] font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-wider">
                XP
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
