"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ShadowingHeaderProps {
  title: string;
  current: number;
  total: number;
  progress: number;
  level: string;
  onSelectLevel: (lvl: any) => void;
}

export function ShadowingHeader({
  title,
  current,
  total,
  progress,
  level,
  onSelectLevel,
}: ShadowingHeaderProps) {
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  
  const getLevelColor = (lvl: string) => {
    const colors: Record<string, string> = {
      Beginner: "text-emerald-500 bg-emerald-500/10",
      Intermediate: "text-amber-500 bg-amber-500/10",
      Advanced: "text-rose-500 bg-rose-500/10",
      Expert: "text-purple-500 bg-purple-500/10",
    };
    return colors[lvl] || colors.Beginner;
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10 text-gray-500 dark:text-zinc-400 hover:text-blue-600"
          >
            <Link href="/shadowing">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider line-clamp-1 max-w-[200px] sm:max-w-none">
              {title}
            </h1>
            <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">
              Shadowing Practice Mode
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Level Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn("h-8 px-3 rounded-full font-black text-[10px] uppercase tracking-widest gap-2", getLevelColor(level))}
              >
                {level}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl">
              {levels.map((l) => (
                <DropdownMenuItem 
                  key={l}
                  onClick={() => onSelectLevel(l)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest cursor-pointer",
                    level === l ? "text-blue-500 bg-blue-500/5" : "text-muted-foreground"
                  )}
                >
                  {l}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-black text-gray-500 dark:text-zinc-500 tabular-nums">
              PHẦN {current}{" "}
              <span className="text-gray-300 dark:text-zinc-700 mx-1">/</span>{" "}
              {total}
            </span>
            <div className="w-24 h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden border border-gray-200/50 dark:border-white/5">
              <motion.div
                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
