"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useLogin, useGoogleOAuthLogin } from "@/hooks/use-auth";
import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleOAuthLogin();
  const isPending = loginMutation.isPending || googleLoginMutation.isPending;

  const onFormSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex flex-col lg:flex-row w-full font-mono min-h-screen gap-8 items-center justify-center p-4">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 max-w-[480px] relative"
        >
          <button
            onClick={() => (window.location.href = "/")}
            className="absolute -top-14 left-0 group flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all duration-300 active:scale-95"
          >
            {/* Lớp nền Overlay: Tăng opacity và dùng màu trung tính đậm hơn */}
            <div className="absolute inset-0 bg-zinc-200/50 dark:bg-zinc-800/40 opacity-0 group-hover:opacity-100 rounded-2xl blur-md transition-all duration-500 scale-90 group-hover:scale-100" />

            <div className="relative flex items-center gap-2.5 z-10">
              {/* Icon mũi tên: Tăng độ sáng màu Cam khi hover */}
              <div className="relative flex items-center justify-center">
                <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-[#FF7A00] transition-all duration-300 group-hover:-translate-x-1.5 group-hover:drop-shadow-[0_0_8px_rgba(255,122,0,0.8)]" />
              </div>

              {/* Text: Chuyển hẳn sang trắng/đen đậm để nổi bật trên nền */}
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                Quay lại <span className="hidden sm:inline">trang chủ</span>
              </span>
            </div>

            {/* Đường kẻ chân: Tăng độ dày lên 2px và dùng gradient rực hơn */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileHover={{ width: "80%", opacity: 1 }}
              className="absolute bottom-2 left-5 h-[2px] bg-gradient-to-r from-[#FF7A00] via-[#FFD056] to-transparent shadow-[0_1px_4px_rgba(255,122,0,0.4)]"
            />
          </button>

          <div className="bg-white dark:bg-[#0D0D0D]/80 backdrop-blur-3xl border border-gray-200 dark:border-white/5 rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7A00] to-purple-600 rounded-[40px] opacity-10 blur-sm pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter leading-none">
                  Chào mừng <span className="text-[#FF7A00]">trở lại</span>
                </h1>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                  Hành trình chinh phục Tiếng Anh bắt đầu từ đây
                </p>
              </div>

              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                <div className="space-y-1">
                  <div className="relative group">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder=" "
                      className={`peer w-full bg-gray-50 dark:bg-zinc-900/50 border text-gray-900 dark:text-white h-16 px-5 rounded-2xl outline-none transition-all pt-4 ${errors.email ? "border-red-500" : "border-zinc-200 dark:border-white/5 focus:border-[#FF7A00]"}`}
                    />
                    <label className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-all pointer-events-none peer-focus:top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-black peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase">
                      Địa chỉ Email
                    </label>
                    <Mail
                      className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-all ${errors.email ? "text-red-500" : "text-zinc-400 opacity-40 peer-focus:opacity-100 peer-focus:text-[#FF7A00]"}`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-[10px] text-red-500 ml-2 font-bold uppercase tracking-wider"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1">
                  <div className="relative group">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder=" "
                      className={`peer w-full bg-gray-50 dark:bg-zinc-900/50 border text-gray-900 dark:text-white h-16 px-5 rounded-2xl outline-none transition-all pt-4 pr-14 ${errors.password ? "border-red-500" : "border-zinc-200 dark:border-white/5 focus:border-[#FF7A00]"}`}
                    />
                    <label className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-all pointer-events-none peer-focus:top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-black peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase">
                      Mật khẩu
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <AnimatePresence mode="wait">
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] text-red-500 font-bold uppercase tracking-wider"
                        >
                          {errors.password.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <Link
                      href="/forgot-password"
                      className="text-[10px] font-black text-[#FF7A00] hover:underline uppercase tracking-widest ml-auto"
                    >
                      Quên?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-14 bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.97] disabled:opacity-50"
                >
                  {loginMutation.isPending ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : (
                    "ĐĂNG NHẬP NGAY"
                  )}
                </Button>
              </form>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200 dark:border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black">
                  <span className="bg-white dark:bg-[#0D0D0D] px-4 text-zinc-500">
                    Hoặc
                  </span>
                </div>
              </div>

              <div className="w-full mt-4">
                <div className="relative flex justify-center w-full transition-all duration-300 hover:opacity-90">
                  <GoogleLogin
                    onSuccess={(res) =>
                      res.credential &&
                      googleLoginMutation.mutate({ idToken: res.credential })
                    }
                    onError={() => console.error("Google Error")}
                    theme="outline"
                    size="large"
                    shape="pill"
                    width="100%"
                    useOneTap={false}
                    auto_select={false}
                  />
                </div>
              </div>

              <p className="mt-10 text-center text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                Mới biết đến Demif?{" "}
                <Link
                  href="/signup"
                  className="text-[#FF7A00] font-black hover:underline ml-1"
                >
                  Đăng ký ngay
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
