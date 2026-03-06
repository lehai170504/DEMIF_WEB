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
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "suspended":
        return "bg-orange-50 text-orange-600 border-orange-200";
      case "banned":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-500 border-gray-200";
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Đã sao chép ID");
  };

  const handleToggleBan = () => {
    if (!user) return;
    const newStatus = user.status === "Banned" ? "Active" : "Banned";
    updateStatus({ id: user.id, status: newStatus });
  };

  const handleDeleteUser = () => {
    if (!user) return;
    if (
      confirm("Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa?")
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

      <DrawerContent className="bg-white border-l border-gray-200 text-gray-900 h-full max-w-[500px] w-full ml-auto rounded-none sm:rounded-l-[2rem] outline-none font-mono flex flex-col shadow-2xl">
        {/* Background Glow - Chuyển sang màu nhạt hơn cho nền trắng */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <DrawerTitle className="sr-only">Đang tải...</DrawerTitle>
            <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
            <p className="text-gray-400 text-sm animate-pulse">
              Đang tải hồ sơ...
            </p>
          </div>
        ) : isError || !user ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <DrawerTitle className="sr-only">Lỗi</DrawerTitle>
            <XCircle className="h-10 w-10 text-red-500" />
            <p className="text-gray-500 font-bold italic text-sm uppercase tracking-widest">
              Không tìm thấy thông tin định danh
            </p>
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="border-gray-200"
            >
              Thử lại
            </Button>
          </div>
        ) : (
          <>
            <DrawerHeader className="p-8 border-b border-gray-100 relative z-10 pb-6">
              <div className="flex items-start gap-5">
                <Avatar className="h-24 w-24 border-4 border-white shadow-xl rounded-3xl ring-1 ring-gray-100">
                  <AvatarImage
                    src={user.avatarUrl || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-3xl font-black bg-gray-100 text-gray-400 rounded-3xl italic">
                    {user.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2 flex-1 pt-1">
                  <div>
                    <DrawerTitle className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-2 italic uppercase">
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
                          className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] px-2 py-0.5 rounded-lg font-bold"
                        >
                          GOOGLE AUTH
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => handleCopyId(user.id)}
                    className="group flex items-center gap-2 text-[10px] text-gray-400 cursor-pointer hover:text-orange-500 transition-colors bg-gray-50 hover:bg-gray-100 w-fit px-3 py-1.5 rounded-lg border border-gray-100"
                  >
                    <Fingerprint className="h-3 w-3 group-hover:text-orange-500 transition-colors" />
                    <span className="truncate max-w-[180px] font-mono font-bold uppercase tracking-tighter">
                      {user.id}
                    </span>
                    <Copy className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">
              {/* 1. THÔNG TIN ĐỊNH DANH */}
              <div className="space-y-4">
                <SectionTitle
                  title="01. Thông tin Định danh"
                  color="text-orange-600"
                  borderColor="border-orange-500"
                />
                <div className="grid gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                  <RowItem
                    icon={Mail}
                    label="Địa chỉ Email"
                    value={user.email}
                    valueClass="text-gray-900 font-bold"
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
                    valueClass="text-gray-400 italic"
                  />

                  {/* Roles Display */}
                  <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors">
                    <span className="text-gray-400 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                      <ShieldCheck className="h-4 w-4 text-gray-300" /> Vai trò
                    </span>
                    <div className="flex gap-1.5">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((r) => (
                          <Badge
                            key={r.roleId}
                            className="bg-gray-900 text-white hover:bg-gray-800 border-none px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider"
                          >
                            {r.roleName}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-400 text-[10px] font-bold italic uppercase">
                          Học viên
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. HỒ SƠ HỌC TẬP */}
              <div className="space-y-4">
                <SectionTitle
                  title="02. Hồ sơ Học tập"
                  color="text-blue-600"
                  borderColor="border-blue-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    icon={Globe}
                    label="Tiếng mẹ đẻ"
                    value={user.nativeLanguage || "---"}
                    colorClass="text-gray-900"
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
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col justify-center gap-1 hover:border-orange-200 transition-colors">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-300" /> Mục tiêu ngày
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-orange-600 italic">
                        {user.dailyGoalMinutes}
                      </span>
                      <span className="text-[10px] text-gray-400 font-black uppercase">
                        PHÚT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- FOOTER ACTIONS --- */}
            <DrawerFooter className="flex-shrink-0 p-6 border-t border-gray-100 bg-gray-50/50 z-20">
              <div className="grid gap-3 w-full">
                {/* Assign/Remove Admin Role */}
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl text-blue-600 hover:bg-blue-50 border-blue-100 font-black uppercase text-[10px] tracking-widest disabled:opacity-50 transition-all"
                  onClick={handleToggleAdminRole}
                  disabled={isPending}
                >
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  {user.roles.some((r) => r.roleName === "Admin")
                    ? "Gỡ quyền quản trị"
                    : "Cấp quyền quản trị"}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  {/* Ban/Unban Button */}
                  <Button
                    variant={user.status === "Banned" ? "default" : "outline"}
                    className={cn(
                      "h-12 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all border disabled:opacity-50",
                      user.status === "Banned"
                        ? "bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white"
                        : "bg-red-50 text-red-600 hover:bg-red-100 border-red-100",
                    )}
                    onClick={handleToggleBan}
                    disabled={isPending}
                  >
                    {user.status === "Banned" ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Ban className="h-4 w-4 mr-2" />
                    )}
                    {user.status === "Banned" ? "Mở khóa" : "Chặn hồ sơ"}
                  </Button>

                  {/* Close Button */}
                  <DrawerClose asChild>
                    <Button className="h-12 rounded-xl bg-gray-900 text-white hover:bg-gray-800 font-black uppercase text-[10px] tracking-widest transition-all w-full shadow-lg shadow-gray-200">
                      <Check className="h-4 w-4 mr-2" /> Đóng
                    </Button>
                  </DrawerClose>
                </div>

                {/* Delete User Button */}
                <Button
                  variant="link"
                  className="text-gray-300 hover:text-red-500 text-[9px] font-black uppercase tracking-widest mt-2 disabled:opacity-50"
                  onClick={handleDeleteUser}
                  disabled={isPending}
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Xóa vĩnh viễn dữ liệu
                  người dùng
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
    className={cn(
      "text-[10px] font-black uppercase tracking-[0.2em] pl-3 border-l-4 italic",
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
  valueClass = "text-gray-700",
}: any) => (
  <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
    <span className="text-gray-400 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
      <Icon className="h-4 w-4 text-gray-300" /> {label}
    </span>
    <span
      className={cn(
        "text-sm truncate max-w-[200px] font-bold uppercase tracking-tight",
        valueClass,
      )}
    >
      {value}
    </span>
  </div>
);

const StatCard = ({ icon: Icon, label, value, colorClass }: any) => (
  <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col justify-center gap-1 hover:border-gray-200 transition-colors">
    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
      <Icon className="h-3 w-3 text-gray-300" /> {label}
    </span>
    <span
      className={cn(
        "text-lg font-black truncate uppercase italic tracking-tighter",
        colorClass,
      )}
    >
      {value}
    </span>
  </div>
);
