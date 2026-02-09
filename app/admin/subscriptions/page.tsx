"use client";

import * as React from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscriptionPlans } from "@/hooks/use-subscription";
import { SubscriptionHeader } from "@/components/admin/subscriptions/subscription-header";
import { SubscriptionStats } from "@/components/admin/subscriptions/subscription-stats";
import { PlanList } from "@/components/admin/subscriptions/plan-list";

import { CreatePlanDialog } from "@/components/admin/subscriptions/create-plan-dialog";

export default function AdminSubscriptionPage() {
  const { data, isLoading, isError, refetch } = useSubscriptionPlans();

  // --- TRẠNG THÁI LOADING ---
  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-zinc-500 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-xs uppercase tracking-widest">
          Đang tải dữ liệu gói dịch vụ...
        </p>
      </div>
    );
  }

  // --- TRẠNG THÁI ERROR ---
  if (isError || !data) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-zinc-500 font-mono">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p>Không thể tải dữ liệu từ máy chủ.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Thử lại
        </Button>
      </div>
    );
  }

  // --- GIAO DIỆN CHÍNH ---
  return (
    <div className="w-full space-y-10 pb-10 font-mono text-zinc-100 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-8 px-2 pt-4">
        <div className="flex justify-between items-start">
          <SubscriptionHeader />
          <CreatePlanDialog />
        </div>

        <SubscriptionStats
          totalPlans={data?.totalPlans || 0}
          totalSubscribers={data?.totalSubscribers || 0}
          activeSubscribers={data?.activeSubscribers || 0}
          totalRevenue={data?.totalRevenue || 0}
        />
      </div>

      {/* 2. Plan List Section (Thêm check data) */}
      <PlanList plans={data?.plans || []} />

      {/* 3. Footer */}
      <footer className="pt-8 text-center border-t border-white/5 mt-10">
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.5em]">
          Demif Subscription Engine v1.0
        </p>
      </footer>
    </div>
  );
}
