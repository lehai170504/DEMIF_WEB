"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Chrome, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { AuthVisual } from "@/components/auth/AuthVisual";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Giả lập đăng ký
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/home");
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-12 items-center">
      {/* CỘT TRÁI: SIGNUP FORM */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 relative"
      >
        <Link
          href="/"
          className="absolute -top-12 left-0 flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm font-medium group font-sans"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </Link>

        {/* GLASS CARD CONTAINER */}
        <div className="bg-[#0D0D0D]/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {/* Hiệu ứng tia sáng chạy quanh viền */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7A00] to-purple-600 rounded-[32px] opacity-10 blur-sm group-hover:opacity-20 transition duration-500" />

          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Tạo <span className="text-[#FF7A00]">tài khoản</span> mới
            </h1>
            <p className="text-zinc-400 text-sm font-medium italic">
              Bắt đầu hành trình chinh phục ngôn ngữ cùng AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Input Tên đăng nhập */}
            <div className="relative group">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder=" "
                className="peer w-full bg-black/40 border border-white/10 text-white h-14 px-4 rounded-xl outline-none transition-all focus:border-[#FF7A00]/60 placeholder-transparent"
              />
              <label
                htmlFor="username"
                className="absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none
                peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[#FF7A00] peer-focus:text-xs peer-focus:bg-[#0D0D0D] peer-focus:px-1
                peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1"
              >
                Tên đăng nhập
              </label>
            </div>

            {/* Input Email */}
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
                className="absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none
                peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[#FF7A00] peer-focus:text-xs peer-focus:bg-[#0D0D0D] peer-focus:px-1
                peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1"
              >
                Địa chỉ Email
              </label>
            </div>

            {/* Input Mật khẩu */}
            <div className="relative group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" "
                className="peer w-full bg-black/40 border border-white/10 text-white h-14 px-4 rounded-xl outline-none transition-all focus:border-[#FF7A00]/60 placeholder-transparent pr-12"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none
                peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[#FF7A00] peer-focus:text-xs peer-focus:bg-[#0D0D0D] peer-focus:px-1
                peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1"
              >
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:brightness-110 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Đăng ký ngay"
              )}
            </Button>
          </form>

          {/* ĐĂNG KÝ NHANH GOOGLE */}
          <div className="relative my-8 relative z-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
              <span className="bg-[#0D0D0D] px-3 text-zinc-500 italic">
                Hoặc đăng ký nhanh qua
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/10 hover:bg-white/10 rounded-xl h-12 font-bold gap-3 text-zinc-200 transition-all active:scale-95 shadow-xl"
            >
              <Chrome className="w-5 h-5 text-[#FF7A00]" />
              Tham gia bằng Google
            </Button>
          </div>

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
            <p className="text-zinc-500 text-sm">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-[#FF7A00] font-bold hover:text-[#FF9E2C] hover:underline transition-all"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* CỘT PHẢI: HIỆU ỨNG 3D VISUAL */}
      <AuthVisual />
    </div>
  );
}
