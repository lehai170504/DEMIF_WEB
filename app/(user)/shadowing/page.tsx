"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChevronRight,
  Filter,
  Search,
  Mic2,
  Star,
  TrendingUp,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { lessons } from "@/lib/data/lessons";
import { cn } from "@/lib/utils";

type LessonLevel = "beginner" | "intermediate" | "advanced";

const levelStyles = {
  beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  advanced: "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

export default function ShadowingPage() {
  const [activeLevel, setActiveLevel] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLessons = lessons.filter((lesson) => {
    const matchesLevel =
      activeLevel === "Tất cả" ||
      (activeLevel === "Sơ cấp" && lesson.level === "beginner") ||
      (activeLevel === "Trung cấp" && lesson.level === "intermediate") ||
      (activeLevel === "Nâng cao" && lesson.level === "advanced");
    const matchesSearch = lesson.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="w-full font-mono pb-20">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* --- HERO HEADER --- */}
        <div className="mb-16 flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-xs font-bold text-blue-400 uppercase tracking-widest"
          >
            <Mic2 className="h-4 w-4" />
            Nâng tầm phát âm
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Luyện Tập{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Shadowing
              </span>
            </h2>
            <p className="text-lg text-zinc-400 font-medium">
              Kỹ thuật nói đuổi giúp bạn làm chủ ngữ điệu và tốc độ nói như
              người bản xứ.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* --- SIDEBAR: CONTROLS & PROGRESS --- */}
          <aside className="lg:col-span-3 space-y-8 sticky top-28">
            {/* Filter Panel */}
            <div className="p-6 rounded-[1.5rem] bg-[#18181b] border border-white/10 shadow-xl">
              <div className="space-y-8">
                {/* Search */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 block">
                    <Search className="inline-block h-3 w-3 mr-2 mb-0.5" />
                    Tìm kiếm bài tập
                  </label>
                  <div className="relative group">
                    <Input
                      placeholder="VD: Daily life..."
                      className="pl-10 h-11 rounded-xl border-white/10 bg-white/5 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all group-hover:bg-white/10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 block">
                    <Filter className="inline-block h-3 w-3 mr-2 mb-0.5" />
                    Cấp độ học thuật
                  </label>
                  <div className="flex flex-col gap-2">
                    {["Tất cả", "Sơ cấp", "Trung cấp", "Nâng cao"].map(
                      (lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setActiveLevel(lvl)}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 border",
                            activeLevel === lvl
                              ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                              : "bg-transparent text-zinc-400 border-transparent hover:bg-white/5 hover:text-zinc-200",
                          )}
                        >
                          {lvl}
                          {activeLevel === lvl && (
                            <motion.div layoutId="active-dot-shadow">
                              <ChevronRight className="h-4 w-4" />
                            </motion.div>
                          )}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Stats Card */}
            <div className="relative overflow-hidden p-6 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 shadow-2xl shadow-blue-500/20 group">
              {/* Decor */}
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:20px_20px] opacity-10 mix-blend-overlay" />
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-blue-100">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-widest">
                    Tiến độ cá nhân
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold text-white/90">
                    <span>Hoàn thành 3/8 bài</span>
                    <span>37.5%</span>
                  </div>
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "37.5%" }}
                      className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                  </div>
                  <Button
                    variant="link"
                    className="p-0 text-white/80 hover:text-white font-bold h-auto text-xs w-full justify-start no-underline hover:underline decoration-white/50"
                    asChild
                  >
                    <Link href="/user/dashboard">Xem báo cáo chi tiết →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* --- MAIN LESSONS GRID --- */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLessons.map((lesson, index) => {
                  const level = lesson.level as LessonLevel;
                  return (
                    <motion.div
                      key={lesson.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/shadowing/${lesson.id}`}
                        className="group block h-full"
                      >
                        <div className="relative h-full flex flex-col p-6 rounded-[2rem] bg-[#18181b] border border-white/5 transition-all duration-300 hover:bg-[#202023] hover:border-blue-500/30 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                          {/* Hover Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="relative z-10 flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-blue-500/40">
                                <PlayCircle className="h-6 w-6 fill-current" />
                              </div>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider backdrop-blur-md",
                                  levelStyles[level],
                                )}
                              >
                                {level === "beginner"
                                  ? "Sơ cấp"
                                  : level === "intermediate"
                                    ? "Trung cấp"
                                    : "Nâng cao"}
                              </Badge>
                            </div>

                            {/* Content */}
                            <div className="space-y-3 flex-1 mb-6">
                              <h4 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                                {lesson.title}
                              </h4>
                              <p className="text-sm text-zinc-500 font-medium line-clamp-2 leading-relaxed group-hover:text-zinc-400 transition-colors">
                                {lesson.description}
                              </p>
                            </div>

                            {/* Footer */}
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{lesson.duration}s</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                                  <span className="text-white">4.8</span>
                                </div>
                              </div>

                              {/* Action Icon */}
                              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-hover:bg-blue-600">
                                <ChevronRight className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>

            {/* EMPTY STATE */}
            {filteredLessons.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5"
              >
                <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-zinc-500" />
                </div>
                <h3 className="text-lg font-bold text-zinc-300 mb-2">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-sm text-zinc-500 mb-6 text-center max-w-xs">
                  Thử thay đổi từ khóa hoặc bộ lọc để tìm kiếm bài tập khác bạn
                  nhé!
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveLevel("Tất cả");
                    setSearchQuery("");
                  }}
                  className="rounded-xl font-bold border-white/10 bg-transparent text-white hover:bg-white/10"
                >
                  Làm mới bộ lọc
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
