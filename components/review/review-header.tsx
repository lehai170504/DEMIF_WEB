"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  BookOpen,
  TrendingUp,
  Zap,
  ChevronRight,
  Plus,
  BookMarked,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddVocabularyForm } from "@/components/vocabulary/add-vocabulary-form";

interface ReviewHeaderProps {
  dueCount: number;
  totalCount: number;
  mastery: number;
  learningCount: number;
}

export function ReviewHeader({
  dueCount,
  totalCount,
  mastery,
  learningCount,
}: ReviewHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500 mb-1">
            <Sparkles className="h-4 w-4 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Brain Training System
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
            Trung tâm <span className="text-orange-500">Ôn tập</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold rounded-2xl h-12 px-6 uppercase tracking-widest text-[10px] border border-gray-200 dark:border-white/10 transition-all active:scale-95">
                <Plus className="w-4 h-4 mr-2 text-neutral-800" /> Lưu từ mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] bg-white dark:bg-[#0D0D0D] border-none rounded-[2rem] p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-black uppercase tracking-tight dark:text-white">
                  Thêm <span className="text-orange-500">Định danh</span>
                </DialogTitle>
              </DialogHeader>
              <AddVocabularyForm onSuccess={() => setIsModalOpen(false)} />
            </DialogContent>
          </Dialog>

          <Button
            asChild
            className="bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl h-12 px-6 uppercase tracking-widest text-[10px] shadow-lg shadow-orange-500/20 active:scale-95 transition-all group"
          >
            <Link href="/review/session">
              Ôn tập ngay{" "}
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Clock className="w-4 h-4" />}
          value={dueCount}
          label="Cần ôn"
          color="text-orange-500"
          highlight={dueCount > 0}
        />
        <StatCard
          icon={<BookMarked className="w-4 h-4" />}
          value={learningCount}
          label="Đang học"
          color="text-blue-500"
        />
        <StatCard
          icon={<LayoutGrid className="w-4 h-4" />}
          value={totalCount}
          label="Tổng kho"
          color="text-zinc-500"
        />
        <StatCard
          icon={<TrendingUp className="w-4 h-4" />}
          value={`${mastery}%`}
          label="Thành thạo"
          color="text-emerald-500"
        />
      </div>

      {dueCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-orange-500/5 border border-orange-500/20 p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20">
              <Zap className="h-5 w-5 fill-white text-white" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase text-orange-500 tracking-widest">
                Ready to Recall
              </p>
              <p className="text-xs text-zinc-500 font-medium">
                Bạn đang có{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {dueCount} từ vựng
                </span>{" "}
                đến kỳ ôn tập định kỳ.
              </p>
            </div>
          </div>
          <Link
            href="/review/session"
            className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:underline"
          >
            Bắt đầu lượt học →
          </Link>
        </motion.div>
      )}
    </div>
  );
}

function StatCard({ icon, value, label, color, highlight = false }: any) {
  return (
    <Card
      className={cn(
        "p-4 rounded-2xl border transition-all duration-300 bg-white dark:bg-black/20",
        highlight
          ? "border-orange-500/30 bg-orange-50/50 dark:bg-orange-500/5 shadow-sm"
          : "border-gray-100 dark:border-white/5 shadow-none",
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg bg-gray-50 dark:bg-white/5", color)}>
          {icon}
        </div>
        <div>
          <div className="text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
            {value}
          </div>
          <div className="text-[8px] font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-[0.1em] mt-1">
            {label}
          </div>
        </div>
      </div>
    </Card>
  );
}
