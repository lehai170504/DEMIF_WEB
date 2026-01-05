"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
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

export default function BlogDetailPage() {
  const params = useParams();
  const postId = params.id as string;
  const post = getPostById(postId);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
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

  // Table of contents sections (mock data - in real app, parse from content)
  const tocSections = [
    { id: "gioi-thieu", title: "Giới thiệu" },
    { id: "noi-dung-chinh", title: "Nội dung chính" },
    { id: "vi-du-thuc-te", title: "Ví dụ thực tế" },
    { id: "ket-luan", title: "Kết luận" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <BlogDetailHero post={post} />

        {/* Cover Image */}
        <BlogCoverImage category={post.category} />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Main Article */}
              <div className="lg:col-span-8">
                {/* Action Buttons */}
                <BlogActionButtons
                  isLiked={isLiked}
                  isSaved={isSaved}
                  copied={copied}
                  likesCount={post.likes}
                  onLike={() => setIsLiked(!isLiked)}
                  onSave={() => setIsSaved(!isSaved)}
                  onCopyLink={handleCopyLink}
                />

                {/* Article Content */}
                <BlogArticleContent content={post.content} tags={post.tags} />

                {/* Author Card */}
                <AuthorCard author={post.author} />

                {/* Comments Section */}
                <CommentsSection />

                {/* Related Posts */}
                <RelatedPosts posts={relatedPosts} />
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Table of Contents */}
                <TableOfContents sections={tocSections} />

                {/* Share Sidebar */}
                <ShareSidebar
                  title={post.title}
                  postUrl={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
