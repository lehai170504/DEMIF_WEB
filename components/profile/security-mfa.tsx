"use client";

import { ShieldCheck, Smartphone, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SecurityMFA() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* Status Banner */}
      <div className="relative overflow-hidden flex items-center justify-between p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20">
        <div className="flex gap-6 items-center relative z-10">
          <div className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-xl text-gray-900 dark:text-white tracking-tight">
              Bảo mật 2 lớp đang BẬT
            </h4>
            <p className="text-sm text-emerald-600 dark:text-emerald-200/70 font-medium">
              Tài khoản của bạn được bảo vệ bởi TOTP Authenticator.
            </p>
          </div>
        </div>
        <Badge className="bg-emerald-500 text-white border-none px-4 py-1.5 uppercase text-[10px] font-black tracking-widest shadow-lg shadow-emerald-500/30">
          An toàn
        </Badge>

        {/* Glow */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none" />
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500 pl-2">
          Phương thức xác thực
        </h3>

        <div className="group flex items-center justify-between p-6 rounded-[2rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-[#18181b] hover:border-orange-500/30 transition-all shadow-lg hover:shadow-orange-500/5">
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-zinc-400 group-hover:text-orange-500 transition-colors">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                Authenticator App
              </p>
              <p className="text-xs text-gray-500 dark:text-zinc-500">
                Google Authenticator, Authy, Microsoft Auth...
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-xl h-10 border-gray-200 dark:border-white/10 bg-transparent text-gray-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 text-xs font-bold uppercase tracking-wider transition-all"
          >
            Gỡ cài đặt
          </Button>
        </div>

        {/* Recovery Codes Section (Optional) */}
        <div className="group flex items-center justify-between p-6 rounded-[2rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-[#18181b] hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-zinc-400 group-hover:text-blue-500 transition-colors">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">Mã dự phòng</p>
              <p className="text-xs text-gray-500 dark:text-zinc-500">
                Sử dụng khi mất thiết bị xác thực.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-xl h-10 border-gray-200 dark:border-white/10 bg-transparent text-gray-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20 text-xs font-bold uppercase tracking-wider transition-all"
          >
            Xem mã
          </Button>
        </div>
      </div>
    </div>
  );
}
