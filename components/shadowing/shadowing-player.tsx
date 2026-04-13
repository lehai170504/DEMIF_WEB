"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Languages,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShadowingPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
  segment: any | null; // using any to bypass strict type since we added ipa and translation dynamically
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
  const [showTranslation, setShowTranslation] = useState(false);
  const replayLimitReached = maxReplays !== -1 && replayCount >= maxReplays;
  const replaysLeft =
    maxReplays === -1 ? null : Math.max(0, maxReplays - replayCount);

  return (
    <div className="space-y-6">

      {/* Combined Workout Card */}
      <div className="bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative min-h-[300px] flex flex-col">
        {/* Info Bar [Header alike] */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                <Clock className="h-3 w-3 text-orange-500" />
                <span>{segment?.startTime?.toFixed(1) || "0.0"}s – {segment?.endTime?.toFixed(1) || "0.0"}s</span>
            </div>
            {replaysLeft !== null && (
                <div className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                    replayLimitReached ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-orange-500/10 border-orange-500/20 text-orange-500"
                )}>
                    {replayLimitReached ? "Hết lượt nghe" : `${replaysLeft} lượt nghe còn lại`}
                </div>
            )}
        </div>

        <div className="flex-1 flex flex-col justify-center items-center py-4">
            <AnimatePresence mode="wait">
            {showTranscript && segment ? (
                <motion.div
                key="transcript"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 w-full text-center"
                >
                <div>
                    <p className="text-lg md:text-xl font-black text-gray-900 dark:text-white leading-relaxed px-4">
                    {segment.text}
                    </p>
                    {segment.ipa && (
                    <p className="text-[11px] font-medium text-gray-400 dark:text-zinc-500 tracking-wider mt-1.5">
                        / {segment.ipa} /
                    </p>
                    )}
                </div>

                <AnimatePresence>
                    {showTranslation && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <p className="text-sm text-orange-600 dark:text-orange-400 font-bold px-4">
                                {segment.translation || "Bản dịch đang được cập nhật..."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div key="hidden" className="flex flex-col items-center gap-4">
                    <EyeOff className="h-10 w-10 text-gray-200 dark:text-zinc-800" />
                    <Button variant="outline" size="sm" onClick={onToggleTranscript} className="rounded-2xl text-[10px] font-black uppercase tracking-widest border-orange-500/20 text-orange-500">
                        Hiện lời thoại
                    </Button>
                </motion.div>
            )}
            </AnimatePresence>
        </div>

        {/* Action Bar (Footer) */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setShowTranslation(!showTranslation)} className="h-10 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    <Languages className="h-3 w-3 mr-2" /> {showTranslation ? "Ẩn dịch" : "Dịch"}
                </Button>
                <Button variant="ghost" size="sm" onClick={onToggleTranscript} className="h-10 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    <Eye className="h-3 w-3 mr-2" /> {showTranscript ? "Ẩn lời" : "Hiện lời"}
                </Button>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={onPrev} disabled={!canPrev} className="rounded-xl w-10 h-10 border border-gray-200 dark:border-white/10">
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button onClick={onPlayPause} disabled={replayLimitReached && !isPlaying} className={cn("px-6 h-10 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all", isPlaying ? "bg-rose-600 hover:bg-rose-500 text-white" : "bg-orange-600 hover:bg-orange-500 text-white")}>
                    {isPlaying ? <Pause className="w-3 h-3 mr-2" /> : <Play className="w-3 h-3 mr-2" />}
                    {isPlaying ? "Tạm dừng" : "Nghe lại"}
                </Button>
                <Button variant="ghost" size="icon" onClick={onNext} disabled={!canNext} className="rounded-xl w-10 h-10 border border-gray-200 dark:border-white/10">
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
