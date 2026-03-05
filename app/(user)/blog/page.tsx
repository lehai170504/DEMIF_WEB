"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  blogPosts,
  blogCategories,
  featuredPosts,
  popularPosts,
} from "@/lib/data/blog";

// Import các component đã tách
import { BlogHero } from "@/components/blog/BlogHero";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { ResultsInfo } from "@/components/blog/ResultsInfo";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { EmptyState } from "@/components/blog/EmptyState";
import { PopularPosts } from "@/components/blog/PopularPosts";
import { TagsCloud } from "@/components/blog/TagsCloud";
import { NewsletterCard } from "@/components/blog/NewsletterCard";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Logic lọc bài viết
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Logic phân trang
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    handleSearchChange("");
    handleCategoryChange("all");
  };

  // --- Animation Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 60, damping: 20 },
    },
  };

  return (
    // THÊM: overflow-x-hidden để ẩn thanh cuộn ngang
    // THÊM: style tùy chỉnh cho thanh cuộn (scrollbar) để đẹp hơn trên nền tối
    <div className="w-full min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 pb-20 relative overflow-x-hidden">
      {/* --- 1. 3D Background Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-orange-500/5 blur-[120px] rounded-full opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full opacity-60" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[1200px] h-[500px] bg-purple-500/5 blur-[100px] rotate-12 opacity-40" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] z-0 mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        {/* --- 2. Hero Section --- */}
        <div className="pt-10 pb-16">
          <BlogHero
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>

        <main className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* --- 3. Featured Section (Chỉ hiện khi không search/filter) --- */}
            {selectedCategory === "all" && searchQuery === "" && (
              <motion.section variants={itemVariants}>
                <div className="mb-8 flex items-center gap-3 px-2">
                  <div className="h-8 w-1.5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Tiêu điểm tuần
                  </h2>
                </div>
                {/* Wrapper để tránh overflow ngang từ slide nếu có */}
                <div className="overflow-hidden p-1 -m-1">
                  <FeaturedPosts posts={featuredPosts} />
                </div>
              </motion.section>
            )}

            {/* --- 4. Main Content Layout (Left: Grid, Right: Sidebar) --- */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* === LEFT COLUMN: POSTS === */}
              <div className="flex-1 w-full space-y-10 min-w-0">
                {" "}
                {/* min-w-0 giúp flex item co lại đúng cách */}
                {/* Control Bar (Filter & Results) */}
                <motion.div variants={itemVariants} className="space-y-6">
                  {/* Category Filter Wrapper với scroll ngang ẩn thanh cuộn */}
                  <div className="p-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl backdrop-blur-xl inline-block shadow-lg max-w-full overflow-x-auto scrollbar-none">
                    <CategoryFilter
                      categories={blogCategories}
                      selectedCategory={selectedCategory}
                      onCategoryChange={handleCategoryChange}
                    />
                  </div>

                  <ResultsInfo
                    totalResults={filteredPosts.length}
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                  />
                </motion.div>
                {/* Grid Content */}
                <AnimatePresence mode="wait">
                  {filteredPosts.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <EmptyState onReset={handleReset} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={selectedCategory + currentPage}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-12"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        {currentPosts.map((post) => (
                          <motion.div
                            key={post.id}
                            variants={itemVariants}
                            whileHover={{
                              y: -10,
                              transition: { duration: 0.3 },
                            }}
                            className="group h-full"
                          >
                            {/* Card Wrapper với hiệu ứng viền Neon */}
                            <div className="h-full rounded-[2.2rem] bg-gradient-to-br from-gray-200 dark:from-white/5 to-transparent p-[1px] hover:from-orange-500/50 hover:to-purple-500/50 transition-all duration-500 shadow-lg hover:shadow-orange-500/10">
                              <div className="h-full rounded-[2.2rem] bg-white dark:bg-[#050505] overflow-hidden relative backface-hidden">
                                {" "}
                                {/* backface-hidden giúp fix lỗi nháy trên 1 số trình duyệt */}
                                <BlogPostCard post={post} />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <motion.div variants={itemVariants} className="pt-4">
                        <BlogPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={setCurrentPage}
                          startIndex={startIndex}
                          endIndex={endIndex}
                          totalPosts={filteredPosts.length}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* === RIGHT COLUMN: SIDEBAR === */}
              <motion.aside
                variants={itemVariants}
                className="lg:w-[400px] w-full space-y-10 sticky top-28"
              >
                {/* Popular Posts Wrapper */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-[2.2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <div className="relative p-8 rounded-[2rem] bg-white dark:bg-[#18181b]/90 border border-gray-200 dark:border-white/10 backdrop-blur-xl shadow-2xl">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500 mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                      Đang thịnh hành
                    </h3>
                    <PopularPosts posts={popularPosts} />
                  </div>
                </div>

                {/* Tags Cloud Wrapper */}
                <div className="p-8 rounded-[2rem] bg-white dark:bg-[#18181b]/80 border border-gray-200 dark:border-white/10 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Chủ đề hot
                  </h3>
                  <TagsCloud onTagClick={handleSearchChange} />
                </div>

                {/* Newsletter Wrapper (No extra padding needed as component is a card) */}
                <div className="relative transform hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-blue-500/30 blur-2xl rounded-full" />
                  <NewsletterCard />
                </div>
              </motion.aside>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
