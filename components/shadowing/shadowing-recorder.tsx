"use client";

import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckVoiceResponse } from "@/types/lesson.type";

interface ShadowingRecorderProps {
  isRecording: boolean;
  onRecord: () => void;
  checkResult?: CheckVoiceResponse | null; // Cập nhật đúng Type trả về từ API Voice
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
  // Lấy accuracyScore từ API mới
  const accuracy = checkResult?.accuracyScore ?? 0;

  const getAccuracyColor = (val: number) => {
    if (val >= 80) return "text-emerald-500";
    if (val >= 60) return "text-orange-500";
    return "text-rose-500";
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex-1 bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl min-h-[420px] transition-all">
        {/* Status Indicator */}
        <div className="absolute top-8 left-0 w-full text-center">
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em] py-1.5 px-4 rounded-full border transition-all duration-300",
              isRecording
                ? "border-red-500/50 text-red-500 bg-red-500/10 animate-pulse scale-110"
                : isChecking
                  ? "border-blue-500/50 text-blue-500 bg-blue-500/10 animate-pulse"
                  : "border-gray-200 dark:border-white/10 text-gray-400 dark:text-zinc-500 bg-gray-50 dark:bg-white/5",
            )}
          >
            {isRecording
              ? "Đang lắng nghe..."
              : isChecking
                ? "AI đang phân tích..."
                : "Phòng luyện nói"}
          </span>
        </div>

        {/* Mic Button Area */}
        <div className="relative z-10 mb-10">
          <AnimatePresence>
            {isRecording && (
              <motion.span
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-red-500/30"
              />
            )}
          </AnimatePresence>

          <Button
            onClick={onRecord}
            disabled={isChecking || !speechSupported}
            className={cn(
              "w-36 h-36 rounded-full transition-all duration-500 flex flex-col items-center justify-center border-8 shadow-2xl group",
              isRecording
                ? "bg-red-500 text-white border-red-200 dark:border-red-900/50 scale-105"
                : "bg-white dark:bg-[#18181b] text-blue-600 border-gray-100 dark:border-white/5 hover:border-blue-500 hover:scale-105",
            )}
          >
            {isChecking ? (
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            ) : isRecording ? (
              <MicOff className="h-12 w-12" />
            ) : (
              <Mic className="h-12 w-12 group-hover:animate-bounce" />
            )}
            {!isRecording && !isChecking && (
              <span className="absolute -bottom-2 text-[8px] font-black uppercase text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Bắt đầu
              </span>
            )}
          </Button>
        </div>

        <div className="text-center space-y-2">
          <p className="text-gray-900 dark:text-white text-base font-bold">
            {!speechSupported
              ? "Trình duyệt không hỗ trợ Voice"
              : isRecording
                ? "Hãy nói to và rõ ràng..."
                : isChecking
                  ? "Đang đối chiếu giọng nói"
                  : "Sẵn sàng để Shadowing?"}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-500 max-w-[250px] mx-auto leading-relaxed">
            {isRecording
              ? "Hệ thống đang thu âm giọng của bạn"
              : "Nhấn Mic để bắt đầu thực hành câu này"}
          </p>
        </div>

        {/* Recording Waveform Visualizer */}
        {isRecording && (
          <div className="absolute bottom-6 left-0 w-full h-12 flex items-end justify-center gap-1.5 px-10">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-gradient-to-t from-red-600 to-red-400 rounded-full"
                animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Result Panel */}
      <AnimatePresence mode="wait">
        {checkResult && !isRecording && !isChecking && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Sparkles className="w-20 h-20 text-orange-500" />
            </div>

            <div className="flex flex-col items-center mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">
                Độ chính xác
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-6xl font-black tracking-tighter",
                    getAccuracyColor(accuracy),
                  )}
                >
                  {accuracy.toFixed(0)}
                </span>
                <span className="text-xl font-bold text-gray-400">%</span>
              </div>
            </div>

            {/* Chi tiết từng từ từ detectedWords */}
            {checkResult.detectedWords &&
              checkResult.detectedWords.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8 bg-gray-50 dark:bg-white/[0.02] p-6 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                  {checkResult.detectedWords.map((w, i) => (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      key={i}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-sm font-bold border transition-all",
                        w.isCorrect
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 shadow-sm",
                      )}
                    >
                      {w.word}
                    </motion.span>
                  ))}
                </div>
              )}

            <div className="flex gap-4">
              <Button
                onClick={onRetry}
                variant="outline"
                className="flex-1 h-14 rounded-2xl border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-zinc-300 font-bold"
              >
                <RotateCcw className="h-4 w-4 mr-2" /> Thử lại
              </Button>
              <Button
                onClick={onNext}
                className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-500/30"
              >
                Tiếp theo <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
