"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Send } from "lucide-react" // Thêm icon

interface TranscriptBoxProps {
  correctTranscript: string
  onSubmit: (userInput: string) => void
}

export function TranscriptBox({ correctTranscript, onSubmit }: TranscriptBoxProps) {
  const [userInput, setUserInput] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<{ word: string; isCorrect: boolean }[]>([])

  const handleSubmit = () => {
    if (!userInput.trim()) return

    const userWords = userInput.toLowerCase().trim().split(/\s+/)
    const correctWords = correctTranscript.toLowerCase().trim().split(/\s+/)

    // Logic so sánh từ: Dựa trên vị trí và từ chính xác
    const wordFeedback = correctWords.map((word, i) => ({
      word,
      isCorrect: word === userWords[i],
    }))

    setFeedback(wordFeedback)
    setSubmitted(true)
    onSubmit(userInput)
  }

  const calculateAccuracy = () => {
    if (feedback.length === 0) return 0;
    const correct = feedback.filter((f) => f.isCorrect).length
    return Math.round((correct / feedback.length) * 100)
  }

  const accuracyScore = submitted ? calculateAccuracy() : 0;
  const accuracyColor = 
    accuracyScore >= 80 ? 'text-green-600' :
    accuracyScore >= 50 ? 'text-yellow-600' :
    'text-red-600';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-xl shadow-orange-200/50 border border-orange-100">
        <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
          <Send className="h-5 w-5 text-[#FF7A00]" />
          Nhập đoạn bạn nghe được:
        </h3>

        {!submitted ? (
          <div className="space-y-4">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Bắt đầu gõ ở đây..."
              className="text-lg p-4 border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl transition-all duration-300"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && userInput.trim()) {
                    handleSubmit();
                }
              }}
            />
            <Button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className="w-full bg-[#FF7A00] hover:bg-[#FF8A1C] text-white font-bold rounded-xl py-6 text-lg shadow-lg shadow-orange-300/50 transition-all duration-300 hover:shadow-xl"
            >
              Kiểm Tra Đáp Án
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Hiển thị Điểm Chính xác */}
            <div className={`text-center p-6 rounded-xl border-2 ${
                accuracyScore >= 80 ? 'bg-green-50 border-green-200' :
                accuracyScore >= 50 ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
            }`}>
              <div className={`text-6xl font-extrabold ${accuracyColor} mb-2`}>
                {accuracyScore}%
              </div>
              <div className="text-sm text-slate-600">Điểm Chính Xác</div>
            </div>

            {/* Phản hồi từ từng từ */}
            <div>
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Phản Hồi Từng Từ:
              </h4>
              <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                {feedback.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`
                        px-3 py-1.5 rounded-full font-medium shadow-sm transition-all duration-300
                        ${item.isCorrect
                          ? "bg-green-50 text-green-700 border border-green-300"
                          : "bg-red-50 text-red-700 border border-red-300 relative"
                        }
                    `}
                  >
                    {!item.isCorrect && (
                        <XCircle className="h-4 w-4 absolute -top-1 -right-1 text-red-500 bg-white rounded-full" />
                    )}
                    {item.word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Đoạn chính tả đúng */}
            <div className="p-4 bg-orange-100 rounded-xl border-2 border-orange-300/50">
              <h4 className="font-bold text-slate-800 mb-2">Đoạn Chính Tả Đúng:</h4>
              <p className="text-slate-700">{correctTranscript}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}