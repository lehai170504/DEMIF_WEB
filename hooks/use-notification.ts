import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";
import { BroadcastNotificationPayload } from "@/types/notification.type";

// Lấy danh sách Inbox
export const useNotifications = (page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: ["notifications", page, pageSize],
    queryFn: () => notificationService.getMyNotifications(page, pageSize),
  });
};

// Lấy số lượng chưa đọc (Dùng cho cái chuông ở Header)
export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: () => notificationService.getUnreadCount(),
    refetchInterval: 60000, // Tự động refetch mỗi 1 phút để cập nhật chuông
  });
};

// Đánh dấu 1 thông báo là đã đọc
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      // Làm mới list và chuông đếm
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    },
  });
};

// Đánh dấu TẤT CẢ là đã đọc
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    },
  });
};

// Admin: Gửi Broadcast
export const useBroadcastNotification = () => {
  return useMutation({
    mutationFn: (payload: BroadcastNotificationPayload) =>
      notificationService.broadcast(payload),
  });
};
