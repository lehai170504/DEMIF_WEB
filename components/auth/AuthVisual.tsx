"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export const AuthVisual = () => {
  // Fix lỗi Hydration bằng cách chỉ tạo hạt sau khi component mount ở Client
  const [particles, setParticles] = useState<
    { top: string; left: string; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const newParticles = [...Array(8)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden border-l border-white/5 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent">
      {/* 1. HIỆU ỨNG HẠT NĂNG LƯỢNG TRÔI NỔI */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -120, 0],
            x: [0, 30, -30, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 bg-orange-500 rounded-full blur-[1px]"
          style={{ top: p.top, left: p.left }}
        />
      ))}

      {/* 2. CÁC LỚP ÁNH SÁNG MÔI TRƯỜNG (Ambient Glow) */}
      <div className="absolute w-[500px] h-[500px] bg-[#FF7A00]/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full" />

      {/* 3. TRUNG TÂM THỊ GIÁC 3D */}
      <div
        className="relative flex items-center justify-center w-full h-[450px]"
        style={{ perspective: "1200px" }}
      >
        {/* Hệ thống vòng quỹ đạo */}
        <div className="absolute w-80 h-80 border border-white/5 rounded-full" />
        <div className="absolute w-[400px] h-[400px] border border-white/[0.02] rounded-full" />

        {/* Khối Core AI xoay đa trục */}
        <motion.div
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 15, 0],
          }}
          transition={{
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-72 h-72 relative flex items-center justify-center"
        >
          {/* Vòng quét năng lượng lan tỏa */}
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 border border-[#FF7A00]/40 rounded-full"
          />

          {/* Quỹ đạo hạt công nghệ */}
          <div className="absolute inset-0 border-2 border-white/5 rounded-full rotate-45 border-t-[#FF7A00]/50 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-10 border border-white/5 rounded-full -rotate-45 border-b-purple-500/50 animate-[spin_15s_linear_infinite_reverse]" />

          {/* Khối cầu gương trung tâm */}
          <div className="relative w-36 h-36 bg-black/40 backdrop-blur-3xl rounded-[3.5rem] border border-white/20 shadow-[0_0_80px_rgba(255,122,0,0.2)] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7A00]/20 to-purple-600/20" />

            {/* Zap Icon phát sáng */}
            <motion.div
              animate={{
                filter: ["brightness(1)", "brightness(1.8)", "brightness(1)"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-16 h-16 text-white fill-[#FF7A00] drop-shadow-[0_0_20px_#FF7A00]" />
            </motion.div>

            {/* Hiệu ứng tia sáng quét qua */}
            <motion.div
              animate={{ x: [-200, 200] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            />
          </div>
        </motion.div>

        {/* 4. CÁC THẺ TRẠNG THÁI (Floating Labels) */}
        {/* Thẻ AI Verified */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-4 p-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl flex items-center gap-4 shadow-2xl z-20"
        >
          <div className="p-2.5 bg-emerald-500/20 rounded-2xl border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
              Xác thực AI
            </span>
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight">
              Hệ thống an toàn
            </span>
          </div>
        </motion.div>

        {/* Thẻ Neural Processing */}
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-10 left-4 p-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl flex items-center gap-4 shadow-2xl z-20"
        >
          <div className="p-2.5 bg-[#FF7A00]/20 rounded-2xl border border-[#FF7A00]/20">
            <Cpu className="w-6 h-6 text-[#FF7A00]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Mạng thần kinh
            </span>
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight">
              Đang tối ưu dữ liệu
            </span>
          </div>
        </motion.div>

        {/* Thẻ Global Connect */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-[85%] -translate-y-1/2 p-3 bg-white/5 rounded-full border border-white/10"
        >
          <Globe className="w-5 h-5 text-purple-400 opacity-50" />
        </motion.div>
      </div>

      {/* 5. PHẦN CHỮ THƯƠNG HIỆU */}
      <div className="mt-12 text-center relative z-10 font-mono">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-orange-500/50" />
          <span className="text-[10px] font-black text-[#FF7A00] uppercase tracking-[0.5em]">
            Hệ sinh thái Demif
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-orange-500/50" />
        </div>
        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-3 leading-none">
          Nâng Tầm <span className="text-[#FF7A00]">Tiếng Anh</span>
        </h2>
        <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-[0.25em] max-w-[320px] leading-relaxed mx-auto">
          Trải nghiệm học tập cá nhân hóa bằng trí tuệ nhân tạo thế hệ mới
        </p>
      </div>

      {/* Trang trí góc Tech Style */}
      <div className="absolute top-10 right-10 w-24 h-24 border-r border-t border-orange-500/20 rounded-tr-[3rem]" />
      <div className="absolute bottom-10 left-10 w-24 h-24 border-l border-b border-[#FF7A00]/20 rounded-bl-[3rem]" />
    </div>
  );
};
