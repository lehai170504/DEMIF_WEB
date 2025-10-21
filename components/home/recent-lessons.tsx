"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import React from "react"

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
    <div className="space-y-5">
      
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
          Nghe gần đây
        </h3>
        <Link 
          href="/dictation" 
          className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
        >
          Xem thêm &rarr;
        </Link>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.lessonId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
          >
            <Link href={`/dictation/${lesson.lessonId}`} className="block">
              <Card 
                className="flex cursor-pointer items-center gap-4 border border-gray-100 bg-white p-4 transition-all duration-200 
                           shadow-md hover:shadow-lg hover:border-orange-300 transform hover:-translate-y-0.5"
              >
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 
                             ring-4 ring-orange-100/50 transition-colors"
                >
                  <Play className="h-5 w-5 fill-orange-600 text-orange-600" />
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 truncate">
                    {lesson.code}
                  </p>
                  <h4 className="text-base font-semibold text-gray-800 truncate">
                    {lesson.title}
                  </h4>
                </div>

                <Play 
                  className="h-5 w-5 text-gray-400 ml-auto flex-shrink-0 transition-colors group-hover:text-orange-600"
                />
              </Card>
            </Link>
          </motion.div>
        ))}
        {lessons.length === 0 && (
            <p className="text-gray-500 italic p-4">Bạn chưa bắt đầu bài học nào gần đây.</p>
        )}
      </div>
    </div>
  )
}
