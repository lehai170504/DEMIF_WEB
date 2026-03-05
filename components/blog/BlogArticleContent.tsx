"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Hash } from "lucide-react";

interface BlogArticleContentProps {
  content: string;
  tags: string[];
}

export function BlogArticleContent({ content, tags }: BlogArticleContentProps) {
  return (
    <Card className="p-8 md:p-12 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] rounded-[2rem] shadow-2xl overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

      {/* Article Content (Prose Dark Mode) */}
      <div className="prose prose-invert prose-lg max-w-none dark:prose-invert">
        <div
          className="text-gray-700 dark:text-zinc-300 leading-relaxed space-y-6 font-light"
          style={{
            fontSize: "1.125rem",
            lineHeight: "2rem",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Tags */}
      <Separator className="my-10 bg-gray-200 dark:bg-white/10" />
      <div>
        <h3 className="text-xs font-black text-gray-500 dark:text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Hash className="h-3 w-3" /> Chủ đề liên quan
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/blog?search=${tag}`}>
              <Badge
                variant="outline"
                className="px-4 py-1.5 rounded-full border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all cursor-pointer font-medium"
              >
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <Separator className="my-10 bg-gray-200 dark:bg-white/10" />
      <div>
        <h3 className="text-xs font-black text-gray-500 dark:text-zinc-500 uppercase tracking-widest mb-4">
          Chia sẻ kiến thức này
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="h-11 rounded-xl border-gray-200 dark:border-white/10 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all font-bold"
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-xl border-gray-200 dark:border-white/10 bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all font-bold"
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-xl border-gray-200 dark:border-white/10 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all font-bold"
          >
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
        </div>
      </div>
    </Card>
  );
}
