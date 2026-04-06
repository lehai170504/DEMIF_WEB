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
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-400 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-sm font-medium">Đang tải dữ liệu gói dịch vụ...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 font-mono bg-slate-50/50">
        <AlertCircle className="h-10 w-10 text-red-500 opacity-80" />
        <p className="font-semibold text-sm">
          Không thể kết nối dữ liệu từ máy chủ.
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 mt-2"
        >
          Thử tải lại
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-10 pb-10 px-4 sm:px-8 lg:px-12 font-mono text-slate-900 animate-in fade-in duration-500 relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10">
        <div className="flex flex-col gap-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <SubscriptionHeader />
            <CreatePlanDialog />
          </div>

          <SubscriptionStats />
        </div>

        <PlanList plans={data?.plans || []} />

        <footer className="pt-8 text-center border-t border-slate-200 mt-10">
          <p className="text-sm font-medium text-slate-400">
            Hệ thống quản lý dịch vụ v1.0 • Demif Studio
          </p>
        </footer>
      </div>
    </div>
  );
}
