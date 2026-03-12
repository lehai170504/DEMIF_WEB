"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff, RotateCcw, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckSegmentResponse } from "@/types/lesson.type";

interface ShadowingRecorderProps {
  isRecording: boolean;
  onRecord: () => void;
  checkResult?: CheckSegmentResponse | null;
  isChecking: boolean;
  onNext: () => void;
  onRetry: () => void;
  speechSupported: boolean;
}

export function ShadowingRecorder({
  isRecording,
  onRecord,
  checkResult,
  isChecking,
  onNext,
  onRetry,
  speechSupported,
}: ShadowingRecorderProps) {
  const accuracy = checkResult?.accuracy ?? 0;

  const getAccuracyColor = (val: number) => {
    if (val >= 80) return "text-emerald-400";
    if (val >= 60) return "text-orange-400";
    return "text-rose-400";
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex-1 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg min-h-[400px]">
        {/* Status Indicator */}
        <div className="absolute top-6 left-0 w-full text-center">
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em] py-1 px-3 rounded-full border transition-colors",
              isRecording
                ? "border-red-500/50 text-red-500 bg-red-500/10 animate-pulse"
                : isChecking
                ? "border-orange-500/50 text-orange-400 bg-orange-500/10 animate-pulse"
                : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-zinc-500 bg-gray-100 dark:bg-white/5",
            )}
          >
            {isRecording ? "Đang ghi âm..." : isChecking ? "Đang chấm điểm..." : "Sẵn sàng"}
          </span>
        </div>

        {/* Mic Button */}
        <div className="relative z-10 mb-8 mt-4">
          {isRecording && (
            <span className="absolute inset-0 rounded-full border-2 border-red-500 opacity-50 animate-ping"></span>
          )}
          <Button
            onClick={onRecord}
            disabled={isRecording || isChecking || !speechSupported}
            className={cn(
              "w-32 h-32 rounded-full transition-all duration-300 flex items-center justify-center border-4",
              isRecording
                ? "bg-red-500 text-white border-red-400 shadow-[0_0_40px_rgba(239,68,68,0.4)]"
                : "bg-gray-100 dark:bg-[#27272a] text-orange-500 dark:text-white border-gray-300 dark:border-[#3f3f46] hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]",
            )}
          >
            {isRecording ? (
              <MicOff className="h-12 w-12" />
            ) : (
              <Mic className="h-12 w-12" />
            )}
          </Button>
        </div>

        <p className="text-gray-600 dark:text-zinc-400 text-sm font-medium mb-2 text-center">
          {!speechSupported
            ? "Trình duyệt không hỗ trợ nhận dạng giọng nói"
            : isRecording
            ? "Đang lắng nghe giọng của bạn..."
            : "Nhấn vào micro để bắt đầu nói"}
        </p>
        <p className="text-xs text-gray-500 dark:text-zinc-600">
          Hệ thống sẽ tự động chấm điểm sau khi bạn nói xong
        </p>

        {/* Recording Visualizer */}
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
        {checkResult && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-[2rem] p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Kết quả
            </div>

            {/* Accuracy score */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className={cn("text-5xl font-black", getAccuracyColor(accuracy))}>
                {accuracy.toFixed(0)}
              </span>
              <span className="text-xl font-bold text-gray-500 dark:text-zinc-500">%</span>
            </div>

            {/* Word-by-word comparison */}
            {checkResult.words.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {checkResult.words.map((w, i) => (
                  <span
                    key={i}
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-sm font-bold border",
                      w.isCorrect
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    )}
                    title={!w.isCorrect && w.expected ? `Cần: "${w.expected}"` : undefined}
                  >
                    {w.word}
                    {!w.isCorrect && w.expected && (
                      <span className="ml-1 text-[10px] opacity-70">→ {w.expected}</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {checkResult.feedback && (
              <p className="text-xs text-gray-500 dark:text-zinc-500 italic mb-4">
                {checkResult.feedback}
              </p>
            )}

            <div className="flex gap-3">
              <Button
                onClick={onRetry}
                variant="outline"
                className="flex-1 h-12 rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-zinc-300 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" /> Thử lại
              </Button>
              <Button
                onClick={onNext}
                className="flex-1 h-12 rounded-xl bg-orange-500 dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-zinc-200 font-bold"
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

