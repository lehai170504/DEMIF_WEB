// src/components/auth/verify-otp-form.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/hooks/use-auth";

interface VerifyOtpFormProps {
  email: string;
  onBack: () => void;
}

export function VerifyOtpForm({ email, onBack }: VerifyOtpFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verifyMutation = useVerifyEmail();

  // Tự động focus ô đầu tiên khi component được mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Cho phép paste nguyên chuỗi 6 số
      const pastedData = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);

      // Focus vào ô cuối cùng được paste
      const focusIndex = Math.min(index + pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tự động nhảy sang ô tiếp theo nếu đã nhập
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Xóa lùi: Nếu bấm Backspace ở ô trống, lùi về ô trước đó
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");
    // Đảm bảo đủ 6 số mới được submit
    if (token.length !== 6) return;

    verifyMutation.mutate(token);
  };

  return (
    <motion.div
      key="otp-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="relative z-10 w-full flex flex-col items-center"
    >
      <div className="w-16 h-16 bg-[#FF7A00]/10 rounded-full flex items-center justify-center mb-6 border border-[#FF7A00]/20">
        <ShieldCheck className="w-8 h-8 text-[#FF7A00]" />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          Xác thực Email
        </h1>
        <p className="text-gray-600 dark:text-zinc-400 text-sm">
          Chúng tôi đã gửi mã xác nhận 6 số đến <br />
          <span className="font-bold text-[#FF7A00]">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={6} // Hỗ trợ dán (paste) chuỗi dài
              value={digit}
              onChange={(e) =>
                handleChange(index, e.target.value.replace(/[^0-9]/g, ""))
              }
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]/50 outline-none transition-all"
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={verifyMutation.isPending || otp.join("").length !== 6}
          className="w-full h-12 bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:brightness-110 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 mt-2"
        >
          {verifyMutation.isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Xác nhận & Đăng nhập"
          )}
        </Button>
      </form>

      <div className="mt-8 flex flex-col items-center gap-4">
        {/* Nút quay lại nhập email khác */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Nhập lại Email khác
        </button>
      </div>
    </motion.div>
  );
}
