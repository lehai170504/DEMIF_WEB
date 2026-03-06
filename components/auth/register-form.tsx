// src/components/auth/register-form.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRegister } from "@/hooks/use-auth";
import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractErrorMessage } from "@/lib/error";

interface RegisterFormProps {
  onSuccess: (email: string) => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
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
        toast.success("Đăng ký thành công!", {
          description: "Vui lòng kiểm tra email để lấy mã xác nhận.",
        });
        onSuccess(data.email); // Bắn email ra ngoài để trang cha biết
      },
    });
  };

  const renderInput = (
    id: keyof RegisterFormValues,
    label: string,
    type: string = "text",
    className: string = "",
  ) => (
    <div className={`relative group ${className}`}>
      <input
        id={id}
        type={type}
        {...register(id)}
        placeholder=" "
        className={`peer w-full bg-gray-50 dark:bg-black/40 border text-gray-900 dark:text-white h-12 px-4 rounded-xl outline-none transition-all placeholder-transparent
          ${errors[id] ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-[#FF7A00]/60"}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-3 text-sm transition-all pointer-events-none 
          peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-[#0D0D0D] peer-focus:px-1
          peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white dark:peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1
          ${errors[id] ? "text-red-400" : "text-gray-500 dark:text-zinc-500 peer-focus:text-[#FF7A00]"}`}
      >
        {label}
      </label>
      {errors[id] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-red-400 ml-1 mt-1 font-medium"
        >
          {errors[id]?.message}
        </motion.p>
      )}
    </div>
  );

  return (
    <motion.div
      key="register-form"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="relative z-10 w-full"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          Tạo <span className="text-[#FF7A00]">tài khoản</span> mới
        </h1>
        <p className="text-gray-600 dark:text-zinc-400 text-sm font-medium italic">
          Bắt đầu hành trình chinh phục ngôn ngữ cùng AI
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ROW 1: Username */}
        {renderInput("username", "Tên đăng nhập")}

        {/* ROW 2: Email */}
        {renderInput("email", "Địa chỉ Email", "email")}

        {/* ROW 3: Password */}
        <div className="relative group">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder=" "
            className={`peer w-full bg-gray-50 dark:bg-black/40 border text-gray-900 dark:text-white h-12 px-4 rounded-xl outline-none transition-all placeholder-transparent pr-12
              ${errors.password ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-[#FF7A00]/60"}`}
          />
          <label
            className={`absolute left-4 top-3 text-sm transition-all pointer-events-none peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-[#0D0D0D] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white dark:peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1 ${errors.password ? "text-red-400" : "text-gray-500 dark:text-zinc-500 peer-focus:text-[#FF7A00]"}`}
          >
            Mật khẩu
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <motion.p className="text-[10px] text-red-400 ml-1 mt-1 font-medium">
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* ROW 4: Confirm Password */}
        <div className="relative group">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder=" "
            className={`peer w-full bg-gray-50 dark:bg-black/40 border text-gray-900 dark:text-white h-12 px-4 rounded-xl outline-none transition-all placeholder-transparent pr-12
              ${errors.confirmPassword ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-[#FF7A00]/60"}`}
          />
          <label
            className={`absolute left-4 top-3 text-sm transition-all pointer-events-none peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-[#0D0D0D] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white dark:peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1 ${errors.confirmPassword ? "text-red-400" : "text-gray-500 dark:text-zinc-500 peer-focus:text-[#FF7A00]"}`}
          >
            Xác nhận mật khẩu
          </label>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-3.5 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confirmPassword && (
            <motion.p className="text-[10px] text-red-400 ml-1 mt-1 font-medium">
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </div>

        {/* Error API */}
        {registerMutation.isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>
              {extractErrorMessage(registerMutation.error, "Đăng ký thất bại.")}
            </span>
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full h-12 bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:brightness-110 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50 mt-4"
        >
          {registerMutation.isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Đăng ký ngay"
          )}
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/5 text-center">
        <p className="text-gray-500 dark:text-zinc-500 text-sm">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="text-[#FF7A00] font-bold hover:text-[#FF9E2C] hover:underline transition-all"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
