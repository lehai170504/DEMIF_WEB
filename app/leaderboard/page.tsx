import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Trophy, Flame, BookOpen, Crown } from "lucide-react"
import { leaderboardData } from "@/lib/data/leaderboard"

// Màu sắc chủ đạo nhất quán
const PRIMARY_COLOR = "#FF7A00";

export default function LeaderboardPage() {
  const currentUser = leaderboardData.find((entry) => entry.userId === "user-1")
  const topThree = leaderboardData.slice(0, 3)
  const restOfLeaderboard = leaderboardData.slice(3)

  return (
    <div className="min-h-screen bg-gray-5 font-mono">
      
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-extrabold text-slate-800">Bảng Xếp Hạng</h1>
          </div>
          <Button variant="outline" size="sm" asChild className="border-orange-300 text-orange-600 hover:bg-orange-50">
            <Link href="/profile">Hồ Sơ</Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header & Mục tiêu */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4 border-2 border-orange-300">
              <Trophy className="h-8 w-8" style={{ color: PRIMARY_COLOR }} />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Bảng Xếp Hạng Toàn Cầu</h2>
            <p className="text-slate-600 text-lg">Cùng tranh tài với những người học từ khắp nơi trên thế giới!</p>
          </div>

          {/* Thẻ Người Dùng Hiện Tại (Current User Card) */}
          {currentUser && (
            <Card className="p-6 mb-10 bg-gradient-to-r from-orange-100 to-white border-4 border-double border-orange-400 shadow-2xl shadow-orange-300/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-extrabold" style={{ color: PRIMARY_COLOR }}>#{currentUser.rank}</div>
                  <Avatar className="h-14 w-14 border-2 border-orange-500">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-orange-200 text-orange-700 font-bold">Bạn</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-extrabold text-xl text-slate-800">{currentUser.username} (Bạn)</div>
                    <div className="text-sm text-slate-600">{currentUser.country}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold" style={{ color: PRIMARY_COLOR }}>{currentUser.totalScore.toLocaleString()}</div>
                  <div className="text-sm text-slate-600">Tổng Điểm</div>
                </div>
              </div>
            </Card>
          )}

          {/* Top 3 Bục Vinh Quang (Podium) */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 items-end">
            
            {/* Hạng 2 (2nd Place) */}
            {topThree[1] && (
                <Card className="p-6 md:order-1 bg-white border-gray-300 shadow-xl h-full flex flex-col justify-end">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3 border-2 border-gray-500">
                      <span className="text-3xl font-extrabold text-gray-600">2</span>
                    </div>
                    <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-gray-500">
                      <AvatarImage src={topThree[1].avatar || "/placeholder.svg"} />
                      <AvatarFallback>{topThree[1].username[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-xl mb-1 text-slate-800">{topThree[1].username}</h3>
                    <p className="text-sm text-slate-500 mb-3">{topThree[1].country}</p>
                    <div className="text-3xl font-extrabold text-slate-700 mb-3">{topThree[1].totalScore.toLocaleString()}</div>
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-sky-500" />
                        <span>{topThree[1].completedLessons} Bài</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-red-500" />
                        <span>{topThree[1].currentStreak} Ngày</span>
                      </div>
                    </div>
                  </div>
                </Card>
            )}

            {/* Hạng 1 (1st Place) - Lớn nhất */}
            {topThree[0] && (
                <Card className="p-8 md:order-2 bg-gradient-to-t from-orange-200 to-white border-4 border-yellow-500 shadow-2xl shadow-yellow-400/50 relative transform scale-[1.05] z-10">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3 border-4 border-yellow-500 relative">
                      <Crown className="h-8 w-8 text-yellow-500 absolute -top-8 animate-pulse" />
                      <span className="text-4xl font-extrabold text-yellow-600">1</span>
                    </div>
                    <Avatar className="h-24 w-24 mx-auto mb-3 border-4 border-yellow-500">
                      <AvatarImage src={topThree[0].avatar || "/placeholder.svg"} />
                      <AvatarFallback>{topThree[0].username[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-extrabold text-2xl mb-1 text-slate-900">{topThree[0].username}</h3>
                    <p className="text-base text-slate-600 mb-3">{topThree[0].country}</p>
                    <div className="text-4xl font-extrabold" style={{ color: PRIMARY_COLOR }}>{topThree[0].totalScore.toLocaleString()}</div>
                    <div className="text-sm text-slate-600 mb-4">Tổng Điểm</div>
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-sky-500" />
                        <span className="font-semibold">{topThree[0].completedLessons} Bài</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-red-500" />
                        <span className="font-semibold">{topThree[0].currentStreak} Ngày</span>
                      </div>
                    </div>
                  </div>
                </Card>
            )}

            {/* Hạng 3 (3rd Place) */}
            {topThree[2] && (
                <Card className="p-6 md:order-3 bg-white border-gray-300 shadow-xl h-full flex flex-col justify-end">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-200/50 flex items-center justify-center mx-auto mb-3 border-2 border-amber-500">
                      <span className="text-3xl font-extrabold text-amber-600">3</span>
                    </div>
                    <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-amber-500">
                      <AvatarImage src={topThree[2].avatar || "/placeholder.svg"} />
                      <AvatarFallback>{topThree[2].username[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-xl mb-1 text-slate-800">{topThree[2].username}</h3>
                    <p className="text-sm text-slate-500 mb-3">{topThree[2].country}</p>
                    <div className="text-3xl font-extrabold text-slate-700 mb-3">{topThree[2].totalScore.toLocaleString()}</div>
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-sky-500" />
                        <span>{topThree[2].completedLessons} Bài</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-red-500" />
                        <span>{topThree[2].currentStreak} Ngày</span>
                      </div>
                    </div>
                  </div>
                </Card>
            )}
          </div>

          {/* Phần còn lại của Bảng Xếp Hạng (Rest of Leaderboard) */}
          <Card className="p-6 shadow-xl border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-slate-800">Các Thứ Hạng Khác</h3>
            <div className="space-y-3">
              {restOfLeaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={`flex items-center gap-6 p-4 rounded-xl ${
                    entry.userId === "user-1"
                      ? "bg-orange-100/50 border-l-4 border-orange-500 shadow-md"
                      : "bg-white hover:bg-gray-100 transition-colors border border-gray-200"
                  }`}
                >
                  <div className="w-8 text-center font-bold text-xl" style={{ color: entry.userId === "user-1" ? PRIMARY_COLOR : "#6B7280" }}>
                    #{entry.rank}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{entry.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{entry.username}</span>
                      {entry.userId === "user-1" && (
                        <Badge variant="outline" className="bg-orange-300 text-orange-800 border-orange-400 font-bold">
                          Bạn
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-slate-500">{entry.country}</div>
                  </div>
                  
                  {/* Chi tiết thống kê */}
                  <div className="flex items-center gap-8 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-sky-500" />
                      <span>{entry.completedLessons}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-red-500" />
                      <span>{entry.currentStreak}</span>
                    </div>
                  </div>
                  
                  {/* Điểm số */}
                  <div className="text-right">
                    <div className="text-xl font-extrabold" style={{ color: PRIMARY_COLOR }}>{entry.totalScore.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}