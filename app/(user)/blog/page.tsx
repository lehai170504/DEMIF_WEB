"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useBlogs } from "@/hooks/use-blogs";
import { BlogDto } from "@/types/blog.type";
import { Loader2, RefreshCw, Search } from "lucide-react"; // Thêm Search icon

// Import các component UI
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

  // 1. FETCH DỮ LIỆU TỪ API
  const { data: rawBlogs = [], isLoading, isError, refetch } = useBlogs();

  // 2. CHUẨN HÓA DỮ LIỆU
  const publishedBlogs = useMemo(() => {
    return rawBlogs
      .filter((b: BlogDto) => b.status === "Published")
      .map((b) => {
        const tagsArray =
          b.tags && b.tags !== "string"
            ? b.tags.split(",").map((t) => t.trim())
            : [];
        return {
          id: b.id,
          title: b.title,
          excerpt: b.summary && b.summary !== "string" ? b.summary : null,
          category: tagsArray.length > 0 ? tagsArray[0] : "Kiến thức chung",
          viewCount: b.viewCount || 0,
          createdAt: b.createdAt,
          authorId: b.authorId || "Quản trị viên",
          thumbnailUrl:
            b.thumbnailUrl && b.thumbnailUrl !== "string"
              ? b.thumbnailUrl
              : undefined,
          _internalTagsArray: tagsArray,
        };
      });
  }, [rawBlogs]);

  // 3. TÌM KIẾM & LỌC
  const filteredPosts = useMemo(() => {
    return publishedBlogs.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchLower) ||
        (post.excerpt || "").toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [publishedBlogs, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  // 4. CÁC BIẾN PHỤ TRỢ (Categories, Tags, Featured...)
  const blogCategories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(publishedBlogs.map((b) => b.category)),
    );
    return [
      { id: "all", name: "Tất cả", count: publishedBlogs.length },
      ...uniqueCategories.map((cat) => ({
        id: cat,
        name: cat,
        count: publishedBlogs.filter((b) => b.category === cat).length,
      })),
    ];
  }, [publishedBlogs]);

  const featuredPosts = useMemo(
    () =>
      [...publishedBlogs]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 3),
    [publishedBlogs],
  );
  const popularPosts = useMemo(
    () =>
      [...publishedBlogs].sort((a, b) => b.viewCount - a.viewCount).slice(0, 4),
    [publishedBlogs],
  );
  const allTags = useMemo(
    () =>
      Array.from(
        new Set(publishedBlogs.flatMap((p) => p._internalTagsArray || [])),
      ),
    [publishedBlogs],
  );

  // Handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  // --- Animation Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#050505] font-mono pb-20 relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] z-0" />
      </div>

      <div className="relative z-10">
        {/* BlogHero giờ đây không chứa thanh Search nữa */}
        <BlogHero />

        <main className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Featured Posts Section */}
            {featuredPosts.length > 0 &&
              selectedCategory === "all" &&
              searchQuery === "" && (
                <motion.section variants={itemVariants} className="pt-8">
                  <div className="mb-8 flex items-center gap-3 px-2">
                    <div className="h-8 w-1.5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                      Tiêu điểm tuần
                    </h2>
                  </div>
                  <FeaturedPosts posts={featuredPosts} />
                </motion.section>
              )}

            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* LEFT COLUMN: DANH SÁCH BÀI VIẾT (Tập trung chính) */}
              <div className="flex-1 w-full space-y-8 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <CategoryFilter
                    categories={blogCategories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                  <ResultsInfo
                    totalResults={filteredPosts.length}
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {filteredPosts.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <EmptyState onReset={handleReset} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={selectedCategory + searchQuery}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-12"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        {filteredPosts
                          .slice(
                            (currentPage - 1) * POSTS_PER_PAGE,
                            currentPage * POSTS_PER_PAGE,
                          )
                          .map((post) => (
                            <motion.div
                              key={post.id}
                              variants={itemVariants}
                              className="h-full"
                            >
                              <BlogPostCard post={post} />
                            </motion.div>
                          ))}
                      </div>
                      {filteredPosts.length > POSTS_PER_PAGE && (
                        <BlogPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={setCurrentPage}
                          startIndex={startIndex}
                          endIndex={endIndex}
                          totalPosts={filteredPosts.length}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* RIGHT COLUMN: SIDEBAR (Thanh công cụ phụ trợ) */}
              <aside className="lg:w-[380px] w-full space-y-10 sticky top-28">
                {/* THANH SEARCH ĐÃ CHUYỂN VÀO ĐÂY */}
                <div className="p-1 bg-gradient-to-br from-gray-200 dark:from-white/10 to-transparent rounded-[2rem] shadow-xl">
                  <div className="p-6 bg-white dark:bg-[#0a0a0a] rounded-[1.9rem]">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4 px-2">
                      Tìm kiếm
                    </h3>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Nhập từ khóa..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full h-14 pl-12 pr-4 bg-gray-100 dark:bg-white/5 border border-transparent focus:border-orange-500/50 rounded-2xl outline-none transition-all font-bold text-sm"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Popular Posts */}
                {popularPosts.length > 0 && (
                  <div className="p-8 rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 shadow-2xl">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />{" "}
                      Đang thịnh hành
                    </h3>
                    <PopularPosts posts={popularPosts} />
                  </div>
                )}

                {/* Tags Cloud */}
                <div className="p-8 rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 shadow-2xl">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Chủ đề
                  </h3>
                  <TagsCloud
                    tags={allTags}
                    onTagClick={(tag) => {
                      setSearchQuery(tag);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                {/* Newsletter */}
                <NewsletterCard />
              </aside>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
