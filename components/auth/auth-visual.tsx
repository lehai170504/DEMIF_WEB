// src/components/auth/auth-visual.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { useEffect, useState, memo } from "react";

type Particle = {
  top: string;
  left: string;
  duration: number;
  delay: number;
};

export const AuthVisual = memo(() => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = [...Array(15)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden border-l border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#050505]">
      {/* 1. BACKGROUND GRADIENT & GLOWS */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF7A00]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-[#FF7A00]/5 blur-[120px] rounded-full animate-pulse opacity-60" />
      <div className="absolute top-[15%] right-[-10%] w-[350px] h-[350px] bg-purple-600/10 blur-[100px] rounded-full" />

      {/* 2. HIỆU ỨNG HẠT */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -80, 0],
            x: [0, 40, -40, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 bg-[#FF7A00] rounded-full blur-[1px]"
          style={{ top: p.top, left: p.left }}
        />
      ))}

      {/* 3. TRUNG TÂM THỊ GIÁC 3D */}
      <div
        className="relative flex items-center justify-center w-full max-w-[500px] aspect-square mb-12"
        style={{ perspective: "1200px" }}
      >
        {/* Các vòng quỹ đạo tĩnh (giảm kích thước lại để vừa vặn hơn) */}
        <div className="absolute w-[280px] h-[280px] border border-gray-200 dark:border-white/5 rounded-full opacity-50" />
        <div className="absolute w-[400px] h-[400px] border border-gray-300 dark:border-white/[0.03] rounded-full opacity-30" />

        {/* Khối Core xoay 3D */}
        <motion.div
          animate={{
            rotateY: [0, 360],
            rotateX: [15, -15, 15],
          }}
          transition={{
            rotateY: { duration: 30, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-64 h-64 relative flex items-center justify-center"
        >
          {/* Vòng năng lượng tỏa ra (Pulse) */}
          <motion.div
            animate={{ scale: [0.9, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 border border-[#FF7A00]/40 rounded-full"
          />

          {/* Vòng quay Orbit 1 */}
          <div className="absolute inset-[-10px] border border-gray-300 dark:border-white/10 rounded-full rotate-45 border-t-[#FF7A00]/70 animate-[spin_10s_linear_infinite]" />

          {/* Vòng quay Orbit 2 (Ngược chiều) */}
          <div className="absolute inset-4 border border-gray-200 dark:border-white/5 rounded-full -rotate-45 border-b-purple-500/70 animate-[spin_14s_linear_infinite_reverse]" />

          {/* KHỐI CẦU GƯƠNG TRUNG TÂM */}
          <div className="relative w-32 h-32 bg-white dark:bg-black/60 backdrop-blur-3xl rounded-full border border-gray-300 dark:border-white/10 shadow-[0_0_50px_rgba(255,122,0,0.2)] flex items-center justify-center overflow-hidden z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7A00]/15 to-purple-600/15" />

            <motion.div
              animate={{
                filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-12 h-12 text-gray-900 dark:text-zinc-100 fill-[#FF7A00] drop-shadow-[0_0_12px_rgba(255,122,0,0.6)]" />
            </motion.div>

            {/* Hiệu ứng tia sáng quét */}
            <motion.div
              animate={{ x: ["-150%", "150%"] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            />
          </div>
        </motion.div>

        {/* 4. FLOATING CARDS (Đẩy ra xa hơn một chút để không đè vào lõi) */}
        <FloatingCard
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          label="AI Verified"
          sub="Secure Core"
          color="emerald"
          className="top-12 -right-4 xl:right-4"
          delay={0}
        />

        <FloatingCard
          icon={<Cpu className="w-5 h-5 text-[#FF7A00]" />}
          label="Neural Engine"
          sub="Processing..."
          color="orange"
          className="bottom-16 -left-4 xl:left-4"
          delay={1.5}
        />

        {/* Hành tinh nhỏ quay quanh quỹ đạo lớn hơn */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px]"
        >
          <div className="absolute top-[10%] right-[10%] p-2 bg-white dark:bg-[#0D0D0D] border border-gray-300 dark:border-white/10 rounded-full shadow-lg z-20">
            <Globe className="w-4 h-4 text-purple-400" />
          </div>
        </motion.div>
      </div>

      {/* 5. TEXT BRANDING */}
      <div className="text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
          <span className="text-[10px] font-bold text-gray-600 dark:text-zinc-300 uppercase tracking-[0.2em]">
            Demif Ecosystem
          </span>
        </div>

        <h2 className="text-3xl xl:text-4xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter mb-3 drop-shadow-sm">
          Master{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-purple-500 drop-shadow-none pr-2">
            English
          </span>
        </h2>

        <p className="text-gray-500 dark:text-zinc-500 text-xs font-medium uppercase tracking-[0.4em] px-4">
          with Advanced AI Intelligence
        </p>
      </div>
    </div>
  );
});

// Component con FloatingCard
const FloatingCard = ({ icon, label, sub, color, className, delay }: any) => {
  const colorStyles: Record<
    string,
    { bg: string; border: string; text: string }
  > = {
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/10",
      text: "text-emerald-400",
    },
    orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/10",
      text: "text-orange-400",
    },
    default: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/10",
      text: "text-orange-400",
    },
  };

  const currentStyle = colorStyles[color] || colorStyles.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -15, 0] }}
      transition={{
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay },
        opacity: { duration: 0.5 },
      }}
      className={`absolute ${className} p-3 pr-5 bg-white dark:bg-[#0D0D0D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl flex items-center gap-3 shadow-xl z-20`}
    >
      <div
        className={`p-2.5 rounded-xl ${currentStyle.bg} border ${currentStyle.border}`}
      >
        {icon}
      </div>
      <div className="flex flex-col text-left">
        <span
          className={`text-[10px] font-black uppercase tracking-wider ${currentStyle.text}`}
        >
          {label}
        </span>
        <span className="text-[9px] text-gray-500 dark:text-zinc-400 font-bold uppercase tracking-tight mt-0.5">
          {sub}
        </span>
      </div>
    </motion.div>
  );
};

AuthVisual.displayName = "AuthVisual";
