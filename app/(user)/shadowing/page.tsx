"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChevronRight,
  Search,
  Mic2,
  Loader2,
  Lock,
  CheckCircle2,
  Timer,
  CircleDashed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useUserLessons, useLessonHistory } from "@/hooks/use-lesson";
import { useMySubscription } from "@/hooks/use-subscription";
import { cn } from "@/lib/utils";

export default function ShadowingPage() {
  const [page, setPage] = useState(1);
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
    type: "Shadowing", // Chỉ lấy bài Shadowing từ Server
    category: category || undefined,
  });

  const { data: lessonHistoryData } = useLessonHistory({ pageSize: 1000 });
  const historyMap = useMemo(() => {
    const map = new Map<string, string>();
    lessonHistoryData?.items?.forEach(h => {
      map.set(h.lessonId, h.status);
    });
    return map;
  }, [lessonHistoryData]);

  // Reset trang khi thay đổi bộ lọc
  useEffect(() => {
    setPage(1);
  }, [category, debouncedSearch]);

  // Filter thêm ở client để đảm bảo tính an toàn dữ liệu hiển thị và Search
  const displayItems = useMemo(() => {
    return (data?.items ?? []).filter(
      (item) =>
        (item.lessonType === "Shadowing" || item.lessonType === "1") &&
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [data?.items, debouncedSearch]);

  const dynamicTags = useMemo(() => {
    if (!data?.items) return [];
    const tags = new Set<string>();
    data.items.forEach(i => {
      if (i.category) tags.add(i.category.toLowerCase());
    });
    return Array.from(tags).map(t => ({ val: t, label: t }));
  }, [data?.items]);

  return (
    <div className="w-full font-mono pb-20 selection:bg-orange-500/30">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* --- HEADER --- */}
        <div className="relative mb-16 flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-bold text-orange-500 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.1)]"
          >
            <Mic2 className="h-4 w-4" /> Nâng tầm phát âm
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
            Thư Viện{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 animate-gradient-x">
              Shadowing
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-8 items-start">
          <div className="w-full relative z-30">
            <div className="p-4 rounded-3xl bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 shadow-xl flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-96 flex-shrink-0 group">
                <Input
                  placeholder="Nhập tên bài học..."
                  className="rounded-xl bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/10 h-11 focus-visible:ring-orange-500 transition-all font-medium text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>

              <div className="flex-1 flex overflow-x-auto no-scrollbar items-center gap-2 px-1 w-full">
                <button
                  onClick={() => setCategory("")}
                  className={cn(
                    "px-4 py-2 rounded-lg text-[11px] font-bold uppercase transition-all flex-shrink-0 border",
                    category === ""
                      ? "bg-zinc-900 dark:bg-orange-500 text-white border-transparent shadow-md"
                      : "border-gray-200 dark:border-white/10 text-gray-500 hover:border-orange-500 hover:text-orange-500",
                  )}
                >
                  Tất cả
                </button>
                {dynamicTags.map((cat) => (
                  <button
                    key={cat.val}
                    onClick={() => setCategory(cat.val)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-[11px] font-bold uppercase transition-all flex-shrink-0 border",
                      category === cat.val
                        ? "bg-zinc-900 dark:bg-orange-500 text-white border-transparent shadow-md"
                        : "border-gray-200 dark:border-white/10 text-gray-500 hover:border-orange-500 hover:text-orange-500",
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full space-y-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-6">
                <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">
                  Đang tải phòng luyện nói...
                </p>
              </div>
            ) : (
              <>
                {displayItems.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-40 gap-6 text-center"
                  >
                    <div className="p-6 rounded-[2rem] bg-orange-500/5 border border-orange-500/10">
                      <Mic2 className="h-12 w-12 text-orange-400 opacity-50" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-black text-gray-700 dark:text-zinc-300 uppercase tracking-widest">
                        Chưa có bài học nào
                      </p>
                      <p className="text-sm text-gray-400 dark:text-zinc-500 font-medium">
                        {debouncedSearch
                          ? `Không tìm thấy kết quả cho "${debouncedSearch}"`
                          : "Thử thay đổi bộ lọc hoặc quay lại sau nhé!"}
                      </p>
                    </div>
                    {(category || debouncedSearch) && (
                      <button
                        onClick={() => {
                          setCategory("");
                          setSearchQuery("");
                        }}
                        className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border border-orange-500/30 text-orange-500 hover:bg-orange-500/10 transition-all"
                      >
                        Xóa bộ lọc
                      </button>
                    )}
                  </motion.div>
                )}

                <AnimatePresence mode="popLayout">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {displayItems.map((lesson, index) => {
                      const isLocked =
                        lesson.isPremiumOnly && !hasPremiumAccess;
                      
                      const thumbnail = lesson.thumbnailUrl || (lesson.videoId ? `https://i.ytimg.com/vi/${lesson.videoId}/hqdefault.jpg` : "/video-placeholder.png");
                      
                      const historyStatus = historyMap.get(lesson.id);
                      const isCompleted = historyStatus === "Completed";
                      const isInProgress = historyStatus && historyStatus !== "Completed";

                      return (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          layout
                          className="h-full"
                        >
                          <Link
                            href={
                              isLocked ? "/upgrade" : `/shadowing/${lesson.id}`
                            }
                            className="group block h-full"
                          >
                            <div
                              className={cn(
                                "relative h-full flex flex-col rounded-3xl bg-white dark:bg-[#111113] border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                                isLocked
                                  ? "border-gray-200 dark:border-zinc-800"
                                  : "border-gray-100 dark:border-white/5 hover:border-orange-500/30",
                              )}
                            >
                              {/* Image Section */}
                              <div className="relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-gray-100 dark:border-white/5">
                                <img src={thumbnail} alt={lesson.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                
                                {/* Overlay / Lock */}
                                {isLocked && (
                                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                                    <div className="bg-white dark:bg-zinc-900 flex items-center justify-center rounded-full p-3 shadow-lg shadow-black/50">
                                      <Lock className="h-5 w-5 text-orange-500" />
                                    </div>
                                  </div>
                                )}
                                
                                {/* Progress Badge */}
                                <div className={cn(
                                  "absolute top-2 left-2 z-10 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1 text-[10px] font-bold shadow-sm border",
                                  isCompleted ? "bg-emerald-500/90 text-white border-emerald-400" :
                                  isInProgress ? "bg-orange-500/90 text-white border-orange-400" :
                                  "bg-zinc-800/80 text-zinc-300 border-zinc-600"
                                )}>
                                  {isCompleted ? <CheckCircle2 className="h-3 w-3" /> :
                                   isInProgress ? <Timer className="h-3 w-3" /> :
                                   <CircleDashed className="h-3 w-3" />}
                                  {isCompleted ? "Đã học" : isInProgress ? "Đang học" : "Chưa học"}
                                </div>

                                {/* Pro Badge */}
                                {lesson.isPremiumOnly && (
                                  <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-orange-400 border border-orange-500/30">
                                    PRO
                                  </div>
                                )}

                                {/* Category Badge */}
                                {lesson.category && (
                                  <div className="absolute bottom-2 left-2 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white max-w-[80%] truncate">
                                    {lesson.category.toUpperCase()}
                                  </div>
                                )}
                              </div>

                              {/* Content Section */}
                              <div className="flex-1 flex flex-col p-4">
                                <h4 className="text-[13px] font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors mb-2">
                                  {lesson.title}
                                </h4>
                                
                                <div className="mt-auto flex items-center text-[11px] font-medium text-gray-500 dark:text-zinc-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {Math.floor(lesson.durationSeconds / 60)}m
                                  </span>
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
                      className="rounded-2xl w-12 h-12 border-gray-200 dark:border-white/10 hover:border-orange-500 hover:text-orange-500"
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
                              ? "bg-orange-600 hover:bg-blue-700 border-none shadow-lg shadow-orange-500/40 text-white scale-110"
                              : "border-gray-200 dark:border-white/10 hover:border-orange-500",
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
                      className="rounded-2xl w-12 h-12 border-gray-200 dark:border-white/10 hover:border-orange-500 hover:text-orange-500"
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
