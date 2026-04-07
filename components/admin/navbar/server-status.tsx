"use client";

import { Activity } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ServerStatus() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 group cursor-help transition-all hover:bg-emerald-100 dark:hover:bg-emerald-500/20 shadow-sm active:scale-95">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
            Live
          </span>
        </div>
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        align="center"
        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold border-none rounded-xl text-xs px-3 py-2 shadow-xl"
      >
        Hệ thống hoạt động ổn định
      </TooltipContent>
    </Tooltip>
  );
}
