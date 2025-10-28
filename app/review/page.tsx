"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Clock, TrendingUp } from "lucide-react"
import { vocabularyItems } from "@/lib/data/vocabulary"
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

  // Hàm ánh xạ độ khó sang tiếng Việt
  const getDifficultyText = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy": return "Dễ";
      case "medium": return "Trung Bình";
      case "hard": return "Khó";
      default: return "";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-white/90 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-extrabold text-slate-800">Ôn Tập Từ Vựng</h1>
          </div>
          <Button variant="outline" size="sm" asChild className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-neutral-900">
            <Link href="/profile">Hồ Sơ</Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        
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
              <div className="flex gap-2 mb-6">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-[#FF7A00] hover:bg-[#FF8A1C] text-white"
                >
                  Tất Cả
                </Button>
                <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                  Cần Ôn Hôm Nay
                </Button>
                <Button variant="outline" size="sm">
                  Đã Thành Thạo
                </Button>
                <Button variant="outline" size="sm">
                  Đang Học
                </Button>
              </div>
            </div>

            {/* Danh sách các từ */}
            <div className="space-y-4">
              {vocabularyItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="p-6 hover:border-orange-400 transition-colors border-gray-100 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-extrabold text-slate-800">{item.word}</h3>
                        
                        {/* Huy hiệu Độ khó */}
                        <Badge
                          variant="outline"
                          className={`text-xs font-semibold px-3 py-1 ${
                            item.difficulty === "easy"
                              ? "bg-green-100 text-green-700 border-green-300"
                              : item.difficulty === "medium"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                : "bg-red-100 text-red-700 border-red-300"
                          }`}
                        >
                          {getDifficultyText(item.difficulty)}
                        </Badge>
                        
                        {/* Huy hiệu Cần Ôn */}
                        {new Date(item.nextReview) <= new Date() && (
                          <Badge 
                            variant="outline" 
                            className="bg-orange-100 text-[#FF7A00] border-orange-300 font-semibold"
                          >
                            Cần Ôn
                          </Badge>
                        )}
                      </div>
                      
                      {/* Dịch nghĩa */}
                      <p className="text-slate-600 text-lg mb-2">{item.translation}</p>
                      
                      {/* Ví dụ */}
                      <p className="text-sm text-slate-500 italic mb-4">"{item.example}"</p>
                      
                      {/* Thanh Tiến độ */}
                      <div className="flex items-center gap-6">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-600">Độ Thành Thạo</span>
                            <span className="font-bold" style={{ color: PRIMARY_ORANGE }}>{item.mastery}%</span>
                          </div>
                          <Progress value={item.mastery} className="h-2 bg-gray-200 " />
                        </div>
                        <div className="text-sm text-slate-500 whitespace-nowrap">Đã ôn **{item.reviewCount} lần**</div>
                      </div>
                    </div>
                  </div>
                </Card>
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