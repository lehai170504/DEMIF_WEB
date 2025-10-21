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

  // Tăng cường màu sắc cho badge cấp độ
  const levelColors = {
    beginner: "text-green-700 bg-green-100 border border-green-200",
    intermediate: "text-yellow-700 bg-yellow-100 border border-yellow-200",
    advanced: "text-red-700 bg-red-100 border border-red-200",
  }

  const currentLessons = lessonsByCategory[activeTab]

  return (
    <div className="space-y-6">
      
      {/* HEADER: Font chữ đậm hơn, tracking chặt chẽ hơn */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
          Bài học đề xuất
        </h3>
      </div>

      {/* TABS: Thiết kế tab sạch và hiện đại hơn */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="h-10 bg-gray-100 p-1 rounded-xl shadow-inner">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-orange-600 transition-all duration-200 rounded-lg font-semibold">Tất cả</TabsTrigger>
          <TabsTrigger value="beginner" className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-orange-600 transition-all duration-200 rounded-lg font-semibold">Cơ bản</TabsTrigger>
          <TabsTrigger value="intermediate" className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-orange-600 transition-all duration-200 rounded-lg font-semibold">Trung cấp</TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-orange-600 transition-all duration-200 rounded-lg font-semibold">Nâng cao</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentLessons.slice(0, 6).map((lesson, index) => (
          <motion.div
            key={lesson.lessonId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
          >
            <Link href={`/dictation/${lesson.lessonId}`} className="block">
              <Card 
                className="cursor-pointer border border-gray-100 bg-white p-4 transition-all duration-200 
                           shadow-md hover:shadow-lg hover:border-orange-500 transform hover:-translate-y-0.5 rounded-xl h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    {/* TITLE: Font chữ đậm và rõ ràng */}
                    <h4 className="flex-1 font-semibold text-gray-900 line-clamp-2">
                      {lesson.title}
                    </h4>
                    
                    {/* RATING: Màu vàng mạnh, ngôi sao được tô đầy */}
                    {lesson.rating && (
                      <div className="flex items-center gap-1 text-sm text-yellow-600 font-bold flex-shrink-0">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span>{lesson.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* LEVEL BADGE: Thiết kế badge rõ ràng hơn với viền */}
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase shadow-sm ${levelColors[lesson.level as keyof typeof levelColors]}`}
                    >
                      {lesson.level}
                    </span>
                    
                    {/* DURATION: Icon Clock nhỏ gọn, chữ xám tinh tế */}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{lesson.duration} phút</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {currentLessons.length === 0 && (
          <div className="p-6 text-center text-gray-500 italic bg-gray-50 rounded-xl">
              Không có bài học nào được đề xuất ở cấp độ này.
          </div>
      )}
    </div>
  )
}
