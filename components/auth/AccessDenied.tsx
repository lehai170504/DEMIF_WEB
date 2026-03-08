// src/components/auth/AccessDenied.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AccessDenied() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden font-mono relative selection:bg-red-500/30">
      {/* Background Glowing Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />

      {/* 3D Shield Animation Area */}
      <div
        className="relative flex items-center justify-center w-64 h-64 mb-8"
        style={{ perspective: "1000px" }}
      >
        {/* Vòng cảnh báo bên ngoài */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-red-500/30 border-dashed rounded-full"
        />

        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-orange-500/20 rounded-full"
        />

        {/* Khối Khiên 3D lơ lửng */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotateY: [-15, 15, -15],
            rotateX: [5, -5, 5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 flex items-center justify-center w-28 h-28 bg-gradient-to-br from-red-500/20 to-orange-600/20 backdrop-blur-xl border border-red-500/50 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.4)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Lớp bóng đổ phía sau để tăng độ sâu 3D */}
          <div className="absolute inset-0 bg-red-500/20 rounded-3xl blur-md -translate-z-10" />
          <ShieldAlert className="w-14 h-14 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
        </motion.div>
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center relative z-10 max-w-lg px-6"
      >
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600 mb-4 tracking-tighter">
          403
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
          Truy cập bị từ chối
        </h2>
        <p className="text-zinc-400 text-sm mb-10 leading-relaxed">
          Khu vực này được bảo mật và chỉ dành cho Ban Quản Trị. Tài khoản của
          bạn không được cấp quyền để xem nội dung này.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="h-12 px-8 rounded-xl bg-white text-black hover:bg-gray-200 font-bold transition-all hover:scale-105"
          >
            <Link href="/home">
              <Home className="w-4 h-4 mr-2" />
              Về không gian học tập
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 px-8 rounded-xl bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-bold transition-all"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Về trang chủ
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
