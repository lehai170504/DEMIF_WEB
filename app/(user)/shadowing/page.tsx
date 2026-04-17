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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUserLessons, useLessonHistory } from "@/hooks/use-lesson";
import { useMySubscription } from "@/hooks/use-subscription";
import { normalizeProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

// Hàm tính toán các trang sẽ hiển thị (rút gọn bằng dấu ...)
const generatePagination = (currentPage: number, totalPages: number) => {
  // Nếu tổng số trang nhỏ hơn hoặc bằng 7, hiển thị tất cả
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Nếu đang ở những trang đầu (vd: 1, 2, 3)
  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  // Nếu đang ở những trang cuối (vd: 18, 19, 20 trên tổng 20)
  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // Nếu đang ở giữa (vd: trang 10 trên tổng 20) -> 1 ... 9 10 11 ... 20
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};

const SKIP_TAGS = new Set(["youtube", "transcript", "video", "audio"]);

const parseTags = (raw: string): string[] => {
  if (!raw) return [];
  const parts = raw.includes("#")
    ? raw.split(/\s+/).filter((t) => t.startsWith("#")).map((t) => t.slice(1))
    : raw.split(",").map((t) => t.trim());
  return parts.filter((t) => t.length > 0 && !SKIP_TAGS.has(t.toLowerCase())).slice(0, 2);
};

export default function ShadowingPage() {
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  const { data: mySubscription } = useMySubscription();
  const hasPremiumAccess = mySubscription?.status === "Active";

  const LEVELS = [
    { val: "", label: "Tất cả" },
    { val: "Beginner", label: "Beginner" },
    { val: "Intermediate", label: "Intermediate" },
    { val: "Advanced", label: "Advanced" },
  ];

  const LEVEL_STYLES: Record<string, { bg: string; text: string; border: string }> = {
    Beginner:     { bg: "bg-emerald-500/90",  text: "text-white", border: "border-emerald-400" },
    Intermediate: { bg: "bg-blue-500/90",     text: "text-white", border: "border-blue-400" },
    Advanced:     { bg: "bg-purple-500/90",   text: "text-white", border: "border-purple-400" },
  };

  // Debounce search 0.5s
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // GỌI API: Cố định type là "Shadowing"
  const { data, isLoading, error } = useUserLessons({
    page,
    pageSize: 20,
    type: "Shadowing", // Chỉ lấy bài Shadowing từ Server
    level: level || undefined,
  });

  const { data: lessonHistoryData } = useLessonHistory({ pageSize: 1000 });
  const historyMap = useMemo(() => {
    const map = new Map<string, any>();
    lessonHistoryData?.items?.forEach((h) => {
      const existing = map.get(h.lessonId);
      const currentProgress = normalizeProgress(h.progressPercent, h.status);

      if (!existing || currentProgress > existing.progressPercent) {
        map.set(h.lessonId, {
          status: h.status,
          progressPercent: currentProgress,
          level: h.level,
        });
      }
    });
    return map;
  }, [lessonHistoryData]);

  // Reset trang khi thay đổi bộ lọc
  useEffect(() => {
    setPage(1);
  }, [level, debouncedSearch]);

  // Filter thêm ở client để đảm bảo tính an toàn dữ liệu hiển thị và Search
  const displayItems = useMemo(() => {
    return (data?.items ?? []).filter(
      (item) =>
        (item.lessonType === "Shadowing" || item.lessonType === "1") &&
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (!selectedTag || parseTags(item.tags).includes(selectedTag)),
    );
  }, [data?.items, debouncedSearch, selectedTag]);

  const allUniqueTags = useMemo(() => {
    const items = data?.items ?? [];
    const tagSet = new Set<string>();
    items.forEach((item) => parseTags(item.tags).forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
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
                {LEVELS.map((lv) => (
                  <button
                    key={lv.val}
                    onClick={() => setLevel(lv.val)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-[11px] font-bold uppercase transition-all flex-shrink-0 border",
                      level === lv.val
                        ? "bg-zinc-900 dark:bg-orange-500 text-white border-transparent shadow-md"
                        : "border-gray-200 dark:border-white/10 text-gray-500 hover:border-orange-500 hover:text-orange-500",
                    )}
                  >
                    {lv.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag cloud */}
            {allUniqueTags.length > 0 && (
              <div className="border-t border-gray-100 dark:border-white/5 pt-3 mt-1 px-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex-shrink-0">
                    #Tags
                  </span>
                  {allUniqueTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border",
                        selectedTag === tag
                          ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
                          : "bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-zinc-400 border-gray-200 dark:border-white/10 hover:border-orange-400 hover:text-orange-500",
                      )}
                    >
                      #{tag}
                    </button>
                  ))}
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag("")}
                      className="ml-auto flex-shrink-0 text-[10px] font-bold text-gray-400 hover:text-orange-500 transition-colors underline underline-offset-2"
                    >
                      Xóa tag
                    </button>
                  )}
                </div>
              </div>
            )}
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
                    {(level || debouncedSearch || selectedTag) && (
                      <button
                        onClick={() => {
                          setLevel("");
                          setSearchQuery("");
                          setSelectedTag("");
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

                      const thumbnail =
                        lesson.thumbnailUrl ||
                        (lesson.videoId
                          ? `https://i.ytimg.com/vi/${lesson.videoId}/hqdefault.jpg`
                          : "/video-placeholder.png");

                      const historyData = historyMap.get(lesson.id);
                      const isCompleted = historyData?.status === "Completed";
                      const isInProgress =
                        historyData?.status &&
                        historyData?.status !== "Completed";

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
                              <div className="relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-gray-100 dark:border-white/5 shrink-0">
                                <img
                                  src={thumbnail}
                                  alt={lesson.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Overlay / Lock */}
                                {isLocked && (
                                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                                    <div className="bg-white dark:bg-zinc-900 flex items-center justify-center rounded-full p-3 shadow-lg shadow-black/50">
                                      <Lock className="h-5 w-5 text-orange-500" />
                                    </div>
                                  </div>
                                )}

                                {/* Progress Badge */}
                                {(isCompleted || isInProgress) && (
                                  <div
                                    className={cn(
                                      "absolute top-2 left-2 z-10 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1 text-[10px] font-bold shadow-sm border text-white",
                                      isCompleted
                                        ? "bg-emerald-500/90 border-emerald-400"
                                        : "bg-orange-500/90 border-orange-400",
                                    )}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 className="h-3 w-3" />
                                    ) : (
                                      <Timer className="h-3 w-3" />
                                    )}
                                    {isCompleted ? "Đã học" : "Đang học"}
                                  </div>
                                )}

                                {/* Pro Badge */}
                                {lesson.isPremiumOnly && (
                                  <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-orange-400 border border-orange-500/30">
                                    PRO
                                  </div>
                                )}

                                {/* Level Badge */}
                                {lesson.level && (() => {
                                  const s = LEVEL_STYLES[lesson.level] ?? { bg: "bg-black/60", text: "text-white", border: "border-white/20" };
                                  return (
                                    <div className={cn(
                                      "absolute bottom-2 left-2 z-10 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold border",
                                      s.bg, s.text, s.border
                                    )}>
                                      {lesson.level.toUpperCase()}
                                    </div>
                                  );
                                })()}
                              </div>

                              {/* Content Section */}
                              <div className="flex-1 flex flex-col p-4 justify-between">
                                <div>
                                  <h4 className="text-[13px] font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors mb-2">
                                    {lesson.title}
                                  </h4>
                                  {(() => {
                                    const tags = parseTags(lesson.tags);
                                    return tags.length > 0 ? (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {tags.map((tag) => (
                                          <button
                                            key={tag}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              setSelectedTag(selectedTag === tag ? "" : tag);
                                            }}
                                            className={cn(
                                              "inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border transition-all cursor-pointer",
                                              selectedTag === tag
                                                ? "bg-orange-500/20 text-orange-500 border-orange-500/40"
                                                : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-zinc-400 border-gray-200 dark:border-white/5 hover:border-orange-400 hover:text-orange-400",
                                            )}
                                          >
                                            #{tag}
                                          </button>
                                        ))}
                                      </div>
                                    ) : null;
                                  })()}
                                </div>

                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-[11px] font-medium text-gray-500 dark:text-zinc-400">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {formatDuration(lesson.durationSeconds)}
                                    </span>
                                    {historyData && (
                                      <span className="font-bold text-orange-500 text-[10px]">
                                        {Math.round(historyData.progressPercent * 100)}%
                                      </span>
                                    )}
                                  </div>
                                  {historyData && (
                                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/5 mt-1.5">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${historyData.progressPercent * 100}%`,
                                        }}
                                        transition={{
                                          duration: 1,
                                          ease: "easeOut",
                                          delay: 0.2,
                                        }}
                                        className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] shadow-[0_0_8px_rgba(255,122,0,0.6)]"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </AnimatePresence>

                {/* --- PAGINATION BẰNG SHADCN --- */}
                {data && data.totalPages > 1 && (
                  <div className="mt-20">
                    <Pagination>
                      <PaginationContent className="gap-2">
                        {/* Nút Previous */}
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className={cn(
                              "rounded-2xl h-12 w-12 sm:w-auto px-4 cursor-pointer border border-gray-200 dark:border-white/10 hover:border-orange-500 hover:text-orange-500 transition-colors",
                              page === 1
                                ? "pointer-events-none opacity-50"
                                : "",
                            )}
                          />
                        </PaginationItem>

                        {/* Danh sách trang với dấu ... */}
                        {generatePagination(page, data.totalPages).map(
                          (p, i) => (
                            <PaginationItem key={i}>
                              {p === "..." ? (
                                <PaginationEllipsis className="w-12 h-12 flex items-center justify-center text-slate-400" />
                              ) : (
                                <PaginationLink
                                  onClick={() => setPage(Number(p))}
                                  isActive={page === p}
                                  className={cn(
                                    "w-12 h-12 rounded-2xl font-black text-sm transition-all cursor-pointer border",
                                    page === p
                                      ? "bg-orange-500 border-orange-500 hover:bg-orange-600 hover:text-white shadow-lg shadow-orange-500/40 text-white scale-110"
                                      : "border-gray-200 dark:border-white/10 text-slate-600 hover:border-orange-500 hover:text-orange-500 dark:text-slate-300",
                                  )}
                                >
                                  {p}
                                </PaginationLink>
                              )}
                            </PaginationItem>
                          ),
                        )}

                        {/* Nút Next */}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setPage((p) => Math.min(data.totalPages, p + 1))
                            }
                            className={cn(
                              "rounded-2xl h-12 w-12 sm:w-auto px-4 cursor-pointer border border-gray-200 dark:border-white/10 hover:border-orange-500 hover:text-orange-500 transition-colors",
                              page === data.totalPages
                                ? "pointer-events-none opacity-50"
                                : "",
                            )}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
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
