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
      return "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm";
    case "inactive":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "banned":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

interface UserTableProps {
  users: UserDto[];
}

export function UserTable({ users }: UserTableProps) {
  // --- LOGIC LỌC: CHỈ GIỮ LẠI NHỮNG NGƯỜI KHÔNG CÓ ROLE ADMIN ---
  const memberOnlyList = users.filter((user) => !user.roles?.includes("Admin"));

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white shadow-sm overflow-hidden relative font-mono transition-all">
      <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500 rounded-xl text-white shadow-md shadow-orange-500/20">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-slate-900 leading-none mb-1.5">
              Danh sách học viên
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Hiển thị {memberOnlyList.length} hồ sơ (Đã ẩn quản trị viên)
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
              <TableHead className="px-8 py-4 text-xs font-semibold text-slate-500">
                Danh tính học viên
              </TableHead>
              <TableHead className="text-center py-4 text-xs font-semibold text-slate-500">
                Trạng thái
              </TableHead>
              <TableHead className="text-center py-4 text-xs font-semibold text-slate-500 hidden sm:table-cell">
                Ngày tham gia
              </TableHead>
              <TableHead className="text-center py-4 text-xs font-semibold text-slate-500 hidden lg:table-cell">
                Hoạt động cuối
              </TableHead>
              <TableHead className="text-right px-8 py-4 text-xs font-semibold text-slate-500">
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
                    className="group hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-none"
                  >
                    <TableCell className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 rounded-xl border border-slate-200 shadow-sm transition-transform group-hover:scale-105">
                          <AvatarImage
                            src={
                              user.avatarUrl ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
                            }
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-slate-100 text-slate-500 font-semibold uppercase">
                            {user.username?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {user.username}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Mail className="h-3 w-3 text-slate-400" />{" "}
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center py-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-2.5 py-1 rounded-md border font-semibold text-xs flex items-center justify-center gap-1.5 w-fit mx-auto",
                          getStatusStyles(user.status),
                        )}
                      >
                        {isActive ? (
                          <UserCheck className="w-3 h-3" />
                        ) : (
                          <UserX className="w-3 h-3" />
                        )}
                        {/* Đã dịch trạng thái sang tiếng Việt */}
                        {translatedStatus}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center py-4 hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-2 text-slate-600 text-sm font-medium">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {joinedDate}
                      </div>
                    </TableCell>

                    <TableCell className="text-center py-4 hidden lg:table-cell">
                      <div className="inline-flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-medium text-slate-600 text-xs">
                          {lastLogin}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right px-8 py-4">
                      <UserDetailDrawer userId={user.id}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl hover:bg-orange-50 hover:text-orange-600 text-slate-400 transition-colors"
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
                  <div className="flex flex-col items-center justify-center gap-3 opacity-60">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                      <Search className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="font-medium text-sm text-slate-500">
                      Không tìm thấy học viên nào phù hợp.
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
