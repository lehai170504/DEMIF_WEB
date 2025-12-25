"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Settings,
  BookOpen,
  FileAudio,
  Bot,
  BarChart3,
  ShoppingCart,
  LayoutDashboard,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  isCollapsed?: boolean;
  forceOpen?: boolean; // Dùng cho Mobile để luôn hiện chữ
}

export default function AdminSidebarContent({ isCollapsed, forceOpen }: Props) {
  const pathname = usePathname();
  const showText = forceOpen || !isCollapsed;

  const menuGroups = [
    {
      group: "Tổng quan",
      items: [
        { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/admin/stats", icon: Activity, label: "Thống kê" },
      ],
    },
    {
      group: "Nội dung",
      items: [
        { href: "/admin/lessons", icon: BookOpen, label: "Bài Tập" },
        { href: "/admin/audio", icon: FileAudio, label: "Audio" },
      ],
    },
    {
      group: "Hệ thống",
      items: [
        { href: "/admin/users", icon: Users, label: "Người Dùng" },
        { href: "/admin/orders", icon: ShoppingCart, label: "Đơn hàng" },
        { href: "/admin/feedback", icon: Bot, label: "AI Feedback" },
        { href: "/admin/progress", icon: BarChart3, label: "Tiến độ" },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background font-mono">
      {/* Header Profile */}
      <div className="flex items-center h-20 px-4 mb-4">
        <div
          className={cn(
            "flex items-center gap-3 w-full p-2 rounded-2xl transition-all",
            showText && "bg-muted/50 border border-border shadow-sm"
          )}
        >
          <Image
            src="https://ui-avatars.com/api/?name=Lê+Hoàng+Hải&background=FF7A00&color=fff&bold=true"
            alt="Admin"
            width={38}
            height={38}
            className="rounded-xl shrink-0"
          />
          {showText && (
            <div className="flex flex-col truncate">
              <span className="font-bold text-[13px]">Lê Hoàng Hải</span>
              <span className="text-[10px] text-orange-500 font-bold uppercase">
                Pro Admin
              </span>
            </div>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            {showText && (
              <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                {group.group}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "group relative flex items-center h-11 rounded-xl transition-all mb-1 px-3",
                        isActive
                          ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        !showText && "justify-center px-0"
                      )}
                    >
                      <Icon
                        className={cn("h-5 w-5 shrink-0", showText && "mr-3")}
                      />
                      {showText && (
                        <span className="text-sm font-medium ">
                          {item.label}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))} 
      </ScrollArea>

      <div className="p-4 border-t">
        <Link href="/admin/settings">
          <div
            className={cn(
              "flex items-center h-11 px-3 rounded-xl transition-all",
              pathname === "/admin/settings"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted",
              !showText && "justify-center px-0"
            )}
          >
            <Settings className={cn("h-5 w-5 shrink-0", showText && "mr-3")} />
            {showText && <span className="text-sm font-medium">Cài đặt</span>}
          </div>
        </Link>
      </div>
    </div>
  );
}
