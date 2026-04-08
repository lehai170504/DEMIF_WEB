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

  const actualUser = (user as any)?.data || user;
  const displayName = actualUser?.username || "HỆ THỐNG";

  const rolesArray: string[] = Array.isArray(actualUser?.roles)
    ? actualUser.roles
    : [actualUser?.roles || ""];

  const isAdmin = rolesArray.some(
    (r) => typeof r === "string" && r.toLowerCase() === "admin",
  );

  const roleDisplay = isAdmin ? "QUẢN TRỊ VIÊN" : "ĐIỀU HÀNH VIÊN";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-2xl p-0 hover:scale-105 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#FF7A00] focus-visible:ring-offset-2 ml-1 active:scale-95 group font-mono"
          >
            <Avatar className="h-full w-full rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm group-hover:border-orange-500/50 transition-colors">
              <AvatarImage
                src={
                  actualUser?.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${displayName}&background=ff7a00&color=fff&bold=true`
                }
                className="object-cover"
              />
              <AvatarFallback className="bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 font-black text-xs uppercase">
                {displayName[0]}
              </AvatarFallback>
            </Avatar>

            {/* Indicator Trạng thái */}
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-zinc-950"></span>
            </span>
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent
          align="end"
          className="w-72 font-mono p-2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-200 shadow-2xl rounded-[2rem]"
          sideOffset={16}
        >
          {/* Header Card */}
          <DropdownMenuLabel className="p-2 mb-2">
            <div className="flex items-center gap-4 p-3 rounded-[1.25rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg shadow-orange-500/20 shrink-0">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col overflow-hidden space-y-0.5">
                <p
                  className="font-black text-slate-900 dark:text-white text-[11px] uppercase tracking-tight truncate"
                  title={displayName}
                >
                  {displayName}
                </p>
                <p className="text-[9px] text-slate-500 dark:text-zinc-400 font-black uppercase tracking-widest truncate">
                  {roleDisplay}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 mx-2 mb-2" />

          {/* Menu chức năng */}
          <DropdownMenuGroup className="p-1 space-y-1">
            <UserMenuItem
              icon={UserIcon}
              label="HỒ SƠ HỆ THỐNG"
              shortcut="⌘P"
              onClick={() => setIsProfileOpen(true)}
            />
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 mx-2 my-2" />

          {/* Nút Đăng xuất */}
          <div className="p-1">
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center justify-center w-full rounded-2xl py-3 px-4 cursor-pointer disabled:opacity-50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 focus:bg-red-50 dark:focus:bg-red-500/10 focus:text-red-700 dark:focus:text-red-300 transition-colors font-black text-[10px] uppercase tracking-widest outline-none border border-transparent"
            >
              {isLoggingOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-red-500" />
              ) : (
                <LogOut className="mr-3 h-4 w-4" />
              )}
              {isLoggingOut ? "ĐANG ĐĂNG XUẤT..." : "ĐĂNG XUẤT HỆ THỐNG"}
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminProfileModal open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
}

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
      className="flex items-center rounded-2xl py-3 px-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 focus:bg-slate-50 dark:focus:bg-white/5 group transition-all duration-200 outline-none border border-transparent"
    >
      <Icon className="mr-3 h-4 w-4 text-slate-400 dark:text-zinc-500 group-hover:text-orange-500 group-focus:text-orange-500 transition-colors" />
      <span className="font-black text-[10px] uppercase tracking-widest text-slate-600 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white group-focus:text-slate-900 dark:group-focus:text-white">
        {label}
      </span>
      {shortcut && (
        <DropdownMenuShortcut className="text-slate-300 dark:text-zinc-600 text-[10px] group-hover:text-slate-400 dark:group-hover:text-zinc-500 ml-auto tracking-widest font-black">
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
