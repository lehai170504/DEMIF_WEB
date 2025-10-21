"use client"

import { motion } from "framer-motion"
import { Trophy, Flame } from "lucide-react"
import { Card } from "@/components/ui/card"
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

  const getRankClasses = (rank: number) => {
    switch (rank) {
      case 1:
        return { 
          rankBg: "bg-amber-500 text-white shadow-lg shadow-amber-500/50 ring-2 ring-white", // Gold
          xpColor: "text-amber-600",
          trophy: "fill-amber-500 text-amber-500"
        };
      case 2:
        return { 
          rankBg: "bg-slate-400 text-white shadow-md shadow-slate-400/50", // Silver
          xpColor: "text-slate-500",
          trophy: "fill-slate-400 text-slate-400"
        };
      case 3:
        return { 
          rankBg: "bg-yellow-800 text-white shadow-md shadow-yellow-800/50", // Bronze
          xpColor: "text-yellow-700",
          trophy: "fill-yellow-800 text-yellow-800"
        };
      default:
        return { 
          rankBg: "bg-gray-100 text-gray-600",
          xpColor: "text-orange-600",
          trophy: "fill-orange-200 text-orange-600"
        };
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      {/* CONTAINER: Áp dụng style thống nhất */}
      <Card className="p-5 border border-gray-100 bg-white rounded-xl shadow-lg">
        <div className="space-y-4">
          
          {/* HEADER */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500 fill-amber-200" />
              Xếp hạng tuần
            </h3>
            <Link 
              href="/leaderboard" 
              className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
            >
              Xem thêm &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {entries.slice(0, 5).map((entry, index) => {
              const rankClasses = getRankClasses(entry.rank);
              const isTop3 = entry.rank <= 3;

              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all ${isTop3 ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}
                >
                  
                  {/* RANK BADGE */}
                  <div
                    className={`h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full text-sm font-extrabold ${rankClasses.rankBg} ${isTop3 ? 'text-lg' : 'text-md'}`}
                  >
                    {entry.rank}
                  </div>

                  {/* AVATAR */}
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${getAvatarColor(entry.name)} text-sm font-semibold text-white border-2 border-white`}
                  >
                    {entry.avatar}
                  </div>

                  {/* NAME & STREAK */}
                  <div className="flex-1 min-w-0">
                    <p className={`truncate font-bold ${isTop3 ? 'text-gray-900' : 'text-gray-800'}`}>{entry.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Flame className="h-3 w-3 text-red-500" />
                        {entry.streak} ngày streak
                    </p>
                  </div>
                  
                  {/* XP SCORE */}
                  <div className={`flex items-center gap-1 text-base font-extrabold flex-shrink-0 ${rankClasses.xpColor}`}>
                    <span>{(entry.xp).toLocaleString()}</span>
                    <Trophy className={`h-4 w-4 ${rankClasses.trophy}`} />
                  </div>
                </motion.div>
              )
            })}
            {entries.length === 0 && (
                <p className="text-gray-500 italic p-2 text-sm">Chưa có dữ liệu xếp hạng tuần.</p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
