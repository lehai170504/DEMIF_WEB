"use client";

import * as React from "react";
import { useState } from "react";
import {
  User as UserIcon,
  LogOut,
  Settings,
  Terminal,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

// Quan trọng: Sử dụng Named Import với dấu { } để khớp với file định nghĩa modal
import { AdminProfileModal } from "@/components/admin/settings/admin-profile-modal";

export function UserAccountNav() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  const displayName = user?.username || "Admin";
  const roleDisplay = user?.roles?.includes("Admin")
    ? "Quản trị viên"
    : "Điều hành viên";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full border border-slate-200 p-0 overflow-hidden hover:scale-105 transition-all focus-visible:ring-orange-500 shadow-sm ml-1"
          >
            <Avatar className="h-full w-full rounded-full">
              <AvatarImage
                src={
                  user?.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${displayName}&background=f97316&color=fff&bold=true`
                }
                className="object-cover"
              />
              <AvatarFallback className="bg-slate-100 text-slate-500 font-semibold text-xs">
                {displayName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Chấm trạng thái hoạt động */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 font-sans p-2 bg-white border-slate-200 text-slate-700 shadow-xl rounded-2xl"
          sideOffset={8}
        >
          <DropdownMenuLabel className="font-sans p-3">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <p
                  className="font-bold text-slate-900 text-base leading-none truncate max-w-[150px]"
                  title={displayName}
                >
                  {displayName}
                </p>
                <div className="p-1 rounded-md bg-orange-50 border border-orange-100">
                  <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-md w-fit border border-slate-100">
                {roleDisplay}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-slate-100" />

          <DropdownMenuGroup className="p-1">
            <UserMenuItem
              icon={UserIcon}
              label="Hồ sơ cá nhân"
              shortcut="⌘P"
              onClick={() => setIsProfileOpen(true)}
            />
            <UserMenuItem
              icon={Terminal}
              label="Nhật ký hệ thống"
              onClick={() => setIsProfileOpen(true)}
            />
            <UserMenuItem
              icon={Settings}
              label="Cài đặt tài khoản"
              shortcut="⌘S"
              onClick={() => setIsProfileOpen(true)}
            />
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-100" />

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-red-600 focus:bg-red-50 focus:text-red-700 font-semibold text-sm rounded-lg m-1 cursor-pointer disabled:opacity-50 py-2.5 transition-colors font-sans"
          >
            {isLoggingOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            {isLoggingOut ? "Đang xử lý..." : "Đăng xuất hệ thống"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Gọi Modal hồ sơ Admin - Đảm bảo component đã được export đúng cách */}
      <AdminProfileModal open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
}

/**
 * Component hỗ trợ render Menu Item nhanh chóng
 */
function UserMenuItem({
  icon: Icon,
  label,
  shortcut,
  onClick,
}: {
  icon: any;
  label: string;
  shortcut?: string;
  onClick: () => void;
}) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="rounded-lg p-2.5 cursor-pointer focus:bg-slate-50 group transition-colors font-sans"
    >
      <Icon className="mr-2.5 h-4 w-4 text-slate-400 group-focus:text-orange-500 transition-colors" />
      <span className="font-medium text-sm text-slate-700 group-focus:text-slate-900">
        {label}
      </span>
      {shortcut && (
        <DropdownMenuShortcut className="text-slate-400 text-[10px] group-focus:text-slate-500 ml-auto font-sans">
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
