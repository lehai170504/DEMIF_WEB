"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext: string;
  color: string;
  isCurrency?: boolean;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
  isCurrency,
}: StatCardProps) {
  const isHex = color.includes("#");
  const hexColor = isHex
    ? color.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/)?.[0]
    : null;

  return (
    <div className="p-7 rounded-[2.5rem] bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 flex items-center gap-5 relative overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-orange-500/5 transition-all duration-500 font-mono">
      {/* Container Icon */}
      <div
        className={cn(
          "p-4 rounded-[1.25rem] border border-white dark:border-white/10 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10",
          !isHex && color.replace("text-", "bg-") + "/10",
          !isHex && color,
        )}
        style={
          isHex
            ? {
                backgroundColor: `${hexColor}15`,
                color: hexColor ?? undefined,
              }
            : {}
        }
      >
        <Icon className="h-7 w-7 stroke-[2.5px]" />
      </div>

      {/* Content */}
      <div className="space-y-1.5 relative z-10 text-left">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 leading-none">
          {label}
        </p>
        <p
          className={cn(
            "text-3xl font-black tracking-tighter leading-none transition-colors duration-300",
            isCurrency
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-slate-900 dark:text-white",
          )}
        >
          {value}
        </p>
        <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 pt-0.5 leading-none opacity-80">
          {subtext}
        </p>
      </div>

      {/* Background Glow Effect */}
      <div
        className={cn(
          "absolute -right-8 -bottom-8 w-40 h-40 opacity-0 group-hover:opacity-[0.08] transition-all duration-700 blur-3xl rounded-full pointer-events-none",
          !isHex && color.replace("text-", "bg-"),
        )}
        style={isHex ? { backgroundColor: hexColor ?? undefined } : {}}
      />

      {/* Border Glow line (Top right) */}
      <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-orange-500/20 to-transparent" />
    </div>
  );
}
