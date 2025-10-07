import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, BookOpen, TrendingUp, Activity, FileText } from "lucide-react"
import { adminStats } from "@/lib/data/admin-data"

export default function AdminPage() {
  const stats = adminStats

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-white flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">D</span>
            </div>
            <span className="text-xl font-bold">DEMIF Admin</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/users">Users</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/content">Content</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/analytics">Analytics</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Exit Admin</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, content, and monitor platform performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-card border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mb-2">Total Users</div>
            <div className="text-sm text-green-500">
              {stats.activeUsers.toLocaleString()} active ({Math.round((stats.activeUsers / stats.totalUsers) * 100)}
              %)
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalLessons}</div>
            <div className="text-sm text-muted-foreground mb-2">Total Lessons</div>
            <div className="text-sm text-muted-foreground">
              {stats.totalExercises.toLocaleString()} exercises completed
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.avgCompletionRate}%</div>
            <div className="text-sm text-muted-foreground mb-2">Avg Completion Rate</div>
            <div className="text-sm text-muted-foreground">{stats.avgAccuracy}% avg accuracy</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">User Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  View, edit, and moderate user accounts and activity
                </p>
                <Button asChild>
                  <Link href="/admin/users">Manage Users</Link>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">Content Management</h3>
                <p className="text-sm text-muted-foreground mb-4">Create, edit, and publish lessons and exercises</p>
                <Button asChild>
                  <Link href="/admin/content">Manage Content</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Platform Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div>
                  <div className="font-semibold">New user registered</div>
                  <div className="text-sm text-muted-foreground">user@example.com • 5 minutes ago</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <div className="font-semibold">Lesson published</div>
                  <div className="text-sm text-muted-foreground">Advanced Conversations • 1 hour ago</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div>
                  <div className="font-semibold">User reported content</div>
                  <div className="text-sm text-muted-foreground">Lesson ID: 42 • 2 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
