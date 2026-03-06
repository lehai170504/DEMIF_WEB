import { SubscriptionPlanDto } from "@/types/subscription.type";
import { PlanCard } from "./plan-card";
import { LayoutGrid } from "lucide-react";

interface PlanListProps {
  plans: SubscriptionPlanDto[];
}

export function PlanList({ plans }: PlanListProps) {
  return (
    <section className="px-2 font-mono">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-gray-900">
            Danh Sách Gói Dịch Vụ
          </h3>
        </div>
        <div className="bg-gray-100 px-4 py-1.5 rounded-full border border-gray-200">
          <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
            Tổng Cộng: <span className="text-orange-600">{plans.length}</span>{" "}
            Gói
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}
