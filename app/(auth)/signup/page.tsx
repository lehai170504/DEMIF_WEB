"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { AuthVisual } from "@/components/auth/auth-visual";
import { RegisterForm } from "@/components/auth/register-form";
import { VerifyOtpForm } from "@/components/auth/verify-otp-form";

export default function SignupPage() {
  // Quản lý trạng thái: Step 1 (Register) -> Step 2 (Verify OTP)
  const [step, setStep] = useState<1 | 2>(1);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleRegistrationSuccess = (email: string) => {
    setRegisteredEmail(email);
    setStep(2);
  };

  const handleBackToRegister = () => {
    setStep(1);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen gap-8 items-center justify-center p-4">
      {/* CỘT TRÁI: FORM CONTAINER */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-1/2 max-w-[520px] relative"
      >
        {/* Nút quay lại trang chủ - Đồng bộ style với Login */}
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

        {/* Khung Card Wrapper: Tối ưu Cinematic Glow */}
        <div className="bg-white dark:bg-[#0D0D0D]/80 backdrop-blur-3xl border border-gray-200 dark:border-white/5 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden min-h-[600px] flex flex-col justify-center transition-all duration-500">
          {/* Hiệu ứng viền phát sáng Gradient chạy ngầm */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF7A00]/20 via-purple-600/10 to-transparent rounded-[40px] opacity-30 blur-sm pointer-events-none" />

          {/* CHUYỂN CẢNH MƯỢT MÀ GIỮA REGISTER VÀ OTP */}
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="register-step"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10 w-full"
              >
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter leading-none">
                    Tạo <span className="text-[#FF7A00]">tài khoản</span>
                  </h1>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] italic">
                    Bắt đầu hành trình cùng AI Mentor
                  </p>
                </div>

                <RegisterForm onSuccess={handleRegistrationSuccess} />
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10 w-full"
              >
                <VerifyOtpForm
                  email={registeredEmail}
                  onBack={handleBackToRegister}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CỘT PHẢI: VISUAL COMPONENT */}
      <AuthVisual />
    </div>
  );
}
