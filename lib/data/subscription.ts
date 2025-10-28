// Mock data for subscription and payment history

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: "free" | "basic" | "premium" | "enterprise";
  price: number;
  currency: string;
  billingCycle: "monthly" | "yearly";
  features: string[];
  badge?: {
    text: string;
    color: string;
  };
}

export interface UserSubscription {
  currentPlan: SubscriptionPlan;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled" | "trial";
  autoRenew: boolean;
  nextBillingDate?: string;
}

export interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  currency: string;
  plan: string;
  status: "completed" | "pending" | "failed" | "refunded";
  paymentMethod: string;
  invoiceUrl?: string;
}

// Available subscription plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Gói Miễn phí",
    tier: "free",
    price: 0,
    currency: "VND",
    billingCycle: "monthly",
    features: [
      "5 bài học mỗi ngày",
      "Truy cập thư viện cơ bản",
      "Báo cáo tiến độ cơ bản",
      "Hỗ trợ qua email",
    ],
  },
  {
    id: "basic-monthly",
    name: "Gói Cơ bản",
    tier: "basic",
    price: 99000,
    currency: "VND",
    billingCycle: "monthly",
    features: [
      "20 bài học mỗi ngày",
      "Truy cập toàn bộ thư viện",
      "Báo cáo tiến độ chi tiết",
      "Không quảng cáo",
      "Hỗ trợ 24/7",
    ],
    badge: {
      text: "Phổ biến",
      color: "blue",
    },
  },
  {
    id: "basic-yearly",
    name: "Gói Cơ bản (Năm)",
    tier: "basic",
    price: 990000,
    currency: "VND",
    billingCycle: "yearly",
    features: [
      "20 bài học mỗi ngày",
      "Truy cập toàn bộ thư viện",
      "Báo cáo tiến độ chi tiết",
      "Không quảng cáo",
      "Hỗ trợ 24/7",
      "Tiết kiệm 17%",
    ],
    badge: {
      text: "Tiết kiệm nhất",
      color: "green",
    },
  },
  {
    id: "premium-monthly",
    name: "Gói Cao cấp",
    tier: "premium",
    price: 199000,
    currency: "VND",
    billingCycle: "monthly",
    features: [
      "Không giới hạn bài học",
      "Truy cập toàn bộ thư viện Premium",
      "Phân tích AI chi tiết",
      "Luyện tập với giáo viên ảo",
      "Tải nội dung offline",
      "Không quảng cáo",
      "Hỗ trợ ưu tiên 24/7",
    ],
    badge: {
      text: "Khuyên dùng",
      color: "orange",
    },
  },
  {
    id: "premium-yearly",
    name: "Gói Cao cấp (Năm)",
    tier: "premium",
    price: 1990000,
    currency: "VND",
    billingCycle: "yearly",
    features: [
      "Không giới hạn bài học",
      "Truy cập toàn bộ thư viện Premium",
      "Phân tích AI chi tiết",
      "Luyện tập với giáo viên ảo",
      "Tải nội dung offline",
      "Không quảng cáo",
      "Hỗ trợ ưu tiên 24/7",
      "Tiết kiệm 17%",
    ],
    badge: {
      text: "Giá trị tốt nhất",
      color: "purple",
    },
  },
];

// Mock current user subscription
export const mockUserSubscription: UserSubscription = {
  currentPlan: {
    id: "premium-monthly",
    name: "Gói Cao cấp",
    tier: "premium",
    price: 199000,
    currency: "VND",
    billingCycle: "monthly",
    features: [
      "Không giới hạn bài học",
      "Truy cập toàn bộ thư viện Premium",
      "Phân tích AI chi tiết",
      "Luyện tập với giáo viên ảo",
      "Tải nội dung offline",
      "Không quảng cáo",
      "Hỗ trợ ưu tiên 24/7",
    ],
    badge: {
      text: "Đang sử dụng",
      color: "orange",
    },
  },
  startDate: "2024-10-01",
  endDate: "2025-11-01",
  status: "active",
  autoRenew: true,
  nextBillingDate: "2025-11-01",
};

// Mock payment history
export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: "PAY-2024-10-001",
    date: "2024-10-01",
    amount: 199000,
    currency: "VND",
    plan: "Gói Cao cấp (Tháng)",
    status: "completed",
    paymentMethod: "MoMo",
    invoiceUrl: "/invoices/PAY-2024-10-001.pdf",
  },
  {
    id: "PAY-2024-09-001",
    date: "2024-09-01",
    amount: 199000,
    currency: "VND",
    plan: "Gói Cao cấp (Tháng)",
    status: "completed",
    paymentMethod: "ZaloPay",
    invoiceUrl: "/invoices/PAY-2024-09-001.pdf",
  },
  {
    id: "PAY-2024-08-001",
    date: "2024-08-01",
    amount: 199000,
    currency: "VND",
    plan: "Gói Cao cấp (Tháng)",
    status: "completed",
    paymentMethod: "Thẻ Visa",
    invoiceUrl: "/invoices/PAY-2024-08-001.pdf",
  },
  {
    id: "PAY-2024-07-001",
    date: "2024-07-01",
    amount: 99000,
    currency: "VND",
    plan: "Gói Cơ bản (Tháng)",
    status: "completed",
    paymentMethod: "MoMo",
    invoiceUrl: "/invoices/PAY-2024-07-001.pdf",
  },
  {
    id: "PAY-2024-06-001",
    date: "2024-06-01",
    amount: 99000,
    currency: "VND",
    plan: "Gói Cơ bản (Tháng)",
    status: "completed",
    paymentMethod: "ZaloPay",
    invoiceUrl: "/invoices/PAY-2024-06-001.pdf",
  },
  {
    id: "PAY-2024-05-001",
    date: "2024-05-01",
    amount: 99000,
    currency: "VND",
    plan: "Gói Cơ bản (Tháng)",
    status: "refunded",
    paymentMethod: "Thẻ Visa",
    invoiceUrl: "/invoices/PAY-2024-05-001.pdf",
  },
];

// Utility functions
export const formatCurrency = (
  amount: number,
  currency: string = "VND"
): string => {
  if (currency === "VND") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  return `${amount} ${currency}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "completed":
    case "active":
      return "green";
    case "pending":
    case "trial":
      return "yellow";
    case "failed":
    case "cancelled":
      return "red";
    case "refunded":
      return "gray";
    default:
      return "gray";
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case "completed":
      return "Thành công";
    case "pending":
      return "Đang xử lý";
    case "failed":
      return "Thất bại";
    case "refunded":
      return "Đã hoàn tiền";
    case "active":
      return "Đang hoạt động";
    case "expired":
      return "Đã hết hạn";
    case "cancelled":
      return "Đã hủy";
    case "trial":
      return "Dùng thử";
    default:
      return status;
  }
};
