"use client";

import { Card } from "@/components/ui/card";
import { Clock, Target } from "lucide-react";

export function TimeAccuracyCards() {
  return (
    <div className="grid grid-cols-1 gap-4 font-mono">
      {/* Time Card */}
      <Card className="p-6 border border-white/5 bg-[#18181b] rounded-[2rem] shadow-lg hover:border-blue-500/20 transition-all group relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-lg">
            <Clock className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Thời gian nghe
          </span>
        </div>
        <div className="text-4xl font-black italic tracking-tighter text-white leading-none relative z-10">
          00:02:29
        </div>
      </Card>

      {/* Accuracy Card */}
      <Card className="p-6 border border-white/5 bg-[#18181b] rounded-[2rem] shadow-lg hover:border-purple-500/20 transition-all group relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors shadow-lg">
            <Target className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Độ chính xác
          </span>
        </div>
        <div className="flex items-baseline gap-1 text-white leading-none relative z-10">
          <span className="text-4xl font-black italic tracking-tighter">
            60
          </span>
          <span className="text-xl font-black italic text-purple-500">%</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-black/40 rounded-full mt-5 overflow-hidden border border-white/5 relative z-10">
          <div className="h-full bg-purple-500 w-[60%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
        </div>
      </Card>
    </div>
  );
}
