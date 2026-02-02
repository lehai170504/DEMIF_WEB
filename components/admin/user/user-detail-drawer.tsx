"use client";

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Ban,
  XCircle,
  Check,
  Mail,
  Clock,
  Calendar,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Interface (đảm bảo đồng bộ với types trong file user-table.tsx)
interface User {
  id: number;
  username: string;
  email: string;
  status: string;
  completedLessons: number;
  totalScore: number;
  joinedDate: string;
  lastActive: string;
  role: string;
}

interface UserDetailDrawerProps {
  user: User;
  children: React.ReactNode;
}

export function UserDetailDrawer({ user, children }: UserDetailDrawerProps) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "suspended":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "banned":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-white/5 text-zinc-400 border-white/10";
    }
  };

  const handleAction = (action: string) => {
    toast.info(`Đang thực hiện: ${action} cho ${user.username}...`);
    // TODO: Thêm logic API call tại đây
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-[#18181b] border-l border-white/10 text-zinc-100 h-full max-w-[450px] w-full ml-auto rounded-none sm:rounded-l-[2rem] outline-none font-mono">
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none" />

          <DrawerHeader className="p-8 border-b border-white/5 relative z-10">
            <div className="flex items-center gap-5 mb-2">
              <Avatar className="h-20 w-20 border-2 border-white/10 shadow-xl">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                  alt={user.username}
                />
                <AvatarFallback className="text-2xl font-black bg-zinc-800 text-zinc-400">
                  {user.username[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <DrawerTitle className="text-2xl font-black text-white tracking-tight mb-1">
                  {user.username}
                </DrawerTitle>
                <Badge
                  variant="outline"
                  className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                    getStatusClass(user.status),
                  )}
                >
                  {user.status}
                </Badge>
              </div>
            </div>
            <DrawerDescription className="text-zinc-500 font-medium text-xs mt-4">
              Quản lý chi tiết hồ sơ người dùng và các hành động quản trị.
            </DrawerDescription>
          </DrawerHeader>

          {/* USER DETAILS */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            <div className="grid gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 pl-1 border-l-2 border-orange-500">
                Thông tin Cơ bản
              </h3>

              <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </span>
                  <span className="font-bold text-white">{user.email}</span>
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Tham gia
                  </span>
                  <span className="font-bold text-zinc-200">
                    {user.joinedDate}
                  </span>
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Hoạt động cuối
                  </span>
                  <span className="font-bold text-zinc-200">
                    {user.lastActive}
                  </span>
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Vai trò
                  </span>
                  <Badge className="font-black bg-white text-black hover:bg-zinc-200 px-2 py-0.5 text-[10px] uppercase">
                    {user.role}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 pl-1 border-l-2 border-emerald-500">
                Hiệu suất Học tập
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center gap-1">
                  <span className="text-3xl font-black italic text-white">
                    {user.completedLessons}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                    Bài đã học
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center text-center gap-1">
                  <span className="text-3xl font-black italic text-emerald-400 flex items-center gap-1">
                    {user.totalScore.toFixed(0)}
                    <span className="text-lg">%</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-500/70 uppercase tracking-wide flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Chính xác TB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DRAWER FOOTER (ACTIONS) */}
          <DrawerFooter className="flex-shrink-0 p-6 border-t border-white/5 bg-[#18181b] z-20">
            <div className="grid gap-3 w-full">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                onClick={() => handleAction("Reset mật khẩu")}
              >
                <Ban className="h-4 w-4 mr-2 text-zinc-400" /> Đặt lại Mật khẩu
              </Button>

              <div className="grid grid-cols-2 gap-3">
                {user.status !== "banned" && (
                  <Button
                    variant="destructive"
                    className="h-12 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 font-bold transition-all"
                    onClick={() => handleAction("Cấm vĩnh viễn")}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Cấm User
                  </Button>
                )}
                <DrawerClose asChild>
                  <Button className="h-12 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold transition-all col-span-1 w-full">
                    <Check className="h-4 w-4 mr-2" /> Đóng
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
