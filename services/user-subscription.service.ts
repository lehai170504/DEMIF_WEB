import axiosClient from "@/lib/axios-client";
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
};
