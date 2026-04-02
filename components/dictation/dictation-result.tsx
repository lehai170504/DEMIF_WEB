import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DictationResultProps {
  data: any; // Thay bằng kiểu trả về từ useSubmitDictation của bạn
  onRetry: () => void;
}

export function DictationResult({ data, onRetry }: DictationResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-[2.5rem] bg-zinc-900 p-10 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Trophy className="w-32 h-32" />
      </div>

      <div className="relative z-10 text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2">
            Điểm số của bạn
          </h3>
          <div className="text-6xl font-black text-white">
            {data.score.toFixed(0)}
          </div>
        </div>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Chính xác {data.correctCount}/{data.totalBlanks} từ
        </p>

        <div className="mt-8 grid gap-3 text-left max-h-96 overflow-y-auto pr-2 custom-scrollbar">
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
