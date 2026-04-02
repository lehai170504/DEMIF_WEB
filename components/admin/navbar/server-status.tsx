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
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 group cursor-help transition-all hover:bg-emerald-100">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest group-hover:tracking-normal transition-all">
            Live
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-emerald-600 text-white font-bold border-none rounded-xl">
        Hệ thống hoạt động ổn định
      </TooltipContent>
    </Tooltip>
  );
}
