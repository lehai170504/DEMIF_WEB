"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Lesson {
  lessonId: string
  title: string
  duration: number
  level: string
  category: string
  rating?: number
}

interface RecommendedLessonsProps {
  lessonsByCategory: {
    all: Lesson[]
    beginner: Lesson[]
    intermediate: Lesson[]
    advanced: Lesson[]
  }
}

export function RecommendedLessons({ lessonsByCategory }: RecommendedLessonsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")

  const levelColors = {
    beginner: "text-green-600 bg-green-50",
    intermediate: "text-yellow-600 bg-yellow-50",
    advanced: "text-red-600 bg-red-50",
  }

  const currentLessons = lessonsByCategory[activeTab]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-gray-800">Bài học đề xuất</h3>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="bg-orange-50">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="beginner">Cơ bản</TabsTrigger>
          <TabsTrigger value="intermediate">Trung cấp</TabsTrigger>
          <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 gap-4">
        {currentLessons.slice(0, 6).map((lesson, index) => (
          <motion.div
            key={lesson.lessonId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/dictation/${lesson.lessonId}`}>
              <Card className="cursor-pointer border-orange-100 bg-white p-4 transition-all hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="flex-1 font-medium text-gray-800">{lesson.title}</h4>
                    {lesson.rating && (
                      <div className="flex items-center gap-1 text-xs text-yellow-600">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{lesson.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${levelColors[lesson.level as keyof typeof levelColors]}`}
                    >
                      {lesson.level}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{lesson.duration} phút</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
