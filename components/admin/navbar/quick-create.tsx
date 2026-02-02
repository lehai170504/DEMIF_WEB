"use client";

import { Plus, BookOpen, Users, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import AddLessonDialog from "@/components/admin/lesson/add-lesson-dialog";
import AddAdminDialog from "@/components/admin/user/add-admin-dialog";

export function QuickCreate() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className="hidden xl:flex bg-white text-black hover:bg-zinc-200 gap-2 rounded-xl font-bold shadow-lg shadow-white/5 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="h-4 w-4" /> Tạo mới
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 font-mono p-2 bg-[#121212]/95 backdrop-blur-xl border-white/10 text-zinc-300"
      >
        <DropdownMenuLabel className="text-[10px] uppercase text-zinc-500 tracking-[0.2em] p-2">
          Lối tắt nhanh
        </DropdownMenuLabel>

        <AddLessonDialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer focus:bg-orange-500/10 focus:text-orange-500 rounded-lg"
          >
            <BookOpen className="mr-2 h-4 w-4 text-orange-500" />
            <span className="font-bold">Bài tập mới</span>
            <DropdownMenuShortcut className="text-zinc-600">
              ⌘N
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </AddLessonDialog>

        <AddAdminDialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer focus:bg-blue-500/10 focus:text-blue-500 rounded-lg"
          >
            <Users className="mr-2 h-4 w-4 text-blue-500" />
            <span className="font-bold">Thêm Admin</span>
          </DropdownMenuItem>
        </AddAdminDialog>

        <DropdownMenuItem
          onClick={() => router.push("/admin/orders")}
          className="focus:bg-emerald-500/10 focus:text-emerald-500 rounded-lg"
        >
          <ShoppingCart className="mr-2 h-4 w-4 text-emerald-500" />
          <span className="font-bold">Xem đơn hàng</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
