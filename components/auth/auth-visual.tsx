"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { useEffect, useState, memo } from "react";

// Định nghĩa kiểu dữ liệu cho hạt
type Particle = {
  top: string;
  left: string;
  duration: number;
  delay: number;
};

// Sử dụng memo để ngăn component này render lại khi cha (LoginPage) thay đổi state (nhập liệu)
export const AuthVisual = memo(() => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Chỉ tạo hạt ở phía Client để tránh lỗi Hydration (Server HTML != Client HTML)
    const newParticles = [...Array(12)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5, // Random từ 5s -> 10s
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden border-l border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#050505]">
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF7A00]/[0.02] to-transparent pointer-events-none" />

      {/* 1. HIỆU ỨNG HẠT NĂNG LƯỢNG (Particles) */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, -50, 0],
            opacity: [0, 0.4, 0],
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

      {/* 2. ÁNH SÁNG MÔI TRƯỜNG (Ambient Glow) */}
      <div className="absolute w-[600px] h-[600px] bg-[#FF7A00]/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute top-[10%] right-[-20%] w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full" />

      {/* 3. TRUNG TÂM THỊ GIÁC 3D (Core) */}
      <div
        className="relative flex items-center justify-center w-full h-[500px]"
        style={{ perspective: "1000px" }}
      >
        {/* Các vòng quỹ đạo tĩnh */}
        <div className="absolute w-[350px] h-[350px] border border-gray-200 dark:border-white/5 rounded-full opacity-50" />
        <div className="absolute w-[480px] h-[480px] border border-gray-300 dark:border-white/[0.03] rounded-full opacity-30" />

        {/* Khối Core xoay 3D */}
        <motion.div
          animate={{
            rotateY: [0, 360],
            rotateX: [10, -10, 10], // Xoay nhẹ trục X để tạo cảm giác 3D
          }}
          transition={{
            rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-80 h-80 relative flex items-center justify-center"
        >
          {/* Vòng năng lượng tỏa ra (Pulse) */}
          <motion.div
            animate={{ scale: [0.8, 1.5], opacity: [0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 border border-[#FF7A00]/30 rounded-full"
          />

          {/* Vòng quay Orbit 1 */}
          <div className="absolute inset-0 border border-gray-300 dark:border-white/10 rounded-full rotate-45 border-t-[#FF7A00]/60 animate-[spin_8s_linear_infinite]" />

          {/* Vòng quay Orbit 2 (Ngược chiều) */}
          <div className="absolute inset-8 border border-gray-200 dark:border-white/5 rounded-full -rotate-45 border-b-purple-500/60 animate-[spin_12s_linear_infinite_reverse]" />

          {/* KHỐI CẦU GƯƠNG TRUNG TÂM */}
          <div className="relative w-40 h-40 bg-white dark:bg-black/60 backdrop-blur-3xl rounded-full border border-gray-300 dark:border-white/10 shadow-[0_0_60px_rgba(255,122,0,0.15)] flex items-center justify-center overflow-hidden z-10">
            {/* Gradient nền bên trong cầu */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7A00]/10 to-purple-600/10" />

            {/* Icon Sét (Zap) */}
            <motion.div
              animate={{
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-16 h-16 text-gray-900 dark:text-zinc-100 fill-[#FF7A00] drop-shadow-[0_0_15px_rgba(255,122,0,0.8)]" />
            </motion.div>

            {/* Hiệu ứng tia sáng quét qua bề mặt (Shine effect) */}
            <motion.div
              animate={{ x: ["-150%", "150%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            />
          </div>
        </motion.div>

        {/* 4. FLOATING CARDS (Thẻ trôi nổi) */}
        <FloatingCard
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          label="AI Verified"
          sub="Secure Core"
          color="emerald"
          className="top-20 right-10"
          delay={0}
        />

        <FloatingCard
          icon={<Cpu className="w-5 h-5 text-[#FF7A00]" />}
          label="Neural Engine"
          sub="Processing..."
          color="orange"
          className="bottom-20 left-10"
          delay={1.5}
        />

        {/* Hành tinh nhỏ quay quanh */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 p-2 bg-white dark:bg-[#0D0D0D] border border-gray-300 dark:border-white/10 rounded-full shadow-lg">
            <Globe className="w-4 h-4 text-purple-400" />
          </div>
        </motion.div>
      </div>

      {/* 5. TEXT BRANDING */}
      <div className="mt-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-[#FF7A00]" />
          <span className="text-[10px] font-bold text-gray-600 dark:text-zinc-400 uppercase tracking-widest">
            Demif Ecosystem
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter mb-2">
          Master{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-purple-500">
            English
          </span>
        </h2>
        <p className="text-gray-500 dark:text-zinc-500 text-xs font-medium uppercase tracking-[0.3em] max-w-xs mx-auto">
          with Advanced AI Intelligence
        </p>
      </div>
    </div>
  );
});

// Tách nhỏ component FloatingCard để code gọn hơn
const FloatingCard = ({ icon, label, sub, color, className, delay }: any) => {
  // Map màu sắc cụ thể để Tailwind có thể detect được class khi build
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
    // Thêm các màu khác nếu cần (mặc định fallback về orange)
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
      className={`absolute ${className} p-3 bg-white dark:bg-[#0D0D0D]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl flex items-center gap-3 shadow-2xl z-20`}
    >
      <div
        className={`p-2 rounded-xl ${currentStyle.bg} border ${currentStyle.border}`}
      >
        {icon}
      </div>
      <div className="flex flex-col text-left">
        <span
          className={`text-[10px] font-black uppercase tracking-wider ${currentStyle.text}`}
        >
          {label}
        </span>
        <span className="text-[9px] text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-tight">
          {sub}
        </span>
      </div>
    </motion.div>
  );
};

AuthVisual.displayName = "AuthVisual";
