"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentProps {
  student: {
    name: string;
    total: number;
    completed: number;
    score: number;
    lastActive: string;
  };
}

export function ProgressRow({ student }: StudentProps) {
  const progress = Math.round((student.completed / student.total) * 100);

  return (
    <TableRow className="group hover:bg-white/5 transition-all border-b border-white/5 last:border-none">
      <TableCell className="px-8 py-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 rounded-xl border border-white/10 shadow-lg">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
            />
            <AvatarFallback className="bg-zinc-800">
              {student.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-zinc-200 group-hover:text-[#FF7A00] transition-colors">
              {student.name}
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">
              Active: {student.lastActive}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <div className="inline-flex items-center bg-white/5 px-2 py-1 rounded-lg border border-white/5">
          <span className="font-black text-xs text-zinc-300">
            {student.completed}
          </span>
          <span className="mx-1 text-[10px] text-zinc-600">/</span>
          <span className="font-bold text-[10px] text-zinc-500">
            {student.total}
          </span>
        </div>
      </TableCell>

      <TableCell className="px-8 min-w-[250px]">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase italic tracking-tighter">
            <span className="text-[#FF7A00]">{progress}% Done</span>
            <span className="text-zinc-600">{100 - progress}% Remaining</span>
          </div>
          <Progress
            value={progress}
            className={cn(
              "h-1.5 bg-white/5",
              progress > 80
                ? "[&>div]:bg-emerald-500"
                : progress > 50
                  ? "[&>div]:bg-[#FF7A00]"
                  : "[&>div]:bg-rose-500",
            )}
          />
        </div>
      </TableCell>

      <TableCell className="text-center">
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl font-black italic border shadow-lg",
            student.score >= 85
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/20",
          )}
        >
          <Zap
            className={cn(
              "h-3 w-3 fill-current",
              student.score >= 85 ? "text-emerald-400" : "text-[#FF7A00]",
            )}
          />
          <span className="text-sm">{student.score}%</span>
        </div>
      </TableCell>

      <TableCell className="text-right px-8">
        <button className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:bg-[#FF7A00] hover:text-white hover:border-[#FF7A00] transition-all group/btn shadow-xl">
          <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </TableCell>
    </TableRow>
  );
}
