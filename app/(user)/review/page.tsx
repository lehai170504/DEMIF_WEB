"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Loader2,
  LayoutGrid,
  Library,
  History,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ReviewHeader } from "@/components/review/review-header";
import { ReviewFilter } from "@/components/review/review-filter";
import { ReviewCard3D } from "@/components/review/review-card-3d";
import { ReviewEmptyState } from "@/components/review/review-empty-state";
import { useVocabulary, useVocabularyOverview } from "@/hooks/use-vocabulary";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  const [filter, setFilter] = useState<"all" | "due" | "mastered" | "learning">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedLesson, setSelectedLesson] = useState<string>("all");

  // --- STATE PHÂN TRANG ---
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: overview, isLoading: isOverviewLoading } =
    useVocabularyOverview();

  // Lấy dữ liệu từ BE theo trang
  const { data, isLoading, isFetching } = useVocabulary({
    search: debouncedSearch,
    topic: selectedTopic !== "all" ? selectedTopic : undefined,
    lessonId: selectedLesson !== "all" ? selectedLesson : undefined,
    page: page,
    pageSize: pageSize,
  });

  // Tự động nhảy về trang 1 khi đổi bộ lọc hoặc tìm kiếm
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedTopic, selectedLesson, filter]);

  const vocabularyItems = data?.items || [];

  // --- TÍNH TOÁN PHÂN TRANG CHUẨN ---
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const displayItems = useMemo(() => {
    return vocabularyItems.filter((item) => {
      switch (filter) {
        case "due":
          return item.nextReviewAt && new Date(item.nextReviewAt) <= new Date();
        case "mastered":
          return item.isMastered;
        case "learning":
          return !item.isMastered;
        default:
          return true;
      }
    });
  }, [vocabularyItems, filter]);

  return (
    <div className="w-full font-mono pb-20 relative">
      {/* Syncing Indicator */}
      {isFetching && !isLoading && (
        <div className="fixed top-24 right-8 z-50 flex items-center gap-2 bg-orange-500/10 backdrop-blur-md border border-orange-500/20 px-4 py-2 rounded-2xl shadow-lg">
          <Loader2 className="w-3 h-3 animate-spin text-orange-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">
            Đang đồng bộ dữ liệu...
          </span>
        </div>
      )}

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <ReviewHeader
          dueCount={overview?.dueCount || 0}
          totalCount={overview?.totalCount || 0}
          mastery={Math.round(overview?.masteryRate || 0)}
          learningCount={overview?.learningCount || 0}
        />

        {!isOverviewLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-8 mb-12 px-6 py-4 rounded-[2rem] bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 w-fit"
          >
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-4 h-4 text-zinc-400" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                Chủ đề:{" "}
                <span className="text-gray-900 dark:text-white ml-1">
                  {overview?.topicCount || 0}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Library className="w-4 h-4 text-zinc-400" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                Bài học:{" "}
                <span className="text-gray-900 dark:text-white ml-1">
                  {overview?.lessonCount || 0}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-orange-500" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                Mới lưu:{" "}
                <span className="text-gray-900 dark:text-white ml-1">
                  {overview?.recentCount || 0}
                </span>
              </span>
            </div>
          </motion.div>
        )}

        <ReviewFilter
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          dueCount={overview?.dueCount || 0}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
          allItems={vocabularyItems}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4 opacity-20" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 animate-pulse">
              Đang kết nối kho từ vựng...
            </p>
          </div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]"
              >
                {displayItems.map((item, index) => (
                  <ReviewCard3D key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* --- PHÂN TRANG CHUẨN CHỈNH --- */}
            {/* Chỉ hiện phân trang nếu có nhiều hơn 1 trang và đang có dữ liệu hiển thị */}
            {totalPages > 1 && displayItems.length > 0 && (
              <div className="mt-16 flex items-center justify-center gap-6">
                <Button
                  variant="ghost"
                  disabled={page === 1}
                  onClick={() => {
                    setPage((p) => p - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="h-12 w-12 rounded-2xl bg-gray-100 dark:bg-white/5 border border-transparent hover:border-orange-500/50 transition-all disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Trang
                  </span>
                  <div className="h-12 px-6 rounded-2xl bg-white dark:bg-zinc-900 border border-orange-500/20 flex items-center justify-center shadow-xl shadow-orange-500/5">
                    <span className="text-sm font-black text-orange-500">
                      {page}
                    </span>
                    <span className="mx-3 text-zinc-700">/</span>
                    <span className="text-sm font-black text-zinc-400">
                      {totalPages}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  disabled={page === totalPages}
                  onClick={() => {
                    setPage((p) => p + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="h-12 w-12 rounded-2xl bg-gray-100 dark:bg-white/5 border border-transparent hover:border-orange-500/50 transition-all disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </>
        )}

        {!isLoading && displayItems.length === 0 && <ReviewEmptyState />}
      </main>
    </div>
  );
}
