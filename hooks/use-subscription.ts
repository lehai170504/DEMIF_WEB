// src/hooks/use-subscription.ts
import { useQuery } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["admin-subscription-plans"],
    queryFn: () => subscriptionService.getPlans(),
    staleTime: 1000 * 60 * 5, // Cache 5 phút
    retry: 1,
  });
};
