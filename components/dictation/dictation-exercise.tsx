"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Volume2, ListChecks, Lightbulb, NotepadText } from "lucide-react" // Added more icons for sidebars
import type { Lesson } from "@/lib/data/lessons"
import { AudioPlayer } from "./audio-player"
import { TranscriptBox } from "./transcript-box"
import { NotesPanel } from "./notes-panel"
import { VocabularyPanel } from "./vocabulary-panel"
import { LeaderboardTop } from "./leaderboard-top"
import { motion } from "framer-motion"

interface DictationExerciseProps {
  lesson: Lesson
}

export function DictationExercise({ lesson }: DictationExerciseProps) {
  const [playCount, setPlayCount] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")

  type LessonLevel = "beginner" | "intermediate" | "advanced";

  const maxPlays = 3

  const getLevelBadgeClasses = (level: LessonLevel): string => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700";
      case "intermediate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700";
      case "advanced":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500";
    }
  };

  const levelText = lesson.level === "beginner" ? "Sơ cấp" : lesson.level === "intermediate" ? "Trung cấp" : "Nâng cao";

  return (
    // Updated background to a softer, more professional gradient
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-mono">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border-b border-gray-200/70 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild 
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <Link href="/dictation">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <div>
                <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">{lesson.title}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{lesson.description}</p>
              </div>
            </div>
            {/* Level Badge in Header */}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelBadgeClasses(lesson.level as LessonLevel)} border`}>
              {levelText}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Leaderboard remains separate, spanning full width */}
        <div className="mb-6">
          <LeaderboardTop />
        </div>

        {/* 3-Column Layout: 280px | 1fr (main content) | 280px */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6">
          
          {/* 1. Cột Trái: Chi tiết & Ghi chú */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Chi tiết bài học */}
            <Card className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="flex items-center font-bold text-base text-primary mb-3">
                <ListChecks className="h-4 w-4 mr-2" />
                Chi Tiết Bài Tập
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-1 border-b border-dashed border-gray-100 dark:border-gray-700">
                  <span className="text-slate-600 dark:text-slate-400">Thời lượng:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{lesson.duration} giây</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-dashed border-gray-100 dark:border-gray-700">
                  <span className="text-slate-600 dark:text-slate-400">Cấp độ:</span>
                  <span className={`font-semibold text-sm ${lesson.level === 'advanced' ? 'text-red-600' : 'text-primary'}`}>{levelText}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600 dark:text-slate-400">Lượt nghe còn lại:</span>
                  <span className="font-extrabold text-lg text-primary">
                    {maxPlays - playCount}
                    <span className="text-sm text-slate-500 font-medium">/{maxPlays}</span>
                  </span>
                </div>
              </div>
            </Card>

            {/* Ghi chú */}
            <NotesPanel />
          </motion.div>

          {/* 2. Cột Giữa: Audio & Transcript Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Audio Player Card (Focus Card) */}
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl border-2 border-primary/50 dark:border-primary/50">
              <div className="text-center mb-5">
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-1 flex items-center justify-center">
                  <Volume2 className="h-6 w-6 mr-2 text-primary" />
                  Nghe & Chép Chính Tả
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Sử dụng {maxPlays} lượt nghe của bạn một cách khôn ngoan.
                </p>
              </div>

              <AudioPlayer
                audioUrl={lesson.audioUrl}
                duration={lesson.duration}
                maxPlays={maxPlays}
                onPlayCountChange={setPlayCount}
              />
            </Card>

            {/* Transcript Input Box */}
            <TranscriptBox 
              correctTranscript={lesson.transcript} 
              onSubmit={setUserAnswer} 
            />
          </motion.div>

          {/* 3. Cột Phải: Từ vựng & Mẹo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Từ vựng */}
            <VocabularyPanel lessonVocab={lesson.vocabulary} />

            {/* Mẹo nhanh */}
            <Card className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="flex items-center font-bold text-base text-primary mb-3">
                <Lightbulb className="h-4 w-4 mr-2" />
                Mẹo Nhanh Luyện Tập
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    **Nghe theo cụm:** Đừng cố gắng nghe từng từ, hãy nghe trọn vẹn một cụm từ hoặc câu ngắn.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    **Kiểm tra ngữ pháp:** Sau khi gõ, hãy kiểm tra các dấu câu, chữ hoa và lỗi ngữ pháp cơ bản.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    **Sử dụng Từ vựng:** Xem qua phần **Từ Vựng** trước khi nghe để làm quen với các từ khó.
                  </span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}