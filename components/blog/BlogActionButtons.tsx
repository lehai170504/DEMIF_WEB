"use client";

import { Button } from "@/components/ui/button";
import { Check, Share2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogActionButtonsProps {
  copied: boolean;
  onCopyLink: () => void;
  totalViews?: number;
}

export function BlogActionButtons({
  copied,
  onCopyLink,
  totalViews = 0,
}: BlogActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100 dark:border-white/5">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
        <Eye className="w-4 h-4 text-blue-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          {totalViews.toLocaleString()} Lượt xem
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onCopyLink}
          className={cn(
            "flex items-center gap-2 h-11 px-6 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-sm",
            copied
              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
              : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-white/5",
          )}
        >
          {copied ? (
            <Check className="h-4 w-4 animate-in zoom-in" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          <span>{copied ? "Đã lưu liên kết" : "Chia sẻ bài viết"}</span>
        </Button>
      </div>
    </div>
  );
}
