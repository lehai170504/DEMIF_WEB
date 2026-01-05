"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Trophy,
  Crown,
  Zap,
  Award,
  BookOpen,
  Target,
  Clock,
} from "lucide-react";
import { leaderboardData } from "@/lib/data/leaderboard";

const PRIMARY_COLOR = "#FF7A00";

// Interface
interface LeaderboardEntry {
  userId: string;
  rank: number;
  username: string;
  avatar?: string;
  country: string;
  totalScore: number;
  completedLessons: number;
  currentStreak: number;
  dictationAccuracy: number;
  shadowingMatchRate: number;
  avgFeedbackScore: number;
}

type SortKey = "totalScore" | "dictationAccuracy" | "shadowingMatchRate";

// Mock data mở rộng
const extendedLeaderboardData: LeaderboardEntry[] = leaderboardData.map(
  (entry: any) => ({
    ...entry,
    dictationAccuracy:
      entry.userId === "user-1"
        ? 92
        : Number((Math.random() * (95 - 70) + 70).toFixed(0)),
    shadowingMatchRate:
      entry.userId === "user-1"
        ? 88
        : Number((Math.random() * (90 - 65) + 65).toFixed(0)),
    avgFeedbackScore:
      entry.userId === "user-1"
        ? 4.7
        : Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
    completedLessons: entry.userId === "user-1" ? 42 : entry.completedLessons,
    currentStreak: entry.userId === "user-1" ? 15 : entry.currentStreak,
  })
) as LeaderboardEntry[];

// Right Sidebar
const RightSidebar = ({ currentUser }: { currentUser: LeaderboardEntry }) => (
  <aside className="space-y-6">
    {/* Lộ trình cá nhân */}
    <Card className="p-4 bg-white border-2 border-orange-200 shadow-lg">
      <h3 className="text-xl font-extrabold text-slate-800 mb-4 flex items-center">
        <Target className="h-5 w-5 mr-2 text-orange-500" />
        Lộ Trình Của Bạn
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-slate-700">Bài học Hoàn thành</span>
          </div>
          <span className="font-bold text-base text-green-700">
            {currentUser.completedLessons}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Zap className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-sm text-slate-700">
              Chuỗi Luyện tập (Ngày)
            </span>
          </div>
          <span className="font-bold text-base text-yellow-700">
            {currentUser.currentStreak} 🔥
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Award className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm text-slate-700">AI Feedback (Avg)</span>
          </div>
          <span className="font-bold text-base text-blue-700">
            {currentUser.avgFeedbackScore}/5.0
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link href="/roadmap" passHref>
          <Button
            className="w-full text-sm font-semibold"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            <Clock className="h-4 w-4 mr-2" />
            Tiếp tục Lộ Trình
          </Button>
        </Link>
      </div>
    </Card>

    {/* Thống kê mục tiêu */}
    <Card className="p-4 bg-white shadow-md">
      <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">
        Mục Tiêu Tháng Này
      </h4>
      <p className="text-sm text-slate-600 italic">
        "Hoàn thành thêm 10 bài học để giữ chuỗi luyện tập và tăng 5% Shadowing
        Match Rate!"
      </p>
    </Card>
  </aside>
);

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<SortKey>("totalScore");

  const sortedData = [...extendedLeaderboardData].sort((a, b) => {
    if (sortBy === "totalScore") return b.totalScore - a.totalScore;
    if (sortBy === "dictationAccuracy")
      return b.dictationAccuracy - a.dictationAccuracy;
    if (sortBy === "shadowingMatchRate")
      return b.shadowingMatchRate - a.shadowingMatchRate;
    return 0;
  });

  const topThreeGlobal = [...extendedLeaderboardData]
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3);

  const currentUser = sortedData.find((entry) => entry.userId === "user-1");

  const restOfLeaderboard = sortedData
    .filter((entry) => entry.rank > 3)
    .slice(0, 7)
    .map((entry, index) => ({
      ...entry,
      rank: sortedData.findIndex((d) => d.userId === entry.userId) + 1,
    }));

  if (currentUser) {
    currentUser.rank =
      sortedData.findIndex((d) => d.userId === currentUser.userId) + 1;
  }

  const getSortButtonClass = (key: SortKey) =>
    sortBy === key
      ? `bg-orange-500 text-white font-bold shadow-md`
      : `bg-white text-slate-600 hover:bg-orange-100`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-mono">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-10">
        {/* ==== PHẦN HEADER ==== */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Nút quay lại */}
          <div className="flex justify-start items-center mb-6">
            <Link href="/dashboard" passHref>
              <Button
                variant="ghost"
                className="text-sm text-slate-600 hover:bg-orange-100 hover:text-orange-600 transition-all"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Quay lại Dashboard
              </Button>
            </Link>
          </div>

          {/* Tiêu đề trung tâm */}
          <motion.div className="text-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4 border-4 border-orange-300 shadow-lg relative"
              animate={{
                boxShadow: [
                  "0 0 10px #FFB347",
                  "0 0 25px #FF7A00",
                  "0 0 10px #FFB347",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="h-9 w-9 text-orange-500" />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2"
              whileHover={{ scale: 1.03 }}
            >
              Bảng Xếp Hạng Kỹ Năng
            </motion.h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
              Xếp hạng dựa trên điểm tích lũy từ Shadowing & Dictation. Duy trì
              luyện tập mỗi ngày để vươn lên top đầu!
            </p>
          </motion.div>
        </motion.div>

        {/* ==== NỘI DUNG CHÍNH 2 CỘT ==== */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          {/* Cột trái */}
          <div className="lg:col-span-2">
            {/* Thông tin người dùng hiện tại */}
            {currentUser && (
              <Card className="p-4 md:p-5 mb-8 bg-gradient-to-r from-orange-100 to-white border-2 border-orange-400 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-extrabold text-orange-600">
                      #{currentUser.rank}
                    </div>
                    <Avatar className="h-12 w-12 border-2 border-orange-500">
                      <AvatarImage
                        src={currentUser.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-extrabold text-lg text-slate-800">
                        {currentUser.username} (Bạn)
                      </div>
                      <div className="text-xs text-slate-600">
                        {currentUser.country}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-2xl font-extrabold"
                      style={{ color: PRIMARY_COLOR }}
                    >
                      {currentUser.totalScore.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-600">Điểm Lãnh Đạo</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Podium top 3 */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 items-end">
              {topThreeGlobal.map((entry, index) => (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card
                    className={`p-4 flex flex-col items-center justify-end ${
                      index === 0
                        ? "bg-gradient-to-t from-orange-200 to-white border-4 border-yellow-500 shadow-yellow-300"
                        : "bg-white border-gray-200 shadow-md"
                    }`}
                  >
                    <div className="relative">
                      {index === 0 && (
                        <Crown className="h-6 w-6 text-yellow-500 absolute -top-6 left-1/2 transform -translate-x-1/2 animate-bounce" />
                      )}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                          index === 0
                            ? "bg-yellow-100 border-4 border-yellow-500"
                            : index === 1
                            ? "bg-gray-200 border-2 border-gray-500"
                            : "bg-amber-200/50 border-2 border-amber-500"
                        }`}
                      >
                        <span
                          className={`text-xl font-extrabold ${
                            index === 0
                              ? "text-yellow-600"
                              : index === 1
                              ? "text-gray-600"
                              : "text-amber-600"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <Avatar className="h-14 w-14 mb-2 border-2 border-slate-400">
                      <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{entry.username[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-sm md:text-base text-slate-800 truncate">
                      {entry.username}
                    </h3>
                    <p className="text-xs text-slate-500 mb-2">
                      {entry.country}
                    </p>
                    <div
                      className="text-lg md:text-xl font-extrabold"
                      style={{ color: PRIMARY_COLOR }}
                    >
                      {entry.totalScore.toLocaleString()}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Bộ lọc/sắp xếp */}
            <Card className="mb-4 p-3 border-orange-200 bg-white shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
                <div className="font-semibold text-slate-700 mb-2 sm:mb-0 flex items-center">
                  <Award className="h-4 w-4 mr-2 text-orange-500" />
                  Sắp xếp theo:
                </div>
                <div className="flex space-x-2 text-xs">
                  <Button
                    size="sm"
                    className={getSortButtonClass("totalScore")}
                    onClick={() => setSortBy("totalScore")}
                  >
                    Điểm Tổng
                  </Button>
                  <Button
                    size="sm"
                    className={getSortButtonClass("dictationAccuracy")}
                    onClick={() => setSortBy("dictationAccuracy")}
                  >
                    Dictation Acc
                  </Button>
                  <Button
                    size="sm"
                    className={getSortButtonClass("shadowingMatchRate")}
                    onClick={() => setSortBy("shadowingMatchRate")}
                  >
                    Shadowing Match
                  </Button>
                </div>
              </div>
            </Card>

            {/* Danh sách chi tiết */}
            <Card className="p-4 shadow-xl border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-slate-800">
                Top {restOfLeaderboard.length + topThreeGlobal.length} Người Học
              </h3>
              <div className="space-y-2">
                {restOfLeaderboard.map((entry) => (
                  <div
                    key={entry.userId}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      entry.userId === "user-1"
                        ? "bg-orange-100/50 border-l-4 border-orange-500 shadow-md"
                        : "bg-white hover:bg-gray-100 transition-colors border border-gray-200"
                    }`}
                  >
                    <div
                      className="w-6 text-center font-bold text-lg"
                      style={{
                        color:
                          entry.userId === "user-1" ? PRIMARY_COLOR : "#6B7280",
                      }}
                    >
                      #{entry.rank}
                    </div>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{entry.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm md:text-base truncate">
                          {entry.username}
                        </span>
                        {entry.userId === "user-1" && (
                          <Badge
                            variant="outline"
                            className="h-4 px-1 text-xs bg-orange-300 text-orange-800 border-orange-400 font-bold"
                          >
                            Bạn
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {entry.country}
                      </div>
                    </div>
                    <div className="text-right ml-4 min-w-[60px]">
                      <div
                        className="text-lg font-extrabold"
                        style={{ color: PRIMARY_COLOR }}
                      >
                        {entry.totalScore.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">Điểm</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Cột phải */}
          <div className="mt-8 lg:mt-0 lg:col-span-1">
            {currentUser && <RightSidebar currentUser={currentUser} />}
          </div>
        </div>
      </main>
    </div>
  );
}
