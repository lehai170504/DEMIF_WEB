import { Card } from "@/components/ui/card";
import { Share2, Trophy, TrendingUp, Info } from "lucide-react";

export function ScoreCard() {
  const rankPercent = (29113 / 32578) * 100;

  return (
    <Card className="p-8 border-none bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden group">
      <Trophy className="absolute -bottom-6 -right-6 h-32 w-32 text-orange-500/5 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />

      <div className="relative z-10 font-mono">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500 rounded-lg shadow-lg shadow-orange-500/20">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              DEMIF <span className="text-orange-500">Global Score</span>
            </h3>
          </div>
          <button className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-orange-500 transition-all border border-transparent hover:border-slate-100">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Main Score Display */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
          <div className="space-y-1">
            <div className="text-6xl font-black tracking-tighter italic text-slate-900 dark:text-white leading-none">
              0,06
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-1">
              <Info className="h-3 w-3" /> Điểm tích lũy hiện tại
            </p>
          </div>

          <div className="text-right space-y-2 w-full md:w-auto">
            <div className="text-sm font-black italic uppercase text-slate-900 dark:text-white">
              Hạng <span className="text-orange-500 text-xl">#29.113</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Trên tổng số 32.578 học viên
            </p>
          </div>
        </div>

        {/* Rank Visualizer */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              Tiến trình thứ hạng
            </span>
            <span className="text-[10px] font-black italic text-orange-500">
              TOP {rankPercent.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(249,115,22,0.3)]"
              style={{ width: `${100 - rankPercent}%` }} // Nghịch đảo vì hạng càng cao % tiến trình càng ít
            />
          </div>
          <p className="text-[9px] font-medium text-slate-400 italic">
            * Cần thêm{" "}
            <span className="font-bold text-slate-900">120 điểm</span> để thăng
            hạng tiếp theo
          </p>
        </div>
      </div>
    </Card>
  );
}
