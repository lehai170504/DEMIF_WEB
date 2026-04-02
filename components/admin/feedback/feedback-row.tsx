"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, Sparkles, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackRowProps {
  fb: any;
  onView: (fb: any) => void;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "in-progress":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "resolved":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
  }
};

const translateStatus = (status: string) => {
  const map: Record<string, string> = {
    pending: "Chờ xử lý",
    "in-progress": "Đang giải quyết",
    resolved: "Đã hoàn tất",
  };
  return map[status] || status;
};

export function FeedbackRow({ fb, onView }: FeedbackRowProps) {
  return (
    <TableRow className="group hover:bg-white/5 transition-all border-b border-white/5 last:border-none">
      <TableCell className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg border",
              fb.source === "ai"
                ? "bg-zinc-900 text-[#FF7A00] border-[#FF7A00]/20"
                : "bg-orange-500/10 text-orange-500 border-orange-500/20",
            )}
          >
            {fb.source === "ai" ? (
              <Sparkles className="h-5 w-5" />
            ) : (
              <UserCircle className="h-5 w-5" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-zinc-200 uppercase text-[11px] tracking-tight">
              {fb.userName}
            </span>
            <span className="text-[10px] text-zinc-500 lowercase font-medium">
              {fb.email}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Badge
          variant="outline"
          className="rounded-lg border-white/10 font-black text-[9px] uppercase bg-white/5 text-zinc-400"
        >
          {fb.category}
        </Badge>
      </TableCell>

      <TableCell className="max-w-[300px]">
        <p className="text-xs text-zinc-400 font-medium truncate italic leading-relaxed">
          "{fb.content}"
        </p>
        <span className="text-[9px] text-zinc-600 uppercase font-black tracking-tighter mt-1 block">
          Gửi lúc: {fb.createdAt}
        </span>
      </TableCell>

      <TableCell className="text-center">
        <Badge
          className={cn(
            "px-3 py-1 rounded-lg border font-black text-[9px] uppercase tracking-tighter shadow-sm",
            getStatusStyles(fb.status),
          )}
        >
          {translateStatus(fb.status)}
        </Badge>
      </TableCell>

      <TableCell className="text-right px-8">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(fb)}
            className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FF7A00] hover:text-white transition-all shadow-xl"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
