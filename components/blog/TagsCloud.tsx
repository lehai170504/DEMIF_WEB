"use client";

import { Badge } from "@/components/ui/badge";

// Thêm prop tags để nhận danh sách tag thật từ API
interface TagsCloudProps {
  tags: string[];
  onTagClick: (tag: string) => void;
}

export function TagsCloud({ tags, onTagClick }: TagsCloudProps) {
  // Nếu chưa có tag nào thì hiện thông báo nhỏ
  if (!tags || tags.length === 0) {
    return (
      <p className="text-xs text-gray-500 dark:text-zinc-500 italic">
        Chưa có chủ đề nào.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="cursor-pointer border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 px-3 py-1.5 text-xs font-medium shadow-sm"
          onClick={() => onTagClick(tag)}
        >
          #{tag}
        </Badge>
      ))}
    </div>
  );
}
