"use client";

import { motion } from "framer-motion";
import { Flame, Star, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SidebarStreakProps {
  currentStreak: number;
}

export function SidebarStreak({ currentStreak }: SidebarStreakProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-6 rounded-[2rem] bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 relative overflow-hidden group shadow-2xl dark:bg-[#18181b]">
        {/* Glow Effect */}
        <div className="absolute -right-10 -top-10 h-32 w-32 bg-orange-500/10 blur-[60px] rounded-full group-hover:bg-orange-500/20 transition-colors duration-500" />

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-500">
              <Flame className="h-5 w-5 fill-current animate-pulse text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Activity Streak
              </span>
            </div>
          </div>

          {/* Main Info */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                {currentStreak}
              </span>
              <span className="text-sm font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                Ngày liên tiếp
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
              Bạn đang làm rất tốt! Đừng để ngọn lửa vụt tắt nhé.
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/dashboard" className="block">
            <Button className="w-full h-11">Xem chi tiết tiến độ</Button>
          </Link>
        </div>

        {/* Floating Icons */}
        <Trophy className="absolute -right-4 bottom-12 h-24 w-24 text-orange-500 opacity-[0.03] -rotate-12 pointer-events-none" />
      </div>
    </motion.div>
  );
}
