import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Clock, TrendingUp } from "lucide-react"
import { vocabularyItems } from "@/lib/data/vocabulary"

export default function ReviewPage() {
  const dueForReview = vocabularyItems.filter((item) => new Date(item.nextReview) <= new Date())
  const totalMastery = Math.round(vocabularyItems.reduce((sum, item) => sum + item.mastery, 0) / vocabularyItems.length)

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
            <h1 className="text-xl font-bold">Vocabulary Review</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile">Profile</Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-card border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{dueForReview.length}</div>
                  <div className="text-sm text-muted-foreground">Due Today</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{vocabularyItems.length}</div>
                  <div className="text-sm text-muted-foreground">Total Words</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalMastery}%</div>
                  <div className="text-sm text-muted-foreground">Avg Mastery</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Start Review Button */}
          {dueForReview.length > 0 && (
            <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 to-card border-primary/20">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Ready to Review?</h2>
                <p className="text-muted-foreground mb-6">You have {dueForReview.length} words waiting for review</p>
                <Button size="lg" asChild>
                  <Link href="/review/session">Start Review Session</Link>
                </Button>
              </div>
            </Card>
          )}

          {/* Vocabulary List */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Your Vocabulary</h2>
            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm" className="bg-primary/10 border-primary text-primary">
                All
              </Button>
              <Button variant="outline" size="sm">
                Due Today
              </Button>
              <Button variant="outline" size="sm">
                Mastered
              </Button>
              <Button variant="outline" size="sm">
                Learning
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {vocabularyItems.map((item) => (
              <Card key={item.id} className="p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{item.word}</h3>
                      <Badge
                        variant="outline"
                        className={
                          item.difficulty === "easy"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : item.difficulty === "medium"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {item.difficulty}
                      </Badge>
                      {new Date(item.nextReview) <= new Date() && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Due
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{item.translation}</p>
                    <p className="text-sm text-muted-foreground italic mb-3">"{item.example}"</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Mastery</span>
                          <span className="font-semibold text-primary">{item.mastery}%</span>
                        </div>
                        <Progress value={item.mastery} />
                      </div>
                      <div className="text-sm text-muted-foreground">Reviewed {item.reviewCount} times</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
