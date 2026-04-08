"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCircle2, TerminalSquare } from "lucide-react";

interface RoleTransitionProps {
  message?: string;
  role?: "admin" | "moderator" | "checking" | "user";
}

export function RoleTransition({
  message = "Đang kiểm tra quyền truy cập...",
  role = "checking",
}: RoleTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden font-mono"
    >
      {/* --- Hiệu ứng nền 3D (Glowing Orbs) --- */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"
      />

      {/* --- Lõi 3D Animation --- */}
      <div
        className="relative flex items-center justify-center w-64 h-64"
        style={{ perspective: "1000px" }}
      >
        {/* Vòng xoay trục X */}
        <motion.div
          animate={{ rotateX: 360, rotateY: 180, rotateZ: 90 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-orange-500/40 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Vòng xoay trục Y */}
        <motion.div
          animate={{ rotateY: 360, rotateX: 90, rotateZ: 180 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-zinc-500/40 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Vòng xoay trục Z */}
        <motion.div
          animate={{ rotateZ: 360, rotateX: 180, rotateY: 90 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 border border-white/10 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Khối trung tâm (Glassmorphism 3D) */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2,
          }}
          className="relative z-10 flex items-center justify-center w-20 h-20 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.2)]"
        >
          {role === "admin" || role === "moderator" ? (
            <ShieldCheck className="w-8 h-8 text-orange-500" />
          ) : role === "checking" ? (
            <TerminalSquare className="w-8 h-8 text-zinc-400 animate-pulse" />
          ) : (
            <UserCircle2 className="w-8 h-8 text-emerald-500" />
          )}
        </motion.div>
      </div>

      {/* --- Text hiển thị --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 flex flex-col items-center gap-5 z-10"
      >
        <h2 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 tracking-[0.3em] uppercase">
          {message}
        </h2>

        {/* Thanh loading tiến trình giả lập */}
        <div className="w-56 h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
            className="h-full bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
