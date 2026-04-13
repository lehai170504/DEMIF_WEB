"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, ChevronRight } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useDeleteVocabulary } from "@/hooks/use-vocabulary";
import { VocabularyDetailSheet } from "@/components/vocabulary/vocabulary-detail-sheet";
import { DeleteVocabularyModal } from "@/components/vocabulary/delete-vocabulary-modal";

interface ReviewCard3DProps {
  item: any;
  index: number;
}

export function ReviewCard3D({ item, index }: ReviewCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: deleteWord, isPending: isDeleting } = useDeleteVocabulary();

  const handleConfirmDelete = () => {
    deleteWord(item.id, {
      onSuccess: () => setIsDeleteModalOpen(false),
    });
  };

  const masteryPercentage =
    item.reviewCount > 0
      ? Math.round((item.correctReviews / item.reviewCount) * 100)
      : 0;

  const isDue = item.nextReviewAt && new Date(item.nextReviewAt) <= new Date();

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        style={{ perspective: "1000px" }}
        className="h-[300px] w-full cursor-pointer group"
      >
        <motion.div
          className="relative h-full w-full transition-all duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Mặt trước */}
          <Card
            className="absolute inset-0 rounded-[2.5rem] border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111] p-8 flex flex-col items-center justify-center shadow-sm group-hover:shadow-xl transition-all"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {isDue && !item.isMastered && (
              <div className="absolute top-8 right-8 h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
            )}

            <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter text-center">
              {item.word}
            </h3>

            <div className="absolute bottom-8 w-full px-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
                Chạm để lật
              </span>
              <div className="h-1 w-12 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${masteryPercentage}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Mặt sau */}
          <Card
            className="absolute inset-0 rounded-[2.5rem] border border-orange-500/20 bg-gray-50 dark:bg-zinc-900 p-8 flex flex-col shadow-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">
                {item.topic}
              </p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                {item.meaning}
              </h3>
              <p className="text-xs text-zinc-500 italic line-clamp-3 px-4 leading-relaxed">
                "{item.contextSentence || "Không có ví dụ"}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-white/5 relative z-30">
              <Button
                onClick={(e) => {
                  e.stopPropagation(); // Không lật thẻ
                  setIsDeleteModalOpen(true); // Mở modal xác nhận thay vì confirm()
                }}
                disabled={isDeleting}
                variant="ghost"
                className="h-10 w-10 rounded-2xl hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    variant="ghost"
                    className="h-10 px-5 rounded-2xl bg-gray-200/50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-orange-500 transition-all active:scale-95"
                  >
                    Chi tiết <ChevronRight className="ml-1 w-3 h-3" />
                  </Button>
                </SheetTrigger>
                <VocabularyDetailSheet item={item} />
              </Sheet>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* RENDER MODAL TẠI ĐÂY */}
      <DeleteVocabularyModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        word={item.word}
        isDeleting={isDeleting}
      />
    </>
  );
}
