"use client";

import { Card } from "@/components/ui/card";
import { MessageCircle, Construction } from "lucide-react";

export function CommentsSection() {
  return (
    <Card className="mt-16 p-1 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] rounded-[2rem] overflow-hidden">
      <div className="relative bg-white dark:bg-[#18181b] rounded-[1.8rem] p-8 md:p-12 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />

        <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 border border-gray-200 dark:border-white/5 shadow-inner">
            <MessageCircle className="h-8 w-8 text-purple-400" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bình luận</h3>
          <p className="text-gray-600 dark:text-zinc-400 text-sm mb-8 leading-relaxed">
            Tính năng thảo luận đang được đội ngũ kỹ thuật xây dựng để mang lại
            trải nghiệm tốt nhất cho cộng đồng.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
            <Construction className="h-3 w-3" /> Coming Soon
          </div>
        </div>
      </div>
    </Card>
  );
}
