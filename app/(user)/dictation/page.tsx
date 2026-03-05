"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  BookOpen,
  ChevronRight,
  Filter,
  Search,
  Play,
  Star,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { lessons } from "@/lib/data/lessons";
import { cn } from "@/lib/utils";

type LessonLevel = "beginner" | "intermediate" | "advanced";

const levelConfig = {
  beginner: {
    label: "Sơ cấp",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  intermediate: {
    label: "Trung cấp",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  advanced: {
    label: "Nâng cao",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
};

export default function DictationPage() {
  const [filter, setFilter] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLessons = lessons.filter((lesson) => {
    const matchesFilter =
      filter === "Tất cả" ||
      (filter === "Sơ cấp" && lesson.level === "beginner") ||
      (filter === "Trung cấp" && lesson.level === "intermediate") ||
      (filter === "Nâng cao" && lesson.level === "advanced");

    const matchesSearch = lesson.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full font-mono pb-20">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* --- HEADER SECTION --- */}
        <div className="relative mb-16 flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-bold text-orange-400 uppercase tracking-widest"
          >
            <GraduationCap className="h-4 w-4" />
            Luyện tập mỗi ngày
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
              Thư Viện{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]">
                Bài Học
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400">
              Tăng khả năng nghe và vốn từ vựng thông qua phương pháp chép chính
              tả trực quan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* --- SIDEBAR FILTERS (Sticky) --- */}
          <aside className="lg:col-span-3 space-y-8 sticky top-28">
            {/* Filter Panel */}
            <div className="p-6 rounded-[1.5rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 shadow-xl">
              <div className="space-y-8">
                {/* Search */}
                <div>
                  <h4 className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500 mb-4">
                    <Search className="h-3 w-3 mr-2" />
                    Tìm kiếm
                  </h4>
                  <div className="relative group">
                    <Input
                      placeholder="Tên bài học..."
                      className="pl-10 h-11 rounded-xl border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-zinc-200 placeholder:text-gray-500 dark:placeholder:text-zinc-600 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all group-hover:bg-gray-100 dark:group-hover:bg-white/10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors" />
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h4 className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500 mb-4">
                    <Filter className="h-3 w-3 mr-2" />
                    Cấp độ
                  </h4>
                  <div className="flex flex-col gap-2">
                    {["Tất cả", "Sơ cấp", "Trung cấp", "Nâng cao"].map(
                      (level) => (
                        <button
                          key={level}
                          onClick={() => setFilter(level)}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 border",
                            filter === level
                              ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20"
                              : "bg-transparent text-gray-600 dark:text-zinc-400 border-transparent hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-zinc-200",
                          )}
                        >
                          {level}
                          {filter === level && (
                            <motion.div layoutId="active-dot">
                              <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            </motion.div>
                          )}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="relative overflow-hidden p-6 rounded-[1.5rem] bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] shadow-2xl shadow-orange-500/20 group">
              {/* Decorative Pattern */}
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:20px_20px] opacity-10 mix-blend-overlay" />
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-orange-100">
                  <Sparkles className="h-4 w-4" />
                  <h4 className="font-black text-xs uppercase tracking-widest">
                    Tiến độ tuần
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>5/12 Bài tập</span>
                    <span>42%</span>
                  </div>
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "42%" }}
                      className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-xs uppercase tracking-widest transition-all"
                    asChild
                  >
                    <Link href="/user/dashboard">Xem chi tiết</Link>
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
                        href={`/dictation/${lesson.id}`}
                        className="group block h-full"
                      >
                        <div className="relative h-full flex flex-col p-6 rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/5 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-[#202023] hover:border-orange-500/30 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                          {/* Hover Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Top Section */}
                          <div className="relative z-10 flex items-start justify-between mb-6">
                            <div className="p-3 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-orange-500/40">
                              <BookOpen className="h-6 w-6" />
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider backdrop-blur-md",
                                levelConfig[level].color,
                              )}
                            >
                              {levelConfig[level].label}
                            </Badge>
                          </div>

                          {/* Content */}
                          <div className="relative z-10 space-y-3 mb-6 flex-1">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                              {lesson.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-zinc-500 line-clamp-2 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-zinc-400 transition-colors">
                              {lesson.description}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/5">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-zinc-400">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{lesson.duration}s</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-zinc-400">
                                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                                <span className="text-gray-900 dark:text-white">4.9</span>
                              </div>
                            </div>

                            {/* Play Button Icon */}
                            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-hover:bg-orange-500">
                              <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
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
                className="flex flex-col items-center justify-center py-32 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10"
              >
                <div className="h-16 w-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-gray-400 dark:text-zinc-500" />
                </div>
                <p className="text-gray-900 dark:text-zinc-300 font-bold text-lg mb-2">
                  Không tìm thấy bài học phù hợp
                </p>
                <p className="text-gray-600 dark:text-zinc-500 text-sm mb-6">
                  Thử thay đổi từ khóa hoặc bộ lọc xem sao nhé!
                </p>
                <Button
                  onClick={() => {
                    setFilter("Tất cả");
                    setSearchQuery("");
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-10 px-6"
                >
                  Xóa bộ lọc
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
