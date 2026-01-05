"use client";

import { motion } from "framer-motion";
import { Users, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroBannerProps {
  title: string;
  description: string;
  image: string;
  participants: number;
  daysLeft: number;
}

export function HeroBanner({
  title,
  description,
  image,
  participants,
  daysLeft,
}: HeroBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-[2rem] bg-slate-900 p-1 shadow-2xl"
    >
      {/* 1. Background Gradient Mesh - Tạo chiều sâu hiện đại */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-orange-500/20 to-amber-500/20 opacity-50 transition-opacity group-hover:opacity-70" />

      {/* 2. Content Container với Glassmorphism */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 rounded-[1.8rem] bg-white/5 backdrop-blur-sm p-8 md:p-12 border border-white/10">
        <div className="max-w-xl space-y-6 text-left">
          {/* Badge nhỏ xinh phía trên title */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-amber-200 border border-white/10">
            <Sparkles className="h-3 w-3" />
            <span>Chương trình đặc biệt</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {title}
          </h2>

          <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
            {description}
          </p>

          {/* Stat Cards - Chia nhỏ thông tin để dễ quét (scannable) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 border border-white/5">
              <Users className="h-5 w-5 text-rose-400" />
              <span className="font-semibold text-white">
                {participants.toLocaleString()}
              </span>
              <span className="text-slate-400 text-sm">người tham gia</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 border border-white/5">
              <Clock className="h-5 w-5 text-amber-400" />
              <span className="text-slate-400 text-sm font-medium">
                Còn lại:
              </span>
              <span className="font-semibold text-white">{daysLeft} ngày</span>
            </div>
          </div>

          <div className="pt-4">
            <Button className="h-12 px-8 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-orange-500/40 active:scale-95">
              Tham gia ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 3. Image Section với Floating Animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-64 w-64 md:h-80 md:w-80"
        >
          {/* Glow effect đằng sau ảnh */}
          <div className="absolute inset-0 bg-orange-500/20 blur-[80px] rounded-full" />

          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          />
        </motion.div>
      </div>

      {/* 4. Decorative Background Elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-600/20 blur-[100px]" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-amber-600/20 blur-[100px]" />
    </motion.div>
  );
}
