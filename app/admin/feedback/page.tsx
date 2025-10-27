"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Eye, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const feedbackData = [
  {
    id: 1,
    user: "student_vip",
    email: "vip.user@gmail.com",
    category: "Pronunciation",
    message: "AI chấm điểm phát âm hơi thấp so với thực tế.",
    status: "pending",
    createdAt: "2024-10-25",
  },
  {
    id: 2,
    user: "pro_listener",
    email: "pro@listener.net",
    category: "System Bug",
    message: "Không load được âm thanh ở bài số 12.",
    status: "resolved",
    createdAt: "2024-09-10",
  },
  {
    id: 3,
    user: "newbie_user",
    email: "newbie@dictation.com",
    category: "Suggestion",
    message: "Mong thêm phần Shadowing nâng cao.",
    status: "in-progress",
    createdAt: "2024-10-05",
  },
];

type FeedbackStatus = "all" | "pending" | "in-progress" | "resolved";

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
  const [searchTerm, setSearchTerm] = React.useState("");

  const filtered = feedbackData.filter((fb) => {
    const statusMatch = filter === "all" || fb.status === filter;
    const searchMatch =
      fb.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.message.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" /> Quản Lý Feedback
        </h1>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo người dùng hoặc nội dung..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
                  <TableHead>Người Dùng</TableHead>
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
                      <div className="font-semibold">{fb.user}</div>
                      <div className="text-xs text-muted-foreground">
                        {fb.email}
                      </div>
                    </TableCell>
                    <TableCell>{fb.category}</TableCell>
                    <TableCell className="max-w-[250px] truncate">
                      {fb.message}
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
                      <Button size="icon" variant="ghost">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
