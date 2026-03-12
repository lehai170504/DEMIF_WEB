"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimedSegment } from "@/types/lesson.type";

interface ShadowingPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
  segment: TimedSegment | null;
  /** Whether to show the transcript text to the user before recording */
  showTranscript: boolean;
  onToggleTranscript: () => void;
  replayCount: number;
  maxReplays: number; // -1 = unlimited
}

export function ShadowingPlayer({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  canNext,
  canPrev,
  segment,
  showTranscript,
  onToggleTranscript,
  replayCount,
  maxReplays,
}: ShadowingPlayerProps) {
  const replayLimitReached = maxReplays !== -1 && replayCount >= maxReplays;
  const replaysLeft = maxReplays === -1 ? null : maxReplays - replayCount;

  return (
    <div className="space-y-6">
      {/* Audio Wave Visualizer */}
      <div className="relative bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 overflow-hidden shadow-lg">
        <div className="flex items-center justify-center h-28 gap-1.5 mb-6">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "w-2 rounded-full",
                isPlaying ? "bg-orange-500" : "bg-gray-200 dark:bg-white/10",
              )}
              animate={
                isPlaying
                  ? { height: [30, Math.random() * 60 + 40, 30] }
                  : { height: 30 }
              }
              transition={
                isPlaying
                  ? { repeat: Infinity, duration: 0.5, delay: i * 0.05 }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>

        {/* Timestamp info */}
        {segment && (
          <div className="flex items-center justify-center gap-2 mb-6 text-xs font-bold text-gray-500 dark:text-zinc-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{segment.startTime.toFixed(1)}s – {segment.endTime.toFixed(1)}s</span>
            {replaysLeft !== null && (
              <span className={cn("ml-2 px-2 py-0.5 rounded-full border text-[10px]",
                replayLimitReached
                  ? "border-red-500/30 text-red-400 bg-red-500/10"
                  : "border-orange-500/30 text-orange-400 bg-orange-500/10"
              )}>
                {replayLimitReached ? "Hết lượt nghe" : `Còn ${replaysLeft} lượt`}
              </span>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 relative z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-12 h-12 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
            onClick={onPrev}
            disabled={!canPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="relative group">
            <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <Button
              onClick={onPlayPause}
              disabled={replayLimitReached && !isPlaying}
              className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-orange-500 to-amber-600 hover:scale-105 transition-all shadow-xl flex items-center justify-center text-white border border-white/20 disabled:opacity-60"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8 fill-current" />
              ) : (
                <Play className="h-8 w-8 fill-current ml-1" />
              )}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-12 h-12 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
            onClick={onNext}
            disabled={!canNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Segment Text */}
      <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 text-center space-y-4 shadow-lg">
        <AnimatePresence mode="wait">
          {showTranscript && segment ? (
            <motion.p
              key={segment.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-relaxed"
            >
              {segment.text}
            </motion.p>
          ) : (
            <motion.div
              key="hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-gray-400 dark:text-zinc-600 text-sm">Văn bản đang bị ẩn</p>
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleTranscript}
                className="rounded-xl text-xs border-orange-500/20 text-orange-500 hover:bg-orange-500/10"
              >
                Xem lời thoại
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {showTranscript && (
          <Button
            variant="link"
            onClick={onToggleTranscript}
            className="text-gray-400 dark:text-zinc-600 text-[10px] uppercase tracking-widest hover:text-orange-500 h-auto p-0"
          >
            Ẩn lời thoại
          </Button>
        )}
      </div>
    </div>
  );
}

