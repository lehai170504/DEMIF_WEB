"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import AdminSidebarContent from "./AdminSidebarContent";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside
      className={cn(
        "hidden md:flex h-screen flex-col border-r fixed left-0 top-0 z-50 transition-all duration-300",
        isCollapsed ? "w-[78px]" : "w-72"
      )}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <AdminSidebarContent isCollapsed={isCollapsed} />
    </aside>
  );
}
