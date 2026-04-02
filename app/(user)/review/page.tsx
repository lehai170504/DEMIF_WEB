"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { vocabularyItems } from "@/lib/data/vocabulary";
import { ReviewHeader } from "@/components/review/review-header";
import { ReviewFilter } from "@/components/review/review-filter";
import { ReviewCard3D } from "@/components/review/review-card-3d";
import { ReviewEmptyState } from "@/components/review/review-empty-state";

export default function ReviewPage() {
  const [filter, setFilter] = useState<"all" | "due" | "mastered" | "learning">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const dueForReview = vocabularyItems.filter(
    (item) => new Date(item.nextReview) <= new Date(),
  );

  const totalMastery =
    vocabularyItems.length > 0
      ? Math.round(
          vocabularyItems.reduce((sum, item) => sum + item.mastery, 0) /
            vocabularyItems.length,
        )
      : 0;

  const filteredItems = vocabularyItems.filter((item) => {
    const matchesSearch = item.word
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    switch (filter) {
      case "due":
        return new Date(item.nextReview) <= new Date();
      case "mastered":
        return item.mastery >= 80;
      case "learning":
        return item.mastery < 80;
      default:
        return true;
    }
  });

  return (
    <div className="w-full font-mono pb-20">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <ReviewHeader
          dueCount={dueForReview.length}
          totalCount={vocabularyItems.length}
          mastery={totalMastery}
        />

        <ReviewFilter
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          dueCount={dueForReview.length}
        />

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

        {filteredItems.length === 0 && <ReviewEmptyState />}
      </main>
    </div>
  );
}
