"use client";

import {
  User,
  Mail,
  ShieldCheck,
  Loader2,
  Activity,
  CalendarDays,
  Hash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const displayName = user?.username || "Admin";
  const displayEmail = user?.email || "admin@demif.com";

  // Logic hiển thị Role
  const isAdmin = user?.roles?.includes("Admin");
  const roleDisplay = isAdmin ? "Super Administrator" : "Member";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-mono">
      {/* --- PHẦN HEADER PROFILE --- */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 px-4">
        <div className="relative group">
          {/* Avatar Container: Dùng bg-card và border-background từ theme */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-[6px] border-background bg-card shadow-2xl shadow-primary/10">
            <Avatar className="w-full h-full rounded-none">
              <AvatarImage
                src={
                  user?.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${displayName}&background=FF7A00&color=fff&bold=true&size=256`
                }
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <AvatarFallback className="w-full h-full flex items-center justify-center bg-muted text-foreground font-bold text-4xl">
                {displayName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Status Dot */}
          <div className="absolute bottom-2 right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-background shadow-lg" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-2 pb-2">
          <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
            <h1 className="text-3xl font-black text-foreground tracking-tight">
              {displayName}
            </h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-bold uppercase text-[10px] tracking-wider hover:bg-primary/20">
              {roleDisplay}
            </Badge>
          </div>
          <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2 text-sm">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs">ID hệ thống:</span>
            <span className="font-bold text-foreground">
              {user?.id || "N/A"}
            </span>
          </p>
        </div>
      </div>

      {/* --- CARD THÔNG TIN (READ ONLY) --- */}
      {/* Sử dụng bg-card và border-border để khớp theme */}
      <Card className="border-border bg-card shadow-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="pt-10 px-8 md:px-12 border-b border-border pb-8">
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
            <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-orange-600 rounded-full" />
            Thông tin định danh
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 md:p-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Username */}
            <div className="group space-y-3">
              <Label className="text-muted-foreground font-bold ml-1 text-[10px] uppercase tracking-[0.2em]">
                Tên hiển thị
              </Label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  readOnly
                  defaultValue={displayName}
                  className="pl-12 h-14 rounded-2xl border-input bg-muted/30 text-foreground font-bold focus-visible:ring-primary/30 focus-visible:border-primary"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group space-y-3">
              <Label className="text-muted-foreground font-bold ml-1 text-[10px] uppercase tracking-[0.2em]">
                Email hệ thống
              </Label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  readOnly
                  defaultValue={displayEmail}
                  className="pl-12 h-14 rounded-2xl border-input bg-muted/30 text-foreground font-bold focus-visible:ring-primary/30 focus-visible:border-primary"
                />
              </div>
            </div>

            {/* Role */}
            <div className="group space-y-3">
              <Label className="text-muted-foreground font-bold ml-1 text-[10px] uppercase tracking-[0.2em]">
                Phân quyền
              </Label>
              <div className="relative">
                <Hash className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  readOnly
                  defaultValue={user?.roles?.join(", ") || "Member"}
                  className="pl-12 h-14 rounded-2xl border-input bg-muted/30 text-foreground font-bold focus-visible:ring-primary/30 focus-visible:border-primary"
                />
              </div>
            </div>

            {/* Joined Date */}
            <div className="group space-y-3">
              <Label className="text-muted-foreground font-bold ml-1 text-[10px] uppercase tracking-[0.2em]">
                Ngày tham gia
              </Label>
              <div className="relative">
                <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  readOnly
                  defaultValue={
                    user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                      : "N/A"
                  }
                  className="pl-12 h-14 rounded-2xl border-input bg-muted/30 text-foreground font-bold focus-visible:ring-primary/30 focus-visible:border-primary"
                />
              </div>
            </div>

            {/* Last Active */}
            <div className="group space-y-3">
              <Label className="text-muted-foreground font-bold ml-1 text-[10px] uppercase tracking-[0.2em]">
                Hoạt động gần nhất
              </Label>
              <div className="relative">
                <Activity className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  readOnly
                  defaultValue={
                    user?.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleString("vi-VN")
                      : "Vừa truy cập"
                  }
                  className="pl-12 h-14 rounded-2xl border-input bg-muted/30 text-foreground font-bold focus-visible:ring-primary/30 focus-visible:border-primary"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
