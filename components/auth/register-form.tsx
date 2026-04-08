"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRegister } from "@/hooks/use-auth";
import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormProps {
  onSuccess: (email: string) => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  // 1. Gọi hook register
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success("HỆ THỐNG: ĐĂNG KÝ THÀNH CÔNG", {
          description: "Vui lòng thực hiện xác thực Email.",
        });

        onSuccess(data.email);
      },
    });
  };

  // Hàm renderInput giữ nguyên như cũ của ông
  const renderInput = (
    id: keyof RegisterFormValues,
    label: string,
    type: string = "text",
  ) => (
    <div className="space-y-1 w-full">
      <div className="relative group">
        <input
          id={id}
          type={type}
          {...register(id)}
          placeholder=" "
          className={`peer w-full bg-gray-50 dark:bg-zinc-900/50 border text-gray-900 dark:text-white h-14 px-5 rounded-2xl outline-none transition-all pt-4 
            ${errors[id] ? "border-red-500 focus:border-red-500" : "border-zinc-200 dark:border-white/5 focus:border-[#FF7A00]"}`}
        />
        <label
          htmlFor={id}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-all pointer-events-none 
          peer-focus:top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-black peer-focus:tracking-widest
          peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase"
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {errors[id] && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="text-[10px] text-red-500 ml-2 font-bold uppercase tracking-wider"
          >
            {errors[id]?.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {renderInput("username", "Tên đăng nhập")}
      {renderInput("email", "Địa chỉ Email", "email")}

      {/* Password Field */}
      <div className="space-y-1">
        <div className="relative group">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder=" "
            className={`peer w-full bg-gray-50 dark:bg-zinc-900/50 border text-gray-900 dark:text-white h-14 px-5 rounded-2xl outline-none transition-all pt-4 pr-12 ${errors.password ? "border-red-500" : "border-zinc-200 dark:border-white/5 focus:border-[#FF7A00]"}`}
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
        {errors.password && (
          <p className="text-[10px] text-red-500 ml-2 font-bold uppercase tracking-wider">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <div className="relative group">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder=" "
            className={`peer w-full bg-gray-50 dark:bg-zinc-900/50 border text-gray-900 dark:text-white h-14 px-5 rounded-2xl outline-none transition-all pt-4 pr-12 ${errors.confirmPassword ? "border-red-500" : "border-zinc-200 dark:border-white/5 focus:border-[#FF7A00]"}`}
          />
          <label className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-all pointer-events-none peer-focus:top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-black peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase">
            Xác nhận mật khẩu
          </label>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-[10px] text-red-500 ml-2 font-bold uppercase tracking-wider">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full h-14 bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.97] mt-4 uppercase tracking-[0.2em] text-[11px]"
      >
        {registerMutation.isPending ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : (
          "XÁC NHẬN ĐĂNG KÝ"
        )}
      </Button>

      <p className="mt-8 text-center text-zinc-500 text-[10px] font-black uppercase tracking-widest">
        Đã có tài khoản?{" "}
        <Link
          href="/login"
          className="text-[#FF7A00] font-black hover:text-orange-400 transition-colors ml-1"
        >
          Đăng nhập ngay
        </Link>
      </p>
    </form>
  );
}
