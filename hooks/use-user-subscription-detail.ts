import { useQuery } from "@tanstack/react-query";
import { userSubscriptionService } from "@/services/user-subscription.service";

export const useUserSubscriptionDetail = (id: string) => {
  return useQuery({
    queryKey: ["user-subscription-detail", id],
    queryFn: () => userSubscriptionService.getSubscriptionById(id),
    enabled: !!id,
  });
};
