"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  MessageSquare,
  Cpu,
  Eye,
  CheckCircle,
  Filter,
  LayoutGrid,
  Activity,
  Sparkles,
  UserCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FeedbackDetailDrawer } from "@/components/admin/feedback/FeedbackDetailDrawer";
import { cn } from "@/lib/utils";

// Types & Logic Giữ nguyên
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

const getStatusStyles = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10";
    case "in-progress":
      return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10";
    case "resolved":
      return "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10";
    default:
      return "bg-slate-50 text-slate-600 border-slate-100";
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

  return (
    <div className="w-full space-y-8 pb-10 font-mono">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Quality Assurance
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-slate-900 dark:text-white">
            Feedback{" "}
            <span className="text-slate-300 dark:text-slate-700">Terminal</span>
          </h1>
          <p className="text-muted-foreground text-xs font-medium italic">
            Xử lý khiếu nại của học viên và cảnh báo hiệu suất từ AI Engine.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-4 py-2 rounded-2xl uppercase italic animate-pulse">
          <Activity className="h-3 w-3" /> System Health: Stable
        </div>
      </div>

      {/* --- FILTER CONTROL PANEL --- */}
      <Card className="rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] bg-white dark:bg-slate-900 p-8 space-y-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Search Bar */}
          <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            <Input
              placeholder="Tìm nội dung khiếu nại..."
              className="h-12 pl-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold focus-visible:ring-2 focus-visible:ring-orange-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 hidden lg:block" />

          {/* Source Toggle Pills */}
          <div className="flex bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl">
            {[
              { label: "Tất cả", value: "all", icon: Filter },
              { label: "Người dùng", value: "user", icon: UserCircle },
              { label: "AI System", value: "ai", icon: Cpu },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSource(opt.value as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-xl text-[11px] font-bold uppercase transition-all duration-300",
                  source === opt.value
                    ? "bg-slate-900 text-white dark:bg-orange-500 shadow-md"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                <opt.icon className="h-3.5 w-3.5" /> {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-50 dark:border-slate-800">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2 italic">
            Status Filter:
          </span>
          {["all", "pending", "in-progress", "resolved"].map((status) => {
            const isActive = filter === status;
            const count =
              status === "all"
                ? feedbackData.length
                : feedbackData.filter((f) => f.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={cn(
                  "px-5 py-2 rounded-xl text-[11px] font-bold uppercase transition-all flex items-center gap-2",
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "bg-white border border-slate-100 dark:bg-slate-800 dark:border-none text-slate-500 hover:bg-slate-50"
                )}
              >
                {status}
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-md text-[9px] font-black",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* --- DATA TABLE SECTION --- */}
      <div className="rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden bg-white dark:bg-slate-900 mx-2 transition-all hover:shadow-md">
        <div className="p-8 border-b flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-black text-xl italic uppercase leading-none text-slate-800 dark:text-white">
                Communication Log
              </h2>
              <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-1.5">
                {filtered.length} kết quả được tìm thấy
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-slate-100">
                <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Nguồn & Người gửi
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Danh mục
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Nội dung tóm tắt
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Trạng thái
                </TableHead>
                <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((fb) => (
                <TableRow
                  key={fb.id}
                  className="group hover:bg-orange-50/30 transition-all border-b border-slate-50 last:border-none"
                >
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                          fb.source === "ai"
                            ? "bg-slate-900 text-orange-400"
                            : "bg-orange-100 text-orange-600"
                        )}
                      >
                        {fb.source === "ai" ? (
                          <Sparkles className="h-5 w-5" />
                        ) : (
                          <UserCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 dark:text-slate-200 uppercase text-xs">
                          {fb.userName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium lowercase tracking-tighter">
                          {fb.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="rounded-lg border-slate-200 font-black text-[9px] uppercase bg-white dark:bg-slate-800"
                    >
                      {fb.category}
                    </Badge>
                  </TableCell>

                  <TableCell className="max-w-[300px]">
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate italic">
                      "{fb.content}"
                    </p>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter mt-1 block">
                      Sent: {fb.createdAt}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-lg border-none font-black text-[9px] uppercase tracking-tighter shadow-sm",
                        getStatusStyles(fb.status)
                      )}
                    >
                      {fb.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right px-8">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <FeedbackDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        feedback={selectedFeedback}
        onReply={() => console.log("Reply user")}
        onResendTraining={() => console.log("Resend training")}
      />
    </div>
  );
}
