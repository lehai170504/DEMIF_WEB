import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Trophy, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LessonDto } from "@/types/lesson.type";

interface DictationHeaderProps {
  lesson: LessonDto;
  level: string;
}

export function DictationHeader({ lesson, level }: DictationHeaderProps) {
  const getLevelColor = (lvl: string) => {
    const colors: Record<string, string> = {
      Beginner: "text-emerald-500 bg-emerald-500/10",
      Intermediate: "text-amber-500 bg-amber-500/10",
      Advanced: "text-rose-500 bg-rose-500/10",
      Expert: "text-purple-500 bg-purple-500/10",
    };
    return colors[lvl] || colors.Beginner;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl">
      <div className="container mx-auto max-w-[1600px] h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full bg-gray-100 dark:bg-white/5 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500"
          >
            <Link href="/dictation">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="space-y-0.5">
            <h1 className="text-sm md:text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-500 dark:text-zinc-500 uppercase font-black tracking-widest">
              <Badge
                className={cn("text-[9px] border-none", getLevelColor(level))}
              >
                {level}
              </Badge>
              <span className="flex items-center gap-1">
                <Volume2 className="h-3 w-3" />{" "}
                {Math.floor((lesson.durationSeconds || 0) / 60)}m
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20">
          <Trophy className="h-4 w-4 text-amber-500" />
          <span className="text-xs font-bold text-amber-500">
            Điểm cao: {lesson.avgScore?.toFixed(0) || 0}
          </span>
        </div>
      </div>
    </header>
  );
}
