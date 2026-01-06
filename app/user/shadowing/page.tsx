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
  Mic2,
  Star,
  TrendingUp,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { lessons } from "@/lib/data/lessons";

type LessonLevel = "beginner" | "intermediate" | "advanced";

const levelStyles = {
  beginner: "text-emerald-600 bg-emerald-50 border-emerald-100",
  intermediate: "text-amber-600 bg-amber-50 border-amber-100",
  advanced: "text-rose-600 bg-rose-50 border-rose-100",
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
    <div className="min-h-screen bg-card/50 font-mono pb-20">
      <main className="container mx-auto px-4 pt-12 max-w-7xl">
        {/* SECTION: HERO HEADER */}
        <div className="mb-12 flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-sm font-bold text-orange-600"
          >
            <Mic2 className="h-4 w-4" />
            Nâng tầm phát âm
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Luyện Tập Shadowing
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl font-medium">
            Kỹ thuật nói đuổi giúp bạn làm chủ ngữ điệu và tốc độ nói như người
            bản xứ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* SIDEBAR: CONTROLS & PROGRESS */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Filter Card */}
              <Card className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem] bg-white">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                      Tìm kiếm bài tập
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="VD: Daily life..."
                        className="pl-10 rounded-xl border-slate-100 bg-slate-50 focus:ring-orange-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                      Cấp độ học thuật
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {["Tất cả", "Sơ cấp", "Trung cấp", "Nâng cao"].map(
                        (lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setActiveLevel(lvl)}
                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                              activeLevel === lvl
                                ? "bg-slate-900 text-white shadow-lg translate-x-1"
                                : "text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            {lvl}
                            {activeLevel === lvl && (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Personal Stats Card */}
              <Card className="p-6 border-none bg-orange-600 text-white rounded-[2rem] shadow-xl shadow-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold">Tiến độ cá nhân</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="opacity-80">Hoàn thành 3/8 bài</span>
                    <span>37.5%</span>
                  </div>
                  <Progress value={37.5} className="h-2 bg-white/20" />
                  <Button
                    variant="link"
                    className="p-0 text-white font-bold h-auto text-xs"
                    asChild
                  >
                    <Link href="/user/dashboard">Xem báo cáo chi tiết →</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </aside>

          {/* MAIN GRID: LESSON CARDS */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/user/shadowing/${lesson.id}`}
                      className="group block h-full"
                    >
                      <Card className="h-full relative overflow-hidden border-none bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group-hover:-translate-y-2">
                        {/* Trang trí nền card */}
                        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-slate-50 transition-transform group-hover:scale-150" />

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                              <PlayCircle className="h-6 w-6 fill-current" />
                            </div>
                            <Badge
                              className={`rounded-full border px-3 py-1 font-bold text-[10px] uppercase tracking-wider ${
                                levelStyles[lesson.level as LessonLevel]
                              }`}
                            >
                              {lesson.level === "beginner"
                                ? "Sơ cấp"
                                : lesson.level === "intermediate"
                                ? "Trung cấp"
                                : "Nâng cao"}
                            </Badge>
                          </div>

                          <div className="space-y-2 flex-1">
                            <h4 className="text-xl font-black text-slate-800 leading-tight group-hover:text-orange-600 transition-colors">
                              {lesson.title}
                            </h4>
                            <p className="text-sm text-slate-400 font-medium line-clamp-2">
                              {lesson.description}
                            </p>
                          </div>

                          <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{lesson.duration}s</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 border-none" />
                                <span>4.8</span>
                              </div>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {/* EMPTY STATE */}
            {filteredLessons.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50/50">
                <Search className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-600">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-sm text-slate-400 mb-6 text-center max-w-xs">
                  Thử thay đổi từ khóa hoặc bộ lọc để tìm kiếm bài tập khác bạn
                  nhé!
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveLevel("Tất cả");
                    setSearchQuery("");
                  }}
                  className="rounded-full font-bold"
                >
                  Làm mới bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
