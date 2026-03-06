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

const getTierLabel = (tier: string) => {
  return tier || "N/A";
};

const getCycleLabel = (cycle: string) => {
  switch (cycle) {
    case "Monthly":
      return "Hàng tháng";
    case "Yearly":
      return "Hàng năm";
    case "Lifetime":
      return "Vĩnh viễn";
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
          "group relative flex flex-col bg-white border border-slate-200 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden font-mono",
          plan.isActive === false && "opacity-75 grayscale-[50%]",
        )}
      >
        {/* Hiệu ứng trang trí nền */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[40px] rounded-full pointer-events-none transition-colors group-hover:bg-orange-500/10" />

        {/* Header: Trạng thái & Tier */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex gap-2">
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all",
                plan.isActive
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm"
                  : "bg-slate-100 border-slate-200 text-slate-500",
              )}
            >
              <Power className="h-3.5 w-3.5" />
              {plan.isActive ? "Hoạt động" : "Tạm dừng"}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold capitalize">
              <Layers className="h-3.5 w-3.5 text-slate-400" />
              {getTierLabel(plan.tier)}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {plan.createdAt
              ? format(new Date(plan.createdAt), "dd/MM/yyyy", { locale: vi })
              : "N/A"}
          </div>
        </div>

        {/* Thông tin Gói & Giá bán */}
        <div className="relative z-10 space-y-4 mb-8">
          <div>
            <h4 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight leading-none mb-3 capitalize">
              {plan.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-slate-50 border-slate-200 text-slate-600 text-xs font-semibold px-2.5 py-0.5 rounded-md"
              >
                {getCycleLabel(plan.billingCycle)}
                {plan.durationDays && ` (${plan.durationDays} Ngày)`}
              </Badge>
              {plan.badgeText && (
                <Badge
                  style={{
                    backgroundColor: plan.badgeColor
                      ? `${plan.badgeColor}15`
                      : "#f8fafc",
                    color: plan.badgeColor || "#475569",
                    borderColor: plan.badgeColor
                      ? `${plan.badgeColor}30`
                      : "#e2e8f0",
                  }}
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-md border shadow-sm"
                >
                  {plan.badgeText}
                </Badge>
              )}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100">
            <p className="text-3xl font-bold text-slate-900 tracking-tight">
              {formattedPrice}
              <span className="text-sm font-semibold text-slate-400 ml-1.5 uppercase">
                {plan.currency}
              </span>
            </p>
          </div>
        </div>

        {/* Danh sách Tính năng đặc quyền */}
        <div className="flex-1 space-y-3 mb-10">
          {plan.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors"
            >
              <div className="mt-0.5 p-0.5 flex-shrink-0 rounded-full bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100">
                <Check className="h-3.5 w-3.5 stroke-[3px]" />
              </div>
              <span className="leading-snug">{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer: Metadata & Hành động */}
        <div className="relative z-10 pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" /> Giới hạn
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold text-slate-700 leading-none">
                {plan.limits || "Không giới hạn"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={isDeleting}
              onClick={handleDelete}
              className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all hover:border-red-200 border border-transparent"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsEditOpen(true)}
              className="h-10 px-5 gap-2 rounded-xl border-slate-200 bg-white hover:bg-slate-900 hover:text-white text-slate-900 font-semibold text-sm transition-all shadow-sm active:scale-95"
            >
              <Edit2 className="h-4 w-4" />
              Sửa gói
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
