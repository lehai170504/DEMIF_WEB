// src/app/(auth)/signup/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthVisual } from "@/components/auth/auth-visual";
import { RegisterForm } from "@/components/auth/register-form";
import { VerifyOtpForm } from "@/components/auth/verify-otp-form";

export default function SignupPage() {
  // Quản lý trạng thái: Đang ở màn đăng ký hay màn OTP
  const [step, setStep] = useState<1 | 2>(1);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleRegistrationSuccess = (email: string) => {
    setRegisteredEmail(email);
    setStep(2); // Chuyển sang màn OTP
  };

  const handleBackToRegister = () => {
    setStep(1); // Quay lại màn đăng ký nếu cần
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen gap-8 items-center justify-center p-4">
      {/* CỘT TRÁI */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 max-w-[550px] relative"
      >
        <Link
          href="/"
          className="absolute -top-12 left-0 flex items-center gap-2 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all text-sm font-medium group font-sans"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </Link>

        {/* Khung Card Wrapper */}
        <div className="bg-white dark:bg-[#0D0D0D]/60 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group min-h-[550px] flex flex-col justify-center">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7A00] to-purple-600 rounded-[32px] opacity-10 blur-sm group-hover:opacity-20 transition duration-500" />

          {/* Thay đổi giao diện mượt mà giữa Đăng ký và OTP */}
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <RegisterForm onSuccess={handleRegistrationSuccess} />
            ) : (
              <VerifyOtpForm
                email={registeredEmail}
                onBack={handleBackToRegister}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CỘT PHẢI */}
      <AuthVisual />
    </div>
  );
}
