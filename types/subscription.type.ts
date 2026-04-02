// src/types/subscription.type.ts

// Định nghĩa Subscription Plan từ database
export interface SubscriptionPlanDto {
  id: string;
  name: string;
  tier: string; // "Premium", "Free", etc.
  price: number; // decimal từ DB
  currency: string; // "VND"
  billingCycle: string; // "Monthly", "Lifetime", "Yearly"
  durationDays: number | null;
  features: string[]; // JSON array từ DB
  limits?: string | null;
  badgeText?: string | null;
  badgeColor?: string | null;
  isActive?: boolean; // Optional - BE có thể không trả về nếu đã filter
  createdAt?: string; // timestamptz
  updatedAt?: string | null;
}

// Response từ GET /api/subscription-plans
export interface GetPlansResponse {
  totalPlans: number;
  totalSubscribers: number;
  activeSubscribers: number;
  totalRevenue: number;
  plans: SubscriptionPlanDto[];
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
  tier: number; // Luôn gửi số
  price: number;
  currency: string;
  billingCycle: number;
  durationDays: number | null;
  features: string[];
  badgeText?: string;
  badgeColor?: string;
  isActive: boolean;
}
