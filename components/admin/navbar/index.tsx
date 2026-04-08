"use client";

import { usePathname, useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

import MobileSidebar from "../MobileSidebar";
import { NotificationButton } from "../NotificationButton";
import { Breadcrumbs } from "../navbar/breadcrumbs";
import { QuickCreate } from "../navbar/quick-create";
import { ServerStatus } from "../navbar/server-status";
import { UserAccountNav } from "../navbar/user-account-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Shortcut bật Profile (Ctrl + P)
  useKeyboardShortcuts([
    {
      key: "p",
      ctrl: true,
      action: () => router.push("/admin/settings/profile"),
    },
  ]);

  return (
    <header className="flex h-[72px] items-center gap-4 border border-slate-200 dark:border-white/5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl px-6 font-mono transition-all rounded-[2rem] shadow-sm">
      {/* Cụm trái: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 md:gap-5 flex-1 md:flex-none">
        <MobileSidebar />
        <Breadcrumbs pathname={pathname} />
      </div>

      {/* Cụm phải: Action Buttons & User Menu */}
      <div className="flex items-center gap-3 ml-auto">
        <QuickCreate />

        {/* Divider mềm mại */}
        <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-1.5 hidden sm:block" />

        <TooltipProvider>
          <div className="flex items-center gap-2">
            <ServerStatus />
            <ThemeToggle />
            {/* <NotificationButton /> */}
          </div>
        </TooltipProvider>

        {/* User Menu có khoảng cách riêng */}
        <div className="pl-1 sm:pl-2">
          <UserAccountNav />
        </div>
      </div>
    </header>
  );
}
