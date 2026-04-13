"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Lightbulb,
  Settings2,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import notFoundAnimEdTech from "@/public/animations/404-not-found.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Hạt trôi nổi chủ đề Giáo dục & Công nghệ
const FLOATING_TYPES = [
  "A",
  "B",
  "C",
  "∑",
  "π",
  "∞",
  "💡",
  "📚",
  "✏️",
  "🎯",
  "</>",
];

interface Particle {
  id: number;
  type: string;
  startX: number;
  startY: number;
  size: number;
  delay: number;
}

export default function NotFoundEdTech() {
  const [particleCount, setParticleCount] = useState<number>(15);
  const [speed, setSpeed] = useState<number>(30);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Tránh lỗi hydration của Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Tạo ra các hạt tri thức trôi nổi ngẫu nhiên
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i + Math.random(),
      type: FLOATING_TYPES[Math.floor(Math.random() * FLOATING_TYPES.length)],
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      size: Math.random() * 20 + 16,
      delay: Math.random() * -30,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  if (!isMounted) return null;

  // Tính toán thời gian bay dựa trên thanh tốc độ
  const calculateDuration = () => {
    const minDuration = 15;
    const maxDuration = 80;
    return maxDuration - ((speed - 1) / 99) * (maxDuration - minDuration);
  };

  const currentDuration = calculateDuration();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#09090b] font-mono text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.03] bg-[url(/grid-pattern.svg)] bg-[length:32px_32px]"></div>

      {/* Các hạt tri thức trôi nổi */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                x: `${p.startX}vw`,
                y: `${p.startY}vh`,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: [
                  `${p.startX}vw`,
                  `${p.startX + (Math.random() * 10 - 5)}vw`,
                  `${p.startX - (Math.random() * 10 - 5)}vw`,
                  `${p.startX}vw`,
                ],
                y: [
                  `${p.startY}vh`,
                  `${p.startY - (Math.random() * 15 + 10)}vh`,
                  `${p.startY + (Math.random() * 15 + 10)}vh`,
                  `${p.startY}vh`,
                ],
                rotate: [0, 90, -90, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: currentDuration,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay,
              }}
              className="absolute text-slate-400 dark:text-slate-500 font-black drop-shadow-sm"
              style={{ fontSize: p.size }}
            >
              {p.type}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* NỘI DUNG CHÍNH (MAIN CONTENT) */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-10 text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center gap-2"
        >
          {/* NÂNG CẤP: Container hình Lottie bự chà bá, không bo viền, tràn mượt mà */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative w-full aspect-[16/10] max-w-[800px]" // Chỉnh kích thước bự ra ở đây
          >
            {/* 4. Sử dụng Lottie component y hệt Landing Page */}
            <Lottie
              animationData={notFoundAnimEdTech}
              loop={true}
              autoplay={true}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice", // Đảm bảo hình tràn đẹp, không bị méo
                progressiveLoad: true,
                hideOnTransparent: true,
              }}
              style={{ width: "100%", height: "100%" }} // Full container
            />
            {/* Vòng sáng nhẹ sau lưng tạo điểm nhấn */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-orange-500/15 blur-[80px] -z-10 rounded-full"></div>
          </motion.div>

          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 -mt-8 relative z-20">
            <Lightbulb className="w-4 h-4" />
            <span className="text-[10px] font-black tracking-widest uppercase">
              Chưa tìm thấy bài học
            </span>
          </div>

          {/* Text Content */}
          <div className="space-y-4 relative z-20">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Trang tài liệu <span className="text-[#FF7A00]">đã biến mất</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
              Có vẻ như khóa học, tài liệu hoặc đường dẫn bạn truy cập không tồn
              tại hoặc đã được giảng viên di dời.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full justify-center relative z-20">
            <Link href="/home">
              <Button
                variant="default"
                className="h-12 px-8 rounded-xl bg-[#FF7A00] hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-orange-500/25 transition-all w-full sm:w-auto flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Về Lớp Học
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="h-12 px-8 rounded-xl border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 font-bold uppercase tracking-wider text-xs transition-all w-full sm:w-auto flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Button>
          </div>
        </motion.div>
      </div>

      {/* BẢNG TƯƠNG TÁC: GÓC XẢ STRESS (Chỉ hiện trên Desktop) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="hidden lg:block absolute bottom-8 right-8 w-[320px] z-20"
      >
        <div className="p-5 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-5">
          <div className="flex items-center gap-3 text-slate-700 dark:text-zinc-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Góc xả stress
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-white">
                Mô phỏng dòng chảy ý tưởng
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Thanh trượt: Số lượng hạt */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="text-slate-500 dark:text-zinc-400">
                  Số lượng hạt
                </span>
                <div className="flex items-center gap-1 text-orange-500 font-black">
                  <span>{particleCount}</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FF7A00]"
              />
            </div>

            {/* Thanh trượt: Tốc độ */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="text-slate-500 dark:text-zinc-400">
                  Tốc độ tư duy
                </span>
                <div className="flex items-center gap-1 text-orange-500 font-black">
                  <span>{speed}%</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FF7A00]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
