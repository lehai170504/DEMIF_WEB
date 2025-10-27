"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart3, Clock, Mic, Headphones } from "lucide-react";

export default function ProgressPage() {
  // Dữ liệu demo — sau này sẽ lấy từ Redux hoặc API
  const stats = [
    { label: "Tổng học viên", value: 128, icon: BarChart3 },
    { label: "Trung bình điểm AI", value: "86%", icon: Mic },
    { label: "Thời gian luyện nghe TB", value: "42 phút", icon: Headphones },
    { label: "Hoàn thành hôm nay", value: 37, icon: Clock },
  ];

  const studentProgress = [
    {
      name: "Nguyễn Văn A",
      totalLessons: 20,
      completed: 18,
      aiScore: 91,
    },
    {
      name: "Trần Thị B",
      totalLessons: 15,
      completed: 10,
      aiScore: 78,
    },
    {
      name: "Lê Hoàng C",
      totalLessons: 12,
      completed: 9,
      aiScore: 83,
    },
    {
      name: "Phạm Quốc D",
      totalLessons: 8,
      completed: 5,
      aiScore: 75,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Tiến độ học viên</h1>
        <p className="text-sm text-muted-foreground">
          Theo dõi hiệu suất và mức độ hoàn thành bài học của từng học viên.
        </p>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} className="shadow-sm border rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {item.label}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bảng chi tiết tiến độ học viên */}
      <Card className="border rounded-2xl">
        <CardHeader>
          <CardTitle>Chi tiết tiến độ</CardTitle>
          <CardDescription>
            Danh sách học viên và mức độ hoàn thành bài tập
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Học viên</TableHead>
                <TableHead>Tổng bài</TableHead>
                <TableHead>Hoàn thành</TableHead>
                <TableHead>Tiến độ</TableHead>
                <TableHead>Điểm AI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentProgress.map((student, index) => {
                const progress = Math.round(
                  (student.completed / student.totalLessons) * 100
                );
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>{student.totalLessons}</TableCell>
                    <TableCell>{student.completed}</TableCell>
                    <TableCell className="w-[200px]">
                      <Progress value={progress} className="h-2" />
                      <span className="text-xs text-muted-foreground ml-1">
                        {progress}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${
                          student.aiScore >= 85
                            ? "text-green-600"
                            : student.aiScore >= 70
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {student.aiScore}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
