"use client";

import Link from "next/link";
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
  Loader2,
  CreditCard,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserProfile } from "@/hooks/use-user";

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
      { href: "/admin/lessons", icon: BookOpen, label: "Bài tập" },
      { href: "/admin/blogs", icon: Newspaper, label: "Blog" },
      { href: "/admin/audio", icon: FileAudio, label: "Audio" },
    ],
  },
  {
    group: "Hệ thống",
    items: [
      { href: "/admin/users", icon: Users, label: "Người dùng" },
      {
        href: "/admin/subscriptions",
        icon: CreditCard,
        label: "Gói dịch vụ",
      },
      { href: "/admin/orders", icon: ShoppingCart, label: "Đơn hàng" },
      { href: "/admin/feedback", icon: Bot, label: "AI Feedback" },
      { href: "/admin/progress", icon: BarChart3, label: "Tiến độ" },
    ],
  },
];

const NavItem = ({ href, icon: Icon, label, isActive, showText }: any) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "group relative flex items-center h-11 rounded-xl transition-all duration-300 mb-1.5 px-3 mx-2",
          "hover:translate-x-1 active:scale-95",
          isActive
            ? "bg-[#FF7A00] text-white shadow-[0_4px_15px_rgba(255,122,0,0.25)]"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
          !showText && "justify-center px-0 mx-1",
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
            showText && "mr-3",
          )}
        />
        {showText && (
          <span className="text-[13px] font-bold tracking-tight truncate capitalize">
            {label}
          </span>
        )}
        {isActive && (
          <div className="absolute -left-2 w-1 h-6 bg-[#FF7A00] rounded-full blur-[1px] lg:bg-white" />
        )}
      </div>
    </Link>
  );
};

export default function AdminSidebarContent({ isCollapsed, forceOpen }: any) {
  const pathname = usePathname();
  const { data: user, isLoading } = useUserProfile();

  const showText = forceOpen || !isCollapsed;

  const checkActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const avatarSrc =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${user?.username || "Admin"}&background=FF7A00&color=fff&bold=true`;
  const displayName = user?.username || "Admin User";
  const roleDisplay = user?.roles?.includes("Admin")
    ? "Master Admin"
    : "Moderator";

  return (
    <div className="flex flex-col h-full font-mono">
      {/* Admin Profile Header */}
      <div className="flex items-center h-24 px-4">
        <div
          className={cn(
            "flex items-center gap-3 w-full p-2 rounded-2xl transition-all duration-500",
            showText &&
              "bg-gray-50 border border-gray-200 shadow-sm backdrop-blur-md",
          )}
        >
          {isLoading ? (
            // Loading State
            <div className="flex items-center justify-center w-full py-2">
              <Loader2 className="h-5 w-5 animate-spin text-[#FF7A00]" />
            </div>
          ) : (
            <>
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-[#FF7A00] blur-md opacity-20 animate-pulse" />
                <img
                  src={avatarSrc}
                  alt={displayName}
                  className="relative h-10 w-10 rounded-xl border border-gray-200 object-cover"
                />
              </div>
              {showText && (
                <div className="flex flex-col truncate">
                  <span
                    className="font-black text-[13px] text-gray-900 tracking-tighter truncate"
                    title={displayName}
                  >
                    {displayName}
                  </span>
                  <span className="text-[10px] text-[#FF7A00] font-bold uppercase tracking-[0.1em]">
                    {roleDisplay}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-2 no-scrollbar">
        {MENU_GROUPS.map((group) => (
          <div key={group.group} className="mb-6">
            {showText && (
              <h3 className="px-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
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

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <NavItem
          href="/admin/settings"
          icon={Settings}
          label="Cài đặt"
          isActive={checkActive("/admin/settings")}
          showText={showText}
        />
      </div>
    </div>
  );
}
