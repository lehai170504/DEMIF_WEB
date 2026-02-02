"use client";

import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

export function ReviewEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-32 rounded-[3rem] bg-[#18181b] border-2 border-dashed border-white/10"
    >
      <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse">
        <RotateCw className="h-10 w-10 text-zinc-600" />
      </div>
      <p className="text-zinc-300 font-bold text-lg mb-2">
        Không tìm thấy từ vựng nào
      </p>
      <p className="text-zinc-500 text-sm">
        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm nhé!
      </p>
    </motion.div>
  );
}
