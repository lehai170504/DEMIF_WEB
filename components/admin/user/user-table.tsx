"use client";

import * as React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Search,
  Calendar,
  Clock,
  UserCheck,
  UserX,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { UserDto } from "@/types/user.type";

// MAP Dịch thuật Trạng thái
const STATUS_MAP: Record<string, string> = {
  active: "Hoạt động",
  inactive: "Đình chỉ",
  banned: "Bị cấm",
  unknown: "Không rõ",
};

const getStatusStyles = (status: string) => {
  const normalizedStatus = status?.toLowerCase() || "unknown";
  switch (normalizedStatus) {
    case "active":
      return "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 shadow-sm";
    case "inactive":
      return "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20";
    case "banned":
      return "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20";
    default:
      return "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10";
  }
};

interface UserTableProps {
  users: UserDto[];
}

export function UserTable({ users }: UserTableProps) {
  const memberOnlyList = users.filter((user) => !user.roles?.includes("Admin"));

  return (
    <div className="rounded-[2rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-transparent shadow-sm overflow-hidden relative font-mono transition-all duration-300">
      {/* Table Header Section */}
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500 dark:bg-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/20">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black text-xl text-slate-900 dark:text-white leading-none mb-1.5 uppercase tracking-tight">
              Danh sách học viên
            </h2>
            <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest">
              Hiển thị {memberOnlyList.length} hồ sơ{" "}
              <span className="opacity-50">(Hidden Admin)</span>
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-zinc-900/30 hover:bg-transparent border-b border-slate-100 dark:border-white/5">
              <TableHead className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Danh tính học viên
              </TableHead>
              <TableHead className="text-center py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Trạng thái
              </TableHead>
              <TableHead className="text-center py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 hidden sm:table-cell uppercase tracking-[0.2em]">
                Ngày tham gia
              </TableHead>
              <TableHead className="text-center py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 hidden lg:table-cell uppercase tracking-[0.2em]">
                Hoạt động cuối
              </TableHead>
              <TableHead className="text-right px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {memberOnlyList.length > 0 ? (
              memberOnlyList.map((user) => {
                const normalizedStatus =
                  user.status?.toLowerCase() || "unknown";
                const isActive = normalizedStatus === "active";
                const translatedStatus =
                  STATUS_MAP[normalizedStatus] || STATUS_MAP.unknown;

                const joinedDate = user.createdAt
                  ? format(new Date(user.createdAt), "dd/MM/yyyy", {
                      locale: vi,
                    })
                  : "N/A";
                const lastLogin = user.lastLoginAt
                  ? format(new Date(user.lastLoginAt), "HH:mm - dd/MM/yyyy", {
                      locale: vi,
                    })
                  : "Chưa ghi nhận";

                return (
                  <TableRow
                    key={user.id}
                    className="group hover:bg-slate-50/80 dark:hover:bg-orange-500/[0.02] transition-colors border-b border-slate-100 dark:border-white/5 last:border-none"
                  >
                    {/* Cột 1: Thông tin User */}
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-11 w-11 rounded-[0.8rem] border border-slate-200 dark:border-white/10 shadow-sm transition-transform group-hover:scale-105">
                          <AvatarImage
                            src={
                              user.avatarUrl ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
                            }
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 font-black uppercase">
                            {user.username?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="font-black text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate max-w-[200px] text-sm uppercase tracking-tight">
                            {user.username}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-zinc-500 flex items-center gap-1.5 mt-0.5 truncate max-w-[200px] font-bold">
                            <Mail className="h-3 w-3 text-slate-400 dark:text-zinc-600" />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Cột 2: Badge trạng thái */}
                    <TableCell className="text-center py-5">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-3 py-1 rounded-lg border font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto transition-all",
                          getStatusStyles(user.status),
                        )}
                      >
                        {isActive ? (
                          <UserCheck className="w-3 h-3" />
                        ) : (
                          <UserX className="w-3 h-3" />
                        )}
                        {translatedStatus}
                      </Badge>
                    </TableCell>

                    {/* Cột 3: Ngày tham gia */}
                    <TableCell className="text-center py-5 hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-tighter">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-600" />
                        {joinedDate}
                      </div>
                    </TableCell>

                    {/* Cột 4: Hoạt động cuối */}
                    <TableCell className="text-center py-5 hidden lg:table-cell">
                      <div className="inline-flex items-center justify-center gap-2 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 px-3 py-1.5 rounded-xl">
                        <Clock className="h-3 w-3 text-slate-400 dark:text-zinc-600" />
                        <span className="font-black text-slate-600 dark:text-slate-400 text-[10px] uppercase tracking-tighter">
                          {lastLogin}
                        </span>
                      </div>
                    </TableCell>

                    {/* Cột 5: Action */}
                    <TableCell className="text-right px-8 py-5">
                      <Link href={`/admin/users/${user.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 px-4 rounded-xl border border-transparent hover:border-orange-200 dark:hover:border-orange-500/30 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 text-slate-400 dark:text-slate-500 transition-all group/btn"
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest mr-2 hidden md:inline">
                            Hồ sơ
                          </span>
                          <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-72 text-center py-10">
                  <div className="flex flex-col items-center justify-center gap-4 opacity-40">
                    <div className="h-16 w-16 rounded-[2rem] bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-2 border border-slate-200 dark:border-white/5">
                      <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                      Không có người dùng nào được tìm thấy
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
