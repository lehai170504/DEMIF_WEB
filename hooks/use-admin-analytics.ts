import { useQuery } from "@tanstack/react-query";
import { getAdminAnalytics } from "@/services/payment.service";
import { AdminAnalyticsResponse } from "@/types/analytics.type";

export const useAdminAnalytics = () => {
  return useQuery<AdminAnalyticsResponse>({
    queryKey: ["admin-analytics"],
    queryFn: getAdminAnalytics,
  });
};
