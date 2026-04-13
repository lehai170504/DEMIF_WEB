"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Eye, EyeOff, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShadowingPlaylistProps {
  segments: any[];
  currentIdx: number;
  checkResults: Record<number, any>;
  onSelectSegment: (idx: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function ShadowingPlaylist({
  segments,
  currentIdx,
  checkResults,
  onSelectSegment,
  isPlaying,
  onPlayPause,
}: ShadowingPlaylistProps) {
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);

  if (segments.length === 0) return null;

  const toggleReveal = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setRevealedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const handlePlayClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (currentIdx !== idx) {
      onSelectSegment(idx);
    } else {
      onPlayPause();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#050505] border-l border-gray-100 dark:border-white/5">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
            <h3 className="font-bold font-mono text-foreground uppercase text-[12px] tracking-[0.1em]">
              Nội dung bài học
            </h3>
          </div>
          <span className="font-mono text-[10px] font-black text-muted-foreground bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-md">
            {currentIdx + 1} / {segments.length}
          </span>
        </div>
      </div>

      {/* Scrollable List  */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-6">
        <div className="space-y-3">
          {segments.map((seg, i) => {
            const isActive = i === currentIdx;
            const isRevealed = revealedIndices.includes(i);
            const runTimeAcc =
              checkResults[i]?.accuracyScore ?? checkResults[i]?.accuracy;
            const finalAcc = runTimeAcc ?? seg.bestScore;

            return (
              <div
                key={i}
                onClick={() => onSelectSegment(i)}
                className={cn(
                  "w-full flex flex-col gap-3 p-5 rounded-[1.5rem] text-left transition-all border group relative cursor-pointer",
                  isActive
                    ? "bg-orange-500/[0.03] dark:bg-orange-500/[0.04] border-orange-500/30 shadow-[0_4px_20px_rgba(249,115,22,0.05)]"
                    : "border-gray-100 dark:border-white/[0.03] hover:border-gray-200 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.02]",
                )}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-6 bottom-6 w-1 bg-orange-500 rounded-r-full shadow-[2px_0_10px_rgba(249,115,22,0.4)]" />
                )}

                <div className="flex items-start justify-between gap-4">
                  {/* Left: Index + Text */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                      className={cn(
                        "shrink-0 font-mono text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center border transition-colors",
                        isActive
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-zinc-600 border-gray-100 dark:border-white/10",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          "text-sm leading-relaxed transition-all duration-500",
                          !isRevealed
                            ? "blur-md select-none opacity-40"
                            : "opacity-100",
                          isActive
                            ? "text-gray-900 dark:text-white font-bold"
                            : "text-gray-500 dark:text-zinc-400 font-medium",
                        )}
                      >
                        {isRevealed
                          ? seg.text
                          : "••••••••••••••••••••••••••••••••"}
                      </div>
                    </div>
                  </div>

                  {/* Right: Accuracy Badge */}
                  {finalAcc !== null && finalAcc !== undefined && (
                    <div
                      className={cn(
                        "shrink-0 text-[10px] font-black px-2 py-1 rounded-lg self-start",
                        finalAcc >= 80
                          ? "bg-emerald-500/10 text-emerald-500"
                          : finalAcc >= 50
                            ? "bg-orange-500/10 text-orange-500"
                            : "bg-rose-500/10 text-rose-500",
                      )}
                    >
                      {finalAcc.toFixed(0)}%
                    </div>
                  )}
                </div>

                {/* Bottom Action Bar */}
                <div className="flex items-center justify-between gap-4 mt-1">
                  <div className="flex items-center gap-2">
                    {/* Play/Replay Button */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => handlePlayClick(e, i)}
                      className={cn(
                        "h-8 w-8 rounded-full transition-all",
                        isActive && isPlaying
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                          : "hover:bg-orange-500/10 hover:text-orange-500",
                      )}
                    >
                      {isActive && isPlaying ? (
                        <Pause className="h-3.5 w-3.5" />
                      ) : (
                        <RotateCcw className="h-3.5 w-3.5" />
                      )}
                    </Button>

                    {/* Reveal Toggle */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => toggleReveal(e, i)}
                      className={cn(
                        "h-8 w-8 rounded-full transition-all",
                        isRevealed ? "text-blue-500" : "text-gray-400",
                      )}
                    >
                      {isRevealed ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>

                  {isActive && (
                    <span className="text-[9px] font-black font-mono uppercase tracking-widest text-orange-500 animate-pulse">
                      Đang học
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
