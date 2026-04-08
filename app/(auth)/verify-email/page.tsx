"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, XCircle, Loader2, MailSearch } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-zinc-900/50 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Decor nền cho giống Verify Page */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF7A00]/10 blur-[80px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* TRẠNG THÁI 1: ĐANG XỬ LÝ (PENDING) */}
          {(isPending || (!token && !isError)) && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="relative">
                <Loader2
                  className="h-16 w-16 text-[#FF7A00] animate-spin"
                  strokeWidth={1.5}
                />
                <div className="absolute inset-0 bg-[#FF7A00]/20 blur-xl rounded-full" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">
                  Xác thực hệ thống
                </h2>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                  Đang kiểm tra tính hợp lệ của mã Token...
                </p>
              </div>
            </motion.div>
          )}

          {/* TRẠNG THÁI 2: THÀNH CÔNG (SUCCESS) */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="h-20 w-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <ShieldCheck className="h-10 w-10 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                  Hoàn tất!
                </h2>
                <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                  Tài khoản đã kích hoạt. Hệ thống đang chuyển hướng...
                </p>
              </div>
            </motion.div>
          )}

          {/* TRẠNG THÁI 3: LỖI (TOKEN SAI HOẶC KHÔNG CÓ TOKEN) */}
          {(isError || !token) && !isPending && (
            <motion.div
              key="error"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="h-20 w-20 bg-red-500/10 rounded-3xl flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                <XCircle className="h-10 w-10 text-red-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                  Lỗi xác thực
                </h2>
                <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                  {!token
                    ? "Không tìm thấy mã xác thực"
                    : "Mã Token đã hết hạn hoặc không tồn tại"}
                </p>
              </div>
              <div className="w-full">
                <Link href="/signup" className="block w-full">
                  <button className="w-full h-14 bg-white text-black hover:bg-zinc-200 font-black rounded-2xl transition-all uppercase text-[10px] tracking-[0.2em] active:scale-95 shadow-xl">
                    Quay lại đăng ký
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
