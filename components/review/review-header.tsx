"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  BookOpen,
  TrendingUp,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ReviewHeaderProps {
  dueCount: number;
  totalCount: number;
  mastery: number;
}

export function ReviewHeader({
  dueCount,
  totalCount,
  mastery,
}: ReviewHeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
      {/* Left Stats Column */}
      <div className="lg:col-span-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              Spaced Repetition System
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
            Trung tâm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              Ôn tập
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-zinc-400 font-medium max-w-2xl">
            Sử dụng phương pháp lặp lại ngắt quãng (SRS) để tối ưu hóa trí nhớ
            dài hạn của bạn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<Clock className="text-orange-500" />}
            value={dueCount}
            label="Cần ôn hôm nay"
            highlight
            delay={0.1}
          />
          <StatCard
            icon={<BookOpen className="text-blue-500" />}
            value={totalCount}
            label="Tổng kho từ vựng"
            delay={0.2}
          />
          <StatCard
            icon={<TrendingUp className="text-emerald-500" />}
            value={`${mastery}%`}
            label="Độ thành thạo"
            delay={0.3}
          />
        </div>
      </div>

      {/* Right CTA Column - 3D Floating Card */}
      <div className="lg:col-span-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-600 to-red-600 p-8 text-white shadow-2xl shadow-orange-500/20 group h-full flex flex-col justify-between"
        >
          {/* Decor */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:30px_30px] opacity-20 mix-blend-overlay" />
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/20 blur-3xl group-hover:scale-150 transition-transform duration-700" />

          <div className="relative z-10 space-y-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner border border-white/20">
              <Zap className="h-6 w-6 fill-white text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight">
                Bắt đầu ngay
              </h3>
              <p className="text-orange-100 text-sm font-medium leading-relaxed">
                Bạn có{" "}
                <span className="font-black text-white text-lg mx-1">
                  {dueCount}
                </span>{" "}
                từ vựng đang chờ. Hoàn thành ngay để duy trì chuỗi Streak!
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <Button
              asChild
              className="w-full h-14 rounded-2xl bg-white text-orange-600 font-black text-sm uppercase tracking-widest hover:bg-orange-50 hover:scale-[1.02] transition-all shadow-lg"
            >
              <Link href="/review/session">
                Ôn tập ngay <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, highlight = false, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <Card
        className={cn(
          "p-6 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-xl flex items-center gap-5 transition-all duration-300",
          highlight
            ? "bg-white dark:bg-[#18181b] shadow-orange-500/10 border-orange-500/20"
            : "bg-white dark:bg-[#18181b]",
        )}
      >
        <div
          className={cn(
            "h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner",
            highlight ? "bg-orange-50 dark:bg-orange-500/10" : "bg-gray-100 dark:bg-white/5",
          )}
        >
          {icon}
        </div>
        <div>
          <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {value}
          </div>
          <div className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest mt-1">
            {label}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
