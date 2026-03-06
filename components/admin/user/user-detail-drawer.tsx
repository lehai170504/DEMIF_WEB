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
  const translateStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "Hoạt động";
      case "inactive":
      case "suspended":
        return "Đình chỉ";
      case "banned":
        return "Bị cấm";
      default:
        return "Không rõ";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "inactive":
      case "suspended":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "banned":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Đã sao chép ID người dùng");
  };

  const handleToggleBan = () => {
    if (!user) return;
    const newStatus = user.status === "Banned" ? "Active" : "Banned";
    updateStatus({ id: user.id, status: newStatus });
  };

  const handleDeleteUser = () => {
    if (!user) return;
    if (
      confirm(
        "Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa hồ sơ này?",
      )
    ) {
      deleteUser(user.id, {
        onSuccess: () => setIsOpen(false),
      });
    }
  };

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

      <DrawerContent className="bg-white border-l border-slate-200 text-slate-900 h-full max-w-[500px] w-full ml-auto rounded-none sm:rounded-l-[2rem] outline-none font-mono flex flex-col shadow-2xl">
        {/* Background Glow tinh tế */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <DrawerTitle className="sr-only">Đang tải...</DrawerTitle>
            <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
            <p className="text-slate-500 font-medium text-sm animate-pulse">
              Đang tải thông tin hồ sơ...
            </p>
          </div>
        ) : isError || !user ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <DrawerTitle className="sr-only">Lỗi</DrawerTitle>
            <XCircle className="h-10 w-10 text-red-500 opacity-80" />
            <p className="text-slate-600 font-semibold text-sm">
              Không tìm thấy thông tin định danh
            </p>
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="border-slate-200 text-slate-600"
            >
              Thử lại
            </Button>
          </div>
        ) : (
          <>
            <DrawerHeader className="p-8 border-b border-slate-100 relative z-10 pb-6">
              <div className="flex items-start gap-5">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg rounded-3xl ring-1 ring-slate-100">
                  <AvatarImage
                    src={user.avatarUrl || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-3xl font-bold bg-slate-50 text-slate-400 rounded-3xl uppercase">
                    {user.username?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-3 flex-1 pt-1">
                  <div>
                    <DrawerTitle className="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-2.5">
                      {user.username}
                    </DrawerTitle>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-2.5 py-0.5 rounded-md text-xs font-semibold",
                          getStatusClass(user.status),
                        )}
                      >
                        {translateStatus(user.status)}
                      </Badge>

                      {user.authProvider === "google" && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 border border-blue-100 text-xs px-2.5 py-0.5 rounded-md font-semibold"
                        >
                          Google Auth
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => handleCopyId(user.id)}
                    className="group flex items-center gap-2 text-xs text-slate-500 cursor-pointer hover:text-orange-600 transition-colors bg-slate-50 hover:bg-orange-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100 hover:border-orange-100"
                  >
                    <Fingerprint className="h-3.5 w-3.5 group-hover:text-orange-500 transition-colors" />
                    <span className="truncate max-w-[180px] font-mono font-medium">
                      {user.id}
                    </span>
                    <Copy className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200">
              {/* 1. THÔNG TIN ĐỊNH DANH */}
              <div className="space-y-3">
                <SectionTitle
                  title="Thông tin Định danh"
                  color="text-orange-600"
                  borderColor="border-orange-500"
                />
                <div className="grid gap-px bg-slate-100 border border-slate-100 rounded-[1.5rem] overflow-hidden">
                  <RowItem
                    icon={Mail}
                    label="Địa chỉ Email"
                    value={user.email}
                    valueClass="text-slate-900 font-semibold"
                  />
                  <RowItem
                    icon={Calendar}
                    label="Ngày tham gia"
                    value={
                      user.createdAt
                        ? format(new Date(user.createdAt), "dd/MM/yyyy HH:mm", {
                            locale: vi,
                          })
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
                    valueClass="text-slate-500"
                  />

                  {/* Roles Display */}
                  <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors">
                    <span className="text-slate-500 flex items-center gap-2 text-xs font-medium">
                      <ShieldCheck className="h-4 w-4 text-slate-400" /> Vai trò
                      hệ thống
                    </span>
                    <div className="flex gap-1.5">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((r) => (
                          <Badge
                            key={r.roleId}
                            className="bg-slate-800 text-white hover:bg-slate-700 border-none px-2.5 py-0.5 text-xs font-semibold"
                          >
                            {r.roleName}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-slate-500 text-xs font-medium bg-slate-100 px-2.5 py-0.5 rounded-md">
                          Học viên
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. HỒ SƠ HỌC TẬP */}
              <div className="space-y-3">
                <SectionTitle
                  title="Hồ sơ Học tập"
                  color="text-blue-600"
                  borderColor="border-blue-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    icon={Globe}
                    label="Tiếng mẹ đẻ"
                    value={user.nativeLanguage || "---"}
                    colorClass="text-slate-900"
                  />
                  <StatCard
                    icon={BookOpen}
                    label="Đang học"
                    value={user.targetLanguage || "---"}
                    colorClass="text-blue-600"
                  />
                  <StatCard
                    icon={Target}
                    label="Trình độ"
                    value={user.currentLevel || "Beginner"}
                    colorClass="text-emerald-600"
                  />
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-center gap-1.5 hover:border-orange-200 transition-colors">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" /> Mục tiêu ngày
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-orange-600">
                        {user.dailyGoalMinutes}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        phút
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- FOOTER ACTIONS --- */}
            <DrawerFooter className="flex-shrink-0 p-6 border-t border-slate-100 bg-slate-50/50 z-20">
              <div className="grid gap-3 w-full">
                {/* Assign/Remove Admin Role */}
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-xl text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-blue-200 font-semibold text-sm disabled:opacity-50 transition-all shadow-sm"
                  onClick={handleToggleAdminRole}
                  disabled={isPending}
                >
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  {user.roles.some((r) => r.roleName === "Admin")
                    ? "Gỡ quyền quản trị viên"
                    : "Cấp quyền quản trị viên"}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  {/* Ban/Unban Button */}
                  <Button
                    variant={user.status === "Banned" ? "default" : "outline"}
                    className={cn(
                      "h-11 rounded-xl font-semibold text-sm transition-all border disabled:opacity-50 shadow-sm",
                      user.status === "Banned"
                        ? "bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white"
                        : "bg-red-50 text-red-600 hover:bg-red-100 border-red-200",
                    )}
                    onClick={handleToggleBan}
                    disabled={isPending}
                  >
                    {user.status === "Banned" ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Ban className="h-4 w-4 mr-2" />
                    )}
                    {user.status === "Banned"
                      ? "Mở khóa tài khoản"
                      : "Đình chỉ tài khoản"}
                  </Button>

                  {/* Close Button */}
                  <DrawerClose asChild>
                    <Button className="h-11 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold text-sm transition-all w-full shadow-md shadow-slate-900/10">
                      Đóng
                    </Button>
                  </DrawerClose>
                </div>

                {/* Delete User Button */}
                <Button
                  variant="ghost"
                  className="text-slate-400 hover:bg-red-50 hover:text-red-600 text-xs font-semibold mt-1 disabled:opacity-50 mx-auto w-fit px-4"
                  onClick={handleDeleteUser}
                  disabled={isPending}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Xóa vĩnh viễn dữ
                  liệu
                </Button>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

// --- SUB COMPONENTS (White Background) ---
const SectionTitle = ({ title, color, borderColor }: any) => (
  <h3
    className={cn("text-sm font-semibold pl-3 border-l-4", color, borderColor)}
  >
    {title}
  </h3>
);

const RowItem = ({
  icon: Icon,
  label,
  value,
  valueClass = "text-slate-700",
}: any) => (
  <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
    <span className="text-slate-500 flex items-center gap-2 text-xs font-medium">
      <Icon className="h-4 w-4 text-slate-400" /> {label}
    </span>
    <span
      className={cn("text-sm truncate max-w-[200px] font-semibold", valueClass)}
    >
      {value}
    </span>
  </div>
);

const StatCard = ({ icon: Icon, label, value, colorClass }: any) => (
  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-center gap-1.5 hover:border-slate-300 transition-colors">
    <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-400" /> {label}
    </span>
    <span className={cn("text-lg font-bold truncate", colorClass)}>
      {value}
    </span>
  </div>
);
