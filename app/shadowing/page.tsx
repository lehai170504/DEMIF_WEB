import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, BookOpen } from "lucide-react"
import { lessons } from "@/lib/data/lessons"

export default function ShadowingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Shadowing Exercises</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Choose Your Lesson</h2>
            <p className="text-muted-foreground">Select a shadowing exercise to practice your pronunciation</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="outline" size="sm" className="bg-primary/10 border-primary text-primary">
              All Levels
            </Button>
            <Button variant="outline" size="sm">
              Beginner
            </Button>
            <Button variant="outline" size="sm">
              Intermediate
            </Button>
            <Button variant="outline" size="sm">
              Advanced
            </Button>
          </div>

          {/* Lessons Grid */}
          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{lesson.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          lesson.level === "beginner"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : lesson.level === "intermediate"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {lesson.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{lesson.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration}s</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{lesson.category}</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/shadowing/${lesson.id}`}>Start</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
