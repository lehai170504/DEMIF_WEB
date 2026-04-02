"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Medal } from "lucide-react";
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

  return (
    <div className="flex justify-center items-end gap-4 md:gap-8 mb-16 px-4">
      {displayOrder.map((user, index) => {
        // Xử lý logic hiển thị dựa trên vị trí thực tế trong mảng displayOrder
        const isFirst = user.rank === 1;
        const isSecond = user.rank === 2;
        const isThird = user.rank === 3;

        return (
          <motion.div
            key={user.userId}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            className={cn(
              "flex flex-col items-center relative group",
              isFirst
                ? "order-2 -mt-12 z-20"
                : isSecond
                  ? "order-1 z-10"
                  : "order-3 z-10",
            )}
          >
            {/* Crown for Top 1 */}
            {isFirst && (
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-2"
              >
                <Crown className="h-8 w-8 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
              </motion.div>
            )}

            {/* Avatar 3D Container */}
            <div
              className={cn(
                "relative rounded-full p-1 transition-transform duration-300 group-hover:scale-105",
                isFirst
                  ? "w-24 h-24 bg-gradient-to-b from-yellow-300 to-orange-500 shadow-[0_0_30px_rgba(255,165,0,0.4)]"
                  : isSecond
                    ? "w-20 h-20 bg-gradient-to-b from-slate-300 to-slate-500"
                    : "w-20 h-20 bg-gradient-to-b from-amber-700 to-amber-900",
              )}
            >
              <Avatar className="w-full h-full border-4 border-white dark:border-[#18181b]">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>

              {/* Rank Badge */}
              <div
                className={cn(
                  "absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-black border-4 border-white dark:border-[#18181b] text-xs",
                  isFirst
                    ? "bg-yellow-400 text-black"
                    : isSecond
                      ? "bg-slate-300 text-black"
                      : "bg-amber-700 text-white",
                )}
              >
                {user.rank}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mt-6">
              <h3
                className={cn(
                  "font-bold text-gray-900 dark:text-white truncate max-w-[120px]",
                  isFirst ? "text-lg" : "text-sm",
                )}
              >
                {user.username}
              </h3>
              <p
                className={cn(
                  "font-black tracking-tight",
                  isFirst
                    ? "text-orange-400 text-xl"
                    : "text-gray-500 dark:text-zinc-400 text-base",
                )}
              >
                {user.totalScore.toLocaleString()}
              </p>
            </div>

            {/* Podium Base (Trang trí) */}
            <div
              className={cn(
                "w-full h-24 mt-4 rounded-t-2xl bg-gradient-to-b opacity-20",
                isFirst
                  ? "from-orange-500 to-transparent h-32"
                  : "from-zinc-500 to-transparent",
              )}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
