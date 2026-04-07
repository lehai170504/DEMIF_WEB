"use client";

import React from "react";
import { MailCheck, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CheckMailStepProps {
  email: string;
  onBack: () => void;
}

export function CheckMailStep({ email, onBack }: CheckMailStepProps) {
  return (
    <motion.div
      key="check-mail-step"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
      className="relative z-10 w-full flex flex-col items-center justify-center text-center space-y-8 font-mono"
    >
      {/* Icon Hộp thư nổi bật */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#FF7A00]/20 blur-2xl rounded-full" />
        <div className="h-28 w-28 bg-gradient-to-br from-[#FF7A00] to-orange-400 rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10 transform -rotate-6">
          <MailCheck className="h-14 w-14 text-white" strokeWidth={1.5} />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Kiểm tra hộp thư
        </h2>
        <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
          Chúng tôi vừa gửi một email xác thực đến địa chỉ <br />
          <span className="font-bold text-slate-900 dark:text-orange-400">
            {email}
          </span>
        </p>
      </div>

      <div className="w-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 p-5 rounded-2xl flex items-start gap-4 text-left">
        <Inbox className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
        <p className="text-xs font-semibold text-orange-800 dark:text-orange-300 leading-relaxed">
          Vui lòng nhấp vào đường link trong email để kích hoạt tài khoản của
          bạn. Nếu không thấy, hãy kiểm tra thư mục Spam/Junk.
        </p>
      </div>

      <div className="w-full space-y-4 pt-4">
        <Link href="/login" className="block w-full">
          <button className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-black rounded-2xl transition-all active:scale-[0.98]">
            Về trang đăng nhập
          </button>
        </Link>

        <button
          onClick={onBack}
          className="text-[10px] font-bold text-slate-400 hover:text-[#FF7A00] uppercase tracking-widest transition-colors"
        >
          Đổi địa chỉ email khác?
        </button>
      </div>
    </motion.div>
  );
}
