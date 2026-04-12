"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthVisual } from "@/components/auth/auth-visual";
import { authService } from "@/services/auth.service";
import { forgotPasswordSchema, ForgotPasswordFormValues } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  const onFormSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setIsSubmitted(true);
      toast.success("Yêu cầu đã được gửi", {
        description: "Vui lòng kiểm tra hộp thư email của bạn.",
      });
    } catch (error: any) {
      toast.error("Lỗi gửi yêu cầu", {
        description: extractErrorMessage(error, "Không thể gửi yêu cầu đặt lại mật khẩu lúc này."),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full font-mono min-h-screen gap-8 items-center justify-center p-4">
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-1/2 max-w-[480px] relative"
      >
        <Link
          href="/login"
          className="absolute -top-14 left-0 group flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all duration-300 active:scale-95 z-20"
        >
          <div className="absolute inset-0 bg-zinc-200/50 dark:bg-zinc-800/40 opacity-0 group-hover:opacity-100 rounded-2xl blur-md transition-all duration-500 scale-90 group-hover:scale-100" />
          <div className="relative flex items-center gap-2.5 z-10">
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-[#FF7A00] transition-all duration-300 group-hover:-translate-x-1.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white">
              Quay lại đăng nhập
            </span>
          </div>
        </Link>

        <div className="bg-white dark:bg-[#0D0D0D]/80 backdrop-blur-3xl border border-gray-200 dark:border-white/5 rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7A00] to-purple-600 rounded-[40px] opacity-10 blur-sm pointer-events-none" />

          <div className="relative z-10">
            {isSubmitted ? (
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
                <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">Đã gửi yêu cầu!</h2>
                <p className="text-zinc-500 text-xs font-bold leading-relaxed mb-8">
                  Nếu email bạn nhập tồn tại trong hệ thống, chúng tôi đã gửi một liên kết đặt lại mật khẩu. Vui lòng kiểm tra hộp thư (bao gồm cả thư rác).
                </p>
                <Button 
                  asChild
                  className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-black rounded-2xl"
                >
                  <Link href="/login">QUAY LẠI ĐĂNG NHẬP</Link>
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter leading-none">
                    Quên <span className="text-[#FF7A00]">mật khẩu?</span>
                  </h1>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                    Nhập email để nhận link khôi phục
                  </p>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                  <div className="space-y-1">
                    <div className="relative group">
                      <input
                        {...register("email")}
                        type="email"
                        placeholder=" "
                        className={`peer w-full bg-gray-50 dark:bg-zinc-900/50 border text-gray-900 dark:text-white h-16 px-5 rounded-2xl outline-none transition-all pt-4 ${errors.email ? "border-red-500" : "border-zinc-200 dark:border-white/5 focus:border-[#FF7A00]"}`}
                      />
                      <label className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-all pointer-events-none peer-focus:top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-black peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase">
                        Email đã đăng ký
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
                          className="text-[10px] text-red-500 ml-2 font-bold uppercase tracking-wider"
                        >
                          {errors.email.message}
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
                      "GỬI YÊU CẦU KHÔI PHỤC"
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </motion.div>
      <AuthVisual />
    </div>
  );
}
