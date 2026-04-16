"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCoverImageProps {
  category: string;
  thumbnailUrl?: string;
  isFeatured?: boolean; // THÊM DÒNG NÀY ĐỂ FIX LỖI
}

export function BlogCoverImage({
  category,
  thumbnailUrl,
  isFeatured, // NHẬN PROP Ở ĐÂY
}: BlogCoverImageProps) {
  const getCategoryIcon = () => {
    switch (category) {
      case "Mẹo học tập":
        return "💡";
      case "Phát âm":
        return "🎤";
      case "Ngữ pháp":
        return "📖";
      case "Từ vựng":
        return "📚";
      default:
        return "🚀";
    }
  };

  const hasValidImage = thumbnailUrl && thumbnailUrl !== "string";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative h-[400px] w-full rounded-[2.5rem] mb-10 overflow-hidden border shadow-2xl group transition-all duration-500",
        // Nếu là bài nổi bật thì thêm viền cam và hiệu ứng bóng đổ cam
        isFeatured
          ? "border-orange-500/50 shadow-orange-500/10"
          : "border-gray-200 dark:border-white/10 shadow-black/5",
        "bg-slate-100 dark:bg-[#18181b]",
      )}
    >
      {hasValidImage ? (
        <img
          src={thumbnailUrl}
          alt={`Cover cho chuyên mục ${category}`}
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-blog.png";
          }}
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#18181b] dark:to-black" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] group-hover:bg-orange-500/20 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-[180px] md:text-[220px] select-none filter blur-sm group-hover:blur-0 transition-all duration-500 grayscale group-hover:grayscale-0"
            >
              {getCategoryIcon()}
            </motion.div>
          </div>
        </>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />

      {/* Lớp phủ viền sáng */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem]" />

      {/* Category Badge & Featured Badge */}
      <div className="absolute bottom-8 left-8 z-10 flex items-center gap-3">
        <Badge className="bg-white/90 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-5 py-2 text-xs font-bold uppercase tracking-widest shadow-lg">
          {category}
        </Badge>

        {/* Hiển thị thêm Badge Nổi bật nếu có isFeatured */}
        {isFeatured && (
          <Badge className="bg-orange-500 text-white border-none px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 fill-white" />
            Nổi bật
          </Badge>
        )}
      </div>
    </motion.div>
  );
}
