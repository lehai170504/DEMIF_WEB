import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Settings, Calendar, Globe, Target, Award, Flame, BookOpen } from "lucide-react"
import { mockUserProfile } from "@/lib/data/user-profile"
import { mockUserProgress } from "@/lib/data/user-progress"

export default function ProfilePage() {
  const profile = mockUserProfile
  const progress = mockUserProgress

  const memberSince = new Date(profile.joinedDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

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
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{profile.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{profile.username}</h2>
                <p className="text-muted-foreground mb-4">{profile.email}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Globe className="h-3 w-3 mr-1" />
                    {profile.country}
                  </Badge>
                  <Badge variant="outline">
                    {profile.nativeLanguage} → {profile.targetLanguage}
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Member since {memberSince}
                  </Badge>
                </div>
              </div>
              <Button asChild>
                <Link href="/profile/edit">Edit Profile</Link>
              </Button>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-card border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{progress.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{progress.completedLessons}</div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{progress.averageAccuracy}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{progress.totalMinutes}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Learning Goal */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Learning Goal</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Goal</span>
                  <span className="font-semibold">{profile.learningGoal}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Daily Target</span>
                  <span className="font-semibold">{profile.dailyGoalMinutes} minutes</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Today's Progress</span>
                  <span className="text-sm font-semibold text-primary">
                    {progress.weeklyProgress[progress.weeklyProgress.length - 1].minutes} / {profile.dailyGoalMinutes}{" "}
                    min
                  </span>
                </div>
                <Progress
                  value={
                    (progress.weeklyProgress[progress.weeklyProgress.length - 1].minutes / profile.dailyGoalMinutes) *
                    100
                  }
                />
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Achievements</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold text-sm mb-1">Week Warrior</div>
                <div className="text-xs text-muted-foreground">7 day streak</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="font-semibold text-sm mb-1">First Steps</div>
                <div className="text-xs text-muted-foreground">10 lessons</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50 opacity-50">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <Award className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="font-semibold text-sm mb-1">Perfect Score</div>
                <div className="text-xs text-muted-foreground">100% accuracy</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50 opacity-50">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <Target className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="font-semibold text-sm mb-1">Dedicated</div>
                <div className="text-xs text-muted-foreground">30 day streak</div>
              </div>
            </div>
          </Card>

          {/* Activity History */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/history">View All</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {progress.recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <div className="font-semibold">{activity.lessonTitle}</div>
                    <div className="text-sm text-muted-foreground">
                      {activity.type} • {activity.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{activity.score}%</div>
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
