import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface MetricProps {
  icon: ElementType;
  title?: string;
  label?: string;
  value?: number;
  subText?: string;
  color?: string;
  isLoading?: boolean;
}

export function MiniMetricCard({
  icon: Icon,
  title,
  value,
  subText,
  color = "text-slate-500 dark:text-zinc-400",
  isLoading,
}: MetricProps) {
  return (
    <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon className={cn("w-4 h-4", color)} />
        <span className="text-xs font-bold text-slate-500 truncate">
          {title}
        </span>
      </div>
      {isLoading ? (
        <div className="h-8 bg-slate-100 dark:bg-zinc-800/50 rounded-lg w-1/2 animate-pulse" />
      ) : (
        <div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {value?.toLocaleString("vi-VN") || "0"}
          </p>
          {subText && (
            <p className="text-[10px] text-slate-400 mt-1">{subText}</p>
          )}
        </div>
      )}
    </div>
  );
}

export function SubMetric({
  icon: Icon,
  label,
  value,
  color,
  isLoading,
}: MetricProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <Icon className={cn("w-4 h-4", color)} /> {label}
      </span>
      {isLoading ? (
        <div className="h-8 bg-slate-100 dark:bg-zinc-800/50 rounded-lg w-2/3 animate-pulse" />
      ) : (
        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
          {value !== undefined && value !== null
            ? value.toLocaleString("vi-VN")
            : "0"}
        </span>
      )}
    </div>
  );
}

export function PulseRow({
  icon: Icon,
  label,
  value,
  color = "text-slate-400",
  isLoading,
}: MetricProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-800 dark:bg-white/5 rounded-lg border border-slate-700 dark:border-white/10">
          <Icon className={cn("w-4 h-4", color)} />
        </div>
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </span>
      </div>
      {isLoading ? (
        <div className="h-6 bg-slate-800 dark:bg-white/5 rounded w-16 animate-pulse" />
      ) : (
        <span className="text-2xl font-black text-white tracking-tighter">
          {value !== undefined && value !== null
            ? value.toLocaleString("vi-VN")
            : "0"}
        </span>
      )}
    </div>
  );
}
