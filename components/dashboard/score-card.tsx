"use client";

import { Card } from "@/components/ui/card";
import { Share2, Trophy, TrendingUp, Info } from "lucide-react";

export function ScoreCard() {
  const rankPercent = (29113 / 32578) * 100;

  return (
    <Card className="p-8 border border-white/10 bg-[#18181b] rounded-[2.5rem] shadow-2xl relative overflow-hidden group font-mono">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
      <Trophy className="absolute -bottom-8 -right-8 h-40 w-40 text-orange-500/5 -rotate-12 transition-transform group-hover:rotate-0 duration-700 pointer-events-none" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg shadow-orange-500/20 border border-white/10">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              DEMIF <span className="text-orange-500">Global Score</span>
            </h3>
          </div>
          <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all border border-transparent hover:border-white/10">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Main Score Display */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="text-7xl font-black tracking-tighter italic text-white leading-none drop-shadow-lg">
              0,06
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 w-fit px-2 py-1 rounded-md border border-emerald-500/20">
              <Info className="h-3 w-3" /> Điểm tích lũy
            </p>
          </div>

          <div className="text-right space-y-2 w-full md:w-auto">
            <div className="text-sm font-black italic uppercase text-zinc-300">
              Hạng{" "}
              <span className="text-orange-500 text-2xl ml-1">#29.113</span>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              / 32.578 người học
            </p>
          </div>
        </div>

        {/* Rank Visualizer */}
        <div className="space-y-3 p-4 rounded-2xl bg-black/20 border border-white/5">
          <div className="flex justify-between items-end">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
              Tiến trình
            </span>
            <span className="text-[10px] font-black italic text-orange-500">
              TOP {rankPercent.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 w-full bg-black rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
              style={{ width: `${100 - rankPercent}%` }}
            />
          </div>
          <p className="text-[9px] font-medium text-zinc-500 italic text-right">
            * Cần thêm <span className="font-bold text-white">120 điểm</span> để
            thăng hạng
          </p>
        </div>
      </div>
    </Card>
  );
}
