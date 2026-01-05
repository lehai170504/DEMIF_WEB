"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  Info,
  AlertTriangle,
  Trash2,
  Zap,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Mock data - Trong thực tế dữ liệu này sẽ lấy từ API hoặc Socket.io
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

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-orange-50 group transition-all"
        >
          <Bell
            className={cn(
              "h-5 w-5 transition-transform group-active:scale-90",
              unreadCount > 0
                ? "text-orange-600 fill-orange-50"
                : "text-muted-foreground"
            )}
          />

          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 flex h-4 w-4">
              {/* Hiệu ứng ping nhấp nháy thu hút sự chú ý */}
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600 text-[10px] font-bold text-white items-center justify-center border-2 border-background">
                {unreadCount}
              </span>
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-80 p-0 font-mono rounded-[1.5rem] shadow-2xl border-orange-100 mt-2"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-orange-50/30 rounded-t-[1.5rem]">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm uppercase tracking-tighter">
              Thông báo
            </span>
            {unreadCount > 0 && (
              <Badge className="bg-orange-600 text-[10px] h-5">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="h-7 text-[10px] font-bold hover:text-orange-600"
          >
            Đánh dấu đã đọc
          </Button>
        </div>

        {/* List */}
        <ScrollArea className="h-[350px]">
          {notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "flex gap-3 p-4 border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer relative",
                    n.unread && "bg-orange-50/10"
                  )}
                >
                  {n.unread && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-600" />
                  )}

                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border",
                      n.type === "success" &&
                        "bg-emerald-50 text-emerald-600 border-emerald-100",
                      n.type === "warning" &&
                        "bg-orange-50 text-orange-600 border-orange-100",
                      n.type === "info" &&
                        "bg-blue-50 text-blue-600 border-blue-100"
                    )}
                  >
                    {n.type === "success" && <Check className="h-4 w-4" />}
                    {n.type === "warning" && (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    {n.type === "info" && <Info className="h-4 w-4" />}
                  </div>

                  <div className="flex-1 space-y-1">
                    <p
                      className={cn(
                        "text-xs leading-none",
                        n.unread ? "font-black" : "font-medium text-slate-600"
                      )}
                    >
                      {n.title}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {n.description}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold italic">
                      {n.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Zap className="h-10 w-10 mb-2 opacity-10" />
              <p className="text-xs font-bold">Mọi thứ đã được xử lý xong!</p>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-2 border-t bg-slate-50/50 rounded-b-[1.5rem]">
          <Button
            variant="ghost"
            onClick={clearAll}
            className="w-full text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="mr-2 h-3.5 w-3.5" /> Xóa tất cả
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
