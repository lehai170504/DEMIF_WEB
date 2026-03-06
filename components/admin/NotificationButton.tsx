"use client";

import { useState } from "react";
import { Bell, Check, Info, AlertTriangle, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Cảnh báo bảo mật",
    description: "Phát hiện đăng nhập lạ từ địa chỉ IP: 103.xxx.xxx",
    time: "2 phút trước",
    type: "warning",
    unread: true,
  },
  {
    id: 2,
    title: "Đơn hàng mới",
    description: "Khách hàng Lê Văn A vừa thanh toán đơn #ORD-882",
    time: "15 phút trước",
    type: "success",
    unread: true,
  },
  {
    id: 3,
    title: "Hệ thống",
    description: "Lịch bảo trì định kỳ sẽ bắt đầu vào 00:00 tối nay.",
    time: "2 giờ trước",
    type: "info",
    unread: false,
  },
];

export function NotificationButton() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () =>
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  const clearAll = () => setNotifications([]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-100 group transition-all rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <Bell
            className={cn(
              "h-5 w-5 transition-all group-hover:rotate-12",
              unreadCount > 0
                ? "text-[#FF7A00] fill-[#FF7A00]/20"
                : "text-gray-500",
            )}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF7A00] text-[9px] font-black text-white items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-85 p-0 font-mono rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-gray-200 bg-white/95 backdrop-blur-2xl mt-4 overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="font-black text-xs uppercase tracking-widest text-gray-900 italic">
              Trung tâm thông báo
            </span>
            {unreadCount > 0 && (
              <Badge className="bg-[#FF7A00] text-white text-[9px] h-4 px-1.5 font-black">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="h-7 text-[9px] font-black uppercase text-gray-500 hover:text-[#FF7A00] hover:bg-transparent"
          >
            Đánh dấu đã đọc
          </Button>
        </div>

        <ScrollArea className="h-[380px] no-scrollbar">
          {notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "flex gap-4 p-5 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative group",
                    n.unread && "bg-orange-50/50",
                  )}
                >
                  {n.unread && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#FF7A00] rounded-r-full shadow-[0_0_10px_#FF7A00]" />
                  )}
                  <div
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110",
                      n.type === "success" &&
                        "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                      n.type === "warning" &&
                        "bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/20",
                      n.type === "info" &&
                        "bg-blue-500/10 text-blue-600 border-blue-500/20",
                    )}
                  >
                    {n.type === "success" && <Check className="h-5 w-5" />}
                    {n.type === "warning" && (
                      <AlertTriangle className="h-5 w-5" />
                    )}
                    {n.type === "info" && <Info className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p
                      className={cn(
                        "text-[13px] leading-none tracking-tight",
                        n.unread
                          ? "font-black text-gray-900"
                          : "font-bold text-gray-600",
                      )}
                    >
                      {n.title}
                    </p>
                    <p className="text-[11px] text-gray-500 leading-relaxed italic">
                      "{n.description}"
                    </p>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-2">
                      {n.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Zap className="h-12 w-12 mb-4 opacity-20 animate-pulse text-gray-300" />
              <p className="text-[10px] font-black uppercase tracking-[.3em]">
                Hộp thư trống
              </p>
            </div>
          )}
        </ScrollArea>

        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <Button
            variant="ghost"
            onClick={clearAll}
            className="w-full text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Xóa tất cả nhật ký
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
