"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SubscriptionPlanDto } from "@/types/subscription.type";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Check,
  Layers,
  Power,
  Trash2,
  Loader2,
  Calendar,
  Users,
  Settings2,
} from "lucide-react";
import { EditPlanDialog } from "./edit-plan-dialog";
import { useManagePlan } from "@/hooks/use-manage-plan";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface PlanCardProps {
  plan: SubscriptionPlanDto;
}

const getTierLabel = (tier: string) => {
  return tier === "0" ? "Cơ bản" : tier || "Không xác định";
};

const getCycleLabel = (cycle: string) => {
  switch (cycle) {
    case "Monthly":
      return "Hàng tháng";
    case "Yearly":
      return "Hàng năm";
    case "Lifetime":
      return "Vĩnh viễn";
    case "0":
      return "Tùy chỉnh";
    default:
      return cycle;
  }
};

export function PlanCard({ plan }: PlanCardProps) {
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const { deletePlan, isDeleting } = useManagePlan();

  const formattedPrice = new Intl.NumberFormat("vi-VN").format(plan.price);

  const handleConfirmDelete = () => {
    deletePlan(plan.id, {
      onSettled: () => {
        setIsDeleteModalOpen(false);
      },
    });
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col bg-white dark:bg-zinc-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1 overflow-hidden font-mono",
          plan.isActive === false && "opacity-60 grayscale-[40%]",
        )}
      >
        {/* Hiệu ứng trang trí nền */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[40px] rounded-full pointer-events-none transition-colors group-hover:bg-orange-500/15" />

        {/* --- HEADER: Trạng thái & Tier --- */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex flex-wrap gap-2">
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all",
                plan.isActive
                  ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 shadow-sm"
                  : "bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400",
              )}
            >
              <Power className="h-3.5 w-3.5" />
              {plan.isActive ? "Hoạt động" : "Tạm dừng"}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-zinc-300 text-xs font-semibold capitalize">
              <Layers className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
              {getTierLabel(plan.tier)}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-zinc-500">
            <Calendar className="w-3.5 h-3.5" />
            {plan.createdAt
              ? format(new Date(plan.createdAt), "dd/MM/yyyy", { locale: vi })
              : "N/A"}
          </div>
        </div>

        {/* --- BODY 1: Thông tin Gói & Giá bán --- */}
        <div className="relative z-10 space-y-4 mb-8">
          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors tracking-tight leading-none mb-3 capitalize">
              {plan.name}
            </h4>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge
                variant="outline"
                className="bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-300 text-xs font-semibold px-2.5 py-1 rounded-md"
              >
                {getCycleLabel(plan.billingCycle)}
                {plan.durationDays ? ` (${plan.durationDays} Ngày)` : ""}
              </Badge>
              {plan.badgeText && (
                <Badge
                  style={{
                    backgroundColor: plan.badgeColor
                      ? `${plan.badgeColor}15`
                      : "rgba(255,255,255,0.05)",
                    color: plan.badgeColor || "#94a3b8",
                    borderColor: plan.badgeColor
                      ? `${plan.badgeColor}30`
                      : "rgba(255,255,255,0.1)",
                  }}
                  className="text-xs font-semibold px-2.5 py-1 rounded-md border shadow-sm whitespace-nowrap"
                >
                  {plan.badgeText}
                </Badge>
              )}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-white/5">
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              {plan.price === 0 ? "Miễn phí" : formattedPrice}
              {plan.price > 0 && (
                <span className="text-sm font-bold text-slate-400 dark:text-zinc-500 ml-1.5 uppercase tracking-widest">
                  {plan.currency}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* --- BODY 2: Danh sách Tính năng đặc quyền --- */}
        <div className="flex-1 space-y-3.5 mb-10">
          {plan.features.map((feature, idx) => {
            const cleanFeature = feature.replace(/^-/, "").trim();
            return (
              <div
                key={idx}
                className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-zinc-200 transition-colors"
              >
                <div className="mt-0.5 p-0.5 flex-shrink-0 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-500/20">
                  <Check className="h-3.5 w-3.5 stroke-[3px]" />
                </div>
                <span className="leading-relaxed">{cleanFeature}</span>
              </div>
            );
          })}
        </div>

        {/* --- FOOTER: Users Stats & Hành động --- */}
        <div className="relative z-10 pt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between mt-auto">
          {/* Cột Trái: Thống kê học viên */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> Học viên
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-700 dark:text-zinc-200 leading-none">
                {plan.totalSubscribers}{" "}
                <span className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  tổng
                </span>
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-1.5">
                {plan.activeSubscribers} đang active
              </span>
            </div>
          </div>

          {/* Cột Phải: Các nút thao tác */}
          <div className="flex items-center gap-3">
            {plan.isActive && (
              <Button
                variant="ghost"
                size="icon"
                disabled={isDeleting}
                onClick={() => setIsDeleteModalOpen(true)} // Mở modal thay vì gọi API trực tiếp
                className="h-10 w-10 rounded-xl text-slate-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
                title="Xóa gói"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            )}

            {plan.totalSubscribers === 0 ? (
              <Button
                variant="outline"
                onClick={() => setIsEditOpen(true)}
                className="h-10 px-4 gap-2 rounded-xl border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-800 hover:bg-slate-900 dark:hover:bg-white text-slate-900 dark:text-white hover:text-white dark:hover:text-black font-semibold text-sm transition-all shadow-sm active:scale-95"
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex flex-col items-end justify-center px-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 leading-tight">
                  Đã có học viên
                </span>
                <span className="text-[9px] font-semibold text-red-400/80 uppercase tracking-wider mt-0.5">
                  (Khóa chỉnh sửa)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditPlanDialog
        plan={plan}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* Gọi ConfirmDialog ở đây */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Xóa gói dịch vụ"
        description={
          <>
            Bạn có chắc chắn muốn xóa vĩnh viễn gói{" "}
            <strong className="text-slate-900 dark:text-white">
              {plan.name}
            </strong>{" "}
            không? Hành động này không thể hoàn tác.
          </>
        }
        confirmText="Xóa vĩnh viễn"
        cancelText="Hủy"
        isDestructive={true}
      />
    </>
  );
}
