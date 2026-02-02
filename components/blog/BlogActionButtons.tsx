"use client";

import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Share2, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogActionButtonsProps {
  isLiked: boolean;
  isSaved: boolean;
  copied: boolean;
  likesCount: number;
  onLike: () => void;
  onSave: () => void;
  onCopyLink: () => void;
}

export function BlogActionButtons({
  isLiked,
  isSaved,
  copied,
  likesCount,
  onLike,
  onSave,
  onCopyLink,
}: BlogActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* Like Button */}
      <Button
        variant="outline"
        onClick={onLike}
        className={cn(
          "flex items-center gap-2 h-10 rounded-xl border font-bold transition-all duration-300",
          isLiked
            ? "bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20"
            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20",
        )}
      >
        <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        <span>Thích ({isLiked ? likesCount + 1 : likesCount})</span>
      </Button>

      {/* Save Button */}
      <Button
        variant="outline"
        onClick={onSave}
        className={cn(
          "flex items-center gap-2 h-10 rounded-xl border font-bold transition-all duration-300",
          isSaved
            ? "bg-blue-500/10 border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20",
        )}
      >
        <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
        <span>{isSaved ? "Đã lưu" : "Lưu bài viết"}</span>
      </Button>

      {/* Copy Link Button */}
      <Button
        variant="outline"
        onClick={onCopyLink}
        className={cn(
          "flex items-center gap-2 h-10 rounded-xl border font-bold transition-all duration-300",
          copied
            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20",
        )}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
        <span>{copied ? "Đã sao chép" : "Chia sẻ"}</span>
      </Button>
    </div>
  );
}
