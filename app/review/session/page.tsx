"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Check, X } from "lucide-react"
import { vocabularyItems } from "@/lib/data/vocabulary"

export default function ReviewSessionPage() {
  const dueItems = vocabularyItems.filter((item) => new Date(item.nextReview) <= new Date())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [results, setResults] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 })

  const currentItem = dueItems[currentIndex]
  const progress = ((currentIndex + 1) / dueItems.length) * 100

  const handleAnswer = (isCorrect: boolean) => {
    setResults((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }))

    if (currentIndex < dueItems.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowAnswer(false)
    }
  }

  const isComplete = currentIndex === dueItems.length - 1 && results.correct + results.incorrect > 0

  if (dueItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Reviews Due</h2>
          <p className="text-muted-foreground mb-6">Great job! You're all caught up.</p>
          <Button asChild>
            <Link href="/review">Back to Review</Link>
          </Button>
        </Card>
      </div>
    )
  }

  if (isComplete) {
    const accuracy = Math.round((results.correct / (results.correct + results.incorrect)) * 100)

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-xl font-bold">Review Complete!</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Session Complete!</h2>
                <p className="text-muted-foreground">Great work on your vocabulary review</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="p-4 text-center bg-secondary/50">
                  <div className="text-3xl font-bold text-primary mb-1">{accuracy}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </Card>
                <Card className="p-4 text-center bg-secondary/50">
                  <div className="text-3xl font-bold text-green-500 mb-1">{results.correct}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </Card>
                <Card className="p-4 text-center bg-secondary/50">
                  <div className="text-3xl font-bold text-red-500 mb-1">{results.incorrect}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/review">Back to Review</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/review">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {dueItems.length}
            </span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Progress value={progress} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            {!showAnswer ? (
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-8">{currentItem.word}</h2>
                <p className="text-muted-foreground mb-8 italic">"{currentItem.example}"</p>
                <Button size="lg" onClick={() => setShowAnswer(true)} className="w-full">
                  Show Answer
                </Button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold mb-4">{currentItem.word}</h2>
                  <div className="bg-secondary/50 rounded-lg p-6 mb-4">
                    <p className="text-xl mb-2">{currentItem.translation}</p>
                    <p className="text-muted-foreground italic">"{currentItem.example}"</p>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-muted-foreground mb-4">Did you remember this word?</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleAnswer(false)}
                    className="bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Forgot
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => handleAnswer(true)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Remembered
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card className="p-4 text-center bg-secondary/50">
              <div className="text-2xl font-bold text-green-500">{results.correct}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </Card>
            <Card className="p-4 text-center bg-secondary/50">
              <div className="text-2xl font-bold text-red-500">{results.incorrect}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
