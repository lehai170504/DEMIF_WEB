"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, Zap, ArrowRight } from "lucide-react";
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
      <Card className="relative overflow-hidden border-none bg-slate-900 p-6 shadow-2xl rounded-[2rem]">
        {/* Background Decor - Tạo hiệu ứng ánh sáng mờ */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-500/20 blur-[50px]" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-blue-500/10 blur-[50px]" />

        <div className="relative z-10 space-y-6">
          {/* Header với Badge thông báo */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
                  Daily Mission
                </span>
              </div>
              <h3 className="font-display text-xl font-bold leading-tight text-white">
                Ôn tập định kỳ
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <Zap className="h-5 w-5 text-orange-400 fill-orange-400" />
            </div>
          </div>

          {/* Nội dung chính: Hiển thị số lượng từ cực kỳ nổi bật */}
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white tracking-tighter">
                  {reviewDue}
                </span>
                <span className="text-sm font-bold text-slate-400">
                  từ vựng
                </span>
              </div>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Đang chờ bạn củng cố để ghi nhớ vĩnh viễn
              </p>
            </div>

            {/* Illustration thu nhỏ với hiệu ứng nổi */}
            <div className="relative h-20 w-20 flex-shrink-0 drop-shadow-[0_10px_20px_rgba(249,115,22,0.3)]">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Image
                  src="/review-illustration.png"
                  alt="Review"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Progress Bar ảo (Tạo thêm động lực) */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span>Mục tiêu hôm nay</span>
              <span>80%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
              />
            </div>
          </div>

          {/* Action Button: Gradient mạnh mẽ */}
          <Button className="group w-full h-12 rounded-2xl bg-orange-500 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95">
            <BookOpen className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
            Học ngay thôi
            <ArrowRight className="ml-auto h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
