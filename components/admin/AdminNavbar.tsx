"use client";

import { useEffect, useRef } from "react";
import {
  Search,
  Bell,
  User,
  ChevronRight,
  Globe,
  LayoutGrid,
  LogOut,
  Settings,
  ShieldCheck,
  Plus,
  Terminal,
  ExternalLink,
  Activity,
  BookOpen,
  Users,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MobileSidebar from "./MobileSidebar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathSegments = pathname.split("/").filter(Boolean);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.ctrlKey || e.metaKey;
      if (isMod && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (isMod && e.key === "s") {
        e.preventDefault();
        router.push("/admin/settings");
      }
      if (isMod && e.key === "p") {
        e.preventDefault();
        router.push("/admin/profile");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:px-6 font-mono">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none">
        <MobileSidebar />
        <nav className="hidden md:flex items-center text-sm font-medium text-muted-foreground">
          <LayoutGrid className="h-4 w-4 mr-2" />
          <span
            className="hover:text-foreground cursor-pointer transition-colors"
            onClick={() => router.push("/admin")}
          >
            Admin
          </span>
          {pathSegments.map((segment, index) => (
            <div key={index} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 opacity-50" />
              <span
                className={cn(
                  "capitalize transition-colors",
                  index === pathSegments.length - 1
                    ? "text-foreground font-bold"
                    : "hover:text-foreground cursor-pointer"
                )}
              >
                {segment.replace(/-/g, " ")}
              </span>
            </div>
          ))}
        </nav>
      </div>

      {/* 2. Search */}
      <div className="hidden lg:flex flex-1 justify-center max-w-md mx-auto">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
          <Input
            ref={searchInputRef}
            placeholder="Tìm kiếm nhanh...  "
            className="w-full bg-muted/40 pl-9 pr-12 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-sans text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* 3. Right Side Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* THAY THẾ NÚT PRO: Nút Tạo nhanh (Quick Create) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="hidden xl:flex bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-sm shadow-orange-200"
            >
              <Plus className="h-4 w-4" />
              Tạo mới
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 font-mono">
            <DropdownMenuItem onClick={() => router.push("/admin/lessons")}>
              <BookOpen className="mr-2 h-4 w-4" /> Bài tập mới
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/admin/users")}>
              <Users className="mr-2 h-4 w-4" /> Người dùng
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/admin/orders")}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Đơn hàng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        <TooltipProvider>
          {/* Trạng thái Server (Hợp lý cho Admin) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 cursor-default">
                <Activity className="h-3.5 w-3.5 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-tighter">
                  Server Online
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Hệ thống hoạt động bình thường</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Thông báo hệ thống</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* 4. User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 w-9 rounded-xl bg-slate-100 border border-border p-0 overflow-hidden hover:bg-slate-200 transition-colors text-slate-700 font-bold text-xs"
            >
              AD
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 font-mono p-2"
            sideOffset={8}
          >
            <DropdownMenuLabel className="font-normal p-2 text-[13px]">
              <div className="flex flex-col space-y-1">
                <p className="font-bold leading-none flex items-center gap-2">
                  Lê Hoàng Hải <ShieldCheck className="h-3 w-3 text-blue-500" />
                </p>
                <p className="text-xs text-muted-foreground uppercase">
                  Quản trị viên cấp cao
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
                <User className="mr-2 h-4 w-4" /> Hồ sơ cá nhân
                <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Terminal className="mr-2 h-4 w-4" /> Nhật ký hoạt động
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
                <Settings className="mr-2 h-4 w-4" /> Cài đặt
                <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-500 font-bold">
              <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
