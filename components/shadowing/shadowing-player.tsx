"use client";

import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
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
  const replaysLeft =
    maxReplays === -1 ? null : Math.max(0, maxReplays - replayCount);

  return (
    <div className="space-y-6">
      {/* Audio Wave Visualizer Card */}
      <div className="relative bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl transition-all">
        {/* Waveform Animation */}
        <div className="flex items-center justify-center h-32 gap-1.5 mb-8">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "w-1.5 rounded-full transition-colors duration-500",
                isPlaying
                  ? "bg-gradient-to-t from-blue-600 to-indigo-400"
                  : "bg-gray-100 dark:bg-white/5",
              )}
              animate={
                isPlaying
                  ? { height: [20, Math.random() * 80 + 20, 20] }
                  : { height: 12 }
              }
              transition={
                isPlaying
                  ? { repeat: Infinity, duration: 0.6, delay: i * 0.03 }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>

        {/* Info Bar */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <Clock className="h-3 w-3 text-blue-500" />
            <span>
              {segment?.startTime.toFixed(1)}s – {segment?.endTime.toFixed(1)}s
            </span>
          </div>

          {replaysLeft !== null && (
            <div
              className={cn(
                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border transition-all",
                replayLimitReached
                  ? "bg-rose-500/10 border-rose-500/20 text-rose-500"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-500",
              )}
            >
              {replayLimitReached
                ? "Hết lượt nghe"
                : `Còn ${replaysLeft} lượt nghe`}
            </div>
          )}
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-center gap-8 relative z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-14 h-14 text-gray-400 hover:text-blue-500 hover:bg-blue-500/5 transition-all"
            onClick={onPrev}
            disabled={!canPrev}
          >
            <ChevronLeft className="h-7 w-7" />
          </Button>

          <div className="relative group">
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"
                />
              )}
            </AnimatePresence>

            <Button
              onClick={onPlayPause}
              disabled={replayLimitReached && !isPlaying}
              className={cn(
                "w-24 h-24 rounded-[2.5rem] transition-all duration-300 shadow-2xl flex items-center justify-center text-white border-4 border-white/10",
                isPlaying
                  ? "bg-gradient-to-br from-blue-600 to-indigo-700 scale-105"
                  : "bg-gradient-to-br from-gray-800 to-black hover:from-blue-600 hover:to-blue-700",
              )}
            >
              {isPlaying ? (
                <Pause className="h-10 w-10 fill-current" />
              ) : (
                <Play className="h-10 w-10 fill-current ml-1" />
              )}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-14 h-14 text-gray-400 hover:text-blue-500 hover:bg-blue-500/5 transition-all"
            onClick={onNext}
            disabled={!canNext}
          >
            <ChevronRight className="h-7 w-7" />
          </Button>
        </div>
      </div>

      {/* Segment Text Card */}
      <div className="bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-10 text-center shadow-2xl relative min-h-[160px] flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {showTranscript && segment ? (
            <motion.div
              key="transcript"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-4"
            >
              <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight tracking-tight px-4">
                {segment.text}
              </p>
              <button
                onClick={onToggleTranscript}
                className="flex items-center gap-2 mx-auto text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-500 transition-colors"
              >
                <EyeOff className="h-3 w-3" /> Ẩn lời thoại
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="p-4 rounded-full bg-gray-50 dark:bg-white/5 text-gray-300 dark:text-zinc-700">
                <EyeOff className="h-8 w-8" />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleTranscript}
                className="rounded-2xl text-[10px] font-black uppercase tracking-widest border-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white transition-all px-6"
              >
                Hiện lời thoại
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
