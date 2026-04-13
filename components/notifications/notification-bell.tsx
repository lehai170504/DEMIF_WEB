"use client";

import { useState } from "react"; // Thêm useState
import { Bell, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useNotifications,
  useUnreadNotificationCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from "@/hooks/use-notification";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: countData } = useUnreadNotificationCount();
  const { data: notifData } = useNotifications(1, 20);
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead, isPending: isMarkingAll } =
    useMarkAllNotificationsAsRead();

  const unreadCount = countData?.unreadCount || 0;
  const notifications = notifData?.items || [];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-white/10"
        >
          <Bell className="h-5 w-5 text-zinc-400" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 md:w-96 p-0 bg-white dark:bg-[#111] border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden font-mono"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">
            Thông báo
          </h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markAllAsRead()}
              disabled={isMarkingAll}
              className="h-8 text-[10px] font-bold uppercase text-[#FF7A00] hover:text-orange-600 hover:bg-orange-500/10"
            >
              <Check className="w-3 h-3 mr-1" /> Đánh dấu đã đọc hết
            </Button>
          )}
        </div>

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-50">
              <Bell className="w-10 h-10 mb-4 text-zinc-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Chưa có thông báo nào
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => !item.isRead && markAsRead(item.id)}
                  className={cn(
                    "p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer relative",
                    !item.isRead ? "bg-orange-500/5 dark:bg-orange-500/10" : "",
                  )}
                >
                  {!item.isRead && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  )}
                  <div className="pl-3">
                    <h4
                      className={cn(
                        "text-xs font-bold mb-1",
                        !item.isRead
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-zinc-400",
                      )}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-500 leading-relaxed mb-2 line-clamp-2">
                      {item.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </span>
                      {item.actionUrl && (
                        <Link
                          href={item.actionUrl}
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(item.id);
                            setIsOpen(false);
                          }}
                          className="flex items-center text-[9px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600"
                        >
                          Chi tiết <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
