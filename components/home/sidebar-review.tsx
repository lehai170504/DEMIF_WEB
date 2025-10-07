"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Crown } from "lucide-react"
import Image from "next/image"

interface SidebarReviewProps {
  reviewDue: number
}

export function SidebarReview({ reviewDue }: SidebarReviewProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-800">Ôn tập từ đang học ({reviewDue})</h3>
              <p className="text-sm text-gray-600">Ôn tập để ghi nhớ lâu hơn</p>
            </div>
            <Crown className="h-6 w-6 text-orange-500" />
          </div>

          <div className="relative h-32 w-full">
            <Image src="/review-illustration.jpg" alt="Review" fill className="object-contain" />
          </div>

          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            <BookOpen className="mr-2 h-4 w-4" />
            Bắt đầu ngay
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
