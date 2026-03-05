"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getPostById, blogPosts } from "@/lib/data/blog";
import {
  BlogDetailHero,
  BlogCoverImage,
  BlogActionButtons,
  BlogArticleContent,
  AuthorCard,
  CommentsSection,
  RelatedPosts,
  TableOfContents,
  ShareSidebar,
  NotFoundPost,
} from "@/components/blog";
import { motion } from "framer-motion";

export default function BlogDetailPage() {
  const params = useParams();
  const postId = params.id as string;
  const post = getPostById(postId);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Hydration safe URL
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle not found state
  if (!post) {
    return <NotFoundPost />;
  }

  // Get related posts (same category, exclude current post)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Table of contents sections (mock data)
  const tocSections = [
    { id: "gioi-thieu", title: "Giới thiệu" },
    { id: "noi-dung-chinh", title: "Nội dung chính" },
    { id: "vi-du-thuc-te", title: "Ví dụ thực tế" },
    { id: "ket-luan", title: "Kết luận" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full opacity-60" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full opacity-60" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <BlogDetailHero post={post} />

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Main Article Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-8 space-y-10"
              >
                {/* Cover Image */}
                <BlogCoverImage category={post.category} />

                {/* Action Buttons (Sticky on Mobile, inline on Desktop) */}
                <div className="sticky top-20 z-20 md:static md:z-auto">
                  <BlogActionButtons
                    isLiked={isLiked}
                    isSaved={isSaved}
                    copied={copied}
                    likesCount={post.likes}
                    onLike={() => setIsLiked(!isLiked)}
                    onSave={() => setIsSaved(!isSaved)}
                    onCopyLink={handleCopyLink}
                  />
                </div>

                {/* Article Content */}
                <BlogArticleContent content={post.content} tags={post.tags} />

                {/* Author Card */}
                <AuthorCard author={post.author} />

                {/* Comments Section */}
                <CommentsSection />

                {/* Related Posts */}
                <RelatedPosts posts={relatedPosts} />
              </motion.div>

              {/* Sidebar Column */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-4 space-y-8 sticky top-24"
              >
                {/* Table of Contents */}
                <TableOfContents sections={tocSections} />

                {/* Share Sidebar */}
                <ShareSidebar title={post.title} postUrl={currentUrl} />
              </motion.aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
