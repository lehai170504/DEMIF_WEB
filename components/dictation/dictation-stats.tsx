import { Clock, CheckCircle2 } from "lucide-react";

interface DictationStatsProps {
  timeSpent: number;
  filledBlanks: number;
  totalBlanks: number;
}

export function DictationStats({
  timeSpent,
  filledBlanks,
  totalBlanks,
}: DictationStatsProps) {
  return (
    <div className="shrink-0 rounded-[2rem] bg-white dark:bg-card border border-gray-200 dark:border-white/10 p-4 shadow-sm">
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
            Thời gian
          </span>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-orange-500" />
            <span className="text-sm font-black text-gray-900 dark:text-white">
              {Math.floor(timeSpent / 60)}:
              {(timeSpent % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="w-px h-8 bg-gray-100 dark:bg-white/5" />
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
            Hoàn thành
          </span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span className="text-sm font-black text-gray-900 dark:text-white">
              {filledBlanks} / {totalBlanks}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
