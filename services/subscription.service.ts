// src/services/subscription.service.ts
import axiosClient, { publicAxiosClient } from "@/lib/axios-client";
import {
  CreatePlanRequest,
  GetPlansResponse,
  UserSubscriptionDto,
  SubscriptionPlanDto,
} from "@/types/subscription.type";

export const subscriptionService = {
  // 1. GET ALL
  getPlans: async (): Promise<GetPlansResponse> => {
    const response = await axiosClient.get("/admin/subscription-plans");
    // Response đã được bóc .data bởi interceptor
    return response as unknown as GetPlansResponse;
  },

  // 2. CREATE NEW (Thêm mới dựa trên ảnh POST /api/admin/subscription-plans)
  createPlan: async (data: CreatePlanRequest) => {
    const response = await axiosClient.post("/admin/subscription-plans", data);
    return response.data;
  },

  // 3. UPDATE PLAN (PUT /api/admin/subscription-plans/{id})
  updatePlan: async (id: string, data: CreatePlanRequest) => {
    const response = await axiosClient.put(
      `/admin/subscription-plans/${id}`,
      data,
    );
    return response.data;
  },

  // 4. DELETE PLAN (DELETE /api/admin/subscription-plans/{id})
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
    const data = (response as any);
    
    // Nếu response có property "plans"
    if (data && typeof data === 'object' && 'plans' in data) {
      return data.plans;
    }
    
    // Nếu response là array trực tiếp
    if (Array.isArray(data)) {
      return data;
    }
    
    // Fallback: trả về empty array
    return [];
  },

  // 6. GET CURRENT USER'S SUBSCRIPTION
  getMySubscription: async (): Promise<UserSubscriptionDto | null> => {
    try {
      const response = await axiosClient.get("/subscription-plans/my-subscription");
      // Response đã được bóc .data bởi interceptor
      return response as unknown as UserSubscriptionDto;
    } catch (error: any) {
      // Nếu user chưa có subscription (404 hoặc 401), trả về null thay vì throw error
      if (error?.response?.status === 404 || error?.response?.status === 401) {
        return null;
      }
      
      throw error;
    }
  },
};
