"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useBlogDetail } from "@/hooks/use-manage-blog";
import { useBlogs } from "@/hooks/use-blogs";
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

  const postId = useMemo(() => {
    const rawId = params?.id;
    return Array.isArray(rawId) ? rawId[0] : rawId;
  }, [params?.id]);

  const { data: rawBlog, isLoading, isError } = useBlogDetail(postId as string);
  const { data: allBlogs = [] } = useBlogs();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (rawBlog?.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawBlog.content, "text/html");
      const headings = doc.querySelectorAll("h2, h3");

      const sections = Array.from(headings).map((heading, index) => {
        const title = heading.textContent || "";
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

  const post = useMemo(() => {
    if (!rawBlog) return null;

    const tagsArray =
      rawBlog.tags && rawBlog.tags !== "string"
        ? rawBlog.tags.split(",").map((t) => t.trim())
        : ["Kiến thức chung"];

    return {
      ...rawBlog,
      category: tagsArray[0],
      tags: tagsArray,
      excerpt:
        rawBlog.summary && rawBlog.summary !== "string"
          ? rawBlog.summary
          : null,
      thumbnailUrl:
        rawBlog.thumbnailUrl && rawBlog.thumbnailUrl !== "string"
          ? rawBlog.thumbnailUrl
          : undefined,
    };
  }, [rawBlog]);

  const relatedPosts = useMemo(() => {
    if (!post || allBlogs.length === 0) return [];

    return allBlogs
      .filter((b) => b.status === "Published" && b.id !== post.id)
      .map((b) => {
        const tArray =
          b.tags && b.tags !== "string"
            ? b.tags.split(",").map((t) => t.trim())
            : ["Kiến thức"];
        return {
          id: b.id,
          title: b.title,
          category: tArray[0],
          excerpt: b.summary && b.summary !== "string" ? b.summary : null,
          viewCount: b.viewCount || 0,
          thumbnailUrl:
            b.thumbnailUrl && b.thumbnailUrl !== "string"
              ? b.thumbnailUrl
              : undefined,
        };
      })
      .filter((p) => p.category === post.category)
      .slice(0, 3);
  }, [allBlogs, post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col items-center justify-center font-mono gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">
          Đang tải nội dung...
        </p>
      </div>
    );
  }

  if (isError || !post) return <NotFoundPost />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full opacity-60" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full opacity-60" />
      </div>

      <div className="relative z-10">
        <BlogDetailHero post={post} />

        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-8 space-y-10"
              >
                <BlogCoverImage
                  category={post.category}
                  thumbnailUrl={post.thumbnailUrl}
                />

                <div className="sticky top-20 z-20 md:static md:z-auto">
                  <BlogActionButtons
                    copied={copied}
                    onCopyLink={handleCopyLink}
                  />
                </div>

                <BlogArticleContent content={post.content} tags={post.tags} />

                <RelatedPosts posts={relatedPosts} />
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-4 space-y-8 sticky top-24"
              >
                <TableOfContents sections={tocSections} />
                <ShareSidebar title={post.title} postUrl={currentUrl} />
              </motion.aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
