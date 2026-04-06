import { useQuery } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";

export const useSubscriptionStats = () => {
  return useQuery({
    queryKey: ["subscription-stats"],
    queryFn: () => subscriptionService.getSubscriptionStats(),
    staleTime: 60 * 1000,
  });
};
