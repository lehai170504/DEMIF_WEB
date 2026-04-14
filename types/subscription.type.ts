// src/types/subscription.type.ts

export interface SubscriptionPlanDto {
  id: string;
  name: string;
  tier: string;
  price: number;
  currency: string;
  billingCycle: string;
  durationDays: number | null;
  features: string[];
  badgeText: string | null;
  badgeColor: string | null;
  isActive: boolean;
  totalSubscribers: number;
  activeSubscribers: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetPlansResponse {
  totalPlans: number;
  totalSubscribers: number;
  activeSubscribers: number;
  totalRevenue: number;
  plans: SubscriptionPlanDto[];
}

export interface SubscriptionStatsResponse {
  totalPlans: number;
  totalSubscribers: number;
  activeSubscribers: number;
  totalRevenue: number;
}
// User's active subscription
export interface UserSubscriptionDto {
  id: string;
  userId: string;
  planId: string;
  plan?: SubscriptionPlanDto;
  startDate: string;
  endDate: string | null;
  autoRenew: boolean;
  status: string; // "Active", "Expired", "Cancelled"
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string | null;
}

// Admin only - Payload gửi lên BE khi Tạo/Sửa
export interface CreatePlanRequest {
  name: string;
  price: number;
  currency: string;
  billingCycle: string;
  features: string[];
  badgeText: string | null;
  badgeColor: string | null;
  isActive: boolean;
}

export interface AdminSubscriptionPayload {
  userId?: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired" | "Cancelled" | "PendingPayment";
  autoRenew: boolean;
}
