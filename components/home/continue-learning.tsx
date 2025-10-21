"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface Lesson {
  lessonId: string;
  title: string;
  progress: number;
  level: string;
  duration: number;
  category: string;
}

interface ContinueLearningProps {
  lessons: Lesson[];
}

export function ContinueLearning({ lessons }: ContinueLearningProps) {
  const levelColors = {
    beginner: "bg-green-500",
    intermediate: "bg-yellow-500",
    advanced: "bg-red-500",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-gray-800">
          Tiếp tục học
        </h3>
        <Link
          href="/dictation"
          className="text-sm text-orange-600 hover:text-orange-700"
        >
          Xem thêm
        </Link>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar 
        /* CÁC LỚP MỚI ĐƯỢC THÊM VÀO */
        cursor-grab active:cursor-grabbing scroll-smooth snap-x snap-mandatory 
      "
      >
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.lessonId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/dictation/${lesson.lessonId}`}>
              <Card 
                className="w-64 flex-shrink-0 cursor-pointer border-orange-100 bg-white p-4 transition-all hover:shadow-md 
                /* THÊM LỚP SNAP-START */
                snap-start"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-gray-500 capitalize">
                        {lesson.category}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs text-white ${
                        levelColors[lesson.level as keyof typeof levelColors]
                      }`}
                    >
                      {lesson.level}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Tiến độ</span>
                      <span>{Math.round(lesson.progress * 100)}%</span>
                    </div>
                    <Progress value={lesson.progress * 100} className="h-2" />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{lesson.duration} phút</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+{Math.round(lesson.progress * 100)} XP</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}