"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import Link from "next/link"

interface LeaderboardEntry {
  rank: number
  name: string
  xp: number
  streak: number
  avatar: string
}

interface SidebarLeaderboardProps {
  entries: LeaderboardEntry[]
}

export function SidebarLeaderboard({ entries }: SidebarLeaderboardProps) {
  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-500", "bg-orange-500", "bg-green-500", "bg-purple-500", "bg-pink-500"]
    return colors[name.charCodeAt(0) % colors.length]
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="border-orange-100 bg-white p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-gray-800">Xếp hạng tuần</h3>
            <Link href="/leaderboard" className="text-sm text-orange-600 hover:text-orange-700">
              Xem thêm
            </Link>
          </div>

          <div className="space-y-3">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${getAvatarColor(entry.name)} text-sm font-semibold text-white`}
                >
                  {entry.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-gray-800">{entry.name}</p>
                  <p className="text-xs text-gray-500">{entry.streak} ngày streak</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-orange-600">
                  <span>{(entry.xp / 100).toFixed(2)}</span>
                  <Trophy className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
