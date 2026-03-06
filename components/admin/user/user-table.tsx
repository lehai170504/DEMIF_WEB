"use client";

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
  MoreVertical,
  ShieldCheck,
  Mail,
  Search,
  Calendar,
  Clock,
  UserCheck,
  UserX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { UserDto } from "@/types/user.type";
import { UserDetailDrawer } from "./user-detail-drawer";

const getStatusStyles = (status: string) => {
  const normalizedStatus = status?.toLowerCase() || "unknown";
  switch (normalizedStatus) {
    case "active":
      return "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm";
    case "inactive":
      return "bg-orange-50 text-orange-600 border-orange-100";
    case "banned":
      return "bg-red-50 text-red-600 border-red-100";
    default:
      return "bg-gray-50 text-gray-500 border-gray-100";
  }
};

interface UserTableProps {
  users: UserDto[];
}

export function UserTable({ users }: UserTableProps) {
  // --- LOGIC LỌC: CHỈ GIỮ LẠI NHỮNG NGƯỜI KHÔNG CÓ ROLE ADMIN ---
  const memberOnlyList = users.filter((user) => !user.roles?.includes("Admin"));

  return (
    <div className="rounded-[2.5rem] border border-gray-200 bg-white shadow-xl shadow-gray-200/50 overflow-hidden relative font-mono transition-all">
      <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/20">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black text-xl italic uppercase leading-none text-gray-900">
              User Repository
            </h2>
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1.5">
              Hiển thị {memberOnlyList.length} hồ sơ học viên (Đã ẩn quản trị
              viên)
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-gray-100">
              <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Danh Tính Học Viên
              </TableHead>
              <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                Trạng Thái
              </TableHead>
              <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-gray-500 hidden sm:table-cell">
                Ngày Gia Nhập
              </TableHead>
              <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-gray-500 hidden lg:table-cell">
                Hoạt Động Cuối
              </TableHead>
              <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Thao Tác
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {memberOnlyList.length > 0 ? (
              memberOnlyList.map((user) => {
                const isActive = user.status?.toLowerCase() === "active";
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
                    className="group hover:bg-gray-50/80 transition-all border-b border-gray-100 last:border-none"
                  >
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded-2xl border-2 border-white shadow-md transition-transform group-hover:scale-105 group-hover:shadow-lg">
                          <AvatarImage
                            src={
                              user.avatarUrl ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
                            }
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gray-100 text-gray-400 font-bold uppercase">
                            {user.username?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors uppercase">
                            {user.username}
                          </span>
                          <span className="text-[11px] text-gray-400 flex items-center gap-1.5 lowercase italic mt-0.5">
                            <Mail className="h-3 w-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-3 py-1 rounded-lg border font-black text-[10px] uppercase tracking-tighter flex items-center gap-1.5",
                          getStatusStyles(user.status),
                        )}
                      >
                        {isActive ? (
                          <UserCheck className="w-3 h-3" />
                        ) : (
                          <UserX className="w-3 h-3" />
                        )}
                        {user.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-bold italic">
                        <Calendar className="w-3.5 h-3.5 text-gray-300" />
                        {joinedDate}
                      </div>
                    </TableCell>

                    <TableCell className="text-center hidden lg:table-cell">
                      <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-xl">
                        <Clock className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="font-black italic text-gray-700 text-[10px] uppercase">
                          {lastLogin}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right px-8">
                      <UserDetailDrawer userId={user.id}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-2xl hover:bg-orange-500 hover:text-white text-gray-400 transition-all shadow-sm hover:shadow-orange-500/20"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </UserDetailDrawer>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-60 text-center py-10">
                  <div className="flex flex-col items-center gap-3 opacity-20">
                    <Search className="h-12 w-12 text-gray-400" />
                    <p className="font-black italic text-sm uppercase tracking-[0.2em] text-gray-600">
                      Không tìm thấy học viên khả dụng
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
