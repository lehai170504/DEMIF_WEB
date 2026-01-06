"use client";

import { Card } from "@/components/ui/card";
import { Trophy, Flame, Crown, Medal } from "lucide-react";
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
      <Card className="relative overflow-hidden p-1 bg-white dark:bg-slate-900 rounded-[2rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Lớp nền gradient trang trí nhẹ */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-3xl -mr-16 -mt-16" />

        <div className="relative flex flex-col md:flex-row items-center justify-between p-5 gap-6">
          {/* PHẦN 1: DANH SÁCH TOP */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            <div className="flex items-center gap-3 self-start sm:self-center border-r border-slate-100 pr-6 hidden sm:flex">
              <div className="p-2.5 bg-orange-50 rounded-2xl">
                <Trophy className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-[13px] font-black uppercase tracking-wider text-slate-400">
                  Bảng vàng
                </h3>
                <p className="text-sm font-bold text-slate-700">Hôm nay</p>
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
                    {/* Badge Hạng */}
                    <div
                      className={cn(
                        "absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white dark:border-slate-900",
                        index === 0
                          ? "bg-yellow-400"
                          : index === 1
                          ? "bg-slate-300"
                          : "bg-orange-400"
                      )}
                    >
                      {index === 0 ? (
                        <Crown className="h-3 w-3 text-white" />
                      ) : (
                        <Medal className="h-3 w-3 text-white" />
                      )}
                    </div>

                    {/* Avatar */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-200",
                        index === 0
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500 scale-110"
                          : index === 1
                          ? "bg-slate-400"
                          : "bg-orange-600"
                      )}
                    >
                      {user.avatar}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 transition-colors">
                      {user.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-orange-500">
                        {user.score}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        điểm
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* PHẦN 2: CHỈ SỐ CÁ NHÂN (STREAK) */}
          <div className="flex items-center gap-4 bg-orange-50/80 dark:bg-orange-500/10 px-6 py-3 rounded-3xl border border-orange-100/50 dark:border-orange-500/20">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 leading-none mb-1">
                Chuỗi ngày
              </p>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-3xl font-black text-orange-600 tabular-nums">
                  7
                </span>
                <div className="relative">
                  <Flame className="h-6 w-6 text-orange-500 fill-orange-500 animate-pulse" />
                  {/* Hiệu ứng bóng đổ cho ngọn lửa */}
                  <div className="absolute inset-0 bg-orange-400 blur-lg opacity-40 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
