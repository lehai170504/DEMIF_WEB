"use client";

import * as React from "react";
import { UserHeader } from "@/components/admin/user/user-header";
import { UserToolbar, UserStatus } from "@/components/admin/user/user-toolbar";
import { UserTable, UserData } from "@/components/admin/user/user-table";

// Data mẫu
const usersData: UserData[] = [
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

  // Tính toán số lượng cho pills
  const counts = React.useMemo(() => ({
    all: usersData.length,
    active: usersData.filter((u) => u.status === "active").length,
    suspended: usersData.filter((u) => u.status === "suspended").length,
    banned: usersData.filter((u) => u.status === "banned").length,
  }), []);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 px-2 font-mono text-zinc-100 relative">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-8">
        <UserHeader />
        
        <UserToolbar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />

        <UserTable users={filteredUsers} />
      </div>
    </div>
  );
}