// app/review/page.tsx
"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Clock, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { vocabularyItems } from "@/lib/data/vocabulary";
import { HeaderUser } from "@/components/layouts/User/HeaderUser"; // <<< ĐÃ SỬA IMPORT
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding"

// Định nghĩa màu cam chủ đạo nhất quán
const PRIMARY_ORANGE = "#FF7A00";

export default function ReviewPage() {
  // Lọc từ cần ôn tập (ngày ôn tập tiếp theo <= ngày hiện tại)
  const dueForReview = vocabularyItems.filter((item) => new Date(item.nextReview) <= new Date())

  // Tính độ thành thạo trung bình
  const totalMastery = vocabularyItems.length > 0
    ? Math.round(vocabularyItems.reduce((sum, item) => sum + item.mastery, 0) / vocabularyItems.length)
    : 0;

  // State for filter
  const [filter, setFilter] = useState<"all" | "due" | "mastered" | "learning">("all");

  // Hàm ánh xạ độ khó sang tiếng Việt
  const getDifficultyText = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy": return "Dễ";
      case "medium": return "Trung Bình";
      case "hard": return "Khó";
      default: return "";
    }
  }

  // Filter vocabulary items based on selected filter
  const filteredItems = vocabularyItems.filter((item) => {
    switch (filter) {
      case "due":
        return new Date(item.nextReview) <= new Date();
      case "mastered":
        return item.mastery >= 80;
      case "learning":
        return item.mastery < 80;
      default:
        return true;
    }
  });

  // FlashCard Component
  const FlashCard = ({ item, getDifficultyText }: { item: any; getDifficultyText: (difficulty: "easy" | "medium" | "hard") => string }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <motion.div
        className="relative w-full h-64 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Card className="w-full h-full p-6 bg-gradient-to-br from-white to-orange-50 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={`text-xs font-semibold px-2 py-1 ${item.difficulty === "easy" ? "bg-green-100 text-green-700 border-green-300" : item.difficulty === "medium" ? "bg-yellow-100 text-yellow-700 border-yellow-300" : "bg-red-100 text-red-700 border-red-300"}`}>
                    {getDifficultyText(item.difficulty)}
                  </Badge>
                  {new Date(item.nextReview) <= new Date() && (
                    <Badge variant="outline" className="bg-orange-100 text-[#FF7A00] border-orange-300 font-semibold text-xs">Cần Ôn</Badge>
                  )}
                </div>
                <h3 className="text-3xl font-extrabold text-slate-800 mb-2">{item.word}</h3>
                <p className="text-sm text-slate-500 italic">Nhấn để xem nghĩa</p>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Card className="w-full h-full p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 shadow-lg flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{item.word}</h3>
                <p className="text-xl font-semibold text-slate-700 mb-3">{item.translation}</p>
                <p className="text-sm text-slate-600 italic mb-4">"{item.example}"</p>
                <div className="w-full">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600">Độ Thành Thạo</span>
                    <span className="font-bold" style={{ color: PRIMARY_ORANGE }}>{item.mastery}%</span>
                  </div>
                  <Progress value={item.mastery} className="h-2 bg-gray-200" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Đã ôn {item.reviewCount} lần</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-mono">
      <HeaderUser />

      <main className="flex-1 container mx-auto px-6 py-8">
        {/* Bố cục 4 cột: 1fr | 3fr | 3fr | 1fr */}
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-cols-[1fr_3fr_3fr_1fr] gap-6">

          {/* Cột 1: Lề trái (trống) */}
          <div className="hidden lg:block"></div>

          {/* Cột 2 & 3: Nội dung chính */}
          <div className="col-span-1 lg:col-span-2 space-y-8">

            {/* Thống kê */}
            <h2 className="text-2xl font-bold text-slate-800">Thống Kê Tổng Quan</h2>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Cần Ôn Tập Hôm Nay */}
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Clock className="h-6 w-6" style={{ color: PRIMARY_ORANGE }} />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold" style={{ color: PRIMARY_ORANGE }}>{dueForReview.length}</div>
                    <div className="text-sm text-slate-600">Từ Cần Ôn Hôm Nay</div>
                  </div>
                </div>
              </Card>

              {/* Tổng Số Từ */}
              <Card className="p-6 bg-white border-gray-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-slate-800">{vocabularyItems.length}</div>
                    <div className="text-sm text-slate-600">Tổng Số Từ</div>
                  </div>
                </div>
              </Card>

              {/* Độ Thành Thạo TB */}
              <Card className="p-6 bg-white border-gray-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-green-600">{totalMastery}%</div>
                    <div className="text-sm text-slate-600">Thành Thạo Trung Bình</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Nút Bắt đầu Ôn Tập */}
            {dueForReview.length > 0 && (
              <Card className="p-8 bg-gradient-to-br from-orange-100 to-white border-orange-300 shadow-xl">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Sẵn Sàng Ôn Tập Chưa?</h2>
                  <p className="text-slate-600 mb-6">Bạn có **{dueForReview.length} từ** đang chờ được ôn tập.</p>
                  <Button
                    size="lg"
                    asChild
                    className="bg-[#FF7A00] hover:bg-[#FF8A1C] text-white font-bold text-lg shadow-lg shadow-orange-300/50"
                  >
                    <Link href="/review/session">Bắt Đầu Phiên Ôn Tập</Link>
                  </Button>
                </div>
              </Card>
            )}

            {/* Danh sách Từ Vựng */}
            <div className="pt-4">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Kho Từ Vựng Của Bạn</h2>

              {/* Bộ lọc */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  className={filter === "all" ? "bg-[#FF7A00] hover:bg-[#FF8A1C] text-white" : "border-orange-300 text-orange-600 hover:bg-orange-50"}
                >
                  Tất Cả
                </Button>
                <Button
                  variant={filter === "due" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("due")}
                  className={filter === "due" ? "bg-[#FF7A00] hover:bg-[#FF8A1C] text-white" : "border-orange-300 text-orange-600 hover:bg-orange-50"}
                >
                  Cần Ôn Hôm Nay
                </Button>
                <Button
                  variant={filter === "mastered" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("mastered")}
                  className={filter === "mastered" ? "bg-[#FF7A00] hover:bg-[#FF8A1C] text-white" : "border-orange-300 text-orange-600 hover:bg-orange-50"}
                >
                  Đã Thành Thạo
                </Button>
                <Button
                  variant={filter === "learning" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("learning")}
                  className={filter === "learning" ? "bg-[#FF7A00] hover:bg-[#FF8A1C] text-white" : "border-orange-300 text-orange-600 hover:bg-orange-50"}
                >
                  Đang Học
                </Button>
              </div>
            </div>

            {/* Danh sách các từ dưới dạng flash cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <FlashCard item={item} getDifficultyText={getDifficultyText} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cột 4: Lề phải (trống) */}
          <div className="hidden lg:block"></div>
        </div>
      </main>
      <FooterLanding />
    </div>
  )
}