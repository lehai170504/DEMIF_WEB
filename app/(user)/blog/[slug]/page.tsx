"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useBlogDetail, usePublicBlogs } from "@/hooks/use-blog";
import {
  BlogDetailHero,
  BlogCoverImage,
  BlogActionButtons,
  BlogArticleContent,
  RelatedPosts,
  TableOfContents,
  ShareSidebar,
  NotFoundPost,
} from "@/components/blog";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [tocSections, setTocSections] = useState<
    { id: string; title: string }[]
  >([]);

  // 1. LẤY SLUG TỪ URL (Note 5.2)
  const slug = useMemo(() => {
    const rawSlug = params?.slug || params?.id;
    return Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  }, [params]);

  // 2. FETCH CHI TIẾT QUA SLUG
  const {
    data: rawBlog,
    isLoading,
    isError,
  } = useBlogDetail(slug as string, "slug");

  // 3. FETCH BÀI VIẾT LIÊN QUAN (Lấy trang 1, cùng category)
  const { data: relatedData } = usePublicBlogs({
    category: rawBlog?.category || undefined,
    pageSize: 4,
  });

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // 4. GENERATE TABLE OF CONTENTS (Tự động từ content HTML)
  useEffect(() => {
    if (rawBlog?.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawBlog.content, "text/html");
      const headings = doc.querySelectorAll("h2, h3");

      const sections = Array.from(headings).map((heading, index) => {
        const title = heading.textContent || "";
        // Tạo ID giả lập nếu BE chưa có logic gán ID vào tag H2/H3
        const id = `heading-${index}`;
        return { id, title };
      });

      setTocSections(sections);
    }
  }, [rawBlog?.content]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 5. CHUẨN HÓA DỮ LIỆU HIỂN THỊ
  const post = useMemo(() => {
    if (!rawBlog) return null;

    return {
      ...rawBlog,
      // Ưu tiên category từ field riêng của BE (Note 5.4)
      displayCategory: rawBlog.category || "Kiến thức",
      tags:
        rawBlog.tags
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean) || [],
      thumbnailUrl:
        rawBlog.thumbnailUrl && rawBlog.thumbnailUrl !== "string"
          ? rawBlog.thumbnailUrl
          : undefined,
    };
  }, [rawBlog]);

  // 6. LỌC BÀI VIẾT LIÊN QUAN (Loại trừ bài đang xem)
  const relatedPosts = useMemo(() => {
    if (!relatedData?.items || !post) return [];
    return relatedData.items.filter((b) => b.id !== post.id).slice(0, 3);
  }, [relatedData, post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col items-center justify-center font-mono gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] animate-pulse">
          Đang giải mã nội dung...
        </p>
      </div>
    );
  }

  if (isError || !post) return <NotFoundPost />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-orange-500/[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Pass dữ liệu đã chuẩn hóa vào Hero */}
        <BlogDetailHero post={post} />

        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* LEFT COLUMN: NỘI DUNG CHÍNH */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8 space-y-12"
              >
                <BlogCoverImage
                  category={post.displayCategory}
                  thumbnailUrl={post.thumbnailUrl}
                  isFeatured={post.isFeatured}
                />

                <div className="sticky top-24 z-20 md:static md:z-auto">
                  <BlogActionButtons
                    copied={copied}
                    onCopyLink={handleCopyLink}
                    totalViews={post.viewCount}
                  />
                </div>

                <BlogArticleContent content={post.content} tags={post.tags} />

                {relatedPosts.length > 0 && (
                  <RelatedPosts posts={relatedPosts} />
                )}
              </motion.div>

              {/* RIGHT COLUMN: SIDEBAR */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-4 space-y-10 sticky top-28"
              >
                {tocSections.length > 0 && (
                  <TableOfContents sections={tocSections} />
                )}

                <ShareSidebar
                  title={post.title}
                  postUrl={currentUrl}
                  authorName={post.authorName}
                />
              </motion.aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
