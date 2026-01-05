"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  TrendingUp,
  Zap,
  RotateCw,
  ChevronRight,
  BarChart3,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { vocabularyItems } from "@/lib/data/vocabulary";
import { cn } from "@/lib/utils";

export default function ReviewPage() {
  const [filter, setFilter] = useState<"all" | "due" | "mastered" | "learning">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const dueForReview = vocabularyItems.filter(
    (item) => new Date(item.nextReview) <= new Date()
  );

  const totalMastery =
    vocabularyItems.length > 0
      ? Math.round(
          vocabularyItems.reduce((sum, item) => sum + item.mastery, 0) /
            vocabularyItems.length
        )
      : 0;

  const filteredItems = vocabularyItems.filter((item) => {
    const matchesSearch = item.word
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    switch (filter) {
      case "due":
        return new Date(item.nextReview) <= new Date();
      case "mastered":
        return item.mastery >= 80;
      case "learning":
        return item.mastery < 80;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-card/50 pb-20 font-mono">
      <main className="container mx-auto px-4 pt-12 max-w-7xl">
        {/* 1. HERO SECTION & STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Trung tâm Ôn tập
              </h1>
              <p className="text-slate-500 font-medium">
                Sử dụng phương pháp lặp lại ngắt quãng (SRS) để tối ưu hóa trí
                nhớ của bạn.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                icon={<Clock className="text-orange-500" />}
                value={dueForReview.length}
                label="Cần ôn hôm nay"
                highlight
              />
              <StatCard
                icon={<BookOpen className="text-blue-500" />}
                value={vocabularyItems.length}
                label="Tổng kho từ vựng"
              />
              <StatCard
                icon={<TrendingUp className="text-emerald-500" />}
                value={`${totalMastery}%`}
                label="Độ thành thạo"
              />
            </div>
          </div>

          {/* CTA Card đặc biệt */}
          <div className="lg:col-span-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="h-full relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-200"
            >
              <div className="relative z-10 space-y-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/50">
                  <Zap className="h-6 w-6 fill-current" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Bắt đầu ngay</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Bạn có {dueForReview.length} thử thách đang chờ. Hoàn thành
                    để duy trì chuỗi Streak!
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full h-12 rounded-xl bg-white text-slate-900 font-bold hover:bg-orange-500 hover:text-white transition-all"
                >
                  <Link href="/review/session">
                    Ôn tập ngay thôi <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
            </motion.div>
          </div>
        </div>

        {/* 2. FILTER & SEARCH BAR */}
        <div className="sticky top-4 z-30 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="Tất cả"
            />
            <FilterButton
              active={filter === "due"}
              onClick={() => setFilter("due")}
              label="Cần ôn"
              count={dueForReview.length}
            />
            <FilterButton
              active={filter === "learning"}
              onClick={() => setFilter("learning")}
              label="Đang học"
            />
            <FilterButton
              active={filter === "mastered"}
              onClick={() => setFilter("mastered")}
              label="Đã thuộc"
            />
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm từ vựng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full border-slate-100 bg-slate-50 pl-10 focus-visible:ring-orange-500"
            />
          </div>
        </div>

        {/* 3. VOCABULARY GRID */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <FlashCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
              <RotateCw className="h-10 w-10 text-slate-300" />
            </div>
            <p className="text-slate-500 font-bold">
              Không tìm thấy từ vựng nào
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

// Sub-components tinh chỉnh
function StatCard({ icon, value, label, highlight = false }: any) {
  return (
    <Card
      className={cn(
        "p-6 rounded-[2rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-lg",
        highlight ? "bg-orange-50 ring-1 ring-orange-100" : "bg-white"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900">{value}</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {label}
          </div>
        </div>
      </div>
    </Card>
  );
}

function FilterButton({ active, onClick, label, count }: any) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      onClick={onClick}
      className={cn(
        "rounded-full px-6 font-bold transition-all",
        active
          ? "bg-slate-900 text-white shadow-lg"
          : "text-slate-500 hover:bg-slate-100"
      )}
    >
      {label}
      {count !== undefined && (
        <span className="ml-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] text-white">
          {count}
        </span>
      )}
    </Button>
  );
}

function FlashCard({ item, index }: any) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="perspective-1000 h-64 w-full cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative h-full w-full transition-all duration-500 preserve-3d shadow-sm",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Mặt trước */}
        <Card className="absolute inset-0 backface-hidden rounded-[2rem] border-none bg-white p-8 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-orange-200/50 group-hover:shadow-2xl transition-all">
          <div className="flex justify-between items-start">
            <Badge
              className={cn(
                "rounded-full px-3 py-1 font-bold border-none",
                item.difficulty === "easy"
                  ? "bg-emerald-50 text-emerald-600"
                  : item.difficulty === "medium"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-rose-50 text-rose-600"
              )}
            >
              {item.difficulty.toUpperCase()}
            </Badge>
            {new Date(item.nextReview) <= new Date() && (
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            )}
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {item.word}
            </h3>
            <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">
              Nhấn để lật
            </p>
          </div>
          <div className="flex justify-center gap-1">
            <div className="h-1 w-8 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-orange-500"
                style={{ width: `${item.mastery}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Mặt sau */}
        <Card className="absolute inset-0 rotate-y-180 backface-hidden rounded-[2rem] border-none bg-slate-900 p-8 text-white flex flex-col justify-between shadow-2xl">
          <div className="space-y-2 text-center">
            <p className="text-orange-400 font-bold text-sm">Ý nghĩa</p>
            <h3 className="text-2xl font-bold">{item.translation}</h3>
            <p className="text-slate-400 text-sm italic leading-relaxed px-2 line-clamp-2">
              "{item.example}"
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-slate-500">
              <span>Độ thành thạo</span>
              <span>{item.mastery}%</span>
            </div>
            <Progress value={item.mastery} className="h-1.5 bg-white/10" />
            <div className="flex justify-center">
              <span className="text-[10px] text-slate-500 font-bold">
                Đã ôn tập {item.reviewCount} lần
              </span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
