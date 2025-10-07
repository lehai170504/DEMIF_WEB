"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface RecentLesson {
  lessonId: string
  title: string
  code: string
}

interface RecentLessonsProps {
  lessons: RecentLesson[]
}

export function RecentLessons({ lessons }: RecentLessonsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-gray-800">Nghe gần đây</h3>
        <Link href="/dictation" className="text-sm text-orange-600 hover:text-orange-700">
          Xem thêm
        </Link>
      </div>

      <div className="space-y-2">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.lessonId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/dictation/${lesson.lessonId}`}>
              <Card className="flex cursor-pointer items-center gap-4 border-orange-100 bg-white p-3 transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Play className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{lesson.code}</p>
                  <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
