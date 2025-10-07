"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface TranscriptBoxProps {
  correctTranscript: string
  onSubmit: (userInput: string) => void
}

export function TranscriptBox({ correctTranscript, onSubmit }: TranscriptBoxProps) {
  const [userInput, setUserInput] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<{ word: string; isCorrect: boolean }[]>([])

  const handleSubmit = () => {
    const userWords = userInput.toLowerCase().trim().split(/\s+/)
    const correctWords = correctTranscript.toLowerCase().trim().split(/\s+/)

    const wordFeedback = correctWords.map((word, i) => ({
      word,
      isCorrect: word === userWords[i],
    }))

    setFeedback(wordFeedback)
    setSubmitted(true)
    onSubmit(userInput)
  }

  const calculateAccuracy = () => {
    const correct = feedback.filter((f) => f.isCorrect).length
    return Math.round((correct / feedback.length) * 100)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-100/40">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Type what you heard:</h3>

        {!submitted ? (
          <div className="space-y-4">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Start typing here..."
              className="text-lg p-4 border-orange-200 focus:border-orange-400 focus:ring-orange-100 rounded-xl"
              autoFocus
            />
            <Button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-semibold rounded-xl py-6 text-lg shadow-lg shadow-orange-200/50"
            >
              Check Answer
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-5xl font-bold text-[#FF7A00] mb-2">{calculateAccuracy()}%</div>
              <div className="text-sm text-slate-600">Accuracy Score</div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Your Answer:</h4>
              <p className="text-slate-600 mb-4 p-4 bg-slate-50 rounded-lg">{userInput}</p>

              <h4 className="font-semibold text-slate-800 mb-3">Word-by-Word Feedback:</h4>
              <div className="flex flex-wrap gap-2">
                {feedback.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`px-3 py-1.5 rounded-lg font-medium ${
                      item.isCorrect
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200 line-through"
                    }`}
                  >
                    {item.word}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
              <h4 className="font-semibold text-slate-800 mb-2">Correct Transcript:</h4>
              <p className="text-slate-700">{correctTranscript}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
