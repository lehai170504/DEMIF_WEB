export interface UserSubscriptionDto {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  planId: string;
  planName: string;
  tier: string;
  status: "Active" | "Expired" | "Cancelled" | "PendingPayment";
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  createdAt: string;
}

export interface PaginatedUserSubscriptionsResponse {
  items: UserSubscriptionDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GetUserSubscriptionsParams {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}

export interface PaymentDto {
  id: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: "Pending" | "Completed" | "Failed" | "Refunded" | string;
  transactionId: string;
  completedAt: string | null;
  createdAt: string;
}

export interface UserSubscriptionDetailDto {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  planId: string;
  planName: string;
  tier: string;
  planPrice: number;
  currency: string;
  status: "Active" | "Expired" | "Cancelled" | "PendingPayment" | string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
  payments: PaymentDto[];
}

export interface CancelSubscriptionDto {
  reason: string;
}

export interface ExtendSubscriptionDto {
  days: number;
  note: string;
}
