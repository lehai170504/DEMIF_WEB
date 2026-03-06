// src/app/(auth)/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Loader2,
  ArrowLeft,
  AlertCircle,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthVisual } from "@/components/auth/auth-visual";

// Hooks & Schemas
import { useLogin, useGoogleOAuthLogin } from "@/hooks/use-auth"; // Dùng hook Google OAuth mới
import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";

// Google OAuth
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// Lấy Client ID từ biến môi trường
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function LoginPage() {
  // 1. State quản lý form
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormValues>>({});
  const [showPassword, setShowPassword] = useState(false);

  // 2. Init Hooks
  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleOAuthLogin(); // Gọi hook Google OAuth

  // --- HÀM XỬ LÝ NHẬP LIỆU ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id as keyof LoginFormValues]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  // --- HÀM XỬ LÝ LOGIN THƯỜNG ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        if (!fieldErrors[err.path[0]]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    loginMutation.mutate(result.data);
  };

  return (
    // Bọc toàn bộ giao diện bằng GoogleOAuthProvider để khởi tạo SDK
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
            className="absolute -top-12 left-0 flex items-center gap-2 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Quay lại trang chủ
          </Link>

          <div className="bg-white dark:bg-[#0D0D0D]/60 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Hiệu ứng nền */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7A00] to-purple-600 rounded-[32px] opacity-10 blur-sm pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Chào mừng <span className="text-[#FF7A00]">trở lại</span>
                </h1>
                <p className="text-gray-600 dark:text-zinc-400 text-sm italic">
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
                      className={`peer w-full bg-gray-50 dark:bg-black/40 border text-gray-900 dark:text-white h-14 px-4 rounded-xl outline-none transition-all pt-3
                        ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 dark:border-white/10 focus:border-[#FF7A00]/60"
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
                        : "text-gray-500 dark:text-zinc-500 peer-focus:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-zinc-400"
                    }`}
                    >
                      Địa chỉ Email
                    </label>
                    <Mail
                      className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-all
                    ${errors.email ? "text-red-500 opacity-100" : "text-gray-400 dark:text-zinc-500 opacity-50 peer-focus:opacity-100 peer-focus:text-[#FF7A00]"}`}
                    />
                  </div>
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=" "
                      className={`peer w-full bg-gray-50 dark:bg-black/40 border text-gray-900 dark:text-white h-14 px-4 rounded-xl outline-none transition-all pt-3 pr-16
                        ${
                          errors.password
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 dark:border-white/10 focus:border-[#FF7A00]/60"
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
                        : "text-gray-500 dark:text-zinc-500 peer-focus:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-zinc-400"
                    }`}
                    >
                      Mật khẩu
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <div className="flex justify-between items-start">
                    {errors.password ? (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 ml-1 font-medium"
                      >
                        {errors.password}
                      </motion.p>
                    ) : (
                      <div></div>
                    )}

                    <Link
                      href="/forgot-password"
                      className="text-xs font-bold text-[#FF7A00] hover:underline whitespace-nowrap mt-1"
                    >
                      Quên?
                    </Link>
                  </div>
                </div>

                {/* API Error Message */}
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
                  disabled={
                    loginMutation.isPending || googleLoginMutation.isPending
                  }
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
                <span className="bg-white dark:bg-[#0D0D0D] px-3 text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-widest relative z-10">
                  Hoặc đăng nhập bằng
                </span>
                <div className="absolute top-1/2 left-0 w-full border-t border-gray-200 dark:border-white/5"></div>
              </div>

              {/* NÚT ĐĂNG NHẬP GOOGLE CHÍNH THỨC TỪ @react-oauth/google */}
              <div className="w-full mt-4">
                {googleLoginMutation.isPending ? (
                  <div className="w-full h-12 flex justify-center items-center bg-gray-100 dark:bg-[#0D0D0D] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg">
                    <Loader2 className="w-5 h-5 animate-spin text-[#FF7A00]" />
                  </div>
                ) : (
                  <div className="w-full relative group">
                    {/* Hiệu ứng viền sáng nhẹ khi hover */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Container chứa nút Google */}
                    <div className="w-full overflow-hidden rounded-[40px] shadow-lg transition-all duration-200 active:scale-[0.98] flex justify-center bg-white dark:bg-black/50 backdrop-blur-sm border border-gray-200 dark:border-white/5 group-hover:border-gray-300 dark:group-hover:border-white/20 [&>div]:w-full">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          if (credentialResponse.credential) {
                            googleLoginMutation.mutate({
                              idToken: credentialResponse.credential,
                            });
                          }
                        }}
                        onError={() => {
                          console.error("Đăng nhập Google thất bại");
                        }}
                        theme="outline"
                        size="large"
                        shape="pill"
                        text="continue_with"
                      />
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-8 text-center text-gray-500 dark:text-zinc-500 text-sm">
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

        <AuthVisual />
      </div>
    </GoogleOAuthProvider>
  );
}
