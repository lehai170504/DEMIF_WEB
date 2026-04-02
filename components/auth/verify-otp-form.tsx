"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/hooks/use-auth";
import { toast } from "sonner";

interface VerifyOtpFormProps {
  email: string;
  onBack: () => void;
}

export function VerifyOtpForm({ email, onBack }: VerifyOtpFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60); // Đếm ngược 60s để gửi lại mã
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verifyMutation = useVerifyEmail();

  // Tự động focus ô đầu tiên
  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    if (!cleanValue && value !== "") return; // Chỉ nhận số

    const newOtp = [...otp];

    // Xử lý khi người dùng Paste nguyên chuỗi 6 số
    if (cleanValue.length > 1) {
      const pastedData = cleanValue.slice(0, 6).split("");
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const focusIndex = Math.min(index + pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    newOtp[index] = cleanValue;
    setOtp(newOtp);

    // Tự động nhảy ô tiếp theo
    if (cleanValue !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    toast.info("Đã gửi lại mã mới!", {
      description: "Vui lòng kiểm tra hộp thư đến hoặc thư rác.",
    });
    // Gọi API resend code của ông ở đây nếu có
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");
    if (token.length !== 6) return;
    verifyMutation.mutate(token);
  };

  return (
    <motion.div
      key="otp-form"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="relative z-10 w-full flex flex-col items-center font-mono"
    >
      <div className="w-20 h-20 bg-[#FF7A00]/10 rounded-3xl flex items-center justify-center mb-8 border border-[#FF7A00]/20 shadow-[0_0_30px_rgba(255,122,0,0.1)]">
        <ShieldCheck className="w-10 h-10 text-[#FF7A00]" />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter">
          Xác thực <span className="text-[#FF7A00]">Email</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-relaxed">
          Mã 6 số đã được gửi đến <br />
          <span className="text-gray-900 dark:text-white lowercase font-bold">
            {email}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-10">
        <div className="flex justify-center gap-2 md:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-14 md:w-14 md:h-16 text-center text-2xl font-black bg-gray-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 outline-none transition-all shadow-inner"
            />
          ))}
        </div>

        <div className="space-y-4">
          <Button
            type="submit"
            disabled={verifyMutation.isPending || otp.join("").length !== 6}
            className="w-full h-16 bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.97] disabled:opacity-50 uppercase tracking-widest text-xs"
          >
            {verifyMutation.isPending ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Xác nhận & Khởi động"
            )}
          </Button>

          <div className="flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={handleResend}
              disabled={timer > 0}
              className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                timer > 0
                  ? "text-zinc-600 cursor-not-allowed"
                  : "text-[#FF7A00] hover:text-[#FF9E2C]"
              }`}
            >
              <RefreshCw
                className={`w-3 h-3 ${timer > 0 ? "" : "animate-spin-slow"}`}
              />
              {timer > 0 ? `Gửi lại mã sau ${timer}s` : "Gửi lại mã ngay"}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all"
            >
              <ArrowLeft className="w-3 h-3" /> Thay đổi Email
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
