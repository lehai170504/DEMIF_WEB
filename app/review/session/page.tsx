"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Check, X, Trophy, RefreshCw } from "lucide-react" // Thêm icon Trophy
import { motion, AnimatePresence } from "framer-motion" // Import Framer Motion
import { vocabularyItems } from "@/lib/data/vocabulary"

// Định nghĩa màu sắc chủ đạo
const PRIMARY_COLOR = "#FF7A00"; // Cam chủ đạo
const CORRECT_COLOR = "#10B981"; // Xanh lá
const INCORRECT_COLOR = "#EF4444"; // Đỏ

export default function ReviewSessionPage() {
  const dueItems = vocabularyItems.filter((item) => new Date(item.nextReview) <= new Date())
  
  // State quản lý phiên ôn tập
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [results, setResults] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 })
  const [animationKey, setAnimationKey] = useState(0); // Dùng để reset animation khi chuyển từ

  const currentItem = dueItems[currentIndex]
  const progress = dueItems.length > 0 ? ((currentIndex + (showAnswer ? 0.5 : 0)) / dueItems.length) * 100 : 0;
  
  // Kiểm tra xem đã hoàn thành toàn bộ danh sách (đã trả lời xong từ cuối)
  const isComplete = currentIndex >= dueItems.length && dueItems.length > 0;

  const handleAnswer = (isCorrect: boolean) => {
    // 1. Cập nhật kết quả
    setResults((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }))

    // 2. Chuyển sang từ tiếp theo
    if (currentIndex < dueItems.length) {
        // Cần dùng setTimeout để Framer Motion có thời gian chạy exit animation trước khi unmount component
        setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            setShowAnswer(false);
            setAnimationKey(prev => prev + 1); // Đổi key để force re-render và animation mới
        }, 300); // 300ms là thời gian animation
    }
  }

  // --- TRẠNG THÁI: KHÔNG CÓ TỪ NÀO CẦN ÔN ---
  if (dueItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-10 max-w-md text-center border-green-300 shadow-xl">
          <Trophy className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Tuyệt Vời!</h2>
          <p className="text-slate-600 mb-6">Bạn đã hoàn thành việc ôn tập! Không còn từ nào cần ôn hôm nay.</p>
          <Button asChild style={{ backgroundColor: PRIMARY_COLOR }} className="hover:bg-orange-600">
            <Link href="/review">Quay lại Trang Ôn Tập</Link>
          </Button>
        </Card>
      </div>
    )
  }

  // --- TRẠNG THÁI: HOÀN THÀNH PHIÊN ÔN TẬP ---
  if (isComplete) {
    const totalAnswered = results.correct + results.incorrect;
    const accuracy = totalAnswered > 0 ? Math.round((results.correct / totalAnswered) * 100) : 0;

    return (
      <div className="min-h-screen bg-gray-50 font-mono">
        <header className="border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold text-green-600">Hoàn Thành! 🎉</h1>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="p-10 shadow-2xl border-green-400/50">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 scale-animation">
                  <Trophy className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Phiên Ôn Tập Hoàn Tất!</h2>
                <p className="text-slate-600">Xin chúc mừng vì sự chăm chỉ của bạn.</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="p-4 text-center bg-orange-50 border-orange-300">
                  <div className="text-4xl font-extrabold mb-1" style={{ color: PRIMARY_COLOR }}>{accuracy}%</div>
                  <div className="text-sm text-slate-600">Độ Chính Xác</div>
                </Card>
                <Card className="p-4 text-center bg-green-50 border-green-300">
                  <div className="text-4xl font-extrabold text-green-600 mb-1">{results.correct}</div>
                  <div className="text-sm text-slate-600">Đúng</div>
                </Card>
                <Card className="p-4 text-center bg-red-50 border-red-300">
                  <div className="text-4xl font-extrabold text-red-600 mb-1">{results.incorrect}</div>
                  <div className="text-sm text-slate-600">Sai</div>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" asChild className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50">
                  <Link href="/review">Quay lại Ôn Tập</Link>
                </Button>
                <Button asChild className="flex-1 bg-slate-700 hover:bg-slate-800">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // --- TRẠNG THÁI: ĐANG ÔN TẬP ---
  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      {/* Header và Progress Bar */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="text-slate-600 hover:text-red-500">
            <Link href="/review">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Thoát
            </Link>
          </Button>
          <div className="text-center flex-1">
             <Progress value={progress} className="h-2 w-full max-w-sm mx-auto" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-700">
              {currentIndex + 1} / {dueItems.length}
            </span>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 font-mono">
        <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
            <motion.div
                key={currentItem.word + animationKey} // Key thay đổi để kích hoạt animation
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="p-10 shadow-2xl border-4 border-orange-200/50 bg-white">
                    {!showAnswer ? (
                        /* GIAI ĐOẠN 1: HIỂN THỊ TỪ */
                        <div className="text-center">
                            <p className="text-xl font-medium text-slate-500 mb-6">Bạn có nhớ nghĩa của từ này không?</p>
                            <h2 className="text-6xl font-extrabold mb-10 text-slate-900 drop-shadow-md">{currentItem.word}</h2>
                            <p className="text-slate-600 mb-10 italic text-lg">"{currentItem.example}"</p>
                            
                            <Button onClick={() => setShowAnswer(true)} 
                                style={{ backgroundColor: PRIMARY_COLOR }} 
                                className="w-full text-lg py-7 font-bold hover:bg-orange-600 transition-all duration-300 shadow-xl shadow-orange-300/50"
                            >
                                <RefreshCw className="h-5 w-5 mr-3" />
                                Xem Đáp Án
                            </Button>
                        </div>
                    ) : (
                        /* GIAI ĐOẠN 2: HIỂN THỊ ĐÁP ÁN VÀ NÚT CHỌN */
                        <div>
                            <div className="text-center mb-10">
                                <h2 className="text-xl font-bold text-slate-800 mb-3">{currentItem.word}</h2>
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="bg-orange-50 rounded-xl p-8 border-2 border-orange-300/70"
                                >
                                    <p className="text-3xl font-extrabold text-slate-900 mb-2">{currentItem.translation}</p>
                                    <p className="text-slate-600 italic text-base">"{currentItem.example}"</p>
                                </motion.div>
                            </div>

                            <div className="text-center mb-6">
                                <p className="text-slate-700 font-semibold mb-4 text-lg">Bạn có nhớ từ này không?</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    onClick={() => handleAnswer(false)}
                                    className="bg-red-500/10 border-2 border-red-500/50 text-red-600 hover:bg-red-500/20 py-5 text-lg font-bold transition-all duration-300"
                                >
                                    <X className="h-6 w-6 mr-2" />
                                    Quên Mất
                                </Button>
                                <Button
                                    onClick={() => handleAnswer(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-300/50 py-5 text-lg font-bold transition-all duration-300"
                                >
                                    <Check className="h-6 w-6 mr-2" />
                                    Nhớ Rồi
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </motion.div>
            </AnimatePresence>

          {/* Stats Bar cố định ở dưới */}
          <Card className="grid grid-cols-2 gap-4 mt-8 p-4 bg-white shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-green-600">{results.correct}</div>
              <div className="text-sm text-slate-600">Đúng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-red-600">{results.incorrect}</div>
              <div className="text-sm text-slate-600">Sai</div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}