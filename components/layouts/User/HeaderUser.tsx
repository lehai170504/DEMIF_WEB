// src/components/layouts/Dashboard/Header.jsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function HeaderUser() {
  return (
    // Header chính: sticky, hiệu ứng blur, shadow nhẹ
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-orange-200/50 shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between h-14 font-mono">
          {/* Logo và Tên ứng dụng */}
          <div className="flex items-center gap-2">
            <Link href="/home" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF7A00] to-orange-300 flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-white">D</span>
              </div>
              {/* Logo font chính: Chắc chắn hơn */}
              <span className="text-xl font-bold text-gray-800">DEMIF</span>
            </Link>
          </div>

          {/* Menu Điều hướng Chính (Dùng Button/Link chuẩn) */}
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/home">Trang chủ</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dictation">Chính tả</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/shadowing">Bóng đổ</Link>
            </Button>
            {/* Thêm các link từ header đầu tiên và tối ưu hóa */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/review">Ôn tập</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/leaderboard">Bảng xếp hạng</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/classroom">Lớp học</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog">Blog</Link>
            </Button>
          </nav>

          {/* Nâng cấp và Hồ sơ Người dùng */}
          <div className="flex items-center gap-3">
            {/* Nút CTA Nâng cấp - Màu cam chủ đạo */}
            <Button
              className="rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] 
             pl-4 pr-5 py-2 text-sm font-semibold text-white 
             shadow-xl shadow-orange-500/50 
             hover:from-[#FF9E2C] hover:to-[#FF7A00] 
             transition-all duration-300 transform hover:translate-y-[-1px]"
              size="sm"
              asChild
            >
              <Link href="/upgrade">
                <Zap className="w-4 h-4 mr-1 fill-white text-white" />
                Nâng cấp
              </Link>
            </Button>

            {/* Avatar Người dùng (Tối ưu hóa từ Header 1) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  // Tăng cường hiệu ứng trigger: border cam, shadow, và hiệu ứng scale khi hover
                  className="rounded-full h-10 w-10 p-0 overflow-hidden 
                 border-2 border-transparent 
                 shadow-md transition-all duration-300 
                 hover:border-[#FF7A00] hover:shadow-lg hover:scale-[1.05]"
                >
                  <div
                    className="flex h-full w-full items-center justify-center 
                      bg-gradient-to-br from-green-500 to-green-600 
                      text-sm font-bold text-white shadow-inner"
                  >
                    H
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-60 p-1 rounded-xl shadow-2xl border border-gray-100/50 font-mono"
                align="end"
              >
                <div className="p-2 pb-3 pt-2">
                  <DropdownMenuLabel className="font-extrabold text-gray-800 text-base leading-snug">
                    Hà Vi
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs font-normal text-gray-500 truncate mt-[-2px]">
                    havi.student@demif.com
                  </DropdownMenuLabel>
                </div>

                <DropdownMenuSeparator className="my-1" />

                {/* Mục 1: Hồ sơ (Profile) - Highlight màu cam */}
                <Link href="/profile" passHref>
                  <DropdownMenuItem
                    className="cursor-pointer font-medium 
                   focus:bg-orange-50 focus:text-[#FF7A00] 
                   data-[highlighted]:bg-orange-50 data-[highlighted]:text-[#FF7A00] 
                   transition-colors duration-150 rounded-lg p-2"
                  >
                    <User className="mr-3 h-4 w-4" />
                    <span>Hồ sơ cá nhân</span>
                  </DropdownMenuItem>
                </Link>

                {/* Mục khác (ví dụ: Cài đặt) */}
                <Link href="/settings" passHref>
                  <DropdownMenuItem
                    className="cursor-pointer font-medium 
                   focus:bg-gray-100 focus:text-gray-900
                   data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 
                   transition-colors duration-150 rounded-lg p-2"
                  >
                    <Settings className="mr-3 h-4 w-4 text-gray-500" />
                    <span>Cài đặt</span>
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator className="my-1" />

                {/* Mục cuối: Đăng xuất (Log Out) - Màu đỏ nổi bật */}
                <Link href="/logout" passHref>
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer font-medium p-2 rounded-lg 
                   focus:bg-red-50 focus:text-red-600 
                   data-[highlighted]:bg-red-50 data-[highlighted]:text-red-600"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <MobileMenuToggle /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
