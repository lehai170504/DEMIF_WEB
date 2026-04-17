"use client";

import { Plus, BookOpen, Users } from "lucide-react";
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
import { useAuth } from "@/hooks/use-auth";

export function QuickCreate() {
  const router = useRouter();
  const { user } = useAuth();

  const rolesArray: string[] = Array.isArray(user?.roles)
    ? user.roles
    : [user?.roles || ""];

  const isAdmin = rolesArray.some(
    (r) => typeof r === "string" && r.toLowerCase() === "admin",
  );

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

        {/* Ai cũng có thể thấy mục Tạo bài học */}
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

        {/* Chỉ hiển thị mục Xem đăng ký nếu là Admin */}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => router.push("/admin/user-subscriptions")}
            className="cursor-pointer hover:bg-gray-50 focus:bg-emerald-50 focus:text-emerald-600 rounded-lg py-2.5"
          >
            <Users className="mr-2 h-4 w-4 text-emerald-500" />
            <span className="font-bold">Xem đăng ký</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
