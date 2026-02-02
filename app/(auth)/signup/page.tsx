"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

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
    // Simulate signup logic
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Nút quay lại trang chủ */}
      <Link
        href="/"
        className="absolute -top-16 left-0 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
      </Link>

      {/* GLASS CARD CONTAINER */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50">
        {/* HEADER: LOGO & TITLE */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] shadow-lg shadow-orange-500/20 mb-6 transform hover:scale-105 transition-transform duration-300">
            <img
              src="/DemifLogo.png"
              alt="DEMIF Logo"
              className="w-10 h-10 brightness-0 invert" // Logo trắng để hợp nền tối
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Tạo tài khoản mới
          </h1>
          <p className="text-zinc-400 text-sm">
            Bắt đầu hành trình chinh phục ngôn ngữ ngay hôm nay
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="text-zinc-300 text-sm font-medium"
            >
              Tên đăng nhập
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="nguyenvana"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-[#FF7A00]/50 focus:ring-[#FF7A00]/20 h-12 rounded-xl"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-zinc-300 text-sm font-medium"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-[#FF7A00]/50 focus:ring-[#FF7A00]/20 h-12 rounded-xl"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-zinc-300 text-sm font-medium"
            >
              Mật khẩu
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-[#FF7A00]/50 focus:ring-[#FF7A00]/20 h-12 rounded-xl pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-10 w-10 text-zinc-400 hover:text-white hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                </span>
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:brightness-110 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tạo tài khoản...
              </>
            ) : (
              "Đăng ký"
            )}
          </Button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm">
          <p className="text-zinc-400">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-[#FF7A00] font-bold hover:text-[#FF9E2C] hover:underline transition-all"
            >
              Đăng nhập ngay
            </Link>
          </p>
          <div className="mt-4 text-xs text-zinc-500">
            Bằng việc tiếp tục, bạn đồng ý với{" "}
            <Link href="/terms" className="hover:text-zinc-300 underline">
              Điều khoản
            </Link>{" "}
            và{" "}
            <Link href="/privacy" className="hover:text-zinc-300 underline">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
