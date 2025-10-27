// pages/admin/users/page.tsx

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreVertical, User, Plus, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AddAdminDialog from "@/components/userManagement/AddAdminDialog";
import UserDetailDrawer from "@/components/userManagement/UserDetailDrawer";

const usersData = [
  {
    id: 1,
    username: "admin_test",
    email: "admin.test@dictation.com",
    status: "active",
    completedLessons: 120,
    totalScore: 92.5,
    joinedDate: "2024-01-15",
    lastActive: "3 minutes ago",
    role: "admin",
  },
  {
    id: 2,
    username: "student_vip",
    email: "vip.user@gmail.com",
    status: "active",
    completedLessons: 350,
    totalScore: 88.9,
    joinedDate: "2023-11-20",
    lastActive: "1 day ago",
    role: "member",
  },
  {
    id: 3,
    username: "suspended_user",
    email: "suspend@gmail.com",
    status: "suspended",
    completedLessons: 5,
    totalScore: 55.0,
    joinedDate: "2024-08-01",
    lastActive: "1 month ago",
    role: "member",
  },
  {
    id: 4,
    username: "banned_bot",
    email: "bot@spam.com",
    status: "banned",
    completedLessons: 0,
    totalScore: 0.0,
    joinedDate: "2024-09-10",
    lastActive: "N/A",
    role: "member",
  },
  {
    id: 5,
    username: "pro_listener",
    email: "pro@listener.net",
    status: "active",
    completedLessons: 580,
    totalScore: 95.1,
    joinedDate: "2023-05-10",
    lastActive: "2 hours ago",
    role: "member",
  },
];

type UserStatus = "all" | "active" | "suspended" | "banned";

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400";
    case "suspended":
      return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400";
    case "banned":
      return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400";
    default:
      return "bg-muted text-muted-foreground";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User className="h-6 w-6 text-primary" /> Quản Lý Người Dùng
        </h1>
        <AddAdminDialog>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" /> Thêm Admin
          </Button>
        </AddAdminDialog>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap md:ml-auto">
            {["all", "active", "suspended", "banned"].map((status) => {
              const count =
                status === "all"
                  ? usersData.length
                  : usersData.filter((u) => u.status === status).length;
              return (
                <Button
                  key={status}
                  variant={activeFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(status as UserStatus)}
                  className={activeFilter === status ? "" : "hover:bg-muted/50"}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">
            Danh sách Học viên ({filteredUsers.length} Users)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/70 hover:bg-muted/70">
                  <TableHead className="w-[30%] min-w-[200px]">
                    Người Dùng
                  </TableHead>
                  <TableHead className="w-[150px] text-center">
                    Trạng Thái
                  </TableHead>
                  <TableHead className="w-[120px] text-right hidden sm:table-cell">
                    Bài Đã HC
                  </TableHead>
                  <TableHead className="w-[120px] text-right hidden lg:table-cell">
                    Điểm TB
                  </TableHead>
                  <TableHead className="w-[150px] text-right hidden xl:table-cell">
                    Hoạt Động Cuối
                  </TableHead>
                  <TableHead className="w-[100px] text-right">
                    Hành động
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-secondary/20 transition-colors cursor-pointer"
                    >
                      <TableCell className="font-medium flex items-center gap-3 py-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`https://placehold.co/40x40/505050/ffffff?text=${user.username[0]}`}
                            alt={user.username}
                          />
                          <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-foreground">
                              {user.username}
                            </span>
                            {user.role === "admin" && (
                              <Badge
                                variant="default"
                                className="ml-1 px-1.5 py-0 text-xs bg-primary/20 text-primary"
                              >
                                Admin
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Badge
                            variant="outline"
                            className={getStatusBadgeClass(user.status)}
                          >
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell className="text-right tabular-nums hidden sm:table-cell text-sm font-medium">
                        {user.completedLessons}
                      </TableCell>

                      <TableCell className="text-right tabular-nums hidden lg:table-cell font-bold text-primary">
                        {user.totalScore.toFixed(1)}%
                      </TableCell>

                      <TableCell className="text-right hidden xl:table-cell text-sm text-muted-foreground flex items-center justify-end gap-1">
                        <Clock className="h-3 w-3" />
                        {user.lastActive}
                      </TableCell>

                      <TableCell className="text-right">
                        <UserDetailDrawer user={user}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Hành động</span>
                          </Button>
                        </UserDetailDrawer>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Không tìm thấy người dùng nào khớp với bộ lọc.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
