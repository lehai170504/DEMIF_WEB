"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

interface SidebarReviewProps {
  reviewDue: number;
}

export function SidebarReview({ reviewDue }: SidebarReviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative overflow-hidden border border-white/10 bg-[#18181b] p-6 shadow-2xl rounded-[2rem] group">
        {/* Background Gradients */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-500/10 blur-[50px] group-hover:bg-orange-500/20 transition-colors duration-500" />
        <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-blue-500/10 blur-[50px]" />

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500">
                  Daily Mission
                </span>
              </div>
              <h3 className="font-bold text-xl leading-none text-white">
                Ôn tập định kỳ
              </h3>
            </div>

            {/* Icon Box */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all">
              <Zap className="h-5 w-5 text-orange-500 fill-orange-500" />
            </div>
          </div>

          {/* Content: Count */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-black text-white tracking-tighter drop-shadow-lg">
                  {reviewDue}
                </span>
                <span className="text-xs font-bold text-zinc-500 uppercase">
                  từ vựng
                </span>
              </div>
              <p className="text-[11px] font-medium text-zinc-400 leading-snug">
                Đang chờ bạn củng cố để <br /> ghi nhớ vĩnh viễn
              </p>
            </div>

            {/* 3D Floating Illustration Placeholder */}
            <div className="relative h-16 w-16 flex-shrink-0">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center border border-white/20"
              >
                <BookOpen className="text-white h-8 w-8" />
              </motion.div>
            </div>
          </div>

          {/* Progress Bar Mockup */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[9px] font-black text-zinc-500 uppercase tracking-wider">
              <span>Tiến độ ngày</span>
              <span className="text-white">80%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-full bg-gradient-to-r from-orange-500 to-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
              />
            </div>
          </div>

          {/* Action Button */}
          <Button className="group w-full h-12 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:from-orange-600 hover:to-orange-600 font-black text-white text-[10px] uppercase tracking-widest shadow-lg shadow-orange-900/20 border border-white/10 transition-all active:scale-95">
            <BookOpen className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
            Học ngay thôi
            <ArrowRight className="ml-auto h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
