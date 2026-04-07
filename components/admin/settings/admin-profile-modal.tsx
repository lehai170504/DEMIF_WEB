"use client";

import * as React from "react";
import {
  Mail,
  ShieldCheck,
  Loader2,
  Fingerprint,
  CalendarDays,
  Lock,
  CheckCircle2,
  Globe,
  Briefcase,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUserProfile } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

interface AdminProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminProfileModal({
  open,
  onOpenChange,
}: AdminProfileModalProps) {
  // Chỉ lấy dữ liệu hồ sơ quản trị
  const { data: user, isLoading: isFetching } = useUserProfile();

  const roleDisplay = user?.roles?.includes("Admin")
    ? "Quản trị viên hệ thống"
    : "Điều hành viên";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white dark:bg-zinc-950 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 font-mono max-h-[95vh] overflow-y-auto no-scrollbar p-0 rounded-[2.5rem] shadow-2xl">
        {/* TIÊU ĐỀ CHÍNH (Sticky Header) */}
        <DialogHeader className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-zinc-950/80 sticky top-0 z-20 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-100 dark:border-orange-500/20">
                <ShieldCheck className="h-6 w-6 text-[#FF7A00]" />
              </div>
              Hồ sơ nhân sự
            </DialogTitle>
            <DialogClose className="p-2 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full transition-all border border-slate-100 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]">
              <X className="w-5 h-5" />
            </DialogClose>
          </div>
          <DialogDescription className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
            Thông tin định danh và bảo mật tài khoản cấp cao trên hệ thống Demif
            CMS.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-10">
          {isFetching ? (
            <div className="h-60 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-[#FF7A00]" />
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest animate-pulse">
                Đang đồng bộ dữ liệu...
              </p>
            </div>
          ) : (
            <>
              {/* PHẦN A: THÔNG TIN TỔNG QUAN (Avatar & Badge) */}
              <div className="flex flex-col sm:flex-row items-center gap-8 bg-slate-50/50 dark:bg-zinc-900/30 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="absolute inset-0 bg-[#FF7A00]/20 blur-2xl rounded-full scale-150 pointer-events-none" />
                  <div className="relative w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage
                        src={user?.avatarUrl || ""}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 font-bold text-4xl uppercase">
                        {user?.username?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-[4px] border-white dark:border-zinc-950 flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4 text-center sm:text-left relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                      {user?.username}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest">
                      {user?.email}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Badge className="bg-[#FF7A00] hover:bg-[#FF9E2C] text-white border-none px-4 py-1.5 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-500/20">
                      {roleDisplay}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-[10px] uppercase tracking-widest bg-white dark:bg-zinc-800 px-4 py-1.5"
                    >
                      Cấp bậc: Level {user?.roles?.length || 1}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* PHẦN B: CHI TIẾT ĐỊNH DANH (Đã bỏ ID) */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] pl-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  Dữ liệu định danh hệ thống
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: "Email công vụ", val: user?.email, icon: Mail },
                    {
                      label: "Chức vụ hiện tại",
                      val: user?.roles?.join(", ") || roleDisplay,
                      icon: Briefcase,
                    },
                    {
                      label: "Ngày khởi tạo quyền",
                      val: user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "N/A",
                      icon: CalendarDays,
                    },
                    {
                      label: "Khu vực quản lý",
                      val: user?.country || "Việt Nam",
                      icon: Globe,
                    },
                    {
                      label: "Phương thức xác thực",
                      val: `${user?.authProvider || "GOOGLE"} SSO ACCOUNT`,
                      icon: Fingerprint,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2 group">
                      <Label className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest ml-1 flex items-center gap-2">
                        <item.icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF7A00] transition-colors" />{" "}
                        {item.label}
                      </Label>
                      <div className="h-12 flex items-center px-4 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5 text-slate-900 dark:text-slate-200 font-bold text-sm shadow-inner group-hover:border-orange-200 dark:group-hover:border-orange-500/30 transition-all truncate">
                        {item.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PHẦN C: TRẠNG THÁI BẢO VỆ */}
              <div className="p-6 bg-emerald-50 dark:bg-emerald-500/5 rounded-3xl border border-emerald-100 dark:border-emerald-500/10 flex items-start gap-5 shadow-sm">
                <div className="p-3 bg-white dark:bg-emerald-500/10 rounded-2xl shadow-sm border border-emerald-100/50 dark:border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-black text-emerald-900 dark:text-emerald-400 uppercase tracking-tight">
                    Tài khoản được bảo vệ nghiêm ngặt
                  </p>
                  <p className="text-xs text-emerald-700/80 dark:text-emerald-500/80 leading-relaxed font-medium">
                    Thông tin quản trị viên được đồng bộ tự động qua SSO. Mọi
                    yêu cầu thay đổi dữ liệu nhân sự vui lòng liên hệ bộ phận
                    DevOps.
                  </p>
                </div>
              </div>

              {/* PHẦN D: PHIÊN LÀM VIỆC */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-900 dark:bg-black rounded-[2rem] text-white shadow-xl shadow-slate-900/10 border border-slate-800 dark:border-white/10 gap-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                    <Lock className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                      Ghi nhận truy cập cuối
                    </p>
                    <p className="text-sm font-black tracking-wide text-white">
                      {user?.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleString("vi-VN")
                        : "Đang trực tuyến"}
                    </p>
                  </div>
                </div>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none font-black px-5 py-2 rounded-xl text-[10px] uppercase tracking-widest relative z-10">
                  Phiên hiện tại
                </Badge>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
