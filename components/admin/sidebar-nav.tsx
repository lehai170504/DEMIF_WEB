"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Shield, CreditCard, Bell, LogOut, Activity } from "lucide-react";

const navItems = [
  { title: "Hồ sơ", href: "/admin/settings/profile", icon: User },
  { title: "Bảo mật", href: "/admin/settings/security", icon: Shield },
  { title: "Thanh toán", href: "/admin/settings/billing", icon: CreditCard },
  { title: "Thông báo", href: "/admin/settings/notifications", icon: Bell },
  { title: "Lịch sử hoạt động", href: "/admin/settings/logs", icon: Activity },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
            pathname === item.href
              ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
              : "text-slate-500 hover:bg-orange-50 hover:text-orange-600"
          )}
        >
          <item.icon className="w-4 h-4" />
          {item.title}
        </Link>
      ))}
      <div className="pt-4 border-t border-orange-100 mt-4">
        <button className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold w-full hover:bg-red-50 rounded-2xl transition-all">
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}
