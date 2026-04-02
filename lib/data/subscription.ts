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
    id: "monthly",
    name: "Hàng tháng",
    tier: "basic",
    price: 39000,
    currency: "VND",
    billingCycle: "monthly",
    features: [
      "Bài tập chính tả không giới hạn",
      "Luyện tập shadowing không giới hạn",
      "Phản hồi được hỗ trợ bởi AI",
      "Theo dõi & phân tích tiến độ",
      "Truy cập ứng dụng di động",
    ],
  },
  {
    id: "yearly",
    name: "Hàng năm",
    tier: "premium",
    price: 350000,
    currency: "VND",
    billingCycle: "yearly",
    features: [
      "Mọi thứ trong gói Hàng tháng",
      "Xử lý AI ưu tiên",
      "Bảng điều khiển phân tích nâng cao",
      "Thư viện nội dung độc quyền",
      "Hỗ trợ qua email",
    ],
    badge: {
      text: "Phổ biến nhất",
      color: "orange",
    },
  },
  {
    id: "lifetime",
    name: "Trọn đời",
    tier: "enterprise",
    price: 3500000,
    currency: "VND",
    billingCycle: "monthly",
    features: [
      "Mọi thứ trong gói Hàng năm",
      "Truy cập trọn đời mọi tính năng",
      "Bao gồm tất cả cập nhật tương lai",
      "Hỗ trợ ưu tiên mãi mãi",
      "Truy cập sớm các tính năng mới",
    ],
  },
];

// Mock current user subscription
export const mockUserSubscription: UserSubscription = {
  currentPlan: {
    id: "yearly",
    name: "Hàng năm",
    tier: "premium",
    price: 350000,
    currency: "VND",
    billingCycle: "yearly",
    features: [
      "Mọi thứ trong gói Hàng tháng",
      "Xử lý AI ưu tiên",
      "Bảng điều khiển phân tích nâng cao",
      "Thư viện nội dung độc quyền",
      "Hỗ trợ qua email",
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
    amount: 350000,
    currency: "VND",
    plan: "Hàng năm",
    status: "completed",
    paymentMethod: "MoMo",
    invoiceUrl: "/invoices/PAY-2024-10-001.pdf",
  },
  {
    id: "PAY-2023-10-001",
    date: "2023-10-01",
    amount: 350000,
    currency: "VND",
    plan: "Hàng năm",
    status: "completed",
    paymentMethod: "ZaloPay",
    invoiceUrl: "/invoices/PAY-2023-10-001.pdf",
  },
  {
    id: "PAY-2023-09-001",
    date: "2023-09-01",
    amount: 39000,
    currency: "VND",
    plan: "Hàng tháng",
    status: "completed",
    paymentMethod: "Thẻ Visa",
    invoiceUrl: "/invoices/PAY-2023-09-001.pdf",
  },
  {
    id: "PAY-2023-08-001",
    date: "2023-08-01",
    amount: 39000,
    currency: "VND",
    plan: "Hàng tháng",
    status: "completed",
    paymentMethod: "MoMo",
    invoiceUrl: "/invoices/PAY-2023-08-001.pdf",
  },
  {
    id: "PAY-2023-07-001",
    date: "2023-07-01",
    amount: 39000,
    currency: "VND",
    plan: "Hàng tháng",
    status: "completed",
    paymentMethod: "ZaloPay",
    invoiceUrl: "/invoices/PAY-2023-07-001.pdf",
  },
  {
    id: "PAY-2023-06-001",
    date: "2023-06-01",
    amount: 39000,
    currency: "VND",
    plan: "Hàng tháng",
    status: "refunded",
    paymentMethod: "Thẻ Visa",
    invoiceUrl: "/invoices/PAY-2023-06-001.pdf",
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
