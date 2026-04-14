"use client";

import { motion } from "framer-motion";
import { ChevronRight, History, BrainCircuit, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RecentVocab {
  id: string;
  word: string;
  meaning: string;
  topic?: string;
}

interface RecentVocabularyProps {
  vocabularies: RecentVocab[];
}

export function RecentVocabulary({ vocabularies }: RecentVocabularyProps) {
  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
          Vừa ôn tập
        </h3>
        <Link
          href="/review"
          className="group text-[10px] font-bold text-emerald-500 hover:text-emerald-400 transition-all flex items-center gap-1 uppercase tracking-widest"
        >
          Tất cả
          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-3">
        {vocabularies.map((vocab, index) => (
          <motion.div
            key={vocab.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={cn(
                "relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                "bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/5",
                "hover:bg-emerald-50 dark:hover:bg-[#202023] hover:border-emerald-500/30 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)] cursor-default group",
              )}
            >
              {/* Active Indicator Line */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon Box */}
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 group-hover:border-emerald-500/20 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/10 transition-all duration-300">
                <BrainCircuit className="h-5 w-5 text-slate-600 dark:text-zinc-400 group-hover:text-emerald-500 transition-colors" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-colors">
                    {vocab.topic || "Vocabulary"}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-zinc-200 truncate group-hover:text-emerald-600 dark:group-hover:text-white transition-colors uppercase">
                  {vocab.word}
                </h4>
              </div>

              {/* Meaning Area */}
              <div className="ml-auto flex items-center justify-end max-w-[120px] sm:max-w-[150px]">
                <p className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 truncate group-hover:text-emerald-500 transition-colors">
                  {vocab.meaning}
                </p>
                <div className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-6 transition-all duration-300 overflow-hidden flex items-center justify-end">
                  <Zap className="h-4 w-4 text-emerald-500 ml-2 shrink-0" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {vocabularies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 rounded-2xl border border-dashed border-white/10 bg-white/5">
            <History className="h-8 w-8 text-zinc-600 mb-2" />
            <p className="text-zinc-500 text-[11px] uppercase tracking-widest font-black">
              Chưa có từ vựng nào
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
