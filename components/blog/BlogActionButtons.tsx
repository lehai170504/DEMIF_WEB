"use client";

import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogActionButtonsProps {
  copied: boolean;
  onCopyLink: () => void;
}

export function BlogActionButtons({
  copied,
  onCopyLink,
}: BlogActionButtonsProps) {
  return (
    <div className="flex justify-end mb-8">
      <Button
        variant="outline"
        onClick={onCopyLink}
        className={cn(
          "flex items-center gap-2 h-10 rounded-xl border font-bold transition-all duration-300",
          copied
            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
            : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10",
        )}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
        <span>{copied ? "Đã sao chép liên kết" : "Chia sẻ bài viết"}</span>
      </Button>
    </div>
  );
}
