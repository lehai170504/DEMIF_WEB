"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Trophy,
  BookOpen,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const summary = {
  totalUsers: 532,
  totalLessons: 2410,
  avgScore: 87.2,
  feedbackCount: 54,
};

const performanceData = [
  { month: "Th1", avgScore: 75 },
  { month: "Th2", avgScore: 80 },
  { month: "Th3", avgScore: 85 },
  { month: "Th4", avgScore: 83 },
  { month: "Th5", avgScore: 90 },
  { month: "Th6", avgScore: 88 },
];

const topStudents = [
  { name: "pro_listener", score: 95.1, lessons: 580 },
  { name: "student_vip", score: 88.9, lessons: 350 },
  { name: "newbie_user", score: 72.4, lessons: 120 },
];

export default function AdminStatsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-primary" /> Thống Kê Hệ Thống
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>Tổng Học Viên</CardTitle>
            <Users className="text-primary" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {summary.totalUsers}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>Bài Học Hoàn Thành</CardTitle>
            <BookOpen className="text-primary" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {summary.totalLessons}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>Điểm Trung Bình</CardTitle>
            <Trophy className="text-primary" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {summary.avgScore}%
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>Feedback Gần Đây</CardTitle>
            <MessageSquare className="text-primary" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {summary.feedbackCount}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hiệu Suất Trung Bình Theo Tháng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Học Viên</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topStudents.map((s, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b last:border-0 pb-2"
              >
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {s.lessons} bài học
                  </p>
                </div>
                <p className="font-bold text-primary">{s.score}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
