"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeft,
  Chrome,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { AuthVisual } from "@/components/auth/AuthVisual";
import { useRegister } from "@/hooks/use-auth";
import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";

export default function SignupPage() {
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State form
  const [formData, setFormData] = useState<RegisterFormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "Vietnam",
    nativeLanguage: "Vietnamese",
    targetLanguage: "English",
  });

  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Xóa lỗi khi nhập liệu
    if (errors[id as keyof RegisterFormValues]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Zod
    const result = registerSchema.safeParse(formData);

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

    // Call API
    registerMutation.mutate(result.data);
  };

  // Helper để render Input có Floating Label
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
        value={formData[id]}
        onChange={handleChange}
        placeholder=" " // Quan trọng cho hiệu ứng floating
        className={`peer w-full bg-black/40 border text-white h-12 px-4 rounded-xl outline-none transition-all placeholder-transparent
          ${
            errors[id]
              ? "border-red-500 focus:border-red-500"
              : "border-white/10 focus:border-[#FF7A00]/60"
          }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-3 text-sm transition-all pointer-events-none 
          peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-[#0D0D0D] peer-focus:px-1
          peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1
          ${
            errors[id]
              ? "text-red-400 peer-focus:text-red-400 peer-[:not(:placeholder-shown)]:text-red-400"
              : "text-zinc-500 peer-focus:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-zinc-400"
          }`}
      >
        {label}
      </label>
      {errors[id] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-red-400 ml-1 mt-1 font-medium"
        >
          {errors[id]}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen gap-8 items-center justify-center p-4">
      {/* CỘT TRÁI: FORM */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 max-w-[550px] relative"
      >
        <Link
          href="/"
          className="absolute -top-12 left-0 flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm font-medium group font-sans"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </Link>

        <div className="bg-[#0D0D0D]/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7A00] to-purple-600 rounded-[32px] opacity-10 blur-sm group-hover:opacity-20 transition duration-500" />

          <div className="text-center mb-6 relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Tạo <span className="text-[#FF7A00]">tài khoản</span> mới
            </h1>
            <p className="text-zinc-400 text-sm font-medium italic">
              Bắt đầu hành trình chinh phục ngôn ngữ cùng AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* ROW 1: Username & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderInput("username", "Tên đăng nhập")}
              {renderInput("country", "Quốc gia")}
            </div>

            {/* ROW 2: Email */}
            {renderInput("email", "Địa chỉ Email", "email")}

            {/* ROW 3: Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderInput("nativeLanguage", "Ngôn ngữ mẹ đẻ")}
              {renderInput("targetLanguage", "Ngôn ngữ muốn học")}
            </div>

            {/* ROW 4: Password */}
            <div className="relative group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full bg-black/40 border text-white h-12 px-4 rounded-xl outline-none transition-all placeholder-transparent pr-12
                  ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-[#FF7A00]/60"
                  }`}
              />
              <label
                htmlFor="password"
                className={`absolute left-4 top-3 text-sm transition-all pointer-events-none 
                  peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-[#0D0D0D] peer-focus:px-1
                  peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1
                  ${
                    errors.password
                      ? "text-red-400 peer-focus:text-red-400 peer-[:not(:placeholder-shown)]:text-red-400"
                      : "text-zinc-500 peer-focus:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-zinc-400"
                  }`}
              >
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] text-red-400 ml-1 mt-1 font-medium"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* ROW 5: Confirm Password */}
            <div className="relative group">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full bg-black/40 border text-white h-12 px-4 rounded-xl outline-none transition-all placeholder-transparent pr-12
                  ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-[#FF7A00]/60"
                  }`}
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-4 top-3 text-sm transition-all pointer-events-none 
                  peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-[#0D0D0D] peer-focus:px-1
                  peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#0D0D0D] peer-[:not(:placeholder-shown)]:px-1
                  ${
                    errors.confirmPassword
                      ? "text-red-400 peer-focus:text-red-400 peer-[:not(:placeholder-shown)]:text-red-400"
                      : "text-zinc-500 peer-focus:text-[#FF7A00] peer-[:not(:placeholder-shown)]:text-zinc-400"
                  }`}
              >
                Xác nhận mật khẩu
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 text-zinc-500 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] text-red-400 ml-1 mt-1 font-medium"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>

            {/* API Error Message */}
            {registerMutation.isError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>
                  {(registerMutation.error as any)?.response?.data?.detail ||
                    "Đăng ký thất bại."}
                </span>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full h-12 bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:brightness-110 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
            >
              {registerMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Đăng ký ngay"
              )}
            </Button>
          </form>

          {/* FOOTER */}
          <div className="relative my-6 text-center relative z-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
              <span className="bg-[#0D0D0D] px-3 text-zinc-500 italic">
                Hoặc đăng ký với
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/10 hover:bg-white/10 rounded-xl h-12 font-bold gap-3 text-zinc-200 transition-all active:scale-95 shadow-xl"
            >
              <Chrome className="w-5 h-5 text-[#FF7A00]" />
              Tiếp tục với Google
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-center relative z-10">
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

      <AuthVisual />
    </div>
  );
}
