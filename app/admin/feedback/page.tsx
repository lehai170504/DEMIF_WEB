"use client";

import * as React from "react";
import { LayoutGrid, Activity } from "lucide-react";
import { CommunicationLog } from "@/components/admin/feedback/communication-log";
import { FeedbackFilter } from "@/components/admin/feedback/feedback-filter";
import { FeedbackDetailDrawer } from "@/components/admin/feedback/feedback-detail-drawer";

// Dữ liệu mẫu đã được Việt hóa hoàn toàn
const feedbackData = [
  {
    id: 1,
    source: "user",
    userName: "Lê Văn Tám",
    email: "tam.le@gmail.com",
    category: "Phát âm (Pronunciation)",
    content:
      "AI chấm điểm phát âm từ 'Architecture' hơi khắt khe so với thực tế.",
    aiResponse: "Đang phân tích lại phổ âm thanh cho từ khóa này.",
    status: "pending",
    createdAt: "02/02/2026 - 14:30",
  },
  {
    id: 2,
    source: "user",
    userName: "Trần Thị Tuyết",
    email: "tuyet.tran@yahoo.com",
    category: "Lỗi hệ thống",
    content:
      "Nút ghi âm thỉnh thoảng bị treo khi sử dụng trên trình duyệt Safari.",
    aiResponse: "Đã ghi nhận, đang tối ưu lại WebRTC cho Safari.",
    status: "resolved",
    createdAt: "01/02/2026 - 09:15",
  },
  {
    id: 3,
    source: "ai",
    userName: "AI Engine v3.0",
    email: "engine@demif.local",
    category: "Cảnh báo chấm điểm",
    content: "Phát hiện sai lệch logic scoring tại bài tập Shadowing #102.",
    aiResponse: "Tự động kích hoạt kiểm tra chéo dữ liệu huấn luyện.",
    status: "in-progress",
    createdAt: "02/02/2026 - 18:45",
  },
  {
    id: 4,
    source: "ai",
    userName: "Voice Checkbot",
    email: "bot.verify@demif.local",
    category: "Dữ liệu huấn luyện",
    content:
      "Cần bổ sung thêm mẫu giọng đọc tiếng Anh giọng Anh (British Accent).",
    aiResponse: "Đã đưa vào danh sách ưu tiên thu thập dữ liệu tháng 2.",
    status: "pending",
    createdAt: "31/01/2026 - 22:10",
  },
];

export default function AdminFeedbackPage() {
  // --- QUẢN LÝ STATE ---
  const [filter, setFilter] = React.useState<string>("all");
  const [source, setSource] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedFeedback, setSelectedFeedback] = React.useState<any>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // --- LOGIC LỌC DỮ LIỆU ---
  const filteredData = React.useMemo(() => {
    return feedbackData.filter((fb) => {
      const statusMatch = filter === "all" || fb.status === filter;
      const sourceMatch = source === "all" || fb.source === source;
      const searchMatch =
        fb.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.email.toLowerCase().includes(searchTerm.toLowerCase());

      return statusMatch && sourceMatch && searchMatch;
    });
  }, [filter, source, searchTerm]);

  // --- XỬ LÝ HÀNH ĐỘNG ---
  const handleViewDetail = (fb: any) => {
    setSelectedFeedback(fb);
    setDrawerOpen(true);
  };

  return (
    <div className="w-full space-y-8 pb-10 font-mono text-zinc-100 animate-in fade-in duration-500">
      {/* --- PHẦN TIÊU ĐỀ (HEADER) --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FF7A00] mb-2">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Quản trị chất lượng
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-white">
            Feedback <span className="text-zinc-700 font-normal">Terminal</span>
          </h1>
          <p className="text-zinc-500 text-xs font-medium italic mt-2">
            Hệ thống tiếp nhận phản hồi từ học viên và cảnh báo hiệu suất tự
            động từ AI Engine.
          </p>
        </div>

        {/* Trạng thái hệ thống động */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/5 border border-emerald-500/10 px-4 py-2.5 rounded-2xl uppercase italic animate-float shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <Activity className="h-3.5 w-3.5" />
          Trạng thái AI: Hoạt động ổn định
        </div>
      </header>

      {/* --- BỘ LỌC (FILTER PANEL) --- */}
      <section>
        <FeedbackFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          source={source}
          setSource={setSource}
          filter={filter}
          setFilter={setFilter}
          totalCount={filteredData.length}
        />
      </section>

      {/* --- DANH SÁCH PHẢN HỒI (TABLE) --- */}
      <section className="relative group">
        {/* Trang trí tia sáng mờ cho bảng */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7A00]/5 to-purple-500/5 blur-2xl opacity-50 pointer-events-none" />

        <CommunicationLog data={filteredData} onViewDetail={handleViewDetail} />
      </section>

      {/* --- CHI TIẾT (DRAWER) --- */}
      <FeedbackDetailDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen} // Sử dụng props chuẩn của Radix/Shadcn
        feedback={selectedFeedback}
      />

      {/* Footer nhỏ dưới cùng trang */}
      <footer className="pt-8 text-center">
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.5em]">
          Demif Intelligence Management System v2026
        </p>
      </footer>
    </div>
  );
}
