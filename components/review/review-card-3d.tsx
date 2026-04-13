"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookText,
  CalendarDays,
  Clock,
  CheckCircle2,
  Tag,
  History,
  Trash2,
  Loader2,
  ChevronRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDeleteVocabulary } from "@/hooks/use-vocabulary";

interface ReviewCard3DProps {
  item: any;
  index: number;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Chưa có";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function ReviewCard3D({ item, index }: ReviewCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { mutate: deleteWord, isPending: isDeleting } = useDeleteVocabulary();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Chặn lật thẻ
    if (confirm("Xóa từ này khỏi kho lưu trữ?")) {
      deleteWord(item.id);
    }
  };

  const masteryPercentage =
    item.reviewCount > 0
      ? Math.round((item.correctReviews / item.reviewCount) * 100)
      : 0;

  const isDue = item.nextReviewAt && new Date(item.nextReviewAt) <= new Date();

  return (
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
        <Card
          className="absolute inset-0 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111] p-8 flex flex-col items-center justify-center shadow-sm group-hover:shadow-xl transition-all"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {isDue && !item.isMastered && (
            <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
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

        <Card
          className="absolute inset-0 rounded-[2rem] border border-orange-500/20 bg-gray-50 dark:bg-zinc-900 p-8 flex flex-col shadow-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
              {item.topic}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              {item.meaning}
            </h3>
            <p className="text-xs text-zinc-500 italic line-clamp-3 px-2">
              "{item.contextSentence || "Không có ví dụ"}"
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/5 relative z-30">
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="ghost"
              className="h-9 w-9 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors"
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
                  className="h-9 px-4 rounded-xl bg-gray-200/50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-orange-500 transition-colors"
                >
                  Chi tiết <ChevronRight className="ml-1 w-3 h-3" />
                </Button>
              </SheetTrigger>
              <SheetContent
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#080808] border-l border-white/5 font-mono"
              >
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-2xl font-black uppercase tracking-tighter dark:text-white">
                    Thông số <span className="text-orange-500">Định danh</span>
                  </SheetTitle>
                  <SheetDescription className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                    ID: {item.id}
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-orange-500">
                      <Tag className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">
                        Phân loại
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-lg px-3 py-1 uppercase text-[9px] font-bold border-white/10"
                      >
                        {item.lessonCategory || "N/A"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="rounded-lg px-3 py-1 uppercase text-[9px] font-bold border-orange-500/20 bg-orange-500/5 text-orange-500"
                      >
                        {item.topic}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-500">
                      <BookText className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">
                        Nguồn học
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-medium bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                      {item.lessonTitle || "Không rõ nguồn"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <StatItem
                      icon={<History className="w-3 h-3" />}
                      label="Lượt ôn tập"
                      value={`${item.reviewCount} lần`}
                    />
                    <StatItem
                      icon={<CheckCircle2 className="w-3 h-3" />}
                      label="Trả lời đúng"
                      value={`${item.correctReviews} lần`}
                    />
                    <StatItem
                      icon={<CalendarDays className="w-3 h-3" />}
                      label="Khởi tạo"
                      value={formatDate(item.createdAt)}
                    />
                    <StatItem
                      icon={<Clock className="w-3 h-3" />}
                      label="Ôn gần nhất"
                      value={formatDate(item.lastReviewedAt)}
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> Lịch ôn kế tiếp
                    </span>
                    <p className="text-sm font-bold dark:text-white">
                      {formatDate(item.nextReviewAt)}
                    </p>
                  </div>

                  {item.note && (
                    <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                        Ghi chú
                      </span>
                      <p className="text-[11px] text-zinc-400 italic font-medium leading-relaxed">
                        "{item.note}"
                      </p>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-1">
      <div className="flex items-center gap-2 text-zinc-500">
        {icon}
        <span className="text-[8px] font-black uppercase tracking-widest">
          {label}
        </span>
      </div>
      <p className="text-[10px] font-bold dark:text-zinc-200">{value}</p>
    </div>
  );
}
