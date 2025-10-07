import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Search, Plus, MoreVertical, Edit, Trash, Eye } from "lucide-react"
import { contentData } from "@/lib/data/admin-data"

export default function AdminContentPage() {
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
            <h1 className="text-xl font-bold">Content Management</h1>
          </div>
          <Button asChild>
            <Link href="/admin/content/new">
              <Plus className="h-4 w-4 mr-2" />
              New Lesson
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search lessons..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-primary/10 border-primary text-primary">
                All
              </Button>
              <Button variant="outline" size="sm">
                Published
              </Button>
              <Button variant="outline" size="sm">
                Draft
              </Button>
              <Button variant="outline" size="sm">
                Archived
              </Button>
            </div>
          </div>

          {/* Content Table */}
          <Card className="p-6">
            <div className="space-y-4">
              {contentData.map((content) => (
                <div key={content.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{content.title}</span>
                      <Badge
                        variant="outline"
                        className={
                          content.type === "dictation"
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                        }
                      >
                        {content.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          content.level === "beginner"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : content.level === "intermediate"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {content.level}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          content.status === "published"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : content.status === "draft"
                              ? "bg-gray-500/10 text-gray-500 border-gray-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {content.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Created {content.createdDate}</div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <div className="text-sm font-semibold">{content.completions.toLocaleString()} completions</div>
                    <div className="text-xs text-muted-foreground">
                      {content.avgScore > 0 ? `${content.avgScore}% avg score` : "No data"}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
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
