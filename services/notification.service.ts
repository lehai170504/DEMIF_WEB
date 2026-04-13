import axiosClient from "@/lib/axios-client";
import Cookies from "js-cookie";
import {
  BroadcastNotificationPayload,
  BroadcastNotificationResponse,
  GetNotificationsResponse,
} from "@/types/notification.type";

const getAuthHeaders = () => {
  const token = Cookies.get("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const notificationService = {
  // ================= ADMIN =================
  broadcast: async (
    payload: BroadcastNotificationPayload,
  ): Promise<BroadcastNotificationResponse> => {
    const response = await axiosClient.post(
      "/admin/notifications/broadcast",
      payload,
      {
        headers: getAuthHeaders(),
      },
    );
    return response as unknown as BroadcastNotificationResponse;
  },

  // ================= USER =================
  getMyNotifications: async (
    page = 1,
    pageSize = 20,
  ): Promise<GetNotificationsResponse> => {
    const response = await axiosClient.get("/me/notifications", {
      params: { page, pageSize },
      headers: getAuthHeaders(),
    });
    return response as unknown as GetNotificationsResponse;
  },

  getUnreadCount: async (): Promise<{ unreadCount: number }> => {
    const response = await axiosClient.get("/me/notifications/unread-count", {
      headers: getAuthHeaders(),
    });
    return response as unknown as { unreadCount: number };
  },

  markAsRead: async (id: string): Promise<any> => {
    const response = await axiosClient.patch(
      `/me/notifications/${id}/read`,
      {},
      {
        headers: getAuthHeaders(),
      },
    );
    return response;
  },

  markAllAsRead: async (): Promise<{ updatedCount: number }> => {
    const response = await axiosClient.post(
      "/me/notifications/read-all",
      {},
      {
        headers: getAuthHeaders(),
      },
    );
    return response as unknown as { updatedCount: number };
  },
};
