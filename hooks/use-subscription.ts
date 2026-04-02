// src/hooks/use-subscription.ts
import { useQuery } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import Cookies from "js-cookie";

// ============ ADMIN HOOKS ============
// Get all plans with statistics (Admin only)
export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["admin-subscription-plans"],
    queryFn: () => subscriptionService.getPlans(),
    staleTime: 1000 * 60 * 5, // Cache 5 phút
    retry: 1,
  });
};

// ============ USER HOOKS ============
// Get all active plans (Public - for users to browse)
export const useActivePlans = () => {
  return useQuery({
    queryKey: ["active-subscription-plans"],
    queryFn: () => subscriptionService.getActivePlans(),
    staleTime: 1000 * 60 * 10, // Cache 10 phút
    retry: 2,
    retryDelay: 1000,
  });
};

// Get current user's active subscription (Requires authentication)
export const useMySubscription = () => {
  // Chỉ fetch khi có accessToken
  const hasToken = typeof window !== "undefined" ? !!Cookies.get("accessToken") : false;

  return useQuery({
    queryKey: ["my-subscription"],
    queryFn: () => subscriptionService.getMySubscription(),
    staleTime: 1000 * 60 * 2, // Cache 2 phút
    retry: 0, // Không retry để tránh trigger logout nhiều lần
    enabled: hasToken, // Chỉ fetch khi user đã login
    refetchOnWindowFocus: false, // Không tự động refetch khi focus window
  });
};
