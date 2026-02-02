"use client";

import { Button } from "@/components/ui/button";
import { Download, LayoutGrid } from "lucide-react";

export function OrderHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-emerald-500 mb-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Financial Tracking
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
          Order <span className="text-zinc-600">Management</span>
        </h1>
        <p className="text-zinc-400 text-xs font-medium italic max-w-lg">
          Theo dõi dòng tiền và quản lý các giao dịch.
        </p>
      </div>
      <Button
        variant="outline"
        className="h-12 px-6 font-bold border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all shadow-lg active:scale-95"
      >
        <Download className="mr-2 h-4 w-4" /> Xuất dữ liệu
      </Button>
    </div>
  );
}
