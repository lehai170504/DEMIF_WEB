"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  User,
  ChevronRight,
  LayoutGrid,
  LogOut,
  Settings,
  ShieldCheck,
  Plus,
  Terminal,
  Activity,
  BookOpen,
  Users,
  ShoppingCart,
  LucideIcon,
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
import { cn } from "@/lib/utils";
import MobileSidebar from "./MobileSidebar";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { NotificationButton } from "./NotificationButton";

import AddLessonDialog from "@/components/admin/lesson/AddLessonDialog";
import AddAdminDialog from "@/components/admin/user/AddAdminDialog";

// Map các segment sang tiếng Việt
const routeMap: Record<string, string> = {
  admin: "Quản trị",
  dashboard: "Bảng điều khiển",
  stats: "Thống kê",
  statistics: "Số liệu hệ thống",
  lessons: "Bài học",
  users: "Học viên",
  settings: "Cài đặt",
  feedback: "Phản hồi",
  profile: "Hồ sơ",
  security: "Bảo mật",
  billing: "Thanh toán",
  notifications: "Thông báo",
  logs: "Nhật ký",
  orders: "Đơn hàng",
  progress: "Tiến độ",
};

const Breadcrumbs = ({
  pathname,
  router,
}: {
  pathname: string;
  router: any;
}) => {
  const segments = pathname
    .split("/")
    .filter((s) => Boolean(s) && s !== "admin");

  return (
    <nav className="hidden md:flex items-center text-sm font-medium text-muted-foreground font-mono">
      {/* Icon đại diện */}
      <LayoutGrid className="h-4 w-4 mr-2 text-orange-500/80" />

      {/* Gốc: Admin */}
      <span
        className="hover:text-orange-500 cursor-pointer transition-colors"
        onClick={() => router.push("/admin")}
      >
        Hệ thống
      </span>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const translatedName = routeMap[segment] || segment.replace(/-/g, " ");

        const url = `/admin/${segments.slice(0, index + 1).join("/")}`;

        return (
          <div key={segment} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1.5 opacity-20 text-slate-400" />
            <span
              onClick={() => !isLast && router.push(url)}
              className={cn(
                "capitalize transition-colors",
                isLast
                  ? "text-slate-900 dark:text-white font-bold"
                  : "hover:text-orange-500 cursor-pointer shadow-none"
              )}
            >
              {translatedName}
            </span>
          </div>
        );
      })}
    </nav>
  );
};
const QuickCreate = ({ router }: { router: any }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        size="sm"
        className="hidden xl:flex bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-sm shadow-orange-200"
      >
        <Plus className="h-4 w-4" /> Tạo mới
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56 font-mono p-2">
      <DropdownMenuLabel className="text-[10px] uppercase text-muted-foreground tracking-widest p-2">
        Lối tắt nhanh
      </DropdownMenuLabel>

      {/* 1. Bọc mục Bài tập mới bằng AddLessonDialog */}
      <AddLessonDialog>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          <BookOpen className="mr-2 h-4 w-4 text-orange-500" />
          <span>Bài tập mới</span>
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
      </AddLessonDialog>

      {/* 2. Bọc mục Người dùng bằng AddAdminDialog */}
      <AddAdminDialog>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          <Users className="mr-2 h-4 w-4 text-blue-500" />
          <span>Thêm Admin</span>
        </DropdownMenuItem>
      </AddAdminDialog>

      {/* 3. Chuyển hướng cho Đơn hàng */}
      <DropdownMenuItem onClick={() => router.push("/admin/orders")}>
        <ShoppingCart className="mr-2 h-4 w-4 text-emerald-500" />
        <span>Xem đơn hàng</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// --- Component Chính ---
export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcuts([
    { key: "k", ctrl: true, action: () => searchInputRef.current?.focus() },
    {
      key: "s",
      ctrl: true,
      action: () => router.push("/admin/settings/security"),
    },
    {
      key: "p",
      ctrl: true,
      action: () => router.push("/admin/settings/profile"),
    },
  ]);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:px-6 font-mono">
      <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none">
        <MobileSidebar />
        <Breadcrumbs pathname={pathname} router={router} />
      </div>

      <div className="hidden lg:flex flex-1 justify-center max-w-md mx-auto">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
          <Input
            ref={searchInputRef}
            placeholder="Tìm kiếm nhanh..."
            className="w-full bg-muted/40 pl-9 pr-12 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-sans text-[10px] font-medium text-muted-foreground sm:flex">
            ⌘ K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <QuickCreate router={router} />

        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        <TooltipProvider>
          <div className="flex items-center gap-1">
            <ServerStatus />
            <NotificationButton />
          </div>
        </TooltipProvider>

        <UserAccountNav router={router} />
      </div>
    </header>
  );
}

// --- Helper Components ---

function ServerStatus() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-tighter">
            Online
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent>Hệ thống hoạt động bình thường</TooltipContent>
    </Tooltip>
  );
}

function UserAccountNav({ router }: { router: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 w-9 rounded-xl bg-slate-100 border p-0 overflow-hidden hover:bg-slate-200 transition-colors text-slate-700 font-bold text-xs"
        >
          AD
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 font-mono p-2"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="font-bold leading-none flex items-center gap-2 text-[13px]">
              Lê Hoàng Hải <ShieldCheck className="h-3 w-3 text-blue-500" />
            </p>
            <p className="text-[10px] text-muted-foreground uppercase">
              Quản trị viên cấp cao
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UserMenuItem
            icon={User}
            label="Hồ sơ cá nhân"
            shortcut="⌘P"
            onClick={() => router.push("/admin/settings/profile")}
          />
          <UserMenuItem
            icon={Terminal}
            label="Nhật ký hoạt động"
            onClick={() => router.push("/admin/settings/logs")}
          />
          <UserMenuItem
            icon={Settings}
            label="Cài đặt"
            shortcut="⌘S"
            onClick={() => router.push("/admin/settings/security")}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-500 font-bold">
          <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenuItem({
  icon: Icon,
  label,
  shortcut,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  shortcut?: string;
  onClick?: () => void;
}) {
  return (
    <DropdownMenuItem onClick={onClick}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </DropdownMenuItem>
  );
}
