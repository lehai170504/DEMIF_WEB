"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShadowingPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
  sentence: {
    original: string;
    translation: string;
  };
  showTranslation: boolean;
  onToggleTranslation: () => void;
}

export function ShadowingPlayer({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  canNext,
  canPrev,
  sentence,
  showTranslation,
  onToggleTranslation,
}: ShadowingPlayerProps) {
  return (
    <div className="space-y-8">
      {/* Audio Wave Visualizer */}
      <div className="relative bg-[#18181b] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden">
        <div className="flex items-center justify-center h-32 gap-1.5 mb-8">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "w-1.5 rounded-full",
                isPlaying ? "bg-orange-500" : "bg-white/10",
              )}
              animate={
                isPlaying
                  ? {
                      height: [10, Math.random() * 60 + 20, 10],
                    }
                  : { height: 10 }
              }
              transition={
                isPlaying
                  ? {
                      repeat: Infinity,
                      duration: 0.5,
                      delay: i * 0.05,
                    }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 relative z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-12 h-12 text-zinc-500 hover:text-white hover:bg-white/5"
            onClick={onPrev}
            disabled={!canPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="relative group">
            <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <Button
              onClick={onPlayPause}
              className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-orange-500 to-amber-600 hover:scale-105 transition-all shadow-xl flex items-center justify-center text-white border border-white/20"
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
            className="rounded-full w-12 h-12 text-zinc-500 hover:text-white hover:bg-white/5"
            onClick={onNext}
            disabled={!canNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Sentence Display */}
      <div className="bg-[#18181b] border border-white/10 rounded-[2rem] p-8 text-center space-y-4 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.p
            key={sentence.original}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl md:text-3xl font-bold text-white leading-relaxed"
          >
            {sentence.original}
          </motion.p>
        </AnimatePresence>

        <div className="h-px w-12 bg-white/10 mx-auto" />

        <div className="min-h-[24px]">
          {showTranslation ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-zinc-400 italic"
            >
              {sentence.translation}
            </motion.p>
          ) : (
            <Button
              variant="link"
              onClick={onToggleTranslation}
              className="text-zinc-500 text-xs uppercase tracking-widest hover:text-orange-500 h-auto p-0"
            >
              Hiện dịch nghĩa
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
