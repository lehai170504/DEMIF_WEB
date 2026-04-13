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
import { CheckVoiceResponse } from "@/types/lesson.type"; // Cập nhật Type mới

interface ShadowingRecorderProps {
  isRecording: boolean;
  onRecord: () => void;
  checkResult?: CheckVoiceResponse | null; // Cập nhật Type khớp với trang cha
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
  // Mặc định lấy accuracy từ CheckVoiceResponse
  const accuracy = checkResult?.accuracy ?? (checkResult as any)?.accuracyScore ?? 0;

  // Lấy danh sách từ trả về từ backend (WordResults hoặc words)
  const rawWords = checkResult?.wordResults || (checkResult as any)?.words || [];
  
  // Chuẩn hóa lại format từ vì BE trả về 'status: "correct"' thay vì 'isCorrect: true'
  const wordsList = rawWords.map((w: any) => ({
    ...w,
    isCorrect: w.isCorrect !== undefined ? w.isCorrect : w.status === "correct",
    expected: w.expected || w.correctAnswer, // Dự phòng các case trả về expected
  }));

  const getAccuracyColor = (val: number) => {
    if (val >= 80) return "text-emerald-500";
    if (val >= 60) return "text-blue-500"; // Chuyển từ cam sang xanh
    return "text-rose-500";
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-xl min-h-[280px] transition-all">
        {/* Status Indicator */}
        <div className="absolute top-6 left-0 w-full text-center">
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em] py-1.5 px-4 rounded-full border transition-all duration-300",
              isRecording
                ? "border-red-500/50 text-red-500 bg-red-500/10 animate-pulse"
                : isChecking
                  ? "border-blue-500/50 text-blue-500 bg-blue-500/10 animate-pulse"
                  : "border-gray-200 dark:border-white/10 text-gray-400 dark:text-zinc-500 bg-gray-50 dark:bg-white/5",
            )}
          >
            {isRecording
              ? "Đang lắng nghe..."
              : isChecking
                ? "AI đang phân tích..."
                : "Phòng thu âm"}
          </span>
        </div>

        {/* Mic Button */}
        <div className="relative z-10 mb-8 mt-8 group">
          <AnimatePresence>
            {isRecording && (
              <motion.span
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-red-500 bg-red-500/20"
              />
            )}
          </AnimatePresence>

          <Button
            onClick={onRecord}
            disabled={isChecking || !speechSupported}
            className={cn(
              "w-24 h-24 rounded-full transition-all duration-500 flex flex-col items-center justify-center border-4 shadow-2xl",
              isRecording
                ? "bg-red-500 text-white border-red-200 dark:border-red-900/50 scale-105 shadow-[0_0_25px_rgba(239,68,68,0.4)]"
                : "bg-white dark:bg-[#18181b] text-blue-600 border-gray-50 dark:border-white/5 hover:border-blue-500 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
            )}
          >
            {isChecking ? (
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            ) : isRecording ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8 group-hover:animate-bounce" />
            )}
          </Button>
        </div>

        <p className="text-gray-900 dark:text-white text-base font-bold mb-1 text-center">
          {!speechSupported
            ? "Trình duyệt không hỗ trợ Voice"
            : isRecording
              ? "Hãy nói to và rõ ràng..."
              : isChecking
                ? "Hệ thống đang chấm điểm..."
                : "Nhấn vào micro để bắt đầu nói"}
        </p>
        <p className="text-xs text-gray-500 dark:text-zinc-500 text-center max-w-[250px] mx-auto leading-relaxed">
          {isRecording
            ? "Đang thu âm giọng nói của bạn"
            : "Sau khi nói xong, AI sẽ tự động phân tích"}
        </p>

        {/* Recording Visualizer */}
        {isRecording && (
          <div className="absolute bottom-0 left-0 w-full h-16 flex items-end justify-center gap-1.5 pb-6 px-10">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-gradient-to-t from-red-600 to-red-400 rounded-full"
                animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Score Feedback */}
      <AnimatePresence mode="wait">
        {checkResult && !isRecording && !isChecking && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-widest text-blue-500">
              <Sparkles className="h-4 w-4" />
              Kết quả AI
            </div>

            {/* Accuracy score */}
            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span
                className={cn(
                  "text-5xl font-black tracking-tighter",
                  getAccuracyColor(accuracy),
                )}
              >
                {accuracy.toFixed(0)}
              </span>
              <span className="text-xl font-bold text-gray-400 dark:text-zinc-600">
                %
              </span>
            </div>

            {/* Word-by-word comparison */}
            {wordsList.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8 bg-gray-50 dark:bg-white/[0.02] p-6 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                {wordsList.map((w: any, i: number) => (
                  <span
                    key={i}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-sm font-bold border transition-all",
                      w.isCorrect
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 shadow-sm",
                    )}
                    title={
                      !w.isCorrect && w.expected
                        ? `Cần: "${w.expected}"`
                        : undefined
                    }
                  >
                    {w.word}
                    {!w.isCorrect && w.expected && (
                      <span className="ml-1.5 text-[10px] font-black opacity-60">
                        → {w.expected}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {(checkResult as any).feedback && (
              <p className="text-xs text-gray-500 dark:text-zinc-500 italic mb-6 text-center">
                {(checkResult as any).feedback}
              </p>
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
