export interface BroadcastNotificationPayload {
  title: string;
  message: string;
  actionUrl?: string;
}

export interface BroadcastNotificationResponse {
  notificationId: string;
  title: string;
  message: string;
  actionUrl: string | null;
  audience: string;
  channel: string;
  eligibleUserCount: number;
  sentCount: number;
  failedCount: number;
  summary: string;
}

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  actionUrl: string | null;
  channel: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface GetNotificationsResponse {
  items: NotificationItem[];
  totalCount: number;
  unreadCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
