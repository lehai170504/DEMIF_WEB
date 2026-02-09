import { SubscriptionPlanDto } from "@/types/subscription.type";
import { PlanCard } from "./plan-card";

interface PlanListProps {
  plans: SubscriptionPlanDto[];
}

export function PlanList({ plans }: PlanListProps) {
  return (
    <section className="px-2">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
          Danh sách gói dịch vụ
        </h3>
        <span className="text-xs text-zinc-500 font-bold bg-white/5 px-2 py-1 rounded-md">
          Total: {plans.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}
