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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { lessons } from "@/lib/data/lessons";

type LessonLevel = "beginner" | "intermediate" | "advanced";

const levelConfig = {
  beginner: {
    label: "Sơ cấp",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  intermediate: {
    label: "Trung cấp",
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
  advanced: {
    label: "Nâng cao",
    color: "text-rose-600 bg-rose-50 border-rose-100",
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
    <div className="min-h-screen bg-card/50 font-mono pb-20">
      <main className="container mx-auto px-4 pt-12 max-w-7xl">
        {/* HEADER SECTION */}
        <div className="relative mb-12 flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-bold text-orange-600"
          >
            <GraduationCap className="h-4 w-4" />
            Luyện tập mỗi ngày
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Thư Viện Bài Học
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl">
            Tăng khả năng nghe và vốn từ vựng thông qua phương pháp chép chính
            tả trực quan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR FILTERS (Sticky) */}
          <aside className="lg:col-span-3 space-y-6 sticky top-24">
            <Card className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem]">
              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
                    <Search className="h-4 w-4 mr-2" />
                    Tìm kiếm
                  </h4>
                  <div className="relative">
                    <Input
                      placeholder="Tên bài học..."
                      className="pl-10 rounded-xl border-slate-100 bg-slate-50 focus-visible:ring-orange-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
                    <Filter className="h-4 w-4 mr-2" />
                    Cấp độ
                  </h4>
                  <div className="flex flex-col gap-2">
                    {["Tất cả", "Sơ cấp", "Trung cấp", "Nâng cao"].map(
                      (level) => (
                        <button
                          key={level}
                          onClick={() => setFilter(level)}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            filter === level
                              ? "bg-slate-900 text-white shadow-lg"
                              : "text-slate-500 hover:bg-slate-100"
                          }`}
                        >
                          {level}
                          {filter === level && (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* QUICK STATS */}
            <Card className="p-6 border-none bg-gradient-to-br from-orange-500 to-rose-600 text-white rounded-[2rem] shadow-xl shadow-orange-500/20">
              <h4 className="font-bold mb-2">Tiến độ tuần</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold opacity-80">
                  <span>5/12 Bài tập</span>
                  <span>42%</span>
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "42%" }}
                    className="h-full bg-white"
                  />
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full font-bold rounded-xl text-orange-600"
                  asChild
                >
                  <Link href="/dashboard">Xem chi tiết</Link>
                </Button>
              </div>
            </Card>
          </aside>

          {/* MAIN LESSONS GRID */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLessons.map((lesson, index) => {
                  const level = lesson.level as LessonLevel;
                  return (
                    <motion.div
                      key={lesson.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={`/dictation/${lesson.id}`} className="group">
                        <Card className="h-full p-6 border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:-translate-y-2">
                          <div className="flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                              <div className="p-3 rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                <BookOpen className="h-6 w-6" />
                              </div>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "rounded-full px-3 py-1 font-bold uppercase text-[10px]",
                                  levelConfig[level].color
                                )}
                              >
                                {levelConfig[level].label}
                              </Badge>
                            </div>

                            <div className="space-y-2 mb-6 flex-1">
                              <h4 className="text-xl font-black text-slate-800 line-clamp-1 group-hover:text-orange-600 transition-colors">
                                {lesson.title}
                              </h4>
                              <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                {lesson.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                  <Clock className="h-4 w-4" />
                                  <span>{lesson.duration}s</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                  <Star className="h-4 w-4 fill-amber-400 text-amber-400 border-none" />
                                  <span>4.9</span>
                                </div>
                              </div>
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 opacity-0 translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                                <Play className="h-4 w-4 fill-current" />
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>

            {/* EMPTY STATE */}
            {filteredLessons.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] bg-slate-50/50 border-2 border-dashed border-slate-200">
                <Search className="h-12 w-12 text-slate-300 mb-4" />
                <p className="text-slate-500 font-bold">
                  Không tìm thấy bài học phù hợp
                </p>
                <button
                  onClick={() => {
                    setFilter("Tất cả");
                    setSearchQuery("");
                  }}
                  className="mt-2 text-sm font-bold text-orange-600 hover:underline"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
