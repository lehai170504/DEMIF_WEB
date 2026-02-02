"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import AdminSidebarContent from "./AdminSidebarContent";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside
      className={cn(
        "hidden md:flex h-screen flex-col fixed left-0 top-0 z-50 transition-all duration-500 ease-in-out",
        "bg-[#050505]/60 backdrop-blur-2xl border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.5)]",
        isCollapsed ? "w-[78px]" : "w-72",
      )}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <AdminSidebarContent isCollapsed={isCollapsed} />
    </aside>
  );
}
