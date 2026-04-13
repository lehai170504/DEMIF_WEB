"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function LeaderboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 lg:mb-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      {/* Nút quay lại */}
      <div className="w-full md:w-auto flex justify-start">
        <Button
          variant="ghost"
          asChild
          className="rounded-2xl h-10 px-5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-all font-bold text-[11px] uppercase tracking-widest group"
        >
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Về trung tâm
          </Link>
        </Button>
      </div>

      {/* Cụm Tiêu đề ngang (Thu gọn) */}
      <div className="flex items-center gap-4 text-center md:text-left relative">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 shrink-0 bg-gradient-to-br from-orange-500/10 to-transparent dark:from-[#2a2a2d] dark:to-[#18181b] rounded-2xl border border-orange-500/20 dark:border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.15)]"
        >
          <Trophy className="h-7 w-7 text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
        </motion.div>

        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter flex items-center gap-2">
            Đấu Trường
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                Huyền Thoại
              </span>
              <Sparkles className="absolute -top-3 -right-5 h-5 w-5 text-amber-400 animate-pulse opacity-80" />
            </span>
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-xs md:text-sm font-medium mt-1">
            Tích lũy XP, giữ vững Streak và khắc tên mình vào bảng vàng!
          </p>
        </div>
      </div>
      
      {/* Spacer để cân bằng justify-between */}
      <div className="hidden md:block w-[140px]"></div>
    </motion.div>
  );
}