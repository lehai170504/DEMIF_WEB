"use client";

import {
  User as UserIcon,
  Terminal,
  Settings,
  ShieldCheck,
  LogOut,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export function UserAccountNav() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  const displayName = user?.username || "Admin";
  // Logic hiển thị Role
  const roleDisplay = user?.roles?.includes("Admin")
    ? "Super Administrator"
    : "Moderator";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 w-10 rounded-2xl bg-zinc-800 border border-white/10 p-0 overflow-hidden hover:scale-105 transition-all focus:ring-0 focus:ring-offset-0"
        >
          <Avatar className="h-full w-full rounded-2xl">
            <AvatarImage
              src={
                user?.avatarUrl ||
                `https://ui-avatars.com/api/?name=${displayName}&background=FF7A00&color=fff&bold=true`
              }
              className="object-cover"
            />
            <AvatarFallback className="bg-zinc-800 text-white font-bold text-xs font-mono">
              {displayName[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 font-mono p-2 bg-[#121212]/95 backdrop-blur-2xl border-white/10 text-zinc-300 shadow-2xl rounded-2xl"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p
                className="font-bold text-white text-base leading-none truncate max-w-[150px]"
                title={displayName}
              >
                {displayName}
              </p>
              <div className="p-1 rounded-md bg-blue-500/10 border border-blue-500/20">
                <ShieldCheck className="h-3 w-3 text-blue-500" />
              </div>
            </div>
            <p className="text-xs text-zinc-500 font-medium bg-white/5 px-2 py-1 rounded-md w-fit">
              {roleDisplay}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/5" />

        <DropdownMenuGroup className="p-1">
          <UserMenuItem
            icon={UserIcon}
            label="Hồ sơ cá nhân"
            shortcut="⌘P"
            onClick={() => router.push("/admin/settings/profile")}
          />
          <UserMenuItem
            icon={Terminal}
            label="Nhật ký hệ thống"
            onClick={() => router.push("/admin/settings/logs")}
          />
          <UserMenuItem
            icon={Settings}
            label="Cấu hình hệ thống"
            shortcut="⌘S"
            onClick={() => router.push("/admin/settings/security")}
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-white/5" />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-red-500 focus:bg-red-500/10 focus:text-red-400 font-bold text-sm rounded-lg m-1 cursor-pointer disabled:opacity-50 font-mono"
        >
          {isLoggingOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất hệ thống"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenuItem({ icon: Icon, label, shortcut, onClick }: any) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="rounded-lg p-2.5 cursor-pointer focus:bg-white/10 group transition-colors font-mono"
    >
      <Icon className="mr-2 h-4 w-4 text-zinc-500 group-focus:text-orange-500 transition-colors" />
      <span className="font-medium text-sm group-focus:text-white">
        {label}
      </span>
      {shortcut && (
        <DropdownMenuShortcut className="text-zinc-600 font-mono text-xs group-focus:text-zinc-400 ml-auto">
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
