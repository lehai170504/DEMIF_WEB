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
import CreateLessonDialog from "@/components/admin/lesson/create-lesson-dialog";
import AddAdminDialog from "@/components/admin/user/add-admin-dialog";

export function QuickCreate() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="hidden xl:flex bg-white border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50 gap-2 rounded-full font-bold shadow-sm transition-all hover:border-gray-300 px-4 h-9"
        >
          <Plus className="h-4 w-4 text-gray-400" /> Tạo mới
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 font-mono p-2 bg-white border-gray-200 text-gray-700 shadow-xl rounded-2xl"
      >
        <DropdownMenuLabel className="text-[10px] uppercase text-gray-400 tracking-[0.2em] p-2">
          Lối tắt nhanh
        </DropdownMenuLabel>

        <CreateLessonDialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer hover:bg-gray-50 focus:bg-orange-50 focus:text-orange-600 rounded-lg py-2.5"
          >
            <BookOpen className="mr-2 h-4 w-4 text-orange-500" />
            <span className="font-bold">Bài tập mới</span>
            <DropdownMenuShortcut className="text-gray-400">
              ⌘N
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </CreateLessonDialog>

        <AddAdminDialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-600 rounded-lg py-2.5"
          >
            <Users className="mr-2 h-4 w-4 text-blue-500" />
            <span className="font-bold">Thêm Admin</span>
          </DropdownMenuItem>
        </AddAdminDialog>

        <DropdownMenuItem
          onClick={() => router.push("/admin/orders")}
          className="cursor-pointer hover:bg-gray-50 focus:bg-emerald-50 focus:text-emerald-600 rounded-lg py-2.5"
        >
          <ShoppingCart className="mr-2 h-4 w-4 text-emerald-500" />
          <span className="font-bold">Xem đơn hàng</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
