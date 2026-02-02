// src/app/(auth)/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Chrome } from "lucide-react";
import { motion } from "framer-motion";
import { AuthVisual } from "@/components/auth/AuthVisual"; // Import component mới

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/home");
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 items-center">
      {/* CỘT TRÁI: LOGIN FORM */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 relative"
      >
        <Link
          href="/"
          className="absolute -top-16 left-0 flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm font-medium group font-sans"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </Link>

        {/* GLASS CARD CONTAINER */}
        <div className="bg-[#0D0D0D]/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7A00] to-purple-600 rounded-[32px] opacity-10 blur-sm group-hover:opacity-20 transition duration-500" />

          <div className="text-center mb-10 relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Chào mừng <span className="text-[#FF7A00]">trở lại</span>
            </h1>
            <p className="text-zinc-400 text-sm font-medium italic">
              Đăng nhập để tiếp tục hành trình cùng AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Field Email */}
            <div className="relative group">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
                className="peer w-full bg-black/40 border border-white/10 text-white h-14 px-4 rounded-xl outline-none transition-all focus:border-[#FF7A00]/60 placeholder-transparent"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[#FF7A00] peer-focus:text-xs peer-focus:bg-[#0D0D0D] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1"
              >
                Địa chỉ Email
              </label>
            </div>

            {/* Field Password */}
            <div className="relative group">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" "
                className="peer w-full bg-black/40 border border-white/10 text-white h-14 px-4 rounded-xl outline-none transition-all focus:border-[#FF7A00]/60 placeholder-transparent"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[#FF7A00] peer-focus:text-xs peer-focus:bg-[#0D0D0D] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1"
              >
                Mật khẩu
              </label>
              <Link
                href="/forgot-password"
                className="absolute right-4 top-4 text-xs font-bold text-[#FF7A00] hover:text-[#FF9E2C] transition-colors"
              >
                Quên?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:brightness-110 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Đăng nhập ngay"
              )}
            </Button>
          </form>

          <div className="relative my-8 relative z-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
              <span className="bg-[#0D0D0D] px-3 text-zinc-500 italic">
                Truy cập nhanh qua
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-white/5 border-white/10 hover:bg-white/10 rounded-xl h-12 font-bold gap-3 text-zinc-200 transition-all active:scale-95 shadow-xl"
          >
            <Chrome className="w-5 h-5 text-[#FF7A00]" />
            Tiếp tục với Google
          </Button>

          <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
            <p className="text-zinc-500 text-sm">
              Mới biết đến Demif?{" "}
              <Link
                href="/signup"
                className="text-[#FF7A00] font-bold hover:text-[#FF9E2C] hover:underline transition-all"
              >
                Tạo tài khoản
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* CỘT PHẢI: HIỆU ỨNG 3D VISUAL (Có thể tái sử dụng) */}
      <AuthVisual />
    </div>
  );
}
