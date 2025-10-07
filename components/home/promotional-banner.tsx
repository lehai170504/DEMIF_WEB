"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Banner {
  id: string
  title: string
  subtitle: string
  image: string
  cta: string
  link: string
}

const banners: Banner[] = [
  {
    id: "1",
    title: "Giải mọi bài tập",
    subtitle: "Nhanh chóng và chính xác nhất",
    image: "/promo-banner-1.jpg",
    cta: "Hỏi hiền phí ngay",
    link: "/ai-assistant",
  },
  {
    id: "2",
    title: "Bí quyết học tốt điểm cao",
    subtitle: "Phương pháp học thông minh từ chuyên gia",
    image: "/promo-banner-2.jpg",
    cta: "Khám phá ngay",
    link: "/blog/study-tips",
  },
]

export function PromotionalBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative h-64 p-8"
      >
        <div className="relative z-10 flex h-full items-center justify-between">
          <div className="max-w-md space-y-4">
            <h3 className="font-display text-3xl font-bold text-white">{banners[currentIndex].title}</h3>
            <p className="text-lg text-white/90">{banners[currentIndex].subtitle}</p>
            <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">{banners[currentIndex].cta}</Button>
          </div>

          <div className="relative h-48 w-64">
            <Image
              src={banners[currentIndex].image || "/placeholder.svg"}
              alt={banners[currentIndex].title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </motion.div>
    </div>
  )
}
