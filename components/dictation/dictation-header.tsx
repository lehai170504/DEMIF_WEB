import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, Clock, CheckCircle2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { LessonDto } from "@/types/lesson.type";
import { usePathname } from "next/navigation";

interface DictationHeaderProps {
  lesson: LessonDto;
  level: string;
  onSelectLevel: (lvl: string) => void;
  progress: number;
}

export function DictationHeader({ lesson, level, onSelectLevel, progress }: DictationHeaderProps) {
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

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto max-w-[1700px] h-14 flex items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full h-8 w-8 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-zinc-400"
          >
            <Link href="/dictation">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider line-clamp-1 max-w-[250px]">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Center Section: Progress & Level Selector (RESTRUCTURED) */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {/* Level Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-8 px-3 rounded-full font-black text-[10px] uppercase tracking-widest gap-2", getLevelColor(level))}
              >
                {level}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-40 rounded-xl">
              {levels.map((l) => (
                <DropdownMenuItem
                  key={l}
                  onSelect={() => onSelectLevel(l)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest cursor-pointer",
                    level === l ? "text-orange-500 bg-orange-500/5" : "text-muted-foreground"
                  )}
                >
                  {l}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Compact Progress */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden border border-gray-200/50 dark:border-white/5">
              <Progress value={progress} className="h-full bg-orange-500" />
            </div>
            <span className="text-[10px] font-black text-gray-500 dark:text-zinc-400 tabular-nums w-8">
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {/* Space for future items? */}
        </div>
      </div>
    </header>
  );
}

