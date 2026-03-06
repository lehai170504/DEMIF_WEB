import { SubscriptionPlanDto } from "@/types/subscription.type";
import { PlanCard } from "./plan-card";
import { LayoutGrid } from "lucide-react";

interface PlanListProps {
  plans: SubscriptionPlanDto[];
}

export function PlanList({ plans }: PlanListProps) {
  return (
    <section className="px-2 font-mono mt-12">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500 rounded-xl shadow-md shadow-orange-500/20">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Danh sách gói dịch vụ
          </h3>
        </div>
        <div className="bg-slate-100 px-4 py-1.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-600">
            Tổng cộng:{" "}
            <span className="text-orange-600 font-bold">{plans.length}</span>{" "}
            gói
          </span>
        </div>
      </div>

      {plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-[2rem]">
          <p className="text-slate-500 font-medium">
            Chưa có gói dịch vụ nào được tạo.
          </p>
        </div>
      )}
    </section>
  );
}
