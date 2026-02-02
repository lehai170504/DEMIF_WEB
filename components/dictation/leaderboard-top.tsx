"use client";

import { Card } from "@/components/ui/card";
import { Trophy, Crown, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LeaderboardUser {
  name: string;
  score: number;
  avatar: string;
}

const topLearners: LeaderboardUser[] = [
  { name: "Sarah Chen", score: 2850, avatar: "SC" },
  { name: "Alex Kim", score: 2720, avatar: "AK" },
  { name: "Maria Garcia", score: 2680, avatar: "MG" },
];

export function LeaderboardTop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden p-1 bg-[#18181b] rounded-[2rem] border border-white/10 shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-between p-5 gap-6">
          {/* Header & List */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            <div className="flex items-center gap-3 self-start sm:self-center border-r border-white/10 pr-6 hidden sm:flex">
              <div className="p-2.5 bg-white/5 rounded-2xl border border-white/5">
                <Trophy className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Bảng vàng
                </h3>
                <p className="text-sm font-bold text-white">Hôm nay</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              {topLearners.map((user, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <div className="relative">
                    {/* Rank Badge */}
                    <div
                      className={cn(
                        "absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-[#18181b]",
                        index === 0
                          ? "bg-amber-400"
                          : index === 1
                            ? "bg-zinc-400"
                            : "bg-orange-600",
                      )}
                    >
                      {index === 0 ? (
                        <Crown className="h-3 w-3 text-black fill-current" />
                      ) : (
                        <Medal className="h-3 w-3 text-white fill-current" />
                      )}
                    </div>

                    {/* Avatar */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs transition-all duration-300 border border-white/10 shadow-inner",
                        index === 0
                          ? "bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-500/20"
                          : "bg-white/5",
                      )}
                    >
                      {user.avatar}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                      {user.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-black text-orange-500">
                        {user.score}
                      </span>
                      <span className="text-[8px] font-bold text-zinc-600 uppercase">
                        điểm
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Streak Badge */}
          <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/5 hover:bg-white/10 transition-colors">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">
                Chuỗi ngày
              </p>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xl font-black text-white tabular-nums">
                  7
                </span>
                <span className="text-lg">🔥</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
