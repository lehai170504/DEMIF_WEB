"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function LeaderboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 relative z-10"
    >
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="ghost"
          asChild
          className="rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
        >
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5 mr-2" /> Dashboard
          </Link>
        </Button>
      </div>

      <div className="text-center relative">
        {/* Glowing Background Behind Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/30 blur-[80px] rounded-full pointer-events-none" />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-b from-[#2a2a2d] to-[#18181b] rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl shadow-orange-500/20 relative z-10"
        >
          <Trophy className="h-10 w-10 text-orange-500 drop-shadow-[0_0_15px_rgba(255,122,0,0.6)]" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
          Bảng Xếp Hạng{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
            Huyền Thoại
          </span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Nơi vinh danh những chiến binh kiên trì nhất. Hãy giữ vững chuỗi
          Streak để ghi tên mình vào lịch sử!
        </p>
      </div>
    </motion.div>
  );
}
