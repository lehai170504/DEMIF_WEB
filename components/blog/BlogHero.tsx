"use client";

import { Input } from "@/components/ui/input";
import { Search, Sparkles, X } from "lucide-react";
import { motion } from "framer-motion";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
  return (
    <div className="relative mb-16">
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              Khám phá kiến thức mới
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 dark:text-white tracking-tight leading-[1.1]">
            Blog{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              DEMIF
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Khám phá các mẹo học tập, kiến thức ngữ pháp và xu hướng học tiếng
            Anh mới nhất từ các chuyên gia.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

            <div className="relative bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-14 pr-12 h-16 bg-transparent border-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 text-lg focus-visible:ring-0 rounded-2xl"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
