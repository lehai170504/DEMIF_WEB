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
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [dialogConfig, setDialogConfig] = React.useState<{
    isOpen: boolean;
    type: "ban" | "delete" | "role" | null;
  }>({ isOpen: false, type: null });

  const { data: user, isLoading, isError } = useUserDetail(userId, true);
  const { updateStatus, deleteUser, assignRole, removeRole, isPending } =
    useUserActions();

  const translateStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "Hoạt động";
      case "inactive":
      case "suspended":
        return "Đình chỉ";
      case "banned":
        return "Đã khóa tài khoản";
      default:
        return "Không rõ";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20";
      case "inactive":
      case "suspended":
        return "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20";
      case "banned":
        return "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20";
      default:
        return "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10";
    }
  };

  const closeDialog = () => setDialogConfig({ isOpen: false, type: null });

  // 🔥 ĐIỂM FIX LOGIC TẠI ĐÂY:
  // Cứ KHÔNG PHẢI "active" thì đều coi là đang bị khóa (Bao gồm Inactive, Suspended, Banned)
  const isLocked = user?.status?.toLowerCase() !== "active";

  const handleConfirmAction = () => {
    if (!user) return;

    switch (dialogConfig.type) {
      case "ban":
        // Nếu đang khóa (isLocked = true) -> Mở khóa (Active)
        // Nếu đang hoạt động (isLocked = false) -> Khóa (Banned)
        const newStatus = isLocked ? "Active" : "Banned";
        updateStatus(
          { id: user.id, status: newStatus },
          { onSuccess: closeDialog },
        );
        break;
      case "delete":
        deleteUser(user.id, { onSuccess: () => router.push("/admin/users") });
        break;
      case "role":
        const isModerator = user.roles.some((r) => r.roleName === "Moderator");
        isModerator
          ? removeRole(
              { id: user.id, roleName: "Moderator" },
              { onSuccess: closeDialog },
            )
          : assignRole(
              { id: user.id, roleName: "Moderator" },
              { onSuccess: closeDialog },
            );
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-[80vh] flex flex-col items-center justify-center gap-6 font-mono transition-colors duration-300">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full" />
        </div>
        <p className="text-slate-500 dark:text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">
          Đang tải thông tin học viên...
        </p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center gap-6 font-mono transition-colors duration-300 text-center px-6">
        <XCircle className="h-16 w-16 text-red-500 opacity-80" />
        <div className="space-y-2">
          <p className="text-slate-900 dark:text-white font-black text-xl uppercase tracking-tighter">
            Hồ sơ không tìm thấy
          </p>
          <p className="text-slate-500 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest">
            Hồ sơ không tồn tại hoặc đã bị xóa khỏi Core system.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="rounded-2xl h-12 px-8 border-slate-200 dark:border-white/10 font-black text-[10px] uppercase tracking-widest"
        >
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const isModerator = user.roles.some((r) => r.roleName === "Moderator");

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10 font-mono relative transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 dark:bg-orange-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header Navigation */}
      <div className="flex items-center animate-in fade-in slide-in-from-left-4 duration-500">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="group text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all rounded-2xl h-10 px-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Quay lại danh sách
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CỘT TRÁI: AVATAR & QUICK ACTIONS */}
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 p-10 rounded-[3rem] shadow-sm backdrop-blur-sm flex flex-col items-center text-center space-y-6">
            <Avatar className="h-36 w-36 border-4 border-white dark:border-zinc-950 shadow-2xl rounded-[2.5rem] ring-1 ring-slate-100 dark:ring-white/5 transition-transform hover:scale-105 duration-500">
              <AvatarImage
                src={user.avatarUrl || ""}
                className="object-cover"
              />
              <AvatarFallback className="text-5xl font-black bg-slate-50 dark:bg-zinc-800 text-slate-300 dark:text-zinc-600 uppercase">
                {user.username?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                {user.username}
              </h1>
              <p className="text-slate-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                {user.email}
              </p>
            </div>
            <Badge
              className={cn(
                "px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm",
                getStatusClass(user.status),
              )}
            >
              {translateStatus(user.status)}
            </Badge>
          </div>

          {/* Action Island */}
          <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem] shadow-sm backdrop-blur-sm space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-zinc-600 mb-6 ml-1">
              Thao tác nhanh
            </p>

            <Button
              variant="outline"
              className="w-full h-14 rounded-2xl text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20 hover:bg-blue-50 dark:hover:bg-blue-500/10 font-black text-[10px] uppercase tracking-widest shadow-sm"
              onClick={() => setDialogConfig({ isOpen: true, type: "role" })}
              disabled={isPending}
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              {isModerator ? "Gỡ quyền Moderator" : "Cấp quyền Moderator"}
            </Button>

            {/* NÚT KHÓA/MỞ KHÓA ÁP DỤNG LOGIC MỚI */}
            <Button
              variant={isLocked ? "default" : "outline"}
              className={cn(
                "w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border shadow-sm active:scale-95",
                isLocked
                  ? "bg-emerald-600 hover:bg-emerald-700 border-none text-white shadow-emerald-500/20"
                  : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20 hover:bg-red-100",
              )}
              onClick={() => setDialogConfig({ isOpen: true, type: "ban" })}
              disabled={isPending}
            >
              {isLocked ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Ban className="h-4 w-4 mr-2" />
              )}
              {isLocked ? "Mở khóa tài khoản" : "Khóa tài khoản"}
            </Button>

            <Button
              variant="ghost"
              className="w-full h-14 rounded-2xl text-slate-400 dark:text-zinc-600 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 text-[9px] font-black uppercase tracking-[0.3em] transition-all"
              onClick={() => setDialogConfig({ isOpen: true, type: "delete" })}
              disabled={isPending}
            >
              <Trash2 className="h-3.5 w-3.5 mr-2" /> Xóa tài khoản
            </Button>
          </div>
        </div>

        {/* CỘT PHẢI: CHI TIẾT THÔNG TIN */}
        <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-right-6 duration-700">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-zinc-600 flex items-center gap-3 ml-2">
              <Fingerprint className="h-4 w-4 text-orange-500" /> Thông tin cơ
              bản
            </h3>
            <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm backdrop-blur-sm">
              <RowItem icon={Mail} label="Email" value={user.email} isBold />
              <RowItem
                icon={Calendar}
                label="Ngày tạo"
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
                label="Lần đăng nhập cuối"
                value={
                  user.lastLoginAt
                    ? format(new Date(user.lastLoginAt), "HH:mm - dd/MM/yyyy", {
                        locale: vi,
                      })
                    : "Never recorded"
                }
              />
              <div className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors">
                <span className="text-slate-500 dark:text-zinc-500 flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4 text-slate-400 dark:text-zinc-600" />{" "}
                  Quyền hạn
                </span>
                <div className="flex gap-2">
                  {user.roles.map((r) => (
                    <Badge
                      key={r.roleId}
                      className="bg-slate-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-none shadow-md"
                    >
                      {r.roleName}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-zinc-600 flex items-center gap-3 ml-2">
              <Target className="h-4 w-4 text-blue-500" /> Thông tin học tập
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard
                icon={Globe}
                label="Quốc tịch"
                value={user.nativeLanguage || "---"}
                color="text-slate-900 dark:text-white"
              />
              <StatCard
                icon={BookOpen}
                label="Ngôn ngữ học tập"
                value={user.targetLanguage || "---"}
                color="text-blue-600 dark:text-blue-400"
              />
              <StatCard
                icon={Target}
                label="Cấp độ hiện tại"
                value={user.currentLevel || "Beginner"}
                color="text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DIALOG ÁP DỤNG LOGIC MỚI */}
      <ConfirmDialog
        isOpen={dialogConfig.isOpen}
        onClose={closeDialog}
        onConfirm={handleConfirmAction}
        isLoading={isPending}
        title={
          dialogConfig.type === "delete"
            ? "Xóa tài khoản vĩnh viễn"
            : dialogConfig.type === "ban"
              ? isLocked
                ? "Khôi phục quyền truy cập"
                : "Tạm khóa quyền truy cập"
              : "Sửa đổi quyền hạn"
        }
        description={
          dialogConfig.type === "delete"
            ? "Hành động này sẽ xóa vĩnh viễn mọi dữ liệu của học viên này. Không thể khôi phục."
            : dialogConfig.type === "ban"
              ? `Xác nhận ${isLocked ? "kích hoạt lại" : "tạm khóa"} quyền truy cập hệ thống?`
              : `Xác nhận thay đổi quyền quản trị cho tài khoản này?`
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

const RowItem = ({ icon: Icon, label, value, isBold }: any) => (
  <div className="flex items-center justify-between p-6 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors border-b border-slate-100 dark:border-white/5 last:border-0">
    <span className="text-slate-500 dark:text-zinc-500 flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest">
      <Icon className="h-4 w-4 text-slate-400 dark:text-zinc-600" /> {label}
    </span>
    <span
      className={cn(
        "text-xs truncate max-w-[300px] uppercase tracking-tight",
        isBold
          ? "font-black text-slate-900 dark:text-white"
          : "font-bold text-slate-600 dark:text-slate-400",
      )}
    >
      {value}
    </span>
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 shadow-sm backdrop-blur-sm flex flex-col gap-3 hover:border-orange-200 dark:hover:border-orange-500/30 transition-all group">
    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-zinc-600 flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-400 dark:text-zinc-600 group-hover:text-orange-500 transition-colors" />{" "}
      {label}
    </span>
    <span
      className={cn("text-xl font-black uppercase tracking-tighter", color)}
    >
      {value}
    </span>
  </div>
);
