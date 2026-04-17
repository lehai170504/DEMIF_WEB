"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePublicBlogs } from "@/hooks/use-blog";
import { GetBlogsParams } from "@/types/blog.type";
import { Loader2, Search, Hash, LayoutGrid, X } from "lucide-react";

import { BlogHero } from "@/components/blog/BlogHero";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { ResultsInfo } from "@/components/blog/ResultsInfo";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { EmptyState } from "@/components/blog/EmptyState";
import { PopularPosts } from "@/components/blog/PopularPosts";
import { TagsCloud } from "@/components/blog/TagsCloud";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [params, setParams] = useState<
    GetBlogsParams & { selectedTag: string }
  >({
    page: 1,
    pageSize: POSTS_PER_PAGE,
    search: "",
    tag: undefined, // Lọc theo tag
    sortBy: "publishedAt",
    sortDirection: "desc",
    selectedTag: "all",
  });

  const debouncedSearch = useDebounce(params.search, 500);

  // 1. FETCH DỮ LIỆU
  const { data, isLoading } = usePublicBlogs({
    ...params,
    search: debouncedSearch,
    page: params.page,
  });

  const blogs = data?.items || [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount || 0;

  // 2. LOGIC TRÍCH XUẤT TAGS TỪ DATA (Lấy những tag đang hiện diện)
  const dynamicTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogs.forEach((blog) => {
      if (blog.tags) {
        blog.tags.split(",").forEach((t) => tagsSet.add(t.trim()));
      }
    });
    return Array.from(tagsSet).slice(0, 10); // Lấy top 10 tag để tránh tràn UI
  }, [blogs]);

  // 3. LOGIC TIÊU ĐIỂM
  const featuredPosts = useMemo(
    () => blogs.filter((b) => b.isFeatured).slice(0, 3),
    [blogs],
  );

  const popularPosts = useMemo(
    () => [...blogs].sort((a, b) => b.viewCount - a.viewCount).slice(0, 4),
    [blogs],
  );

  // Handlers
  const handleTagChange = (tag: string) => {
    setParams((prev) => ({
      ...prev,
      tag: tag === "all" ? undefined : tag,
      selectedTag: tag,
      page: 1,
    }));
  };

  const updatePage = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  const handleReset = () => {
    setParams({
      page: 1,
      pageSize: POSTS_PER_PAGE,
      search: "",
      tag: undefined,
      selectedTag: "all",
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#050505] font-mono pb-24 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <BlogHero />

        <main className="container mx-auto px-4 lg:px-6 pt-4 max-w-7xl">
          <div className="max-w-2xl mx-auto mb-16 relative group">
            <div className="absolute inset-0 bg-orange-500/20 blur-2xl group-focus-within:bg-orange-500/30 transition-all rounded-full" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* FEATURED SECTION */}
            {featuredPosts.length > 0 &&
              params.selectedTag === "all" &&
              !params.search && (
                <section className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20">
                      <LayoutGrid className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-neutral-800 uppercase tracking-tighter">
                      Tiêu điểm
                    </h2>
                  </div>
                  <FeaturedPosts posts={featuredPosts} />
                </section>
              )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-10">
                {/* DYNAMIC TAG FILTER */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                      <Hash className="w-4 h-4 text-orange-500" /> Chủ đề đang
                      nóng
                    </div>
                    <ResultsInfo
                      totalResults={totalCount}
                      searchQuery={params.search || ""}
                      selectedCategory={params.selectedTag}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleTagChange("all")}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                        params.selectedTag === "all"
                          ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                          : "bg-white/5 border-white/5 text-gray-400 hover:border-orange-500/50",
                      )}
                    >
                      Tất cả
                    </button>
                    {dynamicTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagChange(tag)}
                        className={cn(
                          "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                          params.selectedTag === tag
                            ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                            : "bg-white/5 border-white/5 text-gray-400 hover:border-orange-500/50",
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BLOG LIST */}
                <AnimatePresence mode="wait">
                  {blogs.length === 0 ? (
                    <EmptyState onReset={handleReset} />
                  ) : (
                    <motion.div
                      key={params.selectedTag + debouncedSearch + params.page}
                      className="space-y-12"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        {blogs.map((post) => (
                          <BlogPostCard key={post.id} post={post} />
                        ))}
                      </div>

                      {totalPages > 1 && (
                        <BlogPagination
                          currentPage={params.page || 1}
                          totalPages={totalPages}
                          onPageChange={updatePage}
                          startIndex={((params.page || 1) - 1) * POSTS_PER_PAGE}
                          endIndex={Math.min(
                            (params.page || 1) * POSTS_PER_PAGE,
                            totalCount,
                          )}
                          totalPosts={totalCount}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR */}
              <aside className="lg:col-span-4 space-y-10 sticky top-28">
                <div className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 shadow-2xl space-y-12">
                  <section>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />{" "}
                      Đang thịnh hành
                    </h3>
                    <PopularPosts posts={popularPosts} />
                  </section>

                  <section>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" /> Tất
                      cả từ khóa
                    </h3>
                    <TagsCloud
                      tags={[
                        "IELTS",
                        "Tips",
                        "Grammar",
                        "Speaking",
                        "Listening",
                        "Vocabulary",
                      ]}
                      onTagClick={handleTagChange}
                    />
                  </section>
                </div>
              </aside>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
