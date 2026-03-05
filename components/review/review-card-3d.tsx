"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ReviewCard3DProps {
  item: any; // Type VocabularyItem
  index: number;
}

export function ReviewCard3D({ item, index }: ReviewCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="perspective-1000 h-72 w-full cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative h-full w-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* MẶT TRƯỚC */}
        <Card className="absolute inset-0 backface-hidden rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] p-8 flex flex-col justify-between shadow-xl group-hover:shadow-2xl group-hover:shadow-orange-500/10 group-hover:border-orange-500/30 transition-all">
          <div className="flex justify-between items-start">
            <Badge
              className={cn(
                "rounded-lg px-2.5 py-1 font-bold border text-[9px] uppercase tracking-wider pointer-events-none",
                item.difficulty === "easy"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : item.difficulty === "medium"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/20",
              )}
            >
              {item.difficulty}
            </Badge>
            {new Date(item.nextReview) <= new Date() && (
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            )}
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight break-words">
              {item.word}
            </h3>
            <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
              Click để lật
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[9px] font-bold text-gray-500 dark:text-zinc-600 uppercase">
              <span>Mastery</span>
              <span className="text-gray-700 dark:text-zinc-400">{item.mastery}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                style={{ width: `${item.mastery}%` }}
              />
            </div>
          </div>
        </Card>

        {/* MẶT SAU */}
        <Card className="absolute inset-0 rotate-y-180 backface-hidden rounded-[2rem] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-zinc-900 p-8 text-gray-900 dark:text-white flex flex-col justify-between shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-4 text-center mt-4">
            <div>
              <p className="text-orange-500 font-black text-xs uppercase tracking-widest mb-1">
                Ý nghĩa
              </p>
              <h3 className="text-2xl font-bold leading-tight">
                {item.translation}
              </h3>
            </div>

            <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-3 border border-gray-200 dark:border-white/5">
              <p className="text-gray-600 dark:text-zinc-400 text-xs italic leading-relaxed">
                "{item.example}"
              </p>
            </div>
          </div>

          <div className="relative z-10 flex justify-center pb-2">
            <span className="text-[10px] text-gray-600 dark:text-zinc-500 font-bold uppercase tracking-widest border border-gray-200 dark:border-white/5 px-3 py-1 rounded-full bg-gray-100 dark:bg-black/20">
              Đã ôn {item.reviewCount} lần
            </span>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
