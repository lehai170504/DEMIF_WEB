"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Sparkles, Send, RefreshCw, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void; // Cập nhật prop chuẩn
  feedback: {
    id: string | number;
    userName: string;
    email?: string;
    category?: string;
    content: string;
    aiResponse: string;
    createdAt: string;
    status: string;
  } | null;
  onReply?: () => void;
  onResendTraining?: () => void;
}

const getStatusBadge = (status: string) => {
  const config: Record<string, { label: string; className: string }> = {
    pending: {
      label: "Chờ xử lý",
      className: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    },
    "in-progress": {
      label: "Đang xử lý",
      className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    resolved: {
      label: "Hoàn tất",
      className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    },
  };

  const item = config[status] || {
    label: status,
    className: "bg-zinc-500/10 text-zinc-500",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-black uppercase text-[9px] tracking-tighter px-2 py-0.5",
        item.className,
      )}
    >
      {item.label}
    </Badge>
  );
};

export function FeedbackDetailDrawer({
  open,
  onOpenChange,
  feedback,
  onReply,
  onResendTraining,
}: FeedbackDetailDrawerProps) {
  if (!feedback) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-[#09090b]/95 backdrop-blur-2xl border-l border-white/10 text-zinc-100 font-mono p-0 overflow-y-auto no-scrollbar shadow-2xl">
        {/* Header với Gradient mờ */}
        <div className="relative p-8 border-b border-white/5 bg-gradient-to-br from-[#FF7A00]/10 to-transparent overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/10 blur-[60px] rounded-full pointer-events-none" />
          <SheetHeader className="relative z-10 text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF7A00]/20 rounded-xl border border-[#FF7A00]/30">
                <MessageSquare className="h-5 w-5 text-[#FF7A00]" />
              </div>
              <SheetTitle className="text-xl font-black uppercase tracking-tight text-white italic">
                Chi tiết <span className="text-[#FF7A00]">Phản hồi</span>
              </SheetTitle>
            </div>
            <SheetDescription className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              Mã định danh: #{feedback.id} • {feedback.createdAt}
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="p-8 space-y-8 relative z-10">
          {/* Thông tin người gửi */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 border-l-2 border-[#FF7A00] pl-3">
              Thông tin nguồn
            </h4>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
              <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/10">
                <User className="h-6 w-6 text-zinc-400" />
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase italic">
                  {feedback.userName}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {feedback.email || "N/A"}
                </p>
              </div>
              <div className="ml-auto">{getStatusBadge(feedback.status)}</div>
            </div>
          </div>

          <Separator className="bg-white/5" />

          {/* Nội dung phản hồi */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 border-l-2 border-blue-500 pl-3">
              Nội dung khiếu nại
            </h4>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 leading-relaxed text-zinc-300 text-sm italic shadow-lg">
              "{feedback.content}"
            </div>
          </div>

          {/* AI Response Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-l-2 border-emerald-500 pl-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                Phản hồi hệ thống AI
              </h4>
              <Sparkles className="h-3 w-3 text-emerald-500 animate-pulse" />
            </div>
            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 leading-relaxed text-emerald-100/80 text-sm shadow-xl">
              {feedback.aiResponse || "Chưa có phản hồi tự động từ hệ thống."}
            </div>
          </div>
        </div>

        {/* Footer Actions fixed bottom */}
        <div className="sticky bottom-0 p-6 border-t border-white/5 bg-[#09090b]/80 backdrop-blur-md z-20 flex gap-3 mt-10">
          <Button
            variant="outline"
            onClick={onReply}
            className="flex-1 h-12 border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl font-bold transition-all shadow-xl active:scale-95"
          >
            <Send className="h-4 w-4 mr-2 text-[#FF7A00]" /> Trả lời ngay
          </Button>
          <Button
            onClick={onResendTraining}
            className="flex-1 h-12 bg-[#FF7A00] hover:bg-[#FF9E2C] text-white rounded-xl font-black uppercase tracking-tighter transition-all shadow-[0_10px_20px_rgba(255,122,0,0.2)] active:scale-95"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Re-Training AI
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
