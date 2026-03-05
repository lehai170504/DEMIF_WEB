"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen } from "lucide-react";

interface LessonCardSmallProps {
  id: string;
  title: string;
  code: string;
  views: number;
  source: string;
  thumbnail: string;
}

export function LessonCardSmall({
  id,
  title,
  code,
  views,
  source,
  thumbnail,
}: LessonCardSmallProps) {
  return (
    <Card className="group p-3 border border-gray-200 dark:border-white/5 bg-white dark:bg-[#18181b] hover:bg-gray-50 dark:hover:bg-[#202023] hover:border-orange-500/30 transition-all cursor-pointer rounded-2xl">
      <div className="flex gap-4 items-center">
        {/* Thumbnail Area */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-600 to-red-600 shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <Badge
              variant="outline"
              className="text-[9px] font-bold border-orange-500/30 text-orange-400 bg-orange-500/10 px-1.5 py-0 rounded"
            >
              {code}
            </Badge>
            <span className="text-[9px] text-gray-500 dark:text-zinc-600 font-bold uppercase tracking-wide">
              ESL
            </span>
          </div>

          <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1 mb-1.5 group-hover:text-orange-400 transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wide">
            <div className="flex items-center gap-1">
              <Play className="h-2.5 w-2.5" />
              <span>{views}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-2.5 w-2.5" />
              <span>{source}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
