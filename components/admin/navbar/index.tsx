"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

import MobileSidebar from "../MobileSidebar";
import { NotificationButton } from "../NotificationButton";
import { Breadcrumbs } from "./breadcrumbs";
import { QuickCreate } from "./quick-create";
import { ServerStatus } from "./server-status";
import { UserAccountNav } from "./user-account-nav";

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
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-white/5 bg-[#050505]/60 backdrop-blur-2xl px-4 md:px-6 font-mono">
      {/* Cụm trái: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none">
        <MobileSidebar />
        <Breadcrumbs pathname={pathname} />
      </div>

      {/* Cụm giữa: Thanh tìm kiếm 3D Glass */}
      <div className="hidden lg:flex flex-1 justify-center max-w-md mx-auto">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
          <Input
            ref={searchInputRef}
            placeholder="Tìm kiếm nhanh..."
            className="w-full bg-white/5 border-white/5 rounded-2xl pl-9 pr-12 focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:bg-white/10 transition-all text-sm placeholder:text-zinc-600"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded-md border border-white/10 bg-black/50 px-1.5 font-sans text-[9px] font-bold text-zinc-500 sm:flex uppercase tracking-tighter">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Cụm phải: Action Buttons & User Menu */}
      <div className="flex items-center gap-3 ml-auto">
        <QuickCreate />

        <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />

        <TooltipProvider>
          <div className="flex items-center gap-1">
            <ServerStatus />
            <NotificationButton />
          </div>
        </TooltipProvider>

        <UserAccountNav />
      </div>
    </header>
  );
}
