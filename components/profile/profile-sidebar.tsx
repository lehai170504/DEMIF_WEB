"use client";

import {
  User,
  Lock,
  Shield,
  Smartphone,
  CreditCard,
  ChevronRight,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "account", label: "Thông tin cá nhân", icon: User },
  { id: "password", label: "Mật khẩu", icon: Lock },
  { id: "mfa", label: "Bảo mật 2FA", icon: Shield },
  { id: "devices", label: "Thiết bị", icon: Smartphone },
  { id: "billing", label: "Thanh toán", icon: CreditCard },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

export function ProfileSidebar({ activeTab, onTabChange }: any) {
  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "group w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300",
              isActive
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                : "text-slate-500 hover:bg-white hover:shadow-md"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-orange-400" : "text-slate-400"
                )}
              />
              <span className="font-bold text-sm">{item.label}</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 opacity-0 transition-all",
                isActive && "opacity-100 translate-x-1"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
