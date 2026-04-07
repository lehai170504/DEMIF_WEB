"use client";

import { cn } from "@/lib/utils";
import AdminSidebarContent from "./AdminSidebarContent";

export default function AdminSidebar() {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col fixed left-4 top-4 bottom-4 z-50 transition-all duration-500 ease-in-out",
        "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden",
        "w-[280px]" 
      )}
    >

      <AdminSidebarContent isCollapsed={false} />
    </aside>
  );
}