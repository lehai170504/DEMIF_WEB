"use client"; // Client component để dùng state

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
  Users,
  Edit2,
  Trash2,
  Loader2,
} from "lucide-react";
import { EditPlanDialog } from "./edit-plan-dialog";
import { useManagePlan } from "@/hooks/use-manage-plan";

interface PlanCardProps {
  plan: SubscriptionPlanDto;
}

export function PlanCard({ plan }: PlanCardProps) {
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const { deletePlan, isDeleting } = useManagePlan(); // Hook xóa

  const formattedPrice = new Intl.NumberFormat("vi-VN").format(plan.price);

  const handleDelete = () => {
    if (confirm(`Bạn có chắc muốn xóa gói "${plan.name}" không?`)) {
      deletePlan(plan.id);
    }
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col bg-[#18181b] border border-white/10 rounded-[2rem] p-6 transition-all duration-300 hover:shadow-2xl overflow-hidden",
          plan.isActive
            ? "hover:border-orange-500/30 hover:shadow-orange-500/5"
            : "opacity-75 grayscale hover:grayscale-0 hover:opacity-100",
        )}
      >
        {/* ... (Phần Background & Header giữ nguyên) ... */}
        {/* Background Glow */}
        <div
          className={cn(
            "absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full pointer-events-none transition-colors",
            plan.isActive
              ? "bg-white/5 group-hover:bg-orange-500/10"
              : "bg-transparent",
          )}
        />

        {/* Header Info: Active Status & Date */}
        <div className="flex items-center justify-between mb-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-full border",
                plan.isActive
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  : "bg-zinc-500/10 border-zinc-500/20 text-zinc-500",
              )}
            >
              <Power className="h-3 w-3" />
              {plan.isActive ? "Active" : "Inactive"}
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-400">
              <Layers className="h-3 w-3" />
              {plan.tier}
            </div>
          </div>
          <span title="Ngày tạo">
            {format(new Date(plan.createdAt), "dd/MM/yyyy", { locale: vi })}
          </span>
        </div>

        {/* Plan Name & Price */}
        <div className="relative z-10 flex justify-between items-start mb-4">
          <div>
            <h4 className="text-xl font-black text-white mb-1 group-hover:text-orange-500 transition-colors">
              {plan.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-white/5 border-white/10 text-zinc-400 text-[10px] uppercase tracking-wider"
              >
                {plan.billingCycle}
                {plan.durationDays && (
                  <span className="ml-1 opacity-50">
                    ({plan.durationDays}d)
                  </span>
                )}
              </Badge>
              {plan.badgeText && (
                <Badge
                  style={{
                    backgroundColor: `${plan.badgeColor}20`,
                    color: plan.badgeColor,
                    borderColor: `${plan.badgeColor}40`,
                  }}
                  className="border text-[10px] uppercase font-bold tracking-wider"
                >
                  {plan.badgeText}
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-white tracking-tight">
              {formattedPrice}
              <span className="text-xs text-zinc-500 font-medium ml-1 align-top relative top-1">
                {plan.currency}
              </span>
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="flex-1 space-y-3 my-6">
          {plan.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors"
            >
              <div className="mt-0.5 p-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                <Check className="h-3 w-3" />
              </div>
              <span className="leading-tight">{feature}</span>
            </div>
          ))}
        </div>

        {/* === UPDATED FOOTER: Edit & Delete Buttons === */}
        <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <Users className="h-3 w-3" /> Subscribers
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-white">
                {plan.activeSubscribers}
              </span>
              <span className="text-xs font-medium text-zinc-500">
                / {plan.totalSubscribers}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {/* Nút Xóa */}
            <Button
              variant="ghost"
              size="icon"
              disabled={isDeleting}
              onClick={handleDelete}
              className="h-9 w-9 rounded-xl text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>

            {/* Nút Sửa (Mở Modal) */}
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(true)}
              className="h-9 gap-2 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-zinc-400 font-bold text-xs"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* MODAL EDIT */}
      <EditPlanDialog
        plan={plan}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
