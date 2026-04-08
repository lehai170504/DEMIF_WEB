"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useVerifyEmail } from "@/hooks/use-auth";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasCalled = useRef(false);

  const { mutate: verify, isPending, isSuccess, isError } = useVerifyEmail();

  useEffect(() => {
    if (token && !hasCalled.current) {
      hasCalled.current = true;
      verify(token);
    }
  }, [token, verify]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-3xl border border-gray-200 dark:border-white/5 rounded-[40px] p-10 md:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF7A00]/10 via-purple-600/5 to-transparent opacity-30 blur-sm pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF7A00]/10 blur-[80px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {/* TRẠNG THÁI 1: ĐANG XỬ LÝ */}
        {(isPending || (!token && !isError)) && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center space-y-6 relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF7A00]/20 blur-2xl rounded-full animate-pulse" />
              <Loader2
                className="h-16 w-16 text-[#FF7A00] animate-spin relative z-10"
                strokeWidth={1.5}
              />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
                Xác thực <span className="text-[#FF7A00]">hệ thống</span>
              </h2>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                Đang kiểm tra tính hợp lệ của mã Token...
              </p>
            </div>
          </motion.div>
        )}

        {/* TRẠNG THÁI 2: THÀNH CÔNG */}
        {isSuccess && (
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center space-y-8 relative z-10"
          >
            <div className="h-24 w-24 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)] transform -rotate-6">
              <ShieldCheck
                className="h-12 w-12 text-emerald-500"
                strokeWidth={1.5}
              />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
                Hoàn <span className="text-emerald-500">tất!</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                Tài khoản đã kích hoạt. Hệ thống đang chuyển hướng...
              </p>
            </div>
          </motion.div>
        )}

        {/* TRẠNG THÁI 3: LỖI */}
        {(isError || !token) && !isPending && (
          <motion.div
            key="error"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center space-y-8 relative z-10"
          >
            <div className="h-24 w-24 bg-red-500/10 rounded-[2rem] flex items-center justify-center border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.1)] transform rotate-6">
              <XCircle className="h-12 w-12 text-red-500" strokeWidth={1.5} />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
                Lỗi <span className="text-red-500">xác thực</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed max-w-[240px]">
                {!token
                  ? "Không tìm thấy mã xác thực"
                  : "Mã Token đã hết hạn hoặc không tồn tại"}
              </p>
            </div>
            <div className="w-full pt-4">
              <Link href="/signup" className="block w-full group">
                <button className="w-full h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-[#FF7A00] dark:hover:bg-[#FF7A00] hover:text-white transition-all duration-300 font-black rounded-2xl uppercase text-[10px] tracking-[0.3em] active:scale-95 shadow-xl">
                  Quay lại đăng ký
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
