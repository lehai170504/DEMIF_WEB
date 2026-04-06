"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
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
  XCircle,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useUserDetail } from "@/hooks/use-user-detail";
import { useUserActions } from "@/hooks/use-user-actions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog"; // Đảm bảo đúng path component của ông

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  // --- States cho Confirm Dialog ---
  const [dialogConfig, setDialogConfig] = React.useState<{
    isOpen: boolean;
    type: "ban" | "delete" | "role" | null;
  }>({ isOpen: false, type: null });

  // 1. Fetch User Detail
  const { data: user, isLoading, isError } = useUserDetail(userId, true);

  // 2. Actions Hook
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
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "banned":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // --- Action Handlers ---
  const closeDialog = () => setDialogConfig({ isOpen: false, type: null });

  const handleConfirmAction = () => {
    if (!user) return;

    switch (dialogConfig.type) {
      case "ban":
        const newStatus = user.status === "Banned" ? "Active" : "Banned";
        updateStatus(
          { id: user.id, status: newStatus },
          { onSuccess: closeDialog },
        );
        break;
      case "delete":
        deleteUser(user.id, { onSuccess: () => router.push("/admin/users") });
        break;
      case "role":
        const isAdmin = user.roles.some((r) => r.roleName === "Admin");
        isAdmin
          ? removeRole(
              { id: user.id, roleName: "Admin" },
              { onSuccess: closeDialog },
            )
          : assignRole(
              { id: user.id, roleName: "Admin" },
              { onSuccess: closeDialog },
            );
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center gap-4 font-mono">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-slate-500 font-medium">
          Đang truy xuất hồ sơ học viên...
        </p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center gap-4 font-mono">
        <XCircle className="h-12 w-12 text-red-500 opacity-80" />
        <p className="text-slate-600 font-bold text-lg">
          Hồ sơ không tồn tại hoặc đã bị xóa
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const isAdmin = user.roles.some((r) => r.roleName === "Admin");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 font-mono relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Header Navigation */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="group text-slate-500 hover:text-orange-600 transition-colors rounded-2xl"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Quay lại danh sách
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* CỘT TRÁI: AVATAR & QUICK ACTIONS */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center space-y-4">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl rounded-[2.5rem] ring-1 ring-slate-100">
              <AvatarImage
                src={user.avatarUrl || ""}
                className="object-cover"
              />
              <AvatarFallback className="text-4xl font-bold bg-slate-50 text-slate-300 uppercase">
                {user.username?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {user.username}
              </h1>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
            <Badge
              className={cn(
                "px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                getStatusClass(user.status),
              )}
            >
              {translateStatus(user.status)}
            </Badge>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">
              Quản trị hệ thống
            </p>

            <Button
              variant="outline"
              className="w-full h-12 rounded-2xl text-blue-600 border-blue-100 hover:bg-blue-50 font-bold"
              onClick={() => setDialogConfig({ isOpen: true, type: "role" })}
              disabled={isPending}
            >
              <ShieldCheck className="h-5 w-5 mr-2" />
              {isAdmin ? "Gỡ quyền Admin" : "Cấp quyền Admin"}
            </Button>

            <Button
              variant={user.status === "Banned" ? "default" : "outline"}
              className={cn(
                "w-full h-12 rounded-2xl font-bold transition-all border shadow-sm",
                user.status === "Banned"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100",
              )}
              onClick={() => setDialogConfig({ isOpen: true, type: "ban" })}
              disabled={isPending}
            >
              {user.status === "Banned" ? (
                <Check className="h-5 w-5 mr-2" />
              ) : (
                <Ban className="h-5 w-5 mr-2" />
              )}
              {user.status === "Banned"
                ? "Mở khóa tài khoản"
                : "Đình chỉ tài khoản"}
            </Button>

            <Button
              variant="ghost"
              className="w-full h-12 rounded-2xl text-slate-400 hover:text-red-600 hover:bg-red-50 text-xs font-bold"
              onClick={() => setDialogConfig({ isOpen: true, type: "delete" })}
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Xóa hồ sơ vĩnh viễn
            </Button>
          </div>
        </div>

        {/* CỘT PHẢI: CHI TIẾT THÔNG TIN */}
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Fingerprint className="h-4 w-4" /> Thông tin định danh
            </h3>
            <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
              <RowItem
                icon={Mail}
                label="Địa chỉ Email"
                value={user.email}
                isBold
              />
              <RowItem
                icon={Calendar}
                label="Ngày gia nhập"
                value={
                  user.createdAt
                    ? format(new Date(user.createdAt), "dd MMMM, yyyy", {
                        locale: vi,
                      })
                    : "N/A"
                }
              />
              <RowItem
                icon={Clock}
                label="Hoạt động cuối"
                value={
                  user.lastLoginAt
                    ? format(new Date(user.lastLoginAt), "HH:mm - dd/MM/yyyy", {
                        locale: vi,
                      })
                    : "Chưa ghi nhận"
                }
              />
              <div className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                <span className="text-slate-400 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" /> Vai trò hiện tại
                </span>
                <div className="flex gap-2">
                  {user.roles.map((r) => (
                    <Badge key={r.roleId} className="bg-slate-900 rounded-lg">
                      {r.roleName}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Target className="h-4 w-4" /> Tiến trình học tập
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={Globe}
                label="Ngôn ngữ gốc"
                value={user.nativeLanguage || "---"}
                color="text-slate-900"
              />
              <StatCard
                icon={BookOpen}
                label="Đang theo học"
                value={user.targetLanguage || "---"}
                color="text-blue-600"
              />
              <StatCard
                icon={Target}
                label="Trình độ"
                value={user.currentLevel || "Beginner"}
                color="text-emerald-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL XÁC NHẬN TÁI SỬ DỤNG --- */}
      <ConfirmDialog
        isOpen={dialogConfig.isOpen}
        onClose={closeDialog}
        onConfirm={handleConfirmAction}
        isLoading={isPending}
        title={
          dialogConfig.type === "delete"
            ? "Xóa vĩnh viễn học viên"
            : dialogConfig.type === "ban"
              ? user.status === "Banned"
                ? "Mở khóa tài khoản"
                : "Đình chỉ tài khoản"
              : "Thay đổi quyền hạn"
        }
        description={
          dialogConfig.type === "delete"
            ? "Hành động này không thể hoàn tác. Mọi dữ liệu liên quan đến học viên này sẽ bị xóa sạch khỏi hệ thống."
            : dialogConfig.type === "ban"
              ? `Bạn có chắc chắn muốn ${user.status === "Banned" ? "kích hoạt lại" : "tạm khóa"} quyền truy cập của học viên này?`
              : `Xác nhận ${isAdmin ? "thu hồi" : "cấp"} quyền quản trị viên (Admin) cho tài khoản này?`
        }
        confirmText={
          dialogConfig.type === "delete"
            ? "Xóa ngay"
            : dialogConfig.type === "ban"
              ? "Xác nhận"
              : "Đồng ý"
        }
        isDestructive={dialogConfig.type !== "role"}
      />
    </div>
  );
}

// --- SUB COMPONENTS ---
const RowItem = ({ icon: Icon, label, value, isBold }: any) => (
  <div className="flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
    <span className="text-slate-400 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
      <Icon className="h-4 w-4" /> {label}
    </span>
    <span
      className={cn(
        "text-sm truncate max-w-[300px]",
        isBold ? "font-bold text-slate-900" : "font-medium text-slate-600",
      )}
    >
      {value}
    </span>
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-sm flex flex-col gap-2 hover:border-orange-200 transition-all hover:shadow-md">
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
      <Icon className="h-4 w-4" /> {label}
    </span>
    <span className={cn("text-xl font-bold", color)}>{value}</span>
  </div>
);
