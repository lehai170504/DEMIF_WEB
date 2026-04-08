// src/services/subscription.service.ts
import axiosClient, { publicAxiosClient } from "@/lib/axios-client";
import {
  CreatePlanRequest,
  GetPlansResponse,
  UserSubscriptionDto,
  SubscriptionPlanDto,
  SubscriptionStatsResponse,
} from "@/types/subscription.type";

export const subscriptionService = {
  // 1. GET ALL
  getPlans: async (): Promise<GetPlansResponse> => {
    const response = await axiosClient.get("/admin/subscription-plans");
    return response as unknown as GetPlansResponse;
  },
  // Lấy thống kê hệ thống
  getSubscriptionStats: async (): Promise<SubscriptionStatsResponse> => {
    const response = await axiosClient.get("/admin/subscription-plans/stats");
    return response as unknown as SubscriptionStatsResponse;
  },

  // 2. CREATE NEW
  createPlan: async (data: CreatePlanRequest) => {
    const response = await axiosClient.post("/admin/subscription-plans", data);
    return response.data;
  },

  // 3. UPDATE PLAN
  updatePlan: async (id: string, data: CreatePlanRequest) => {
    const response = await axiosClient.put(
      `/admin/subscription-plans/${id}`,
      data,
    );
    return response.data;
  },

  // 4. DELETE PLAN
  deletePlan: async (id: string) => {
    const response = await axiosClient.delete(
      `/admin/subscription-plans/${id}`,
    );
    return response.data;
  },

  // ============ USER APIs ============
  // 5. GET ALL ACTIVE PLANS (Public - không cần authentication)
  getActivePlans: async (): Promise<SubscriptionPlanDto[]> => {
    const response = await publicAxiosClient.get("/subscription-plans");
    const data = response as any;

    if (!data) return [];

    // 1. Nếu là array trực tiếp
    if (Array.isArray(data)) return data;

    // 2. Nếu nằm trong data.plans
    if (data.plans && Array.isArray(data.plans)) return data.plans;

    // 3. Nếu nằm trong data.data.plans (do interceptor bóc tách không hết hoặc lồng nhau)
    if (data.data?.plans && Array.isArray(data.data.plans)) return data.data.plans;
    
    // 4. Nếu nằm trong data.data (array)
    if (data.data && Array.isArray(data.data)) return data.data;

    // 5. Nếu nằm trong data.items
    if (data.items && Array.isArray(data.items)) return data.items;

    return [];
  },

  // 6. GET CURRENT USER'S SUBSCRIPTION
  getMySubscription: async (): Promise<any | null> => {
    try {
      const response = await axiosClient.get("/me/subscription");
      const result = response as any;
      if (result && result.hasActiveSubscription && result.subscription) {
        return result.subscription;
      }
      return null;
    } catch (error: any) {
      // Nếu user chưa có subscription (404), trả về null thay vì throw error
      if (error?.response?.status === 404) {
        return null;
      }

      throw error;
    }
  },
};
