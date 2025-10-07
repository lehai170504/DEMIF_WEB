"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
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

  const maxPlays = 3

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-orange-100/50">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-orange-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="hover:bg-orange-50 text-slate-700 rounded-xl">
                <Link href="/dictation">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Link>
              </Button>
              <div className="h-8 w-px bg-orange-200" />
              <div>
                <h1 className="text-lg font-bold text-slate-800">{lesson.title}</h1>
                <p className="text-xs text-slate-600">{lesson.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-orange-100 text-[#FF7A00] rounded-full text-xs font-semibold border border-orange-200">
                {lesson.level}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <LeaderboardTop />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <Card className="p-3 border border-orange-200/70 bg-white shadow-sm rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2 text-xs">Chi tiết bài học</h3>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Thời lượng:</span>
                  <span className="font-semibold">{lesson.duration}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cấp độ:</span>
                  <span className="font-semibold text-[#FF7A00]">{lesson.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Lượt nghe còn lại:</span>
                  <span className="font-semibold">
                    {maxPlays - playCount}/{maxPlays}
                  </span>
                </div>
              </div>
            </Card>

            <NotesPanel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <Card className="p-5 border border-orange-200/70 bg-white shadow-sm rounded-xl">
              <div className="text-center mb-3">
                <h2 className="text-lg font-bold text-slate-800 mb-1">Nghe & Gõ</h2>
                <p className="text-xs text-slate-600">Nghe cẩn thận và gõ những gì bạn nghe được</p>
              </div>

              <AudioPlayer
                audioUrl={lesson.audioUrl}
                duration={lesson.duration}
                maxPlays={maxPlays}
                onPlayCountChange={setPlayCount}
              />
            </Card>

            <TranscriptBox correctTranscript={lesson.transcript} onSubmit={setUserAnswer} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <VocabularyPanel lessonVocab={lesson.vocabulary} />

            <Card className="p-3 border border-orange-200/70 bg-white shadow-sm rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2 text-xs">Mẹo nhanh</h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00]">•</span>
                  <span>Nghe nhiều lần trước khi gõ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00]">•</span>
                  <span>Tập trung vào cách phát âm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00]">•</span>
                  <span>Kiểm tra từ vựng trước khi bắt đầu</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
