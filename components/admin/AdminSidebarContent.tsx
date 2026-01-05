"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users,
  Settings,
  BookOpen,
  FileAudio,
  Bot,
  BarChart3,
  ShoppingCart,
  LayoutDashboard,
  Activity,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const MENU_GROUPS = [
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

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  showText: boolean;
  variant?: "default" | "dark";
}

const NavItem = ({
  href,
  icon: Icon,
  label,
  isActive,
  showText,
  variant = "default",
}: NavItemProps) => {
  const activeStyles =
    variant === "dark"
      ? "bg-foreground text-background"
      : "bg-orange-500 text-white shadow-md shadow-orange-200";

  return (
    <Link href={href}>
      <div
        className={cn(
          "group relative flex items-center h-11 rounded-xl transition-all mb-1 px-3",
          isActive
            ? activeStyles
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          !showText && "justify-center px-0"
        )}
      >
        <Icon className={cn("h-5 w-5 shrink-0", showText && "mr-3")} />
        {showText && (
          <span className="text-sm font-medium truncate">{label}</span>
        )}
      </div>
    </Link>
  );
};

interface Props {
  isCollapsed?: boolean;
  forceOpen?: boolean;
}

export default function AdminSidebarContent({ isCollapsed, forceOpen }: Props) {
  const pathname = usePathname();
  const showText = forceOpen || !isCollapsed;

  // Hàm kiểm tra active chính xác hơn (bao gồm cả các sub-routes)
  const checkActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-background font-mono border-r">
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
              <span className="font-bold text-[13px] truncate">
                Lê Hoàng Hải
              </span>
              <span className="text-[10px] text-orange-500 font-bold uppercase">
                Pro Admin
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-3">
        {MENU_GROUPS.map((group) => (
          <div key={group.group} className="mb-6">
            {showText && (
              <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
                {group.group}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  isActive={checkActive(item.href)}
                  showText={showText}
                />
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="p-4 border-t">
        <NavItem
          href="/admin/settings/security"
          icon={Settings}
          label="Cài đặt"
          isActive={checkActive("/admin/settings/security")}
          showText={showText}
          variant="dark"
        />
      </div>
    </div>
  );
}
