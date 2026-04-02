"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function BlogHero() {
  return (
    <div className="relative mb-8 pt-10">
      {/* Các hiệu ứng ánh sáng trang trí nhỏ phía sau tiêu đề */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.2em]">
              Knowledge Hub
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-gray-900 dark:text-white tracking-tighter leading-[1]">
            Blog{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400">
              DEMIF
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Nơi chia sẻ các mẹo học tập, kiến thức chuyên sâu và cảm hứng chinh
            phục tiếng Anh mỗi ngày cùng AI.
          </p>

          {/* Một thanh ngăn cách trang trí nhẹ thay cho Search bar cũ */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1.5 bg-orange-500 rounded-full mx-auto mt-12 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
          />
        </motion.div>
      </div>
    </div>
  );
}
