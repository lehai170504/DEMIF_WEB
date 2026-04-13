"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Zap,
  Award,
  Target,
  ChevronRight,
  UserCircle2,
  Crosshair,
} from "lucide-react";
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
        className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#111113] border border-gray-100 dark:border-white/5 p-7 shadow-xl"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-500">
              <UserCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">
                Hồ Sơ Năng Lực
              </h3>
              <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                Chỉ số cá nhân
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <StatRow
              icon={<BookOpen className="h-4 w-4" />}
              label="Bài học hoàn thành"
              value={stats.completedLessons.toString()}
              color="text-emerald-500"
              iconBg="bg-emerald-500/10 text-emerald-500"
            />
            <StatRow
              icon={<Zap className="h-4 w-4" />}
              label="Chuỗi ngày (Streak)"
              value={`${stats.currentStreak} 🔥`}
              color="text-orange-500"
              iconBg="bg-orange-500/10 text-orange-500"
            />
            <StatRow
              icon={<Award className="h-4 w-4" />}
              label="Điểm Feedback TB"
              value={stats.avgFeedbackScore.toFixed(1)}
              color="text-blue-500"
              iconBg="bg-blue-500/10 text-blue-500"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
            <Button
              className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-orange-500/20 active:scale-95"
              asChild
            >
              <Link href="/review">
                Tiếp tục rèn luyện <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quest Card - Nhiệm vụ tháng */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ y: -4 }}
        className="relative overflow-hidden p-6 rounded-[2.5rem] bg-[#1a1a1c] border border-orange-500/20 text-white shadow-2xl group cursor-default"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-50" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-black text-xs uppercase tracking-widest text-orange-500 flex items-center gap-2">
              <Crosshair className="h-4 w-4" /> Nhiệm vụ phụ
            </h4>
            <span className="text-[9px] font-black uppercase bg-white/10 px-2 py-1 rounded-md text-zinc-400">
              Tháng này
            </span>
          </div>

          <p className="text-sm font-medium text-zinc-300 leading-relaxed pl-2 border-l-2 border-orange-500/50">
            Hoàn thành thêm{" "}
            <span className="text-white font-bold">10 bài học</span> để giữ
            chuỗi luyện tập và tăng{" "}
            <span className="text-emerald-400 font-bold">5% Match Rate</span>.
          </p>
        </div>

        {/* Decorative elements */}
        <Target className="absolute -right-6 -bottom-6 w-32 h-32 text-orange-500/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
      </motion.div>
    </div>
  );
}

function StatRow({ icon, label, value, color, iconBg }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.04] transition-colors group">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "p-2 rounded-xl transition-transform group-hover:scale-110",
            iconBg,
          )}
        >
          {icon}
        </div>
        <span className="text-xs font-bold text-gray-600 dark:text-zinc-400 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <span className={cn("text-base font-black tracking-tighter", color)}>
        {value}
      </span>
    </div>
  );
}
