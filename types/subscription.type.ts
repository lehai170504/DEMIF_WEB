// src/types/subscription.type.ts

// 1. Định nghĩa các giá trị Enum (nên để dạng số để khớp với Request BE)
export type SubscriptionTier = 0 | 1 | 2; // 0: Basic, 1: Premium, 2: Enterprise
export type BillingCycle = 0 | 1 | 2; // 0: Monthly, 1: Yearly, 2: Lifetime

export interface SubscriptionPlanDto {
  id: string;
  name: string;
  // DTO từ BE thường trả về số hoặc string enum,
  // nếu BE trả về số thì dùng SubscriptionTier, nếu trả về chữ thì dùng string
  tier: string | number;
  price: number;
  currency: string;
  billingCycle: string | number;
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

// 2. Payload gửi lên BE khi Tạo/Sửa (Đã fix lỗi number | null)
export interface CreatePlanRequest {
  name: string;
  tier: number; // Luôn gửi số
  price: number;
  currency: string;
  billingCycle: number; // Luôn gửi số
  durationDays: number | null; // Chỉ nhận number hoặc null, không nhận undefined
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
