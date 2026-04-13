"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { Megaphone } from "lucide-react"; // Import icon loa
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import MobileSidebar from "../MobileSidebar";
// import { NotificationButton } from "../NotificationButton";
import { Breadcrumbs } from "../navbar/breadcrumbs";
import { QuickCreate } from "../navbar/quick-create";
import { ServerStatus } from "../navbar/server-status";
import { UserAccountNav } from "../navbar/user-account-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AdminBroadcastForm } from "@/components/notifications/admin-broadcast-form";
import { useState } from "react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
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

            <Dialog open={isBroadcastOpen} onOpenChange={setIsBroadcastOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild> 
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-full text-zinc-500 hover:text-[#FF7A00] hover:bg-orange-500/10 transition-colors"
                    >
                      <Megaphone className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="font-mono text-[10px] font-bold uppercase tracking-widest"
                >
                  Phát sóng thông báo
                </TooltipContent>
              </Tooltip>

              <DialogContent className="sm:max-w-[500px] p-0 bg-transparent border-none shadow-none">
                <AdminBroadcastForm
                  onSuccess={() => setIsBroadcastOpen(false)}
                />
              </DialogContent>
            </Dialog>
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
