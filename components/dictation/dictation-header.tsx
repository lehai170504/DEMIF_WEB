import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Trophy, Video, Volume2, Layout, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { LessonDto } from "@/types/lesson.type";
import { usePathname } from "next/navigation";

interface DictationHeaderProps {
  lesson: LessonDto;
  level: string;
}

export function DictationHeader({ lesson, level }: DictationHeaderProps) {
  const pathname = usePathname();

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
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/90 backdrop-blur-xl">
      <div className="container mx-auto max-w-[1600px] h-14 flex items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full h-8 w-8 hover:bg-white/5"
          >
            <Link href="/dictation">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Badge
              className={cn("text-[9px] px-2 py-0 h-4 border-none font-black uppercase tracking-tighter", getLevelColor(level))}
            >
              {level.charAt(0)}
            </Badge>
            <h1 className="text-sm font-bold tracking-tight text-white line-clamp-1 max-w-[300px]">
              {lesson.title}
            </h1>
          </div>
        </div>


        {/* Right Section */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[10px] font-black text-amber-500 tracking-tighter">
              {lesson.avgScore?.toFixed(0) || 0}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

