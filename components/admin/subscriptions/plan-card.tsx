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
  Edit2,
  Trash2,
  Loader2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { EditPlanDialog } from "./edit-plan-dialog";
import { useManagePlan } from "@/hooks/use-manage-plan";

interface PlanCardProps {
  plan: SubscriptionPlanDto;
}

// FIX: Helper nhận diện Tier dựa trên string từ SubscriptionPlanDto
const getTierLabel = (tier: string) => {
  return tier || "N/A";
};

// FIX: Helper nhận diện BillingCycle dựa trên string từ SubscriptionPlanDto
const getCycleLabel = (cycle: string) => {
  switch (cycle) {
    case "Monthly":
      return "Hàng Tháng";
    case "Yearly":
      return "Hàng Năm";
    case "Lifetime":
      return "Vĩnh Viễn";
    default:
      return cycle;
  }
};

export function PlanCard({ plan }: PlanCardProps) {
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const { deletePlan, isDeleting } = useManagePlan();

  const formattedPrice = new Intl.NumberFormat("vi-VN").format(plan.price);

  const handleDelete = () => {
    if (
      confirm(
        `Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa gói "${plan.name}"?`,
      )
    ) {
      deletePlan(plan.id);
    }
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col bg-white border border-gray-200 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden font-mono",
          plan.isActive === false && "opacity-60 grayscale",
        )}
      >
        {/* Hiệu ứng trang trí nền */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[40px] rounded-full pointer-events-none transition-colors group-hover:bg-orange-500/10" />

        {/* Cấu trúc Header: Trạng thái & Tier */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex gap-2">
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-tighter transition-all",
                plan.isActive
                  ? "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm"
                  : "bg-gray-100 border-gray-200 text-gray-400",
              )}
            >
              <Power className="h-3 w-3" />
              {plan.isActive ? "Đang Hoạt Động" : "Đã Tạm Dừng"}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-100 bg-gray-50 text-gray-500 text-[9px] font-black uppercase tracking-tighter">
              <Layers className="h-3 w-3 text-gray-400" />
              {getTierLabel(plan.tier)}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 italic">
            <Calendar className="w-3 h-3 opacity-50" />
            {plan.createdAt
              ? format(new Date(plan.createdAt), "dd/MM/yyyy", { locale: vi })
              : "N/A"}
          </div>
        </div>

        {/* Thông tin Gói & Giá bán */}
        <div className="relative z-10 space-y-4 mb-8">
          <div>
            <h4 className="text-2xl font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase italic tracking-tighter leading-none mb-3">
              {plan.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-gray-50 border-gray-200 text-gray-500 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg"
              >
                {getCycleLabel(plan.billingCycle)}
                {plan.durationDays && ` (${plan.durationDays} Ngày)`}
              </Badge>
              {plan.badgeText && (
                <Badge
                  style={{
                    backgroundColor: plan.badgeColor
                      ? `${plan.badgeColor}15`
                      : "#f3f4f6",
                    color: plan.badgeColor || "#6b7280",
                    borderColor: plan.badgeColor
                      ? `${plan.badgeColor}30`
                      : "#e5e7eb",
                  }}
                  className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border shadow-sm"
                >
                  {plan.badgeText}
                </Badge>
              )}
            </div>
          </div>
          <div className="pt-2 border-t border-gray-50">
            <p className="text-3xl font-black text-gray-900 tracking-tighter">
              {formattedPrice}
              <span className="text-xs font-bold text-gray-400 uppercase ml-2 italic tracking-widest">
                {plan.currency}
              </span>
            </p>
          </div>
        </div>

        {/* Danh sách Tính năng đặc quyền */}
        <div className="flex-1 space-y-4 mb-10">
          {plan.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors"
            >
              <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100/50">
                <Check className="h-3 w-3 stroke-[3.5px]" />
              </div>
              <span className="leading-tight uppercase text-[11px] font-bold tracking-tight">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Footer: Metadata & Hành động */}
        <div className="relative z-10 pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div className="space-y-1">
            <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <AlertCircle className="h-3 w-3" /> Giới hạn
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[11px] font-bold text-gray-600 leading-none">
                {plan.limits || "Không giới hạn"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={isDeleting}
              onClick={handleDelete}
              className="h-10 w-10 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
            >
              {isDeleting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Trash2 className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsEditOpen(true)}
              className="h-10 px-5 gap-2 rounded-2xl border-gray-200 bg-white hover:bg-gray-900 hover:text-white text-gray-900 font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-sm active:scale-95"
            >
              <Edit2 className="h-3 w-3 stroke-[3px]" />
              Sửa
            </Button>
          </div>
        </div>
      </div>

      <EditPlanDialog
        plan={plan}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
