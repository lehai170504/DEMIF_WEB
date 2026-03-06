"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

import MobileSidebar from "../MobileSidebar";
import { NotificationButton } from "../NotificationButton";
import { Breadcrumbs } from "../navbar/breadcrumbs";
import { QuickCreate } from "../navbar/quick-create";
import { ServerStatus } from "../navbar/server-status";
import { UserAccountNav } from "../navbar/user-account-nav";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcuts([
    { key: "k", ctrl: true, action: () => searchInputRef.current?.focus() },
    {
      key: "s",
      ctrl: true,
      action: () => router.push("/admin/settings/security"),
    },
    {
      key: "p",
      ctrl: true,
      action: () => router.push("/admin/settings/profile"),
    },
  ]);

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center gap-4 border-b border-gray-200 bg-white/80 backdrop-blur-xl px-4 md:px-6 font-mono shadow-sm">
      {/* Cụm trái: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none">
        <MobileSidebar />
        <Breadcrumbs pathname={pathname} />
      </div>

      {/* Cụm giữa: Thanh tìm kiếm 3D Glass */}
      <div className="hidden lg:flex flex-1 justify-center max-w-md mx-auto">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
          <Input
            ref={searchInputRef}
            placeholder="Tìm kiếm nhanh..."
            className="w-full bg-gray-100 border-transparent hover:bg-gray-200/50 rounded-full pl-11 pr-12 focus-visible:ring-4 focus-visible:ring-orange-500/10 focus-visible:bg-white focus-visible:border-orange-500 transition-all text-sm text-gray-900 placeholder:text-gray-500 h-10"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-white border border-gray-200 px-1.5 font-sans text-[10px] font-bold text-gray-400 sm:flex shadow-sm">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Cụm phải: Action Buttons & User Menu */}
      <div className="flex items-center gap-3 ml-auto">
        <QuickCreate />

        <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

        <TooltipProvider>
          <div className="flex items-center gap-1.5">
            <ServerStatus />
            <NotificationButton />
          </div>
        </TooltipProvider>

        <UserAccountNav />
      </div>
    </header>
  );
}
