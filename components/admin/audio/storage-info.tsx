"use client";

import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export function StorageInfo() {
  return (
    <div className="mx-2 p-8 rounded-[2.5rem] bg-gradient-to-br from-[#18181b] to-black border border-white/10 text-white flex flex-col sm:flex-row items-center justify-between overflow-hidden relative shadow-2xl group">
      {/* Background Effects */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-orange-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full" />

      <div className="flex items-center gap-6 relative z-10 mb-6 sm:mb-0 w-full sm:w-auto">
        <div className="p-4 bg-white/5 rounded-[1.5rem] border border-white/10 shadow-lg backdrop-blur-md">
          <Mic className="h-8 w-8 text-orange-500" />
        </div>
        <div>
          <h3 className="font-black text-xl italic uppercase tracking-tight text-white mb-1">
            Dung lượng lưu trữ
          </h3>
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Hệ thống đang sử dụng{" "}
            <span className="text-white font-bold">1.2 GB</span> / 2.0 GB.
          </p>

          {/* Progress Bar */}
          <div className="w-full sm:w-64 h-1.5 bg-black/40 rounded-full mt-3 overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 w-[60%] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          </div>
        </div>
      </div>

      <Button className="w-full sm:w-auto h-12 px-8 bg-white text-black hover:bg-zinc-200 font-black text-xs uppercase tracking-widest rounded-2xl relative z-10 transition-all shadow-lg shadow-white/5 active:scale-95">
        Nâng cấp gói
      </Button>
    </div>
  );
}
