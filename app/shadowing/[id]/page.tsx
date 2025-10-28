"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Mic,
  MicOff,
  Check,
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Star,
  Clock
} from "lucide-react"
import { lessons } from "@/lib/data/lessons"
import { notFound } from "next/navigation"
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding"

export default function ShadowingPracticePage({ params }: { params: { id: string } }) {
  const lesson = lessons.find((l) => l.id === params.id)

  if (!lesson) {
    notFound()
  }

  // Mock data for the lesson sentences
  const sentences = [
    {
      id: 1,
      original: "Hello, how are you today?",
      translation: "Xin chào, bạn hôm nay thế nào?",
      duration: 3.2
    },
    {
      id: 2,
      original: "I would like to order a coffee, please.",
      translation: "Tôi muốn gọi một ly cà phê, làm ơn.",
      duration: 4.1
    },
    {
      id: 3,
      original: "The weather is beautiful this morning.",
      translation: "Thời tiết đẹp vào buổi sáng nay.",
      duration: 3.8
    }
  ]

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [scores, setScores] = useState<{ pronunciation: number; timing: number; tone: number }[]>([])
  const [currentScore, setCurrentScore] = useState({ pronunciation: 0, timing: 0, tone: 0 })

  const currentSentence = sentences[currentSentenceIndex]
  const overallProgress = ((currentSentenceIndex + (isCompleted ? 1 : 0)) / sentences.length) * 100

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying)
    // Mock audio playback
    setTimeout(() => setIsPlaying(false), currentSentence.duration * 1000)
  }

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true)
      // Mock recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false)
        // Mock AI scoring
        const mockScore = {
          pronunciation: Math.floor(Math.random() * 40) + 60,
          timing: Math.floor(Math.random() * 30) + 70,
          tone: Math.floor(Math.random() * 35) + 65
        }
        setCurrentScore(mockScore)
        setScores([...scores, mockScore])
      }, 3000)
    }
  }

  const handleNext = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1)
      setShowTranslation(false)
      setCurrentScore({ pronunciation: 0, timing: 0, tone: 0 })
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1)
      setShowTranslation(false)
      setCurrentScore({ pronunciation: 0, timing: 0, tone: 0 })
    }
  }

  const handleRestart = () => {
    setCurrentSentenceIndex(0)
    setIsCompleted(false)
    setScores([])
    setCurrentScore({ pronunciation: 0, timing: 0, tone: 0 })
    setShowTranslation(false)
  }

  const averageScore = scores.length > 0
    ? Math.round(scores.reduce((sum, score) => sum + score.pronunciation + score.timing + score.tone, 0) / (scores.length * 3))
    : 0

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/shadowing">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Lessons
                  </Link>
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
                  <p className="text-sm text-gray-600">Lesson Summary</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Completed
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Completion Summary */}
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center bg-gradient-to-br from-orange-50 to-white border-orange-200">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-10 w-10 text-orange-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">Lesson Completed!</h2>
              <p className="text-gray-600 mb-8">Great job practicing your shadowing skills</p>

              {/* Overall Score */}
              <div className="mb-8">
                <div className="text-6xl font-bold text-orange-600 mb-2">{averageScore}%</div>
                <p className="text-gray-600">Overall Score</p>
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.pronunciation, 0) / scores.length) : 0}%
                  </div>
                  <p className="text-sm text-gray-600">Pronunciation</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.timing, 0) / scores.length) : 0}%
                  </div>
                  <p className="text-sm text-gray-600">Timing</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.tone, 0) / scores.length) : 0}%
                  </div>
                  <p className="text-sm text-gray-600">Tone</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestart} variant="outline" className="px-8">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Practice Again
                </Button>
                <Button asChild className="px-8 bg-orange-500 hover:bg-orange-600">
                  <Link href="/shadowing">
                    Next Lesson
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </main>
        <FooterLanding />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/shadowing">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Lessons
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="text-sm text-gray-600">Shadowing Practice</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {currentSentenceIndex + 1} / {sentences.length}
              </div>
              <Progress value={overallProgress} className="w-32 h-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Practice Area */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Left Side - Media Player */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Listen & Repeat</h3>

                {/* Audio Waveform Visualization */}
                <div className="bg-gray-100 rounded-lg p-8 mb-6 relative">
                  <div className="flex items-center justify-center space-x-1 h-16">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-orange-400 rounded-full transition-all duration-300 ${
                          isPlaying ? 'animate-pulse' : ''
                        }`}
                        style={{
                          height: isPlaying ? `${Math.random() * 40 + 20}px` : '8px',
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentSentenceIndex(Math.max(0, currentSentenceIndex - 1))}
                      disabled={currentSentenceIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={handlePlayAudio}
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentSentenceIndex(Math.min(sentences.length - 1, currentSentenceIndex + 1))}
                      disabled={currentSentenceIndex === sentences.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Sentence Display */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                  <p className="text-xl font-medium text-gray-900 mb-2">
                    {currentSentence.original}
                  </p>
                  {showTranslation && (
                    <p className="text-sm text-gray-600 italic">
                      {currentSentence.translation}
                    </p>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="mt-2 text-orange-600 hover:text-orange-700"
                  >
                    {showTranslation ? 'Hide' : 'Show'} Translation
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Practice Interface */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Your Turn</h3>

                {/* Recording Interface */}
                <div className="bg-gray-50 rounded-lg p-8 mb-6">
                  <div className="flex flex-col items-center gap-6">
                    <Button
                      onClick={handleRecord}
                      disabled={isRecording}
                      size="lg"
                      className={`w-20 h-20 rounded-full transition-all duration-300 ${
                        isRecording
                          ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                          : 'bg-orange-500 hover:bg-orange-600'
                      }`}
                    >
                      {isRecording ? (
                        <MicOff className="h-8 w-8" />
                      ) : (
                        <Mic className="h-8 w-8" />
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="font-medium text-gray-900">
                        {isRecording ? 'Recording...' : 'Tap to Record'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {isRecording ? 'Speak clearly after the beep' : 'Repeat the sentence you just heard'}
                      </p>
                    </div>

                    {/* Recording Waveform */}
                    {isRecording && (
                      <div className="flex items-center justify-center space-x-1 h-8 w-full max-w-xs">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-red-400 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Feedback */}
                {(currentScore.pronunciation > 0 || currentScore.timing > 0 || currentScore.tone > 0) && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">AI Feedback</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{currentScore.pronunciation}%</div>
                        <p className="text-xs text-gray-600">Pronunciation</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{currentScore.timing}%</div>
                        <p className="text-xs text-gray-600">Timing</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{currentScore.tone}%</div>
                        <p className="text-xs text-gray-600">Tone</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={handleRecord}
                    disabled={isRecording}
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={isRecording}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <FooterLanding />
    </div>
  )
}
