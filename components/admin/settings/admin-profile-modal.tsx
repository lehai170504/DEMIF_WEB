"use client";

import * as React from "react";
import {
  User,
  Mail,
  ShieldCheck,
  Loader2,
  Fingerprint,
  CalendarDays,
  Hash,
  Lock,
  CheckCircle2,
  Globe,
  Briefcase,
  X,
  ShieldAlert,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
      <DialogContent className="sm:max-w-[800px] bg-white border-gray-200 text-gray-900 font-mono max-h-[95vh] overflow-y-auto no-scrollbar p-0 rounded-[2.5rem] shadow-2xl">
        {/* TIÊU ĐỀ CHÍNH (Sticky Header tương tự Modal tạo bài học) */}
        <DialogHeader className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight text-gray-900">
              <ShieldCheck className="h-7 w-7 text-orange-500" /> Hồ sơ nhân sự
              quản trị
            </DialogTitle>
            <DialogClose className="p-2 bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-full transition-all border border-slate-100 focus:outline-none">
              <X className="w-5 h-5" />
            </DialogClose>
          </div>
          <DialogDescription className="text-xs font-medium text-slate-500 mt-1 ml-9">
            Thông tin định danh và bảo mật tài khoản cấp cao trên hệ thống
            Demif.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-10">
          {isFetching ? (
            <div className="h-60 flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                Đang truy xuất dữ liệu định danh...
              </p>
            </div>
          ) : (
            <>
              {/* PHẦN A: THÔNG TIN TỔNG QUAN (Avatar & Badge) */}
              <div className="flex flex-col sm:flex-row items-center gap-8 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                <div className="relative group">
                  <div className="relative w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white bg-white shadow-xl">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage
                        src={user?.avatarUrl || ""}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-3xl">
                        {user?.username?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-emerald-500 w-6 h-6 rounded-full border-[4px] border-white shadow-sm" />
                </div>

                <div className="space-y-3 text-center sm:text-left">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                      {user?.username}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                      {user?.email}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Badge className="bg-orange-500 text-white border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider">
                      {roleDisplay}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-slate-200 text-slate-500 font-semibold text-[10px] bg-white"
                    >
                      Cấp bậc quản trị: {user?.roles?.length || 1}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* PHẦN B: CHI TIẾT ĐỊNH DANH (Grid tương tự Manual Form) */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                  Dữ liệu định danh hệ thống
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Định danh nhân sự (ID)",
                      val: user?.id,
                      icon: Hash,
                    },
                    { label: "Email công vụ", val: user?.email, icon: Mail },
                    {
                      label: "Chức vụ hiện tại",
                      val: user?.roles?.join(", "),
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
                      label: "Quốc gia quản lý",
                      val: user?.country || "Việt Nam",
                      icon: Globe,
                    },
                    {
                      label: "Định danh bảo mật",
                      val: `${user?.authProvider} SSO ACCOUNT`,
                      icon: Fingerprint,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2 group">
                      <Label className="text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1 flex items-center gap-2">
                        <item.icon className="w-3 h-3 text-orange-500" />{" "}
                        {item.label}
                      </Label>
                      <div className="h-14 flex items-center px-5 rounded-2xl bg-gray-50 border border-gray-100 text-slate-900 font-bold shadow-sm group-hover:border-orange-200 transition-all truncate">
                        {item.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PHẦN C: TRẠNG THÁI BẢO VỆ (Tương tự dải màu đỏ AI của YouTube tab) */}
              <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-start gap-5 shadow-sm">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-emerald-900 uppercase tracking-tight">
                    Tài khoản được bảo vệ nghiêm ngặt
                  </p>
                  <p className="text-xs text-emerald-700/80 leading-relaxed italic font-medium">
                    Để đảm bảo an toàn hệ thống, thông tin quản trị viên là
                    tĩnh. Mọi yêu cầu thay đổi dữ liệu nhân sự vui lòng liên hệ
                    bộ phận Kỹ thuật/DevOps.
                  </p>
                </div>
              </div>

              {/* PHẦN D: PHIÊN LÀM VIỆC */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-900/10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                    <Lock className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Ghi nhận truy cập cuối
                    </p>
                    <p className="text-sm font-bold">
                      {user?.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleString("vi-VN")
                        : "Đang trực tuyến"}
                    </p>
                  </div>
                </div>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none font-bold px-4 py-1.5 rounded-full">
                  PHIÊN HIỆN TẠI
                </Badge>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
