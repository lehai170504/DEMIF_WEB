"use client";

import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

export function ReviewEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-32 rounded-[3rem] bg-gray-50 dark:bg-[#18181b] border-2 border-dashed border-gray-200 dark:border-white/10"
    >
      <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6 animate-pulse">
        <RotateCw className="h-10 w-10 text-gray-400 dark:text-zinc-600" />
      </div>
      <p className="text-gray-900 dark:text-zinc-300 font-bold text-lg mb-2">
        Không tìm thấy từ vựng nào
      </p>
      <p className="text-gray-600 dark:text-zinc-500 text-sm">
        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm nhé!
      </p>
    </motion.div>
  );
}