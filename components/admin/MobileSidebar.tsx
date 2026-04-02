"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import AdminSidebarContent from "./AdminSidebarContent";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="md:hidden mr-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-72 bg-white/95 backdrop-blur-2xl border-r border-gray-200 shadow-2xl"
        >
          <SheetTitle className="sr-only">Menu Quản Trị</SheetTitle>
          <AdminSidebarContent forceOpen={true} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
