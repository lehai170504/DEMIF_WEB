"use client";

import { Button } from "@/components/ui/button";
import { Download, LayoutGrid } from "lucide-react";

export function OrderHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2 font-mono">
      <div className="space-y-1">
        {/* Nhãn phụ (Overline) */}
        <div className="flex items-center gap-2 text-emerald-500 mb-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Theo dõi tài chính
          </span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
          Quản lý <span className="text-zinc-700 font-normal">Đơn hàng</span>
        </h1>

        {/* Mô tả */}
        <p className="text-zinc-500 text-xs font-medium italic max-w-lg mt-2">
          Hệ thống theo dõi dòng tiền và quản trị lịch sử giao dịch thời gian
          thực.
        </p>
      </div>

      {/* Nút hành động */}
      <Button
        variant="outline"
        className="h-12 px-6 font-bold border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all shadow-[0_10px_20px_rgba(0,0,0,0.3)] active:scale-95 group"
      >
        <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> Xuất
        báo cáo
      </Button>
    </div>
  );
}
