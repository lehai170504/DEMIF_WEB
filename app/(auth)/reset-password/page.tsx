"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthVisual } from "@/components/auth/auth-visual";
import { authService } from "@/services/auth.service";
import { resetPasswordSchema, ResetPasswordFormValues } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!token) {
      toast.error("Thiếu token", {
        description: "Liên kết của bạn không hợp lệ hoặc đã hết hạn.",
      });
      // Optionally redirect to forgot-password after delay
    }
  }, [token]);

  const onFormSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Không tìm thấy token", {
        description: "Vui lòng yêu cầu lại link đặt lại mật khẩu.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword({
        token,
        newPassword: data.password,
      });
      setIsSuccess(true);
      toast.success("Đặt lại mật khẩu thành công!");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error: any) {
      toast.error("Thao tác thất bại", {
        description: extractErrorMessage(error, "Link đổi mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng thử lại."),
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center py-20 bg-white dark:bg-[#0D0D0D]/80 rounded-[40px] border border-white/5 p-10">
        <h2 className="text-2xl font-black text-white mb-4">Link không hợp lệ</h2>
        <p className="text-zinc-500 text-xs mb-8 uppercase tracking-widest">Vui lòng yêu cầu lại link đặt lại mật khẩu của bạn.</p>
        <Button asChild className="w-full bg-[#FF7A00]"><Link href="/forgot-password">YÊU CẦU LẠI</Link></Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0D0D0D]/80 backdrop-blur-3xl border border-gray-200 dark:border-white/5 rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7A00] to-purple-600 rounded-[40px] opacity-10 blur-sm pointer-events-none" />

      <div className="relative z-10">
        {isSuccess ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-10"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">Thành công!</h2>
            <p className="text-zinc-500 text-xs font-bold leading-relaxed mb-8">
              Mật khẩu của bạn đã được cập nhật. Bạn sẽ được tự động chuyển hướng về trang đăng nhập trong giây lát.
            </p>
            <Button 
                asChild
                className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-black rounded-2xl"
            >
                <Link href="/login">ĐĂNG NHẬP NGAY</Link>
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter leading-none">
                Đặt lại <span className="text-[#FF7A00]">mật khẩu</span>
              </h1>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                Vui lòng nhập mật khẩu mới cho tài khoản của bạn
              </p>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
              <div className="space-y-1">
                <div className="relative group">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    className={`peer w-full bg-gray-50 dark:bg-zinc-900/50 border text-gray-900 dark:text-white h-16 px-5 rounded-2xl outline-none transition-all pt-4 ${errors.password ? "border-red-500" : "border-zinc-200 dark:border-white/5 focus:border-[#FF7A00]"}`}
                  />
                  <label className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-all pointer-events-none peer-focus:top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-black peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase">
                    Mật khẩu mới
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 opacity-40 hover:opacity-100"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="text-[10px] text-red-500 ml-2 font-bold uppercase tracking-wider"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <input
                    {...register("confirmPassword")}
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    className={`peer w-full bg-gray-50 dark:bg-zinc-900/50 border text-gray-900 dark:text-white h-16 px-5 rounded-2xl outline-none transition-all pt-4 ${errors.confirmPassword ? "border-red-500" : "border-zinc-200 dark:border-white/5 focus:border-[#FF7A00]"}`}
                  />
                  <label className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-all pointer-events-none peer-focus:top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-black peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase">
                    Xác nhận mật khẩu mới
                  </label>
                  <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 opacity-40" />
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="text-[10px] text-red-500 ml-2 font-bold uppercase tracking-wider"
                    >
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.97] disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "CẬP NHẬT MẬT KHẨU"
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full font-mono min-h-screen gap-8 items-center justify-center p-4">
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-1/2 max-w-[480px] relative"
      >
        <Suspense fallback={<div className="h-[400px] flex items-center justify-center bg-[#0D0D0D]/80 rounded-[40px]"><Loader2 className="animate-spin text-orange-500" /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </motion.div>
      <AuthVisual />
    </div>
  );
}
