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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { UserDto } from "@/types/user.type";
import { UserDetailDrawer } from "./user-detail-drawer"; // Import UserDetailDrawer

// Helper: Style for status
const getStatusStyles = (status: string) => {
  const normalizedStatus = status?.toLowerCase() || "unknown";
  switch (normalizedStatus) {
    case "active":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
    case "suspended":
    case "inactive":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "banned":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-white/5 text-zinc-400 border-white/10";
  }
};

interface UserTableProps {
  users: UserDto[]; // Use UserDto directly
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-[#18181b] shadow-xl overflow-hidden relative font-mono">
      {/* Table Header / Title Bar */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-500">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black text-xl italic uppercase leading-none text-white">
              User Repository
            </h2>
            <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1.5">
              Hiển thị {users.length} tài khoản người dùng
            </p>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 hover:bg-white/5 border-b border-white/5">
              <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Danh tính
              </TableHead>
              <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Trạng thái
              </TableHead>
              {/* Display 'Joined Date' instead of 'Progress' */}
              <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500 hidden sm:table-cell">
                Ngày tham gia
              </TableHead>
              {/* Display 'Last Login' instead of 'Score' */}
              <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500 hidden lg:table-cell">
                Lần đăng nhập cuối
              </TableHead>
              <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length > 0 ? (
              users.map((user) => {
                // Logic for Role check
                const isAdmin = user.roles && user.roles.includes("Admin");

                // Logic for date formatting
                const joinedDateDisplay = user.createdAt
                  ? format(new Date(user.createdAt), "dd/MM/yyyy", {
                      locale: vi,
                    })
                  : "N/A";

                const lastLoginDisplay = user.lastLoginAt
                  ? format(new Date(user.lastLoginAt), "HH:mm - dd/MM/yyyy", {
                      locale: vi,
                    })
                  : "Chưa đăng nhập";

                return (
                  <TableRow
                    key={user.id}
                    className="group hover:bg-white/5 transition-all border-b border-white/5 last:border-none"
                  >
                    {/* Column 1: Identity (Avatar + Name + Email) */}
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-11 w-11 rounded-2xl border-2 border-white/10 shadow-lg transition-transform group-hover:scale-105 group-hover:border-orange-500/30">
                          <AvatarImage
                            src={
                              user.avatarUrl ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
                            }
                            className="object-cover"
                          />
                          <AvatarFallback className="font-black bg-zinc-800 text-zinc-400">
                            {user.username?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors">
                              {user.username}
                            </span>
                            {/* Role Badge */}
                            {isAdmin && (
                              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-1.5 py-0 text-[9px] font-black uppercase flex items-center gap-1 hover:bg-blue-500/20">
                                <ShieldCheck className="h-3 w-3" /> Admin
                              </Badge>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-500 font-medium lowercase flex items-center gap-1 group-hover:text-zinc-400 transition-colors">
                            <Mail className="h-3 w-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Column 2: Status */}
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-3 py-1 rounded-lg border font-black text-[10px] uppercase tracking-tighter transition-all",
                          getStatusStyles(user.status),
                        )}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>

                    {/* Column 3: Joined Date */}
                    <TableCell className="text-center hidden sm:table-cell font-bold text-zinc-400">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm italic text-white group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-zinc-600" />
                          {joinedDateDisplay}
                        </span>
                      </div>
                    </TableCell>

                    {/* Column 4: Last Login */}
                    <TableCell className="text-center hidden lg:table-cell">
                      <div className="inline-flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-xl group-hover:bg-emerald-500/10 transition-colors">
                        <Clock className="h-3 w-3 text-emerald-500 fill-current" />
                        <span className="font-black italic text-emerald-400 text-[11px]">
                          {lastLoginDisplay}
                        </span>
                      </div>
                    </TableCell>

                    {/* Column 5: Actions */}
                    <TableCell className="text-right px-8">
                      {/* Integrated UserDetailDrawer here */}
                      <UserDetailDrawer userId={user.id}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-white/10 hover:text-white text-zinc-500 transition-colors"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </UserDetailDrawer>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              // Empty State
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-40 text-center text-zinc-500 font-bold italic"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 opacity-20" />
                    Hệ thống không tìm thấy tài khoản người dùng nào.
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
