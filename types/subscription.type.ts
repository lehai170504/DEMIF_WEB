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
  badgeText?: string;
  badgeColor?: string;
  isActive: boolean;
  totalSubscribers: number;
  activeSubscribers: number;
  createdAt: string;
  updatedAt: string | null;
}

// Payload gửi lên BE khi Tạo/Sửa
export interface CreatePlanRequest {
  name: string;
  tier: string;
  price: number;
  currency: string;
  billingCycle: string;
  durationDays: number | null;
  features: string[];
  badgeText?: string;
  badgeColor?: string;
  isActive: boolean;
}

export interface GetPlansResponse {
  totalPlans: number;
  totalSubscribers: number;
  activeSubscribers: number;
  totalRevenue: number;
  plans: SubscriptionPlanDto[];
}
