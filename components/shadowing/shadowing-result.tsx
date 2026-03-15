"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ShadowingResultProps {
  score: number;
  details: { label: string; value: number | string; color: string }[];
  onRestart: () => void;
}

export function ShadowingResult({
  score,
  details,
  onRestart,
}: ShadowingResultProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/10 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl"
      >
        {/* Background Decorative Effects */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />

        <div className="relative z-10">
          <div className="inline-flex p-6 bg-blue-500 rounded-full shadow-2xl shadow-blue-500/40 mb-8 relative">
            <Trophy className="h-12 w-12 text-white fill-current" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 border-2 border-dashed border-blue-300/30 rounded-full"
            />
          </div>

          <h2 className="text-4xl font-black mb-2 tracking-tight text-gray-900 dark:text-white">
            Tuyệt vời!
          </h2>
          <p className="text-sm font-bold text-gray-500 dark:text-zinc-500 mb-12 uppercase tracking-widest">
            Bạn đã hoàn thành bài luyện nói Shadowing
          </p>

          <div className="flex flex-col items-center justify-center mb-12">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">
              Độ chính xác trung bình
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 dark:from-white to-gray-400 dark:to-zinc-600">
                {score}
              </span>
              <span className="text-2xl font-black text-gray-400">%</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-12">
            {details.map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-3xl p-5 transition-all hover:scale-105"
              >
                <div className={cn("text-2xl font-black mb-1", item.color)}>
                  {item.value}
                  {typeof item.value === "number" ? "%" : ""}
                </div>
                <div className="text-[9px] font-black uppercase text-gray-400 dark:text-zinc-500 tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onRestart}
              variant="outline"
              className="h-14 px-8 rounded-2xl border-gray-200 dark:border-white/10 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-white font-bold"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Luyện tập lại
            </Button>
            <Button
              asChild
              className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/30"
            >
              <Link href="/shadowing">
                Bài tiếp theo <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
