import { useQuery } from "@tanstack/react-query";
import { userSubscriptionService } from "@/services/user-subscription.service";
import { GetUserSubscriptionsParams } from "@/types/user-subscription.type";

export const useUserSubscriptions = (params: GetUserSubscriptionsParams) => {
  return useQuery({
    queryKey: ["user-subscriptions", params],
    queryFn: () => userSubscriptionService.getSubscriptions(params),
    placeholderData: (prev) => prev,
    staleTime: 60 * 1000,
  });
};
