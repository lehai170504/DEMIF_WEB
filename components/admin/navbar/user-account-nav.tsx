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
  const roleDisplay = user?.roles?.includes("Admin")
    ? "Super Administrator"
    : "Moderator";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full border-2 border-white ring-1 ring-gray-200 p-0 overflow-hidden hover:scale-105 transition-all focus:ring-0 focus:ring-offset-0 shadow-sm ml-1"
        >
          <Avatar className="h-full w-full rounded-full">
            <AvatarImage
              src={
                user?.avatarUrl ||
                `https://ui-avatars.com/api/?name=${displayName}&background=FF7A00&color=fff&bold=true`
              }
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-100 text-gray-600 font-bold text-xs font-mono">
              {displayName[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* Chấm xanh hiển thị online */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 font-mono p-2 bg-white border-gray-200 text-gray-700 shadow-2xl rounded-2xl"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p
                className="font-bold text-gray-900 text-base leading-none truncate max-w-[150px]"
                title={displayName}
              >
                {displayName}
              </p>
              <div className="p-1 rounded-md bg-blue-50 border border-blue-100">
                <ShieldCheck className="h-3 w-3 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md w-fit">
              {roleDisplay}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-100" />

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

        <DropdownMenuSeparator className="bg-gray-100" />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-red-600 focus:bg-red-50 focus:text-red-700 font-bold text-sm rounded-lg m-1 cursor-pointer disabled:opacity-50 font-mono py-2.5"
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
      className="rounded-lg p-2.5 cursor-pointer focus:bg-gray-50 group transition-colors font-mono"
    >
      <Icon className="mr-2 h-4 w-4 text-gray-400 group-focus:text-orange-500 transition-colors" />
      <span className="font-medium text-sm text-gray-700 group-focus:text-gray-900">
        {label}
      </span>
      {shortcut && (
        <DropdownMenuShortcut className="text-gray-400 font-mono text-xs group-focus:text-gray-500 ml-auto">
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
