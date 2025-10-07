"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Flame } from "lucide-react"
import { motion } from "framer-motion"

interface LeaderboardUser {
  name: string
  score: number
  avatar: string
}

const topLearners: LeaderboardUser[] = [
  { name: "Sarah Chen", score: 2850, avatar: "SC" },
  { name: "Alex Kim", score: 2720, avatar: "AK" },
  { name: "Maria Garcia", score: 2680, avatar: "MG" },
]

export function LeaderboardTop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="p-6 bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg shadow-orange-100/40 border-2 border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-5 w-5 text-[#FF7A00]" />
              <h3 className="text-lg font-semibold text-slate-800">Top Learners Today</h3>
            </div>
            <div className="flex gap-3">
              {topLearners.map((user, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold border-2 ${
                      index === 0
                        ? "bg-yellow-500 border-yellow-400"
                        : index === 1
                          ? "bg-slate-400 border-slate-300"
                          : "bg-orange-600 border-orange-500"
                    }`}
                  >
                    {user.avatar}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-800">{user.name}</div>
                    <div className="text-slate-600">{user.score} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold text-[#FF7A00]">7</span>
            </div>
            <div className="text-sm text-slate-600">Day Streak</div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
