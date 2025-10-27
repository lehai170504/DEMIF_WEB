"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Cpu, Eye, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FeedbackDetailDrawer } from "@/components/admin/feedback/FeedbackDetailDrawer";

type FeedbackSource = "user" | "ai";
type FeedbackStatus = "all" | "pending" | "in-progress" | "resolved";

const feedbackData = [
  {
    id: 1,
    source: "user",
    userName: "student_vip",
    email: "vip.user@gmail.com",
    category: "Pronunciation",
    content: "AI chấm điểm phát âm hơi thấp so với thực tế.",
    aiResponse: "Đang kiểm tra lại mô hình đánh giá phát âm.",
    status: "pending",
    createdAt: "2024-10-25",
  },
  {
    id: 2,
    source: "user",
    userName: "pro_listener",
    email: "pro@listener.net",
    category: "System Bug",
    content: "Không load được âm thanh ở bài số 12.",
    aiResponse: "Đã khắc phục lỗi tạm thời trên server.",
    status: "resolved",
    createdAt: "2024-09-10",
  },
  {
    id: 3,
    source: "ai",
    userName: "AI Engine",
    email: "ai@system.local",
    category: "Scoring Alert",
    content: "Phát hiện sai lệch giữa transcript và audio ở test #45.",
    aiResponse: "Ghi nhận sai lệch, chờ xác nhận từ đội kiểm thử.",
    status: "in-progress",
    createdAt: "2024-10-15",
  },
  {
    id: 4,
    source: "ai",
    userName: "AI Voice Check",
    email: "voicecheck@ai.local",
    category: "Training Data",
    content:
      "Cần thêm mẫu phát âm tiếng Việt miền Nam để cải thiện độ chính xác.",
    aiResponse: "Đề xuất đã được đưa vào kế hoạch training tháng tới.",
    status: "pending",
    createdAt: "2024-10-18",
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400";
    case "in-progress":
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400";
    case "resolved":
      return "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function AdminFeedbackPage() {
  const [filter, setFilter] = React.useState<FeedbackStatus>("all");
  const [source, setSource] = React.useState<FeedbackSource | "all">("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedFeedback, setSelectedFeedback] = React.useState<any>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const filtered = feedbackData.filter((fb) => {
    const statusMatch = filter === "all" || fb.status === filter;
    const sourceMatch = source === "all" || fb.source === source;
    const searchMatch =
      fb.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.content.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && sourceMatch && searchMatch;
  });

  const handleViewDetail = (feedback: any) => {
    setSelectedFeedback(feedback);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" /> Quản Lý Feedback
        </h1>
      </div>

      {/* Bộ lọc */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          {/* Tìm kiếm */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo người dùng hoặc nội dung..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Bộ lọc nguồn */}
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Tất cả", value: "all" },
              { label: "Người dùng", value: "user" },
              { label: "AI Hệ thống", value: "ai" },
            ].map((opt) => (
              <Button
                key={opt.value}
                variant={source === opt.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSource(opt.value as FeedbackSource | "all")}
              >
                {opt.value === "ai" ? (
                  <Cpu className="mr-1 h-4 w-4" />
                ) : (
                  <MessageSquare className="mr-1 h-4 w-4" />
                )}
                {opt.label}
              </Button>
            ))}
          </div>

          {/* Bộ lọc trạng thái */}
          <div className="flex gap-2 flex-wrap md:ml-auto">
            {["all", "pending", "in-progress", "resolved"].map((status) => {
              const count =
                status === "all"
                  ? feedbackData.length
                  : feedbackData.filter((f) => f.status === status).length;
              return (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status as FeedbackStatus)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Bảng dữ liệu */}
      <Card className="overflow-hidden shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">
            Danh sách Feedback ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/70 hover:bg-muted/70">
                  <TableHead>Nguồn</TableHead>
                  <TableHead>Người / AI</TableHead>
                  <TableHead>Danh Mục</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead>Ngày Gửi</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((fb) => (
                  <TableRow
                    key={fb.id}
                    className="hover:bg-secondary/20 transition-colors cursor-pointer"
                  >
                    <TableCell>
                      {fb.source === "ai" ? (
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400">
                          AI
                        </Badge>
                      ) : (
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400">
                          User
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">{fb.userName}</div>
                      <div className="text-xs text-muted-foreground">
                        {fb.email}
                      </div>
                    </TableCell>
                    <TableCell>{fb.category}</TableCell>
                    <TableCell className="max-w-[280px] truncate">
                      {fb.content}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeClass(fb.status)}
                      >
                        {fb.status.charAt(0).toUpperCase() + fb.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{fb.createdAt}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        onClick={() => handleViewDetail(fb)}
                        size="icon"
                        variant="ghost"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Drawer chi tiết */}
            <FeedbackDetailDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              feedback={selectedFeedback}
              onReply={() => console.log("Reply user")}
              onResendTraining={() => console.log("Resend training")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
