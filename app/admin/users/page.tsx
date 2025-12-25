"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  MoreVertical,
  User,
  Plus,
  Clock,
  LayoutGrid,
  ShieldCheck,
  Mail,
  Zap,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AddAdminDialog from "@/components/admin/user/AddAdminDialog";
import UserDetailDrawer from "@/components/admin/user/UserDetailDrawer";
import { cn } from "@/lib/utils";

// Types & Data (Giữ nguyên logic của bạn)
type UserStatus = "all" | "active" | "suspended" | "banned";

const usersData = [
  {
    id: 1,
    username: "admin_test",
    email: "admin.test@dictation.com",
    status: "active",
    completedLessons: 120,
    totalScore: 92.5,
    lastActive: "3 minutes ago",
    joinedDate: "2024-01-15",
    role: "admin",
  },
  {
    id: 2,
    username: "student_vip",
    email: "vip.user@gmail.com",
    status: "active",
    completedLessons: 350,
    totalScore: 88.9,
    lastActive: "1 day ago",
    joinedDate: "2023-11-20",
    role: "member",
  },
  {
    id: 3,
    username: "suspended_user",
    email: "suspend@gmail.com",
    status: "suspended",
    completedLessons: 5,
    totalScore: 55.0,
    lastActive: "1 month ago",
    joinedDate: "2024-08-01",
    role: "member",
  },
  {
    id: 4,
    username: "banned_bot",
    email: "bot@spam.com",
    status: "banned",
    completedLessons: 0,
    totalScore: 0.0,
    lastActive: "N/A",
    joinedDate: "2024-09-10",
    role: "member",
  },
  {
    id: 5,
    username: "pro_listener",
    email: "pro@listener.net",
    status: "active",
    completedLessons: 580,
    totalScore: 95.1,
    lastActive: "2 hours ago",
    joinedDate: "2023-05-10",
    role: "member",
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10";
    case "suspended":
      return "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10";
    case "banned":
      return "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10";
    default:
      return "bg-slate-50 text-slate-600 border-slate-100";
  }
};

export default function AdminUsersPage() {
  const [activeFilter, setActiveFilter] = React.useState<UserStatus>("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredUsers = usersData.filter((user) => {
    const statusMatch = activeFilter === "all" || user.status === activeFilter;
    const searchMatch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 px-2 font-mono">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              User Management
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-slate-900 dark:text-white">
            Community{" "}
            <span className="text-slate-300 dark:text-slate-700">Insights</span>
          </h1>
          <p className="text-muted-foreground text-xs font-medium italic">
            Theo dõi hiệu suất và quản lý quyền hạn của học viên toàn cầu.
          </p>
        </div>

        <AddAdminDialog>
          <Button className="h-12 px-6 bg-slate-900 dark:bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 dark:shadow-orange-900/20 transition-all active:scale-95">
            <Plus className="h-4 w-4 mr-2" /> Cấp quyền Admin
          </Button>
        </AddAdminDialog>
      </div>

      {/* --- FILTER CONTROL PANEL --- */}
      <Card className="rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] bg-white dark:bg-slate-900 p-8 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Search Bar */}
          <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            <Input
              placeholder="Tìm theo username hoặc email..."
              className="h-12 pl-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold focus-visible:ring-2 focus-visible:ring-orange-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 hidden lg:block" />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-2 italic">
              <Filter className="h-3 w-3" /> Lọc theo:
            </span>
            {["all", "active", "suspended", "banned"].map((status) => {
              const isActive = activeFilter === status;
              const count =
                status === "all"
                  ? usersData.length
                  : usersData.filter((u) => u.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status as UserStatus)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[11px] font-bold uppercase transition-all duration-300 flex items-center gap-2",
                    isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900/20"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {status}
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-md text-[9px] font-black",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* --- USER TABLE --- */}
      <div className="rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden bg-white dark:bg-slate-900 mx-2">
        <div className="p-8 border-b flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-black text-xl italic uppercase leading-none">
                User Repository
              </h2>
              <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-1.5">
                Hiển thị {filteredUsers.length} tài khoản người dùng
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-slate-100">
                <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">
                  Danh tính
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">
                  Trạng thái
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest hidden sm:table-cell">
                  Tiến độ học
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest hidden lg:table-cell">
                  Điểm trung bình
                </TableHead>
                <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-widest">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="group hover:bg-orange-50/30 transition-all border-b border-slate-50 last:border-none"
                  >
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-11 w-11 rounded-2xl border-2 border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-105">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                          />
                          <AvatarFallback className="font-black bg-slate-100">
                            {user.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-700 dark:text-slate-200">
                              {user.username}
                            </span>
                            {user.role === "admin" && (
                              <Badge className="bg-blue-500/10 text-blue-500 border-none px-1.5 py-0 text-[9px] font-black uppercase flex items-center gap-1">
                                <ShieldCheck className="h-3 w-3" /> Admin
                              </Badge>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium lowercase flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        className={cn(
                          "px-3 py-1 rounded-lg border-none font-black text-[10px] uppercase tracking-tighter",
                          getStatusStyles(user.status)
                        )}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center hidden sm:table-cell font-bold text-slate-600">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm italic">
                          {user.completedLessons}
                        </span>
                        <span className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter">
                          Lessons Done
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center hidden lg:table-cell">
                      <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-xl">
                        <Zap className="h-3 w-3 text-emerald-500 fill-current" />
                        <span className="font-black italic text-emerald-600">
                          {user.totalScore.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right px-8">
                      <UserDetailDrawer user={user}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-orange-100 hover:text-orange-500 transition-colors"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </UserDetailDrawer>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-slate-400 font-bold italic"
                  >
                    Hệ thống không tìm thấy học viên khớp với yêu cầu.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
