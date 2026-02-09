"use client";

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
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
  Check,
  Mail,
  Clock,
  Calendar,
  ShieldCheck,
  Globe,
  BookOpen,
  Target,
  Fingerprint,
  Loader2,
  Copy,
  XCircle,
  Zap,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useUserDetail } from "@/hooks/use-user-detail";
import { useUserActions } from "@/hooks/use-user-actions";

interface UserDetailDrawerProps {
  userId: string;
  children: React.ReactNode;
}

export function UserDetailDrawer({ userId, children }: UserDetailDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // 1. Fetch User Detail
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useUserDetail(userId, isOpen);

  // 2. Actions Hook (Mutation)
  const { updateStatus, deleteUser, assignRole, removeRole, isPending } =
    useUserActions();

  // --- Helpers ---
  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
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

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Đã sao chép ID");
  };

  // --- Handlers ---

  // Xử lý Khóa/Mở khóa
  const handleToggleBan = () => {
    if (!user) return;
    const newStatus = user.status === "Banned" ? "Active" : "Banned";
    updateStatus({ id: user.id, status: newStatus });
  };

  // Xử lý Xóa User (Soft Delete)
  const handleDeleteUser = () => {
    if (!user) return;
    if (
      confirm("Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa?")
    ) {
      deleteUser(user.id, {
        onSuccess: () => setIsOpen(false), // Đóng drawer sau khi xóa thành công
      });
    }
  };

  // Xử lý Toggle Admin Role
  const handleToggleAdminRole = () => {
    if (!user) return;
    const isAdmin = user.roles.some((r) => r.roleName === "Admin");

    if (isAdmin) {
      removeRole({ id: user.id, roleName: "Admin" });
    } else {
      assignRole({ id: user.id, roleName: "Admin" });
    }
  };

  return (
    <Drawer direction="right" onOpenChange={setIsOpen} open={isOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="bg-[#18181b] border-l border-white/10 text-zinc-100 h-full max-w-[500px] w-full ml-auto rounded-none sm:rounded-l-[2rem] outline-none font-mono flex flex-col shadow-2xl">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* --- TRƯỜNG HỢP 1: LOADING --- */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <DrawerTitle className="sr-only">Đang tải...</DrawerTitle>
            <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
            <p className="text-zinc-500 text-sm animate-pulse">
              Đang tải hồ sơ...
            </p>
          </div>
        ) : isError || !user ? (
          /* --- TRƯỜNG HỢP 2: ERROR --- */
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <DrawerTitle className="sr-only">Lỗi</DrawerTitle>
            <XCircle className="h-10 w-10 text-red-500" />
            <p className="text-zinc-500">Không tìm thấy thông tin.</p>
            <Button variant="outline" onClick={() => refetch()}>
              Thử lại
            </Button>
          </div>
        ) : (
          /* --- TRƯỜNG HỢP 3: SUCCESS --- */
          <>
            <DrawerHeader className="p-8 border-b border-white/5 relative z-10 pb-6">
              <div className="flex items-start gap-5">
                <Avatar className="h-24 w-24 border-4 border-[#18181b] shadow-2xl rounded-3xl ring-1 ring-white/10">
                  <AvatarImage
                    src={user.avatarUrl || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-3xl font-black bg-zinc-800 text-zinc-400 rounded-3xl">
                    {user.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2 flex-1 pt-1">
                  <div>
                    <DrawerTitle className="text-2xl font-black text-white tracking-tight leading-none mb-2">
                      {user.username}
                    </DrawerTitle>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                          getStatusClass(user.status),
                        )}
                      >
                        {user.status}
                      </Badge>
                      {user.authProvider === "google" && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-2 py-0.5 rounded-lg"
                        >
                          Google Auth
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => handleCopyId(user.id)}
                    className="group flex items-center gap-2 text-[10px] text-zinc-500 cursor-pointer hover:text-zinc-300 transition-colors bg-white/5 hover:bg-white/10 w-fit px-3 py-1.5 rounded-lg border border-white/5"
                  >
                    <Fingerprint className="h-3 w-3 group-hover:text-orange-500 transition-colors" />
                    <span className="truncate max-w-[180px] font-mono">
                      {user.id}
                    </span>
                    <Copy className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {/* 1. THÔNG TIN ĐỊNH DANH */}
              <div className="space-y-4">
                <SectionTitle
                  title="Thông tin Định danh"
                  color="text-orange-500"
                  borderColor="border-orange-500"
                />
                <div className="grid gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                  <RowItem
                    icon={Mail}
                    label="Email"
                    value={user.email}
                    valueClass="text-white font-bold"
                  />
                  <RowItem
                    icon={Calendar}
                    label="Ngày tham gia"
                    value={
                      user.createdAt
                        ? format(
                            new Date(user.createdAt),
                            "HH:mm - dd/MM/yyyy",
                            { locale: vi },
                          )
                        : "N/A"
                    }
                  />
                  <RowItem
                    icon={Clock}
                    label="Đăng nhập cuối"
                    value={
                      user.lastLoginAt
                        ? format(
                            new Date(user.lastLoginAt),
                            "HH:mm - dd/MM/yyyy",
                            { locale: vi },
                          )
                        : "Chưa đăng nhập"
                    }
                    valueClass="text-zinc-400 italic"
                  />

                  {/* Roles Display */}
                  <div className="flex items-center justify-between p-4 bg-[#18181b]/50">
                    <span className="text-zinc-400 flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                      <ShieldCheck className="h-4 w-4 text-zinc-500" /> Vai trò
                    </span>
                    <div className="flex gap-1.5">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((r) => (
                          <Badge
                            key={r.roleId}
                            className="bg-white text-black hover:bg-zinc-200 border-none px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
                          >
                            {r.roleName}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-zinc-600 text-xs italic">
                          Member
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. HỒ SƠ HỌC TẬP */}
              <div className="space-y-4">
                <SectionTitle
                  title="Hồ sơ Học tập"
                  color="text-blue-500"
                  borderColor="border-blue-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    icon={Globe}
                    label="Tiếng mẹ đẻ"
                    value={user.nativeLanguage || "---"}
                    colorClass="text-white"
                  />
                  <StatCard
                    icon={BookOpen}
                    label="Đang học"
                    value={user.targetLanguage || "---"}
                    colorClass="text-blue-400"
                  />
                  <StatCard
                    icon={Target}
                    label="Trình độ"
                    value={user.currentLevel || "Beginner"}
                    colorClass="text-emerald-400"
                  />
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center gap-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide flex items-center gap-2">
                      <Clock className="h-3 w-3" /> Mục tiêu ngày
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-orange-400">
                        {user.dailyGoalMinutes}
                      </span>
                      <span className="text-xs text-zinc-500 font-bold">
                        phút
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- FOOTER ACTIONS --- */}
            <DrawerFooter className="flex-shrink-0 p-6 border-t border-white/5 bg-[#18181b] z-20">
              <div className="grid gap-3 w-full">
                {/* 2. Assign/Remove Admin Role */}
                <Button
                  variant="ghost"
                  className="w-full h-10 rounded-xl text-blue-400 hover:bg-blue-500/10 font-bold disabled:opacity-50"
                  onClick={handleToggleAdminRole}
                  disabled={isPending}
                >
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  {user.roles.some((r) => r.roleName === "Admin")
                    ? "Gỡ quyền Admin"
                    : "Cấp quyền Admin"}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  {/* 3. Ban/Unban Button */}
                  <Button
                    variant={
                      user.status === "Banned" ? "default" : "destructive"
                    }
                    className={cn(
                      "h-12 rounded-xl font-bold transition-all border disabled:opacity-50",
                      user.status === "Banned"
                        ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-600 text-white"
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20",
                    )}
                    onClick={handleToggleBan}
                    disabled={isPending}
                  >
                    {user.status === "Banned" ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    {user.status === "Banned" ? "Mở khóa" : "Chặn User"}
                  </Button>

                  {/* 4. Close Button */}
                  <DrawerClose asChild>
                    <Button className="h-12 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold transition-all w-full">
                      <Check className="h-4 w-4 mr-2" /> Đóng
                    </Button>
                  </DrawerClose>
                </div>

                {/* 5. Delete User Button */}
                <Button
                  variant="link"
                  className="text-zinc-600 hover:text-red-500 text-xs mt-2 disabled:opacity-50"
                  onClick={handleDeleteUser}
                  disabled={isPending}
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Xóa vĩnh viễn tài khoản
                  này
                </Button>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

// --- SUB COMPONENTS ---
const SectionTitle = ({ title, color, borderColor }: any) => (
  <h3
    className={cn(
      "text-xs font-black uppercase tracking-[0.2em] pl-2 border-l-2",
      color,
      borderColor,
    )}
  >
    {title}
  </h3>
);

const RowItem = ({
  icon: Icon,
  label,
  value,
  valueClass = "text-zinc-200",
}: any) => (
  <div className="flex items-center justify-between p-4 bg-[#18181b]/50 border-b border-white/5 last:border-0">
    <span className="text-zinc-400 flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
      <Icon className="h-4 w-4 text-zinc-500" /> {label}
    </span>
    <span className={cn("text-sm truncate max-w-[200px]", valueClass)}>
      {value}
    </span>
  </div>
);

const StatCard = ({ icon: Icon, label, value, colorClass }: any) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center gap-1">
    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide flex items-center gap-2">
      <Icon className="h-3 w-3" /> {label}
    </span>
    <span className={cn("text-lg font-bold truncate", colorClass)}>
      {value}
    </span>
  </div>
);
