"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Users,
  Settings,
  BookOpen,
  FileAudio,
  Bot,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/lessons", icon: BookOpen, label: "Bài Tập" },
    { href: "/admin/users", icon: Users, label: "Người Dùng" },
    { href: "/admin/feedback", icon: Bot, label: "AI Feedback" },
    { href: "/admin/stats", icon: Bot, label: "Thống kê" },
    { href: "/admin/audio", icon: FileAudio, label: "Audio" },
    { href: "/admin/progress", icon: BarChart3, label: "Tiến độ học viên" },
  ];

  return (
    <aside className="hidden md:flex h-full w-64 flex-col border-r bg-background fixed left-0 top-0">
      {/* Header với Profile */}
      <div className="flex items-center gap-3 h-20 border-b px-4 lg:px-6">
        <Image
          src={`https://ui-avatars.com/api/?name=Lê+Hoàng+Hải&background=FF7A00&color=fff&bold=true`}
          alt="Admin Avatar"
          width={44}
          height={44}
          className="rounded-full border object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm">Lê Hoàng Hải</span>
          <span className="text-xs text-muted-foreground">Quản trị viên</span>
        </div>
      </div>

      {/* Danh sách menu */}
      <ScrollArea className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start text-left"
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer: Cài đặt */}
      <div className="mt-auto p-4 border-t">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/admin/settings">
            <Settings className="h-4 w-4 mr-3" />
            Cài đặt
          </Link>
        </Button>
      </div>
    </aside>
  );
}
