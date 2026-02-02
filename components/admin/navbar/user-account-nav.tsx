"use client";

import { User, Terminal, Settings, ShieldCheck, LogOut } from "lucide-react";
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

export function UserAccountNav() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 w-10 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 p-0 overflow-hidden hover:scale-105 transition-all text-white font-black text-xs italic tracking-tighter"
        >
          AD
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 font-mono p-2 bg-[#121212]/95 backdrop-blur-2xl border-white/10 text-zinc-300"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-black italic text-white text-base tracking-tighter uppercase leading-none">
                Lê Hoàng Hải
              </p>
              <div className="p-1 rounded-md bg-blue-500/10 border border-blue-500/20">
                <ShieldCheck className="h-3 w-3 text-blue-500" />
              </div>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-[0.2em] bg-white/5 px-2 py-1 rounded-md w-fit">
              Super Administrator
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuGroup className="p-1">
          <UserMenuItem
            icon={User}
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
        <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-400 font-black italic uppercase text-xs rounded-lg m-1 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" /> Đăng xuất hệ thống
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenuItem({ icon: Icon, label, shortcut, onClick }: any) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="rounded-lg p-2.5 cursor-pointer focus:bg-white/10 group"
    >
      <Icon className="mr-2 h-4 w-4 text-zinc-500 group-focus:text-orange-500 transition-colors" />
      <span className="font-bold group-focus:text-white">{label}</span>
      {shortcut && (
        <DropdownMenuShortcut className="text-zinc-600 font-sans group-focus:text-zinc-400">
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
