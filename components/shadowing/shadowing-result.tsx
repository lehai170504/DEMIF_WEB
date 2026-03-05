"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ShadowingResultProps {
  score: number;
  details: { label: string; value: number; color: string }[];
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-[3rem] p-10 text-center relative overflow-hidden shadow-2xl"
      >
        {/* Confetti / Glow Effect */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full" />

        <div className="relative z-10">
          <div className="inline-flex p-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full shadow-lg shadow-orange-500/30 mb-8">
            <Trophy className="h-12 w-12 text-white fill-white" />
          </div>

          <h2 className="text-4xl font-black mb-2 tracking-tight text-gray-900 dark:text-white">
            Hoàn thành xuất sắc!
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 mb-10">
            Bạn đã hoàn thành bài tập Shadowing.
          </p>

          <div className="flex justify-center items-end gap-2 mb-12">
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 dark:from-white to-gray-500 dark:to-zinc-400">
              {score}
            </span>
            <span className="text-xl font-bold text-gray-500 dark:text-zinc-500 mb-2">%</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {details.map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-4"
              >
                <div className={cn("text-2xl font-black mb-1", item.color)}>
                  {item.value}%
                </div>
                <div className="text-[10px] font-bold uppercase text-gray-500 dark:text-zinc-500 tracking-widest">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={onRestart}
              variant="outline"
              className="h-12 px-8 rounded-xl border-gray-200 dark:border-white/10 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Luyện tập lại
            </Button>
            <Button
              asChild
              className="h-12 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold"
            >
              <Link href="/user/shadowing">Bài tiếp theo</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
