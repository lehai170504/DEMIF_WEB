"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChevronRight,
  Search,
  Mic2,
  Star,
  Loader2,
  Lock,
  Tag,
  Layers,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useUserLessons } from "@/hooks/use-lesson";
import { useMySubscription } from "@/hooks/use-subscription";
import { cn } from "@/lib/utils";

export default function ShadowingPage() {
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: mySubscription } = useMySubscription();
  const hasPremiumAccess = mySubscription?.status === "Active";

  // Debounce search 0.5s
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // GỌI API: Cố định type là "Shadowing"
  const { data, isLoading, error } = useUserLessons({
    page,
    pageSize: 10,
    level: level || undefined,
    type: "Shadowing", // Chỉ lấy bài Shadowing từ Server
    category: category || undefined,
  });

  // Reset trang khi thay đổi bộ lọc
  useEffect(() => {
    setPage(1);
  }, [level, category, debouncedSearch]);

  // Filter thêm ở client để đảm bảo tính an toàn dữ liệu hiển thị và Search
  const displayItems = useMemo(() => {
    return (data?.items ?? []).filter(
      (item) =>
        (item.lessonType === "Shadowing" || item.lessonType === "1") &&
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [data?.items, debouncedSearch]);

  const getLevelInfo = (lvl: string) => {
    const currentLvl = lvl === "0" ? "Beginner" : lvl;
    const map: Record<string, { label: string; color: string }> = {
      Beginner: {
        label: "Beginner",
        color:
          "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
      },
      Intermediate: {
        label: "Intermediate",
        color:
          "text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
      },
      Advanced: {
        label: "Advanced",
        color:
          "text-indigo-600 bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20",
      },
      Expert: {
        label: "Expert",
        color:
          "text-purple-600 bg-purple-100 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
      },
    };
    return map[currentLvl] || map.Beginner;
  };

  return (
    <div className="w-full font-mono pb-20 selection:bg-blue-500/30">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* --- HEADER --- */}
        <div className="relative mb-16 flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-xs font-bold text-blue-500 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.1)]"
          >
            <Mic2 className="h-4 w-4" /> Nâng tầm phát âm
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
            Thư Viện{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 animate-gradient-x">
              Shadowing
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* --- SIDEBAR FILTERS --- */}
          <aside className="lg:col-span-3 space-y-6 sticky top-28">
            <div className="p-7 rounded-[2rem] bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 shadow-2xl space-y-10">
              {/* Search */}
              <div>
                <h4 className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4">
                  <Search className="h-3.5 w-3.5 mr-2" /> Tìm kiếm bài Shadowing
                </h4>
                <div className="relative group">
                  <Input
                    placeholder="Nhập tên bài học..."
                    className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/10 h-12 focus-visible:ring-blue-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <h4 className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4">
                  <Layers className="h-3.5 w-3.5 mr-2" /> Trình độ
                </h4>
                <div className="flex flex-col gap-2">
                  {[
                    { val: "", label: "Tất cả trình độ" },
                    { val: "Beginner", label: "Beginner" },
                    { val: "Intermediate", label: "Intermediate" },
                    { val: "Advanced", label: "Advanced" },
                    { val: "Expert", label: "Expert" },
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setLevel(item.val)}
                      className={cn(
                        "text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border flex justify-between items-center",
                        level === item.val
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30"
                          : "hover:bg-blue-500/5 dark:hover:bg-white/5 text-gray-600 dark:text-zinc-400 border-transparent hover:text-blue-500",
                      )}
                    >
                      {item.label}
                      {level === item.val && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4">
                  <Tag className="h-3.5 w-3.5 mr-2" /> Chủ đề bài nói
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Tất cả", val: "" },
                    { label: "Hội thoại", val: "conversation" },
                    { label: "Hằng ngày", val: "daily" },
                    { label: "Học thuật", val: "academic" },
                    { label: "Giáo dục", val: "education" },
                    { label: "Công nghệ", val: "Technology" },
                  ].map((cat) => (
                    <button
                      key={cat.val}
                      onClick={() => setCategory(cat.val)}
                      className={cn(
                        "px-3 py-2 rounded-lg text-[10px] font-bold uppercase border transition-all",
                        category === cat.val
                          ? "bg-blue-600 text-white border-transparent shadow-md"
                          : "border-gray-200 dark:border-white/10 text-gray-500 hover:border-blue-500 hover:text-blue-500",
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* --- LESSONS GRID --- */}
          <div className="lg:col-span-9 space-y-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-6">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">
                  Đang tải phòng luyện nói...
                </p>
              </div>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayItems.map((lesson, index) => {
                      const levelInfo = getLevelInfo(lesson.level);
                      const isLocked =
                        lesson.isPremiumOnly && !hasPremiumAccess;

                      return (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          layout
                        >
                          <Link
                            href={
                              isLocked ? "/upgrade" : `/shadowing/${lesson.id}`
                            }
                            className="group block h-full"
                          >
                            <div
                              className={cn(
                                "relative h-full flex flex-col p-8 rounded-[2.5rem] bg-white dark:bg-[#111113] border transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2",
                                isLocked
                                  ? "border-gray-200 dark:border-white/5"
                                  : "border-gray-100 dark:border-white/5 hover:border-blue-500/50",
                              )}
                            >
                              {isLocked && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm">
                                  <div className="bg-white dark:bg-zinc-900 px-6 py-4 rounded-[2rem] flex items-center gap-4 shadow-2xl border border-blue-500/30 scale-110">
                                    <div className="p-2 bg-blue-500 rounded-full text-white">
                                      <Lock className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[12px] font-black uppercase tracking-widest text-gray-900 dark:text-white">
                                        Premium Only
                                      </span>
                                      <span className="text-[9px] font-bold text-blue-500">
                                        Mở khóa để luyện phát âm
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-white/5 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-blue-500/40">
                                  <Mic2 className="h-7 w-7" />
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <Badge
                                    className={cn(
                                      "px-4 py-1.5 text-[10px] font-black border uppercase rounded-full shadow-sm",
                                      levelInfo.color,
                                    )}
                                  >
                                    {levelInfo.label}
                                  </Badge>
                                  {lesson.isPremiumOnly && (
                                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none text-[9px] font-black px-3 py-1 rounded-lg">
                                      PRO
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="flex-1 space-y-4 mb-8 relative z-10">
                                <h4 className="text-xl font-black line-clamp-1 group-hover:text-blue-600 transition-colors leading-tight text-gray-900 dark:text-white">
                                  {lesson.title}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-medium">
                                  {lesson.description}
                                </p>
                              </div>

                              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5 relative z-10">
                                <div className="flex items-center gap-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                  <span className="flex items-center gap-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                    <Clock className="h-4 w-4 text-blue-400" />
                                    {Math.floor(lesson.durationSeconds / 60)}m
                                  </span>
                                  <span className="flex items-center gap-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                    {lesson.avgScore.toFixed(0)}
                                  </span>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-blue-500/10 dark:bg-white/5 flex items-center justify-center opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 group-hover:bg-blue-600 text-white shadow-xl shadow-blue-500/30">
                                  <PlayCircle className="h-6 w-6 fill-current" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </AnimatePresence>

                {/* --- PAGINATION --- */}
                {data && data.totalPages > 1 && (
                  <div className="mt-20 flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-2xl w-12 h-12 border-gray-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-500"
                    >
                      <ChevronRight className="rotate-180 h-5 w-5" />
                    </Button>
                    <div className="flex gap-2">
                      {[...Array(data.totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={page === i + 1 ? "default" : "outline"}
                          onClick={() => setPage(i + 1)}
                          className={cn(
                            "w-12 h-12 rounded-2xl font-black text-sm transition-all",
                            page === i + 1
                              ? "bg-blue-600 hover:bg-blue-700 border-none shadow-lg shadow-blue-500/40 text-white scale-110"
                              : "border-gray-200 dark:border-white/10 hover:border-blue-500",
                          )}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setPage((p) => Math.min(data.totalPages, p + 1))
                      }
                      disabled={page === data.totalPages}
                      className="rounded-2xl w-12 h-12 border-gray-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-500"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
