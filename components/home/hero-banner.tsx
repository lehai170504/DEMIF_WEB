"use client";

import { motion } from "framer-motion";
import { Users, Clock, ArrowRight, Sparkles, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroBannerProps {
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
}

export function HeroBanner({
  title,
  description,
  participants,
  daysLeft,
}: HeroBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-[2.5rem] bg-[#0F0F11] border border-white/10 shadow-2xl shadow-black/50"
    >
      {/* 1. Dynamic Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-orange-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen" />
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:30px_30px] opacity-[0.03]" />
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 p-8 md:p-12 lg:p-16">
        {/* --- LEFT CONTENT --- */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-orange-400 border border-orange-500/20 uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Chương trình đặc biệt</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]"
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            {description}
          </motion.p>

          {/* Stats & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
          >
            <Button className="h-14 px-8 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300">
              Tham gia ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2 text-zinc-300">
                <Users className="h-5 w-5 text-blue-400" />
                <span>
                  <strong className="text-white">
                    {participants.toLocaleString()}
                  </strong>{" "}
                  học viên
                </span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="h-5 w-5 text-orange-400" />
                <span>
                  Còn <strong className="text-white">{daysLeft}</strong> ngày
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT CONTENT (3D CSS COMPOSITION) --- */}
        <div className="flex-1 w-full max-w-[500px] aspect-square relative perspective-[1000px]">
          {/* Floating Container */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotateX: [5, 10, 5],
              rotateY: [-5, 5, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full preserve-3d"
          >
            {/* 3D Element 1: Back Card (Blurry) */}
            <div className="absolute top-10 right-10 w-3/4 h-3/4 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-[2rem] border border-white/5 opacity-40 blur-sm transform translate-z-[-50px] rotate-6" />

            {/* 3D Element 2: Main Card (Clear) */}
            <div className="absolute inset-4 bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black flex flex-col items-center justify-center p-8 transform translate-z-[20px]">
              {/* Decorative Circle */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center shadow-lg shadow-orange-500/30 mb-6 relative">
                <Trophy className="w-16 h-16 text-white drop-shadow-md" />
                {/* Orbiting particles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-white/20 border-dashed"
                />
              </div>

              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                Thử thách
              </h3>
              <div className="px-4 py-1 rounded-lg bg-white/10 border border-white/5 text-orange-400 font-mono text-sm mb-6">
                LEVEL UP YOUR SKILLS
              </div>

              {/* Progress Bar Mockup */}
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]"
                />
              </div>
              <div className="w-full flex justify-between mt-2 text-xs text-zinc-500 font-mono">
                <span>Progress</span>
                <span>75%</span>
              </div>
            </div>

            {/* 3D Element 3: Floating Badge (Pop out) */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 bg-[#1e1e20] border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3 transform translate-z-[60px]"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase">
                  Điểm thưởng
                </p>
                <p className="text-lg font-black text-white leading-none">
                  +500 XP
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
