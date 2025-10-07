import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Trophy, Flame, BookOpen, Crown } from "lucide-react"
import { leaderboardData } from "@/lib/data/leaderboard"

export default function LeaderboardPage() {
  const currentUser = leaderboardData.find((entry) => entry.userId === "user-1")
  const topThree = leaderboardData.slice(0, 3)
  const restOfLeaderboard = leaderboardData.slice(3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Leaderboard</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile">Profile</Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Global Rankings</h2>
            <p className="text-muted-foreground">Compete with learners from around the world</p>
          </div>

          {/* Current User Card */}
          {currentUser && (
            <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-card border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">#{currentUser.rank}</div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">{currentUser.username}</div>
                    <div className="text-sm text-muted-foreground">{currentUser.country}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{currentUser.totalScore.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Score</div>
                </div>
              </div>
            </Card>
          )}

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <Card className="p-6 md:order-1 bg-card">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-500/10 flex items-center justify-center mx-auto mb-3 border-2 border-gray-500">
                  <span className="text-2xl font-bold text-gray-500">2</span>
                </div>
                <Avatar className="h-16 w-16 mx-auto mb-3">
                  <AvatarImage src={topThree[1].avatar || "/placeholder.svg"} />
                  <AvatarFallback>{topThree[1].username[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mb-1">{topThree[1].username}</h3>
                <p className="text-sm text-muted-foreground mb-3">{topThree[1].country}</p>
                <div className="text-2xl font-bold text-primary mb-2">{topThree[1].totalScore.toLocaleString()}</div>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{topThree[1].completedLessons}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    <span>{topThree[1].currentStreak}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 1st Place */}
            <Card className="p-6 md:order-2 bg-gradient-to-br from-primary/10 to-card border-primary/20">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 border-2 border-primary relative">
                  <Crown className="h-6 w-6 text-primary absolute -top-6" />
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-primary">
                  <AvatarImage src={topThree[0].avatar || "/placeholder.svg"} />
                  <AvatarFallback>{topThree[0].username[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-1">{topThree[0].username}</h3>
                <p className="text-sm text-muted-foreground mb-3">{topThree[0].country}</p>
                <div className="text-3xl font-bold text-primary mb-2">{topThree[0].totalScore.toLocaleString()}</div>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{topThree[0].completedLessons}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    <span>{topThree[0].currentStreak}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 3rd Place */}
            <Card className="p-6 md:order-3 bg-card">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-3 border-2 border-orange-500">
                  <span className="text-2xl font-bold text-orange-500">3</span>
                </div>
                <Avatar className="h-16 w-16 mx-auto mb-3">
                  <AvatarImage src={topThree[2].avatar || "/placeholder.svg"} />
                  <AvatarFallback>{topThree[2].username[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mb-1">{topThree[2].username}</h3>
                <p className="text-sm text-muted-foreground mb-3">{topThree[2].country}</p>
                <div className="text-2xl font-bold text-primary mb-2">{topThree[2].totalScore.toLocaleString()}</div>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{topThree[2].completedLessons}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    <span>{topThree[2].currentStreak}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Rest of Leaderboard */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Rankings</h3>
            <div className="space-y-3">
              {restOfLeaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    entry.userId === "user-1"
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-secondary/50 hover:bg-secondary/70 transition-colors"
                  }`}
                >
                  <div className="w-8 text-center font-bold text-muted-foreground">#{entry.rank}</div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{entry.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{entry.username}</span>
                      {entry.userId === "user-1" && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{entry.country}</div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{entry.completedLessons}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      <span>{entry.currentStreak}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{entry.totalScore.toLocaleString()}</div>
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
