// src/app/(auth)/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Loader2,
  ArrowLeft,
  Chrome,
  AlertCircle,
  Mail,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/use-auth";
import { AuthVisual } from "@/components/auth/AuthVisual";
// Import Schema và Type vừa tạo
import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";

export default function LoginPage() {
  // 1. Dùng 1 state object duy nhất cho form (chuẩn pattern)
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  // State lưu lỗi (Key tương ứng với field trong form)
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({});

  const loginMutation = useLogin();

  // Hàm xử lý khi nhập liệu (vừa update state, vừa xóa lỗi cũ)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Xóa lỗi của trường đang nhập để trải nghiệm tốt hơn
    if (errors[id as keyof LoginFormValues]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 2. Validate bằng Zod Schema
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      // Nếu lỗi, map lỗi từ Zod sang state errors để hiển thị đỏ lòm
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        // Chỉ lấy lỗi đầu tiên cho mỗi trường
        if (!fieldErrors[err.path[0]]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return; // Dừng lại, không gọi API
    }

    // 3. Nếu OK, gọi API (dữ liệu đã sạch)
    loginMutation.mutate(result.data);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen gap-8 items-center justify-center p-4">
      {/* CỘT TRÁI: FORM ĐĂNG NHẬP */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 max-w-[500px] relative"
      >
        <Link
          href="/"
          className="absolute -top-12 left-0 flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </Link>

        <div className="bg-[#0D0D0D]/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Chào mừng <span className="text-[#FF7A00]">trở lại</span>
            </h1>
            <p className="text-zinc-400 text-sm italic">
              Tiếp tục hành trình luyện nói tiếng Anh cùng AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* --- INPUT EMAIL --- */}
            <div className="space-y-2">
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className={`peer w-full bg-black/40 border text-white h-14 px-4 rounded-xl outline-none transition-all pt-3
                    ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-[#FF7A00]/60"
                    }`}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-all duration-200 pointer-events-none 
                  peer-focus:top-3 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider
                  peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider
                  ${
                    errors.email
                      ? "text-red-400 peer-focus:text-red-400 peer-[:not(:placeholder-shown)]:text-red-400"
                      : "text-zinc-500 peer-focus:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-zinc-400"
                  }`}
                >
                  Địa chỉ Email
                </label>
                <Mail
                  className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-all
                  ${errors.email ? "text-red-500 opacity-100" : "text-zinc-500 opacity-50 peer-focus:opacity-100 peer-focus:text-[#FF7A00]"}`}
                />
              </div>
              {/* Hiển thị lỗi Email */}
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 ml-1 font-medium"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* --- INPUT PASSWORD --- */}
            <div className="space-y-2">
              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                  className={`peer w-full bg-black/40 border text-white h-14 px-4 rounded-xl outline-none transition-all pt-3 pr-16
                    ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-[#FF7A00]/60"
                    }`}
                />
                <label
                  htmlFor="password"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-all duration-200 pointer-events-none 
                  peer-focus:top-3 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider
                  peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider
                  ${
                    errors.password
                      ? "text-red-400 peer-focus:text-red-400 peer-[:not(:placeholder-shown)]:text-red-400"
                      : "text-zinc-500 peer-focus:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-zinc-400"
                  }`}
                >
                  Mật khẩu
                </label>

                <Link
                  href="/forgot-password"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-1"
                >
                  <span className="text-xs font-bold text-[#FF7A00] hover:underline whitespace-nowrap">
                    Quên?
                  </span>
                </Link>
              </div>
              {/* Hiển thị lỗi Password */}
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 ml-1 font-medium"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* API Error Message (Lỗi từ Server trả về) */}
            {loginMutation.isError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>
                  {(loginMutation.error as any)?.response?.data?.detail ||
                    (loginMutation.error as any)?.response?.data?.message ||
                    "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin."}
                </span>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-12 bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:brightness-110 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loginMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                "Đăng nhập ngay"
              )}
            </Button>
          </form>

          {/* Phần Footer */}
          <div className="relative my-8 text-center">
            <span className="bg-[#0D0D0D] px-3 text-[10px] text-zinc-500 uppercase tracking-widest relative z-10">
              Truy cập nhanh qua
            </span>
            <div className="absolute top-1/2 left-0 w-full border-t border-white/5"></div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-white/5 border-white/10 hover:bg-white/10 rounded-xl h-12 gap-3 text-zinc-200 transition-colors"
          >
            <Chrome className="w-5 h-5 text-[#FF7A00]" />
            Tiếp tục với Google
          </Button>

          <p className="mt-8 text-center text-zinc-500 text-sm">
            Mới biết đến Demif?{" "}
            <Link
              href="/signup"
              className="text-[#FF7A00] font-bold hover:underline"
            >
              Tạo tài khoản
            </Link>
          </p>
        </div>
      </motion.div>

      <AuthVisual />
    </div>
  );
}
