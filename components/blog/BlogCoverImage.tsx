"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface BlogCoverImageProps {
  category: string;
}

export function BlogCoverImage({ category }: BlogCoverImageProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[400px] w-full rounded-[2.5rem] mb-10 overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl group"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#18181b] dark:to-black" />

      {/* Abstract Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] group-hover:bg-orange-500/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700" />

      {/* Huge Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[180px] md:text-[220px] select-none filter blur-sm group-hover:blur-0 transition-all duration-500"
        >
          {getCategoryIcon()}
        </motion.div>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-black/80 via-transparent dark:via-black/20 to-transparent" />

      {/* Category Badge */}
      <div className="absolute bottom-8 left-8">
        <Badge className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-4 py-2 text-sm font-bold uppercase tracking-widest shadow-lg">
          {category}
        </Badge>
      </div>
    </motion.div>
  );
}
