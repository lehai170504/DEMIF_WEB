"use client";

import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/data/blog";

interface TagsCloudProps {
  onTagClick: (tag: string) => void;
}

export function TagsCloud({ onTagClick }: TagsCloudProps) {
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="cursor-pointer border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 px-3 py-1.5 text-xs font-medium"
          onClick={() => onTagClick(tag)}
        >
          #{tag}
        </Badge>
      ))}
    </div>
  );
}
