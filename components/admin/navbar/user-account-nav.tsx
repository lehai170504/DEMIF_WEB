"use client";

import * as React from "react";
import { useState } from "react";
import { User as UserIcon, LogOut, ShieldCheck, Loader2 } from "lucide-react";
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
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0 hover:scale-105 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#FF7A00] focus-visible:ring-offset-2 ml-1 active:scale-95"
          >
            <Avatar className="h-full w-full rounded-full border-2 border-white dark:border-zinc-800 shadow-md">
              <AvatarImage
                src={
                  user?.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${displayName}&background=ff7a00&color=fff&bold=true`
                }
                className="object-cover"
              />
              <AvatarFallback className="bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 font-mono font-bold text-xs">
                {displayName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Chấm trạng thái hoạt động */}
            <span className="absolute bottom-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-zinc-800"></span>
            </span>
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent
          align="end"
          className="w-64 font-mono p-2 bg-white dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 shadow-2xl rounded-2xl"
          sideOffset={12}
        >
          {/* Header Card */}
          <DropdownMenuLabel className="p-3 mb-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 shrink-0">
                <ShieldCheck className="h-5 w-5 text-[#FF7A00]" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <p
                  className="font-bold text-slate-900 dark:text-white text-sm truncate"
                  title={displayName}
                >
                  {displayName}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5 truncate">
                  {roleDisplay}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 mx-1 mb-1" />

          {/* Nhóm menu chức năng */}
          <DropdownMenuGroup className="p-1 space-y-1">
            <UserMenuItem
              icon={UserIcon}
              label="Hồ sơ cá nhân"
              shortcut="⌘P"
              onClick={() => setIsProfileOpen(true)}
            />
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 mx-1 my-1" />

          {/* Nút Đăng xuất */}
          <div className="p-1">
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center justify-center w-full rounded-xl py-2.5 px-3 cursor-pointer disabled:opacity-50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 focus:bg-red-50 dark:focus:bg-red-500/10 focus:text-red-700 dark:focus:text-red-300 transition-colors font-bold text-sm outline-none"
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
      className="flex items-center rounded-xl py-2.5 px-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 focus:bg-slate-50 dark:focus:bg-zinc-800 group transition-all duration-200 outline-none"
    >
      <Icon className="mr-3 h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-[#FF7A00] group-focus:text-[#FF7A00] transition-colors" />
      <span className="font-semibold text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white group-focus:text-slate-900 dark:group-focus:text-white">
        {label}
      </span>
      {shortcut && (
        <DropdownMenuShortcut className="text-slate-300 dark:text-slate-600 text-[10px] group-hover:text-slate-400 dark:group-hover:text-slate-500 ml-auto tracking-widest font-bold">
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
