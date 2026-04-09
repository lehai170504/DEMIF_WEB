import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, CheckCircle2, XCircle, RotateCcw, Star, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DictationResultProps {
  data: any; // Thay bằng kiểu trả về từ useSubmitDictation của bạn
  onRetry: () => void;
}

export function DictationResult({ data, onRetry }: DictationResultProps) {
  const isPerfect = !!data.isFullyCorrect;
  const isComplete = !!data.isSubmissionComplete;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden",
        isPerfect
          ? "bg-gradient-to-br from-amber-950 via-zinc-900 to-zinc-900"
          : "bg-zinc-900",
      )}
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Trophy className="w-32 h-32" />
      </div>

      {/* Perfect glow effect */}
      {isPerfect && (
        <div className="absolute inset-0 rounded-[2.5rem] ring-2 ring-amber-500/40 pointer-events-none" />
      )}

      <div className="relative z-10 text-center space-y-6">
        {/* Icon */}
        <div className={cn(
          "inline-flex p-4 rounded-full",
          isPerfect ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-500",
        )}>
          {isPerfect ? <Star className="h-10 w-10 fill-amber-400" /> : <CheckCircle2 className="h-10 w-10" />}
        </div>

        {/* Score */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2">
            Điểm số của bạn
          </h3>
          <div className={cn(
            "text-6xl font-black",
            isPerfect ? "text-amber-400" : "text-white",
          )}>
            {data.score?.toFixed(0) ?? 0}
          </div>
          {isPerfect && (
            <p className="text-amber-400 text-xs font-black uppercase tracking-widest mt-2 animate-pulse">
              ✨ Hoàn hảo tuyệt đối!
            </p>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-emerald-400 font-black text-lg">{data.correctCount ?? 0}</div>
            <div className="text-[9px] uppercase text-zinc-500 font-bold tracking-widest">Đúng</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-rose-400 font-black text-lg">{data.incorrectCount ?? 0}</div>
            <div className="text-[9px] uppercase text-zinc-500 font-bold tracking-widest">Sai</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-zinc-400 font-black text-lg">{data.skippedCount ?? 0}</div>
            <div className="text-[9px] uppercase text-zinc-500 font-bold tracking-widest">Bỏ qua</div>
          </div>
        </div>

        {/* answeredAccuracy & isSubmissionComplete */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {data.answeredAccuracy !== undefined && (
            <div className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-2">
              <span className="text-orange-400 font-black text-xs">
                {data.answeredAccuracy?.toFixed(0)}%
              </span>
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                Chính xác (phần đã điền)
              </span>
            </div>
          )}

          {!isComplete && (
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-amber-400 text-[10px] uppercase font-bold tracking-widest">
                Còn {(data.totalBlanks ?? 0) - (data.answeredBlanks ?? 0)} ô chưa điền
              </span>
            </div>
          )}
          {isComplete && !isPerfect && (
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest">
                Đã điền đủ toàn bộ
              </span>
            </div>
          )}
        </div>

        {/* Results list */}
        {data.results && data.results.length > 0 && (
          <div className="mt-4 grid gap-3 text-left max-h-72 overflow-y-auto pr-2 custom-scrollbar">
            {data.results.map((result: any, idx: number) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border",
                  result.isCorrect
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-rose-500/10 border-rose-500/20",
                )}
              >
                <div className="flex items-center gap-3">
                  {result.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
                  )}
                  <span className="font-bold text-white">
                    {result.userInput || "___"}
                  </span>
                </div>
                {!result.isCorrect && result.correctAnswer && (
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2 py-1 rounded-md">
                    Đáp án: {result.correctAnswer}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 justify-center pt-6">
          <Button
            onClick={onRetry}
            variant="outline"
            className="h-12 px-8 rounded-xl border-white/10 hover:bg-white/5 text-white font-bold bg-transparent"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Làm lại
          </Button>
          <Button
            asChild
            className="h-12 px-8 rounded-xl bg-white text-black hover:bg-gray-200 font-black uppercase text-[10px] tracking-widest"
          >
            <Link href="/dictation">Bài học khác</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
