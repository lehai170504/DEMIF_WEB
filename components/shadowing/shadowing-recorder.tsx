"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff, RotateCcw, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShadowingRecorderProps {
  isRecording: boolean;
  onRecord: () => void;
  scores: { pronunciation: number; timing: number; tone: number };
  onNext: () => void;
  onRetry: () => void;
}

export function ShadowingRecorder({
  isRecording,
  onRecord,
  scores,
  onNext,
  onRetry,
}: ShadowingRecorderProps) {
  const hasScore =
    scores.pronunciation > 0 || scores.timing > 0 || scores.tone > 0;

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex-1 bg-[#18181b] border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg min-h-[400px]">
        {/* Status Indicator */}
        <div className="absolute top-6 left-0 w-full text-center">
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em] py-1 px-3 rounded-full border transition-colors",
              isRecording
                ? "border-red-500/50 text-red-500 bg-red-500/10 animate-pulse"
                : "border-white/10 text-zinc-500 bg-white/5",
            )}
          >
            {isRecording ? "Đang ghi âm..." : "Sẵn sàng"}
          </span>
        </div>

        {/* Mic Button */}
        <div className="relative z-10 mb-8 mt-4">
          {isRecording && (
            <span className="absolute inset-0 rounded-full border-2 border-red-500 opacity-50 animate-ping" />
          )}
          <Button
            onClick={onRecord}
            disabled={isRecording}
            className={cn(
              "w-32 h-32 rounded-full transition-all duration-300 flex items-center justify-center border-4",
              isRecording
                ? "bg-red-500 text-white border-red-400 shadow-[0_0_40px_rgba(239,68,68,0.4)]"
                : "bg-[#27272a] text-white border-[#3f3f46] hover:border-orange-500 hover:text-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]",
            )}
          >
            {isRecording ? (
              <MicOff className="h-12 w-12" />
            ) : (
              <Mic className="h-12 w-12" />
            )}
          </Button>
        </div>

        <p className="text-zinc-400 text-sm font-medium mb-2">
          {isRecording
            ? "Đang lắng nghe giọng của bạn..."
            : "Nhấn vào micro để bắt đầu nói"}
        </p>
        <p className="text-xs text-zinc-600">
          Hệ thống sẽ tự động chấm điểm sau khi ghi âm
        </p>

        {/* Recording Visualizer (Fake) */}
        {isRecording && (
          <div className="absolute bottom-0 left-0 w-full h-16 flex items-end justify-center gap-1 pb-4 opacity-30">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-red-500 rounded-t-full"
                animate={{ height: Math.random() * 40 + 5 }}
                transition={{ duration: 0.1, repeat: Infinity }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Score Feedback */}
      <AnimatePresence>
        {(hasScore || isRecording) && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#18181b] border border-white/10 rounded-[2rem] p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-widest text-zinc-500">
              <Sparkles className="h-4 w-4 text-orange-500" />
              AI Feedback
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Phát âm",
                  score: scores.pronunciation,
                  color: "text-emerald-400",
                },
                {
                  label: "Nhịp điệu",
                  score: scores.timing,
                  color: "text-blue-400",
                },
                {
                  label: "Ngữ điệu",
                  score: scores.tone,
                  color: "text-purple-400",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 rounded-2xl p-3 text-center border border-white/5"
                >
                  <div className={cn("text-xl font-black mb-1", stat.color)}>
                    {stat.score}
                  </div>
                  <div className="text-[9px] font-bold text-zinc-500 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={onRetry}
                variant="outline"
                className="flex-1 h-12 rounded-xl border-white/10 hover:bg-white/5 text-zinc-300 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" /> Thử lại
              </Button>
              <Button
                onClick={onNext}
                className="flex-1 h-12 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold"
              >
                Tiếp tục <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
