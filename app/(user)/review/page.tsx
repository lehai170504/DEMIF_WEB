"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, LayoutGrid, Library, History } from "lucide-react";
import { ReviewHeader } from "@/components/review/review-header";
import { ReviewFilter } from "@/components/review/review-filter";
import { ReviewCard3D } from "@/components/review/review-card-3d";
import { ReviewEmptyState } from "@/components/review/review-empty-state";
import { useVocabulary, useVocabularyOverview } from "@/hooks/use-vocabulary";
import { useDebounce } from "@/hooks/use-debounce";

export default function ReviewPage() {
  const [filter, setFilter] = useState<"all" | "due" | "mastered" | "learning">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedLesson, setSelectedLesson] = useState<string>("all");

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Lấy Overview data
  const { data: overview, isLoading: isOverviewLoading } =
    useVocabularyOverview();

  // Lấy Danh sách chính
  const { data, isLoading, isFetching } = useVocabulary({
    search: debouncedSearch,
    topic: selectedTopic !== "all" ? selectedTopic : undefined,
    lessonId: selectedLesson !== "all" ? selectedLesson : undefined,
    page: 1,
    pageSize: 100,
  });

  const vocabularyItems = data?.items || [];

  const filteredItems = useMemo(() => {
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
      {/* Cảnh báo cập nhật mượt */}
      {isFetching && !isLoading && (
        <div className="fixed top-24 right-8 z-50 flex items-center gap-2 bg-[#FF7A00]/10 backdrop-blur-md border border-[#FF7A00]/20 px-4 py-2 rounded-2xl shadow-lg">
          <Loader2 className="w-3 h-3 animate-spin text-[#FF7A00]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">
            Đang đồng bộ...
          </span>
        </div>
      )}

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Header chính */}
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
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Chủ đề:{" "}
                <span className="text-gray-900 dark:text-white ml-1">
                  {overview?.topicCount || 0}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Library className="w-4 h-4 text-zinc-400" />
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Bài học:{" "}
                <span className="text-gray-900 dark:text-white ml-1">
                  {overview?.lessonCount || 0}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
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
            <Loader2 className="w-12 h-12 animate-spin text-[#FF7A00] mb-4 opacity-20" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 animate-pulse">
              Đang truy xuất kho dữ liệu...
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredItems.map((item, index) => (
                <ReviewCard3D key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && filteredItems.length === 0 && <ReviewEmptyState />}
      </main>
    </div>
  );
}
