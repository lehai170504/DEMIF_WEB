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

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-gray-400 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-xs uppercase tracking-widest font-bold">
          Đang tải dữ liệu gói dịch vụ...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-gray-500 font-mono">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="font-bold">Không thể kết nối dữ liệu từ máy chủ.</p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="rounded-xl border-gray-200"
        >
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10 pb-10 font-mono text-gray-900 animate-in fade-in duration-500 relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10">
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

        <PlanList plans={data?.plans || []} />

        <footer className="pt-8 text-center border-t border-gray-100 mt-10">
          <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.5em]">
            Demif Subscription Engine v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}
