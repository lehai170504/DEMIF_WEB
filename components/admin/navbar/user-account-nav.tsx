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
          {/* Bỏ overflow-hidden để chấm xanh không bị cắt lẹm */}
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0 hover:scale-105 transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ml-1"
          >
            <Avatar className="h-full w-full rounded-full border border-slate-200 shadow-sm">
              <AvatarImage
                src={
                  user?.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${displayName}&background=f97316&color=fff&bold=true`
                }
                className="object-cover"
              />
              <AvatarFallback className="bg-slate-100 text-slate-500 font-mono font-bold text-xs">
                {displayName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Chấm trạng thái hoạt động CÓ HIỆU ỨNG NHÁY (Ping) */}
            <span className="absolute bottom-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
            </span>
          </Button>
        </DropdownMenuTrigger>

        {/* Căn chỉnh lại Dropdown, sử dụng hoàn toàn font-mono */}
        <DropdownMenuContent
          align="end"
          className="w-64 font-mono p-2 bg-white border border-slate-200 text-slate-700 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-2xl"
          sideOffset={10}
        >
          {/* Header Card của Dropdown */}
          <DropdownMenuLabel className="p-3 mb-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 shrink-0">
                <ShieldCheck className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <p
                  className="font-bold text-slate-900 text-sm truncate"
                  title={displayName}
                >
                  {displayName}
                </p>
                <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-0.5 truncate">
                  {roleDisplay}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-slate-100 mx-1 mb-1" />

          {/* Nhóm menu chức năng */}
          <DropdownMenuGroup className="p-1 space-y-1">
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

          <DropdownMenuSeparator className="bg-slate-100 mx-1 my-1" />

          {/* Nút Đăng xuất nổi bật */}
          <div className="p-1">
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center justify-center w-full rounded-lg py-2.5 px-3 cursor-pointer disabled:opacity-50 text-red-600 focus:bg-red-50 focus:text-red-700 transition-colors font-bold text-sm"
            >
              {isLoggingOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-red-500" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              {isLoggingOut ? "Đang xử lý..." : "Đăng xuất hệ thống"}
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminProfileModal open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
}

/**
 * Component hỗ trợ render Menu Item
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
      className="flex items-center rounded-xl py-2.5 px-3 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 group transition-all duration-200 outline-none"
    >
      <Icon className="mr-3 h-4 w-4 text-slate-400 group-hover:text-orange-500 group-focus:text-orange-500 transition-colors" />
      <span className="font-semibold text-[13px] text-slate-600 group-hover:text-slate-900 group-focus:text-slate-900">
        {label}
      </span>
      {shortcut && (
        <DropdownMenuShortcut className="text-slate-300 text-[10px] group-hover:text-slate-400 ml-auto tracking-widest font-bold">
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
