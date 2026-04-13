"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  userId: string;
  rank: number;
  username: string;
  avatar?: string;
  totalScore: number;
}

export function TopPodium({ topThree }: { topThree: LeaderboardEntry[] }) {
  // Sắp xếp lại để hiển thị: 2 - 1 - 3 (Trái - Giữa - Phải)
  const displayOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  const rankConfig = {
    1: {
      ring: "from-yellow-300 via-yellow-500 to-amber-600",
      base: "from-yellow-500/30 to-transparent border-yellow-500/30",
      text: "text-yellow-500",
      badge: "bg-yellow-400 text-black",
      shadow: "shadow-[0_0_40px_rgba(234,179,8,0.4)]",
      height: "h-40 md:h-48",
      avatarSize: "w-24 h-24 md:w-28 md:h-28",
    },
    2: {
      ring: "from-slate-200 via-slate-400 to-slate-600",
      base: "from-slate-400/20 to-transparent border-slate-400/20",
      text: "text-slate-400 dark:text-slate-300",
      badge: "bg-slate-300 text-black",
      shadow: "shadow-[0_0_30px_rgba(148,163,184,0.2)]",
      height: "h-32 md:h-36",
      avatarSize: "w-20 h-20 md:w-24 md:h-24",
    },
    3: {
      ring: "from-amber-600 via-amber-700 to-amber-900",
      base: "from-amber-700/20 to-transparent border-amber-700/20",
      text: "text-amber-600",
      badge: "bg-amber-700 text-white",
      shadow: "shadow-[0_0_30px_rgba(180,83,9,0.2)]",
      height: "h-24 md:h-28",
      avatarSize: "w-20 h-20 md:w-24 md:h-24",
    },
  };

  return (
    <div className="flex justify-center items-end gap-2 md:gap-6 mb-16 px-2 mt-12">
      {displayOrder.map((user, index) => {
        const config = rankConfig[user.rank as 1 | 2 | 3];
        const isFirst = user.rank === 1;

        return (
          <motion.div
            key={user.userId}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + index * 0.1,
              type: "spring",
              stiffness: 150,
            }}
            className={cn(
              "flex flex-col items-center relative group flex-1 max-w-[140px] md:max-w-[180px]",
              isFirst
                ? "order-2 z-20 -mt-8"
                : user.rank === 2
                  ? "order-1 z-10"
                  : "order-3 z-10",
            )}
          >
            {/* Crown for Top 1 */}
            {isFirst && (
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-12 z-30"
              >
                <Crown className="h-10 w-10 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
              </motion.div>
            )}

            {/* Avatar 3D Container */}
            <div
              className={cn(
                "relative rounded-full p-1.5 transition-transform duration-500 group-hover:scale-105 z-20",
                "bg-gradient-to-b",
                config.ring,
                config.shadow,
                config.avatarSize,
              )}
            >
              <Avatar className="w-full h-full border-[3px] border-white dark:border-[#111113] bg-white dark:bg-[#111113]">
                <AvatarImage src={user.avatar} className="object-cover" />
                <AvatarFallback className="font-black text-xl">
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Rank Badge */}
              <div
                className={cn(
                  "absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-black border-[3px] border-white dark:border-[#111113] text-xs shadow-lg",
                  config.badge,
                )}
              >
                {user.rank}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mt-5 mb-3 z-20 w-full px-1">
              <h3
                className={cn(
                  "font-bold text-gray-900 dark:text-white truncate w-full",
                  isFirst ? "text-base md:text-lg" : "text-sm md:text-base",
                )}
              >
                {user.username}
              </h3>
              <p
                className={cn(
                  "font-black tracking-tighter mt-0.5",
                  config.text,
                  isFirst ? "text-lg md:text-xl" : "text-sm md:text-base",
                )}
              >
                {user.totalScore.toLocaleString()}
              </p>
            </div>

            {/* Podium Base (Trụ đứng phát sáng) */}
            <div
              className={cn(
                "w-full rounded-t-2xl md:rounded-t-[2rem] bg-gradient-to-b backdrop-blur-sm border-t-2 absolute bottom-0 -z-10",
                config.base,
                config.height,
              )}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
