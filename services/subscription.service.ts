// src/services/subscription.service.ts
import axiosClient from "@/lib/axios-client";
import { CreatePlanRequest, GetPlansResponse } from "@/types/subscription.type";

export const subscriptionService = {
  // 1. GET ALL
  getPlans: async (): Promise<GetPlansResponse> => {
    const response = await axiosClient.get("/admin/subscription-plans");
    return (response as any).data ?? response;
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
};
