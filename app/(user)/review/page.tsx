"use client";

import { useState, useEffect } from "react";
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
import {
  useVocabulary,
  useDueVocabulary,
  useVocabularyOverview,
} from "@/hooks/use-vocabulary";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  const [filter, setFilter] = useState<
    "all" | "due" | "mastered" | "learning" | "new" | "overdue"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedLesson, setSelectedLesson] = useState<string>("all");

  const [page, setPage] = useState(1);
  const pageSize = 12;

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: overview, isLoading: isOverviewLoading } =
    useVocabularyOverview();

  const isDueTab = filter === "due" || filter === "overdue";

  const queryParams = {
    search: debouncedSearch,
    topic: selectedTopic !== "all" ? selectedTopic : undefined,
    lessonId: selectedLesson !== "all" ? selectedLesson : undefined,
    page: page,
    pageSize: pageSize,
  };

  const allVocab = useVocabulary(queryParams, !isDueTab);
  const dueVocab = useDueVocabulary(queryParams, isDueTab);

  const activeQuery = isDueTab ? dueVocab : allVocab;
  const { data, isLoading, isFetching } = activeQuery;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedTopic, selectedLesson, filter]);

  const vocabularyItems = data?.items || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const displayItems = isDueTab
    ? vocabularyItems.filter((item) => {
        if (filter === "due") return item.reviewStatus === "due";
        if (filter === "overdue") return item.reviewStatus === "overdue";
        return true;
      })
    : vocabularyItems.filter((item) => {
        if (filter === "mastered") return item.reviewStatus === "mastered";
        if (filter === "learning") return item.reviewStatus === "learning";
        if (filter === "new") return item.reviewStatus === "new";
        return true;
      });

  return (
    <div className="w-full font-mono pb-20 relative text-gray-900 dark:text-white">
      {/* Syncing Indicator */}
      {isFetching && !isLoading && (
        <div className="fixed top-24 right-8 z-50 flex items-center gap-2 bg-orange-500/10 backdrop-blur-md border border-orange-500/20 px-4 py-2 rounded-2xl shadow-lg">
          <Loader2 className="w-3 h-3 animate-spin text-orange-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">
            Đang đồng bộ...
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
            className="flex flex-wrap gap-8 mb-12 px-8 py-5 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5 w-fit"
          >
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-4 h-4 text-zinc-400" />
              <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                Chủ đề:{" "}
                <span className="text-gray-900 dark:text-white ml-1">
                  {overview?.topicCount || 0}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Library className="w-4 h-4 text-zinc-400" />
              <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                Bài học:{" "}
                <span className="text-gray-900 dark:text-white ml-1">
                  {overview?.lessonCount || 0}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-orange-500" />
              <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                Vừa học:{" "}
                <span className="text-gray-900 dark:text-white ml-1">
                  {overview?.recentItems?.length || 0}
                </span>
              </span>
            </div>
          </motion.div>
        )}

        {/* Bộ lọc truyền đầy đủ callback để UI trigger gọi API */}
        <ReviewFilter
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 animate-spin text-[#FF7A00] mb-4 opacity-20" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 animate-pulse">
              Đang kết nối dữ liệu...
            </p>
          </div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {displayItems.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[400px]"
                >
                  {displayItems.map((item, index) => (
                    <ReviewCard3D key={item.id} item={item} index={index} />
                  ))}
                </motion.div>
              ) : (
                <ReviewEmptyState />
              )}
            </AnimatePresence>

            {/* --- PHÂN TRANG --- */}
            {totalPages > 1 && displayItems.length > 0 && (
              <div className="mt-20 flex items-center justify-center gap-8">
                <Button
                  variant="ghost"
                  disabled={page === 1}
                  onClick={() => {
                    setPage((p) => p - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="h-14 w-14 rounded-2xl bg-gray-100 dark:bg-white/5 hover:border-orange-500/50 transition-all disabled:opacity-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <div className="flex items-center gap-4">
                  <div className="h-14 px-8 rounded-2xl bg-white dark:bg-zinc-900 border border-orange-500/20 flex items-center justify-center shadow-xl">
                    <span className="text-base font-black text-orange-500">
                      {page}
                    </span>
                    <span className="mx-4 text-zinc-700">/</span>
                    <span className="text-base font-black text-zinc-400">
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
                  className="h-14 w-14 rounded-2xl bg-gray-100 dark:bg-white/5 hover:border-orange-500/50 transition-all disabled:opacity-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
