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
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 group cursor-help transition-all hover:bg-emerald-500/10">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest group-hover:tracking-normal transition-all">
            Live
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-emerald-500 text-black font-bold border-none">
        Hệ thống hoạt động ổn định
      </TooltipContent>
    </Tooltip>
  );
}
