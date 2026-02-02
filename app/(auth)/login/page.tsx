// src/app/(auth)/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard"); // Chuyển hướng sau khi login
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
              className="w-10 h-10 brightness-0 invert" // Logo trắng
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Chào mừng trở lại
          </h1>
          <p className="text-zinc-400 text-sm">
            Đăng nhập để tiếp tục hành trình chinh phục ngôn ngữ
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              // Style Input Dark Mode
              className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-[#FF7A00]/50 focus:ring-[#FF7A00]/20 h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-zinc-300 text-sm font-medium"
              >
                Mật khẩu
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#FF7A00] hover:text-[#FF9E2C] hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-[#FF7A00]/50 focus:ring-[#FF7A00]/20 h-12 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:brightness-110 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm">
          <p className="text-zinc-400">
            Chưa có tài khoản?{" "}
            <Link
              href="/signup"
              className="text-[#FF7A00] font-bold hover:text-[#FF9E2C] hover:underline transition-all"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
