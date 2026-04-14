import axiosClient from "@/lib/axios-client";
import { AdminSubscriptionPayload } from "@/types/subscription.type";
import {
  CancelSubscriptionDto,
  ExtendSubscriptionDto,
  GetUserSubscriptionsParams,
  PaginatedUserSubscriptionsResponse,
  UserSubscriptionDetailDto,
} from "@/types/user-subscription.type";

export const userSubscriptionService = {
  getSubscriptions: async (
    params: GetUserSubscriptionsParams,
  ): Promise<PaginatedUserSubscriptionsResponse> => {
    const response = await axiosClient.get("/admin/user-subscriptions", {
      params,
    });
    return response as unknown as PaginatedUserSubscriptionsResponse;
  },

  getSubscriptionById: async (
    id: string,
  ): Promise<UserSubscriptionDetailDto> => {
    const response = await axiosClient.get(`/admin/user-subscriptions/${id}`);
    return response as unknown as UserSubscriptionDetailDto;
  },

  // Hủy gói
  cancelSubscription: async (id: string, data: CancelSubscriptionDto) => {
    const response = await axiosClient.patch(
      `/admin/user-subscriptions/${id}/cancel`,
      data,
    );
    return response;
  },

  // Gia hạn gói
  extendSubscription: async (id: string, data: ExtendSubscriptionDto) => {
    const response = await axiosClient.patch(
      `/admin/user-subscriptions/${id}/extend`,
      data,
    );
    return response;
  },

  createSubscription: async (data: AdminSubscriptionPayload) => {
    try {
      const response = await axiosClient.post(
        "/admin/user-subscriptions",
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Error createSubscription:", error);
      throw error;
    }
  },

  // 2. Cập nhật gói thuê bao (PUT)
  updateSubscription: async (id: string, data: AdminSubscriptionPayload) => {
    try {
      const response = await axiosClient.put(
        `/admin/user-subscriptions/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Error updateSubscription:", error);
      throw error;
    }
  },
};
