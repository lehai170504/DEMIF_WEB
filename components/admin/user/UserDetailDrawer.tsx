// components/admin/UserDetailDrawer.tsx

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
import { Ban, XCircle, Check, Mail, Clock, Calendar, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

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

export default function UserDetailDrawer({ user, children }: UserDetailDrawerProps) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "suspended":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "banned":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleAction = (action: string) => {
    toast.info(`${action} ${user.username}...`);
    // Thêm logic API call tại đây
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="w-[450px] right-0 mt-0 h-full fixed bottom-0 rounded-none font-mono">
        <div className="flex flex-col h-full">
          <DrawerHeader className="p-6">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={`https://placehold.co/64x64/505050/ffffff?text=${user.username[0]}`} alt={user.username} />
              <AvatarFallback className="text-2xl">{user.username[0]}</AvatarFallback>
            </Avatar>
            <DrawerTitle className="text-2xl">{user.username}</DrawerTitle>
            <DrawerDescription>
              Quản lý chi tiết hồ sơ người dùng và các hành động.
            </DrawerDescription>
          </DrawerHeader>
          
          <Separator />
          
          {/* USER DETAILS */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="grid gap-2">
                <h3 className="text-lg font-semibold text-primary">Thông tin Cơ bản</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>Email: <span className="font-medium text-foreground">{user.email}</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>Tham gia: {user.joinedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>Hoạt động cuối: {user.lastActive}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    <span>Vai trò: <Badge className="font-semibold px-2 py-0.5">{user.role.toUpperCase()}</Badge></span>
                </div>
            </div>

            <Separator />

            <div className="grid gap-2">
                <h3 className="text-lg font-semibold text-primary">Hiệu suất Học tập</h3>
                
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Bài đã Hoàn thành:</span>
                    <Badge variant="secondary" className="font-semibold">{user.completedLessons}</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Điểm Chính Xác TB:</span>
                    <Badge variant="secondary" className="font-semibold text-lg text-green-500">{user.totalScore.toFixed(1)}%</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Trạng Thái Tài Khoản:</span>
                    <Badge className={getStatusClass(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                </div>
            </div>

          </div>
          
          <Separator />
          
          {/* DRAWER FOOTER (ACTIONS) */}
          <DrawerFooter className="flex-shrink-0 p-4 border-t">
            <div className="flex justify-between gap-3">
                <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleAction("Reset mật khẩu")}
                >
                    <Ban className="h-4 w-4 mr-2" /> Reset Mật khẩu
                </Button>
            </div>
            <div className="flex justify-between gap-3">
                {user.status !== 'banned' && (
                    <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleAction("Cấm vĩnh viễn")}
                    >
                        <XCircle className="h-4 w-4 mr-2" /> Cấm Vĩnh Viễn
                    </Button>
                )}
                <DrawerClose asChild>
                    <Button variant="default" className="flex-1">
                        <Check className="h-4 w-4 mr-2" /> Đóng
                    </Button>
                </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}