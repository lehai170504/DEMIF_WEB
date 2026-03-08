// src/components/auth/RoleTransition.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCircle2 } from "lucide-react";

interface RoleTransitionProps {
  message?: string;
  role?: "admin" | "member" | "checking";
}

export function RoleTransition({
  message = "Đang xác thực danh tính...",
  role = "checking",
}: RoleTransitionProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden font-mono">
      {/* ... (Giữ nguyên các khối hiệu ứng Orbs và Lõi 3D phía trên) ... */}

      {/* --- Hiệu ứng nền 3D (Glowing Orbs) --- */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/3 right-1/3 w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"
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
          className="absolute inset-0 border-[2px] border-orange-500/30 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Vòng xoay trục Y */}
        <motion.div
          animate={{ rotateY: 360, rotateX: 90, rotateZ: 180 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-[2px] border-purple-500/40 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Vòng xoay trục Z */}
        <motion.div
          animate={{ rotateZ: 360, rotateX: 180, rotateY: 90 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 border-[2px] border-white/10 rounded-full"
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
          className="relative z-10 flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_0_40px_rgba(249,115,22,0.3)]"
        >
          {role === "admin" ? (
            <ShieldCheck className="w-10 h-10 text-orange-500" />
          ) : (
            <UserCircle2 className="w-10 h-10 text-orange-500" />
          )}
        </motion.div>
      </div>

      {/* --- Text hiển thị --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex flex-col items-center gap-3"
      >
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide uppercase">
          {message}
        </h2>

        {/* Thanh loading tiến trình giả lập */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            // SỬA Ở ĐÂY: Tăng duration lên 3 hoặc 4 giây để thanh chạy từ từ
            transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
