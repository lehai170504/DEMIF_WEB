"use client";

import { Activity, CreditCard } from "lucide-react";

export function SubscriptionHeader() {
  return (
    <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 font-mono transition-colors duration-300 pt-4">
      <div className="space-y-2">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500 mb-3">
          <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 shadow-sm">
            <CreditCard className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Quản lí gói thanh toán
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-black leading-tight text-slate-900 dark:text-white uppercase tracking-tighter">
          Gói thanh toán{" "}
          <span className="text-slate-400 dark:text-zinc-500 font-medium">
            hệ thống
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium border-l-4 border-orange-500 pl-4 mt-4 max-w-xl leading-relaxed">
          Thiết lập hạ tầng thanh toán và quản trị đặc quyền tài khoản của học
          viên trên toàn hệ thống Demif Core.
        </p>
      </div>

      {/* System Status Indicator */}
      <div className="flex w-fit items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-5 py-3 rounded-2xl shadow-sm backdrop-blur-md">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <Activity className="relative inline-flex h-3 w-3 text-emerald-500" />
        </div>
        Hệ thống hoạt động bình thường
      </div>
    </header>
  );
}
