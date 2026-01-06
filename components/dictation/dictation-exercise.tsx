"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Trophy, Volume2, Info, Lightbulb } from "lucide-react";
import type { Lesson } from "@/lib/data/lessons";
import { AudioPlayer } from "./audio-player";
import { TranscriptBox } from "./transcript-box";
import { NotesPanel } from "./notes-panel";
import { VocabularyPanel } from "./vocabulary-panel";
import { LeaderboardTop } from "./leaderboard-top";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@radix-ui/react-progress";

export function DictationExercise({ lesson }: { lesson: Lesson }) {
  const [playCount, setPlayCount] = useState(0);
  const maxPlays = 3;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-mono antialiased text-slate-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-[1440px] h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full"
            >
              <Link href="/user/dictation">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="space-y-0.5">
              <h1 className="text-sm md:text-base font-bold tracking-tight line-clamp-1">
                {lesson.title}
              </h1>
              <div className="flex items-center gap-2 text-[10px] md:text-[11px] text-muted-foreground uppercase font-black tracking-widest">
                <span className="px-2 py-0.5 rounded-md border border-orange-100 bg-orange-50 text-orange-600">
                  {lesson.level === "beginner"
                    ? "Sơ cấp"
                    : lesson.level === "intermediate"
                    ? "Trung cấp"
                    : "Nâng cao"}
                </span>
                <span>• {lesson.duration}s Audio</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-bold text-amber-700">Level 12</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-[1440px] px-6 py-8">
        <LeaderboardTop />

        {/* 2. BỐ CỤC GRID - LOẠI BỎ items-start ĐỂ CÁC CỘT CUỘN TỰ NHIÊN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* CỘT TRÁI - Đã bỏ sticky */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-[2rem]">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-2 font-black text-slate-400 uppercase text-[10px] tracking-widest">
                  <Info className="h-4 w-4 text-primary" />
                  Tiến độ bài học
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-500">
                      Lượt nghe
                    </span>
                    <span className="text-sm font-black text-primary">
                      {playCount} / {maxPlays}
                    </span>
                  </div>
                  <Progress value={33} />{" "}
                  {/* Giả sử bạn có component Progress */}
                </div>
              </CardContent>
            </Card>
            <NotesPanel />
          </aside>

          {/* CỘT GIỮA - Nội dung chính */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-14 text-center">
              <div className="inline-flex p-5 rounded-[2rem] bg-primary/10 text-primary mb-8">
                <Volume2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-black mb-12">Nghe & Chép lại</h2>
              <AudioPlayer
                audioUrl={lesson.audioUrl}
                duration={lesson.duration}
                maxPlays={maxPlays}
                onPlayCountChange={setPlayCount}
              />
            </Card>
            <TranscriptBox
              correctTranscript={lesson.transcript}
              onSubmit={(val) => console.log(val)}
            />
          </div>

          {/* CỘT PHẢI - Đã bỏ sticky hoàn toàn */}
          <aside className="col-span-1 lg:col-span-3 space-y-6">
            <VocabularyPanel lessonVocab={lesson.vocabulary} />
          </aside>
        </div>
      </main>
    </div>
  );
}
