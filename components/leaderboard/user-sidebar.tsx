"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap, Award, Target, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UserStats {
  completedLessons: number;
  currentStreak: number;
  avgFeedbackScore: number;
}

export function UserSidebar({ stats }: { stats: UserStats }) {
  return (
    <div className="space-y-6">
      {/* Main Stats Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white to-gray-50 dark:from-[#18181b] dark:to-black border border-gray-200 dark:border-white/10 p-6 shadow-xl"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
              <Target className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">
              Lộ trình của bạn
            </h3>
          </div>

          <div className="space-y-4">
            <StatRow
              icon={<BookOpen className="h-4 w-4 text-emerald-400" />}
              label="Bài học hoàn thành"
              value={stats.completedLessons.toString()}
              color="text-emerald-400"
            />
            <StatRow
              icon={<Zap className="h-4 w-4 text-yellow-400" />}
              label="Chuỗi ngày (Streak)"
              value={`${stats.currentStreak} 🔥`}
              color="text-yellow-400"
            />
            <StatRow
              icon={<Award className="h-4 w-4 text-blue-400" />}
              label="Điểm Feedback TB"
              value={stats.avgFeedbackScore.toFixed(1)}
              color="text-blue-400"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5">
            <Button
              className="w-full h-12 bg-orange-500 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-orange-600 dark:hover:bg-zinc-200 transition-all uppercase text-xs tracking-widest"
              asChild
            >
              <Link href="/roadmap">
                Tiếp tục học <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Monthly Goal Card - 3D Hover */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ y: -5 }}
        className="p-6 rounded-[2rem] bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-2xl shadow-orange-500/20"
      >
        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Target className="h-5 w-5 text-white/80" /> Mục tiêu tháng
        </h4>
        <p className="text-sm font-medium text-orange-100 leading-relaxed italic border-l-2 border-white/20 pl-3">
          "Hoàn thành thêm 10 bài học để giữ chuỗi luyện tập và tăng 5%
          Shadowing Match Rate!"
        </p>
      </motion.div>
    </div>
  );
}

function StatRow({ icon, label, value, color }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-xs font-medium text-gray-600 dark:text-zinc-400">{label}</span>
      </div>
      <span className={cn("text-sm font-black", color)}>{value}</span>
    </div>
  );
}
