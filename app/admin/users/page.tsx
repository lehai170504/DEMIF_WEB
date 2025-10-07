import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Search, MoreVertical, Ban, CheckCircle, XCircle } from "lucide-react"
import { usersData } from "@/lib/data/admin-data"

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-xl font-bold">User Management</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-primary/10 border-primary text-primary">
                All Users
              </Button>
              <Button variant="outline" size="sm">
                Active
              </Button>
              <Button variant="outline" size="sm">
                Suspended
              </Button>
              <Button variant="outline" size="sm">
                Banned
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <Card className="p-6">
            <div className="space-y-4">
              {usersData.map((user) => (
                <div key={user.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{user.username}</span>
                      <Badge
                        variant="outline"
                        className={
                          user.status === "active"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : user.status === "suspended"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <div className="text-sm font-semibold">{user.completedLessons} lessons</div>
                    <div className="text-xs text-muted-foreground">Score: {user.totalScore.toLocaleString()}</div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <div className="text-sm text-muted-foreground">Joined {user.joinedDate}</div>
                    <div className="text-xs text-muted-foreground">Active {user.lastActive}</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Ban className="h-4 w-4 mr-2" />
                        Suspend User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <XCircle className="h-4 w-4 mr-2" />
                        Ban User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
