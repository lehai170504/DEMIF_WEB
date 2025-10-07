"use client"

import { motion } from "framer-motion"
import { Users, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroBannerProps {
  title: string
  description: string
  image: string
  participants: number
  daysLeft: number
}

export function HeroBanner({ title, description, image, participants, daysLeft }: HeroBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-400 via-orange-300 to-amber-200 p-8 shadow-lg"
    >
      <div className="relative z-10 flex items-center justify-between">
        <div className="max-w-md space-y-4">
          <h2 className="font-display text-3xl font-bold text-white">{title}</h2>
          <p className="text-white/90">{description}</p>

          <div className="flex items-center gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{participants} người tham gia</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Còn {daysLeft} ngày</span>
            </div>
          </div>

          <Button className="bg-white text-orange-600 hover:bg-white/90">
            Tìm hiểu thêm
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="relative h-48 w-64">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-10 left-20 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
    </motion.div>
  )
}
