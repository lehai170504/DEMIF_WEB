export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  packageName: string;
  packageType: "premium" | "pro" | "basic";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "cancelled" | "refunded";
  paymentMethod:
    | "credit_card"
    | "paypal"
    | "bank_transfer"
    | "momo"
    | "zalopay";
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  features: string[];
}

export interface OrderTimeline {
  id: string;
  orderId: string;
  status: string;
  description: string;
  timestamp: string;
  by?: string;
}

export interface RevenueData {
  date: string;
  premium: number;
  pro: number;
  basic: number;
  total: number;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "user-001",
    userEmail: "nguyen.van.a@gmail.com",
    userName: "Nguyễn Văn A",
    packageName: "Gói Premium - 12 tháng",
    packageType: "premium",
    amount: 2400000,
    currency: "VND",
    status: "completed",
    paymentMethod: "credit_card",
    transactionId: "TXN-20241028-001",
    createdAt: "2024-10-28T08:30:00Z",
    updatedAt: "2024-10-28T08:35:00Z",
    expiresAt: "2025-10-28T08:35:00Z",
    features: [
      "Tất cả bài học",
      "AI phân tích phát âm",
      "Luyện tập không giới hạn",
      "Hỗ trợ 24/7",
    ],
  },
  {
    id: "ORD-002",
    userId: "user-002",
    userEmail: "tran.thi.b@gmail.com",
    userName: "Trần Thị B",
    packageName: "Gói Pro - 6 tháng",
    packageType: "pro",
    amount: 900000,
    currency: "VND",
    status: "pending",
    paymentMethod: "momo",
    createdAt: "2024-10-28T10:15:00Z",
    updatedAt: "2024-10-28T10:15:00Z",
    expiresAt: "2025-04-28T10:15:00Z",
    features: ["Bài học nâng cao", "Luyện tập hạn chế", "Báo cáo tiến độ"],
  },
  {
    id: "ORD-003",
    userId: "user-003",
    userEmail: "le.van.c@gmail.com",
    userName: "Lê Văn C",
    packageName: "Gói Basic - 3 tháng",
    packageType: "basic",
    amount: 300000,
    currency: "VND",
    status: "completed",
    paymentMethod: "zalopay",
    transactionId: "TXN-20241027-003",
    createdAt: "2024-10-27T14:20:00Z",
    updatedAt: "2024-10-27T14:25:00Z",
    expiresAt: "2025-01-27T14:25:00Z",
    features: ["Bài học cơ bản", "Luyện tập giới hạn"],
  },
  {
    id: "ORD-004",
    userId: "user-004",
    userEmail: "pham.thi.d@gmail.com",
    userName: "Phạm Thị D",
    packageName: "Gói Premium - 6 tháng",
    packageType: "premium",
    amount: 1200000,
    currency: "VND",
    status: "failed",
    paymentMethod: "bank_transfer",
    createdAt: "2024-10-26T16:45:00Z",
    updatedAt: "2024-10-26T16:50:00Z",
    features: [
      "Tất cả bài học",
      "AI phân tích phát âm",
      "Luyện tập không giới hạn",
      "Hỗ trợ 24/7",
    ],
  },
  {
    id: "ORD-005",
    userId: "user-005",
    userEmail: "hoang.van.e@gmail.com",
    userName: "Hoàng Văn E",
    packageName: "Gói Pro - 12 tháng",
    packageType: "pro",
    amount: 1800000,
    currency: "VND",
    status: "completed",
    paymentMethod: "paypal",
    transactionId: "TXN-20241025-005",
    createdAt: "2024-10-25T09:30:00Z",
    updatedAt: "2024-10-25T09:35:00Z",
    expiresAt: "2025-10-25T09:35:00Z",
    features: ["Bài học nâng cao", "Luyện tập hạn chế", "Báo cáo tiến độ"],
  },
  {
    id: "ORD-006",
    userId: "user-006",
    userEmail: "vu.thi.f@gmail.com",
    userName: "Vũ Thị F",
    packageName: "Gói Premium - 3 tháng",
    packageType: "premium",
    amount: 600000,
    currency: "VND",
    status: "cancelled",
    paymentMethod: "credit_card",
    createdAt: "2024-10-24T11:15:00Z",
    updatedAt: "2024-10-24T12:00:00Z",
    features: [
      "Tất cả bài học",
      "AI phân tích phát âm",
      "Luyện tập không giới hạn",
      "Hỗ trợ 24/7",
    ],
  },
  {
    id: "ORD-007",
    userId: "user-007",
    userEmail: "dao.van.g@gmail.com",
    userName: "Đào Văn G",
    packageName: "Gói Basic - 6 tháng",
    packageType: "basic",
    amount: 600000,
    currency: "VND",
    status: "completed",
    paymentMethod: "momo",
    transactionId: "TXN-20241023-007",
    createdAt: "2024-10-23T13:45:00Z",
    updatedAt: "2024-10-23T13:50:00Z",
    expiresAt: "2025-04-23T13:50:00Z",
    features: ["Bài học cơ bản", "Luyện tập giới hạn"],
  },
  {
    id: "ORD-008",
    userId: "user-008",
    userEmail: "bui.thi.h@gmail.com",
    userName: "Bùi Thị H",
    packageName: "Gói Pro - 3 tháng",
    packageType: "pro",
    amount: 450000,
    currency: "VND",
    status: "refunded",
    paymentMethod: "zalopay",
    transactionId: "TXN-20241022-008",
    createdAt: "2024-10-22T15:20:00Z",
    updatedAt: "2024-10-22T16:30:00Z",
    expiresAt: "2025-01-22T15:20:00Z",
    features: ["Bài học nâng cao", "Luyện tập hạn chế", "Báo cáo tiến độ"],
  },
];

export const mockOrderTimelines: Record<string, OrderTimeline[]> = {
  "ORD-001": [
    {
      id: "timeline-001-1",
      orderId: "ORD-001",
      status: "created",
      description: "Đơn hàng được tạo",
      timestamp: "2024-10-28T08:30:00Z",
    },
    {
      id: "timeline-001-2",
      orderId: "ORD-001",
      status: "payment_processing",
      description: "Đang xử lý thanh toán qua Credit Card",
      timestamp: "2024-10-28T08:31:00Z",
    },
    {
      id: "timeline-001-3",
      orderId: "ORD-001",
      status: "payment_completed",
      description: "Thanh toán thành công. Transaction ID: TXN-20241028-001",
      timestamp: "2024-10-28T08:33:00Z",
    },
    {
      id: "timeline-001-4",
      orderId: "ORD-001",
      status: "completed",
      description: "Kích hoạt gói Premium thành công. Hết hạn: 28/10/2025",
      timestamp: "2024-10-28T08:35:00Z",
    },
  ],
  "ORD-002": [
    {
      id: "timeline-002-1",
      orderId: "ORD-002",
      status: "created",
      description: "Đơn hàng được tạo",
      timestamp: "2024-10-28T10:15:00Z",
    },
    {
      id: "timeline-002-2",
      orderId: "ORD-002",
      status: "pending",
      description: "Chờ thanh toán qua MoMo",
      timestamp: "2024-10-28T10:15:00Z",
    },
  ],
  "ORD-003": [
    {
      id: "timeline-003-1",
      orderId: "ORD-003",
      status: "created",
      description: "Đơn hàng được tạo",
      timestamp: "2024-10-27T14:20:00Z",
    },
    {
      id: "timeline-003-2",
      orderId: "ORD-003",
      status: "payment_processing",
      description: "Đang xử lý thanh toán qua ZaloPay",
      timestamp: "2024-10-27T14:21:00Z",
    },
    {
      id: "timeline-003-3",
      orderId: "ORD-003",
      status: "payment_completed",
      description: "Thanh toán thành công. Transaction ID: TXN-20241027-003",
      timestamp: "2024-10-27T14:23:00Z",
    },
    {
      id: "timeline-003-4",
      orderId: "ORD-003",
      status: "completed",
      description: "Kích hoạt gói Basic thành công. Hết hạn: 27/01/2025",
      timestamp: "2024-10-27T14:25:00Z",
    },
  ],
  "ORD-004": [
    {
      id: "timeline-004-1",
      orderId: "ORD-004",
      status: "created",
      description: "Đơn hàng được tạo",
      timestamp: "2024-10-26T16:45:00Z",
    },
    {
      id: "timeline-004-2",
      orderId: "ORD-004",
      status: "payment_processing",
      description: "Đang xử lý thanh toán qua chuyển khoản ngân hàng",
      timestamp: "2024-10-26T16:46:00Z",
    },
    {
      id: "timeline-004-3",
      orderId: "ORD-004",
      status: "payment_failed",
      description: "Thanh toán thất bại. Lý do: Số dư tài khoản không đủ",
      timestamp: "2024-10-26T16:50:00Z",
    },
  ],
  "ORD-005": [
    {
      id: "timeline-005-1",
      orderId: "ORD-005",
      status: "created",
      description: "Đơn hàng được tạo",
      timestamp: "2024-10-25T09:30:00Z",
    },
    {
      id: "timeline-005-2",
      orderId: "ORD-005",
      status: "payment_processing",
      description: "Đang xử lý thanh toán qua PayPal",
      timestamp: "2024-10-25T09:31:00Z",
    },
    {
      id: "timeline-005-3",
      orderId: "ORD-005",
      status: "payment_completed",
      description: "Thanh toán thành công. Transaction ID: TXN-20241025-005",
      timestamp: "2024-10-25T09:33:00Z",
    },
    {
      id: "timeline-005-4",
      orderId: "ORD-005",
      status: "completed",
      description: "Kích hoạt gói Pro thành công. Hết hạn: 25/10/2025",
      timestamp: "2024-10-25T09:35:00Z",
    },
  ],
  "ORD-006": [
    {
      id: "timeline-006-1",
      orderId: "ORD-006",
      status: "created",
      description: "Đơn hàng được tạo",
      timestamp: "2024-10-24T11:15:00Z",
    },
    {
      id: "timeline-006-2",
      orderId: "ORD-006",
      status: "payment_processing",
      description: "Đang xử lý thanh toán qua Credit Card",
      timestamp: "2024-10-24T11:16:00Z",
    },
    {
      id: "timeline-006-3",
      orderId: "ORD-006",
      status: "cancelled",
      description: "Đơn hàng bị hủy bởi khách hàng",
      timestamp: "2024-10-24T12:00:00Z",
    },
  ],
  "ORD-007": [
    {
      id: "timeline-007-1",
      orderId: "ORD-007",
      status: "created",
      description: "Đơn hàng được tạo",
      timestamp: "2024-10-23T13:45:00Z",
    },
    {
      id: "timeline-007-2",
      orderId: "ORD-007",
      status: "payment_processing",
      description: "Đang xử lý thanh toán qua MoMo",
      timestamp: "2024-10-23T13:46:00Z",
    },
    {
      id: "timeline-007-3",
      orderId: "ORD-007",
      status: "payment_completed",
      description: "Thanh toán thành công. Transaction ID: TXN-20241023-007",
      timestamp: "2024-10-23T13:48:00Z",
    },
    {
      id: "timeline-007-4",
      orderId: "ORD-007",
      status: "completed",
      description: "Kích hoạt gói Basic thành công. Hết hạn: 23/04/2025",
      timestamp: "2024-10-23T13:50:00Z",
    },
  ],
  "ORD-008": [
    {
      id: "timeline-008-1",
      orderId: "ORD-008",
      status: "created",
      description: "Đơn hàng được tạo",
      timestamp: "2024-10-22T15:20:00Z",
    },
    {
      id: "timeline-008-2",
      orderId: "ORD-008",
      status: "payment_processing",
      description: "Đang xử lý thanh toán qua ZaloPay",
      timestamp: "2024-10-22T15:21:00Z",
    },
    {
      id: "timeline-008-3",
      orderId: "ORD-008",
      status: "payment_completed",
      description: "Thanh toán thành công. Transaction ID: TXN-20241022-008",
      timestamp: "2024-10-22T15:23:00Z",
    },
    {
      id: "timeline-008-4",
      orderId: "ORD-008",
      status: "completed",
      description: "Kích hoạt gói Pro thành công. Hết hạn: 22/01/2025",
      timestamp: "2024-10-22T15:25:00Z",
    },
    {
      id: "timeline-008-5",
      orderId: "ORD-008",
      status: "refund_requested",
      description: "Yêu cầu hoàn tiền từ khách hàng",
      timestamp: "2024-10-22T16:00:00Z",
    },
    {
      id: "timeline-008-6",
      orderId: "ORD-008",
      status: "refunded",
      description: "Hoàn tiền thành công về tài khoản ZaloPay",
      timestamp: "2024-10-22T16:30:00Z",
    },
  ],
};

export const mockRevenueData: RevenueData[] = [
  {
    date: "2024-10-01",
    premium: 4800000,
    pro: 2700000,
    basic: 900000,
    total: 8400000,
  },
  {
    date: "2024-10-02",
    premium: 3600000,
    pro: 1800000,
    basic: 600000,
    total: 6000000,
  },
  {
    date: "2024-10-03",
    premium: 2400000,
    pro: 3600000,
    basic: 1200000,
    total: 7200000,
  },
  {
    date: "2024-10-04",
    premium: 6000000,
    pro: 2700000,
    basic: 300000,
    total: 9000000,
  },
  {
    date: "2024-10-05",
    premium: 1200000,
    pro: 4500000,
    basic: 900000,
    total: 6600000,
  },
  {
    date: "2024-10-06",
    premium: 3600000,
    pro: 1800000,
    basic: 600000,
    total: 6000000,
  },
  {
    date: "2024-10-07",
    premium: 7200000,
    pro: 2700000,
    basic: 1200000,
    total: 11100000,
  },
  {
    date: "2024-10-08",
    premium: 2400000,
    pro: 3600000,
    basic: 300000,
    total: 6300000,
  },
  {
    date: "2024-10-09",
    premium: 4800000,
    pro: 1800000,
    basic: 900000,
    total: 7500000,
  },
  {
    date: "2024-10-10",
    premium: 1200000,
    pro: 2700000,
    basic: 600000,
    total: 4500000,
  },
  {
    date: "2024-10-11",
    premium: 6000000,
    pro: 4500000,
    basic: 1200000,
    total: 11700000,
  },
  {
    date: "2024-10-12",
    premium: 3600000,
    pro: 1800000,
    basic: 300000,
    total: 5700000,
  },
  {
    date: "2024-10-13",
    premium: 2400000,
    pro: 3600000,
    basic: 900000,
    total: 6900000,
  },
  {
    date: "2024-10-14",
    premium: 4800000,
    pro: 2700000,
    basic: 600000,
    total: 8100000,
  },
  {
    date: "2024-10-15",
    premium: 7200000,
    pro: 1800000,
    basic: 1200000,
    total: 10200000,
  },
  {
    date: "2024-10-16",
    premium: 1200000,
    pro: 4500000,
    basic: 300000,
    total: 6000000,
  },
  {
    date: "2024-10-17",
    premium: 3600000,
    pro: 2700000,
    basic: 900000,
    total: 7200000,
  },
  {
    date: "2024-10-18",
    premium: 6000000,
    pro: 3600000,
    basic: 600000,
    total: 10200000,
  },
  {
    date: "2024-10-19",
    premium: 2400000,
    pro: 1800000,
    basic: 1200000,
    total: 5400000,
  },
  {
    date: "2024-10-20",
    premium: 4800000,
    pro: 4500000,
    basic: 300000,
    total: 9600000,
  },
  {
    date: "2024-10-21",
    premium: 1200000,
    pro: 2700000,
    basic: 900000,
    total: 4800000,
  },
  {
    date: "2024-10-22",
    premium: 3600000,
    pro: 1800000,
    basic: 600000,
    total: 6000000,
  },
  {
    date: "2024-10-23",
    premium: 7200000,
    pro: 3600000,
    basic: 1200000,
    total: 12000000,
  },
  {
    date: "2024-10-24",
    premium: 2400000,
    pro: 2700000,
    basic: 300000,
    total: 5400000,
  },
  {
    date: "2024-10-25",
    premium: 4800000,
    pro: 4500000,
    basic: 900000,
    total: 10200000,
  },
  {
    date: "2024-10-26",
    premium: 6000000,
    pro: 1800000,
    basic: 600000,
    total: 8400000,
  },
  {
    date: "2024-10-27",
    premium: 1200000,
    pro: 2700000,
    basic: 1200000,
    total: 5100000,
  },
  {
    date: "2024-10-28",
    premium: 3600000,
    pro: 3600000,
    basic: 300000,
    total: 7500000,
  },
];

// Helper functions
export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find((order) => order.id === id);
};

export const getOrderTimelineById = (orderId: string): OrderTimeline[] => {
  return mockOrderTimelines[orderId] || [];
};

export const getOrdersByStatus = (status: Order["status"]): Order[] => {
  return mockOrders.filter((order) => order.status === status);
};

export const getOrdersByPackageType = (
  packageType: Order["packageType"]
): Order[] => {
  return mockOrders.filter((order) => order.packageType === packageType);
};

export const getTotalRevenue = (): number => {
  return mockOrders
    .filter((order) => order.status === "completed")
    .reduce((total, order) => total + order.amount, 0);
};

export const getRevenueByPackageType = (): Record<string, number> => {
  const completedOrders = mockOrders.filter(
    (order) => order.status === "completed"
  );

  return completedOrders.reduce((acc, order) => {
    acc[order.packageType] = (acc[order.packageType] || 0) + order.amount;
    return acc;
  }, {} as Record<string, number>);
};

export const getOrderStats = () => {
  const total = mockOrders.length;
  const completed = mockOrders.filter(
    (order) => order.status === "completed"
  ).length;
  const pending = mockOrders.filter(
    (order) => order.status === "pending"
  ).length;
  const failed = mockOrders.filter((order) => order.status === "failed").length;
  const cancelled = mockOrders.filter(
    (order) => order.status === "cancelled"
  ).length;
  const refunded = mockOrders.filter(
    (order) => order.status === "refunded"
  ).length;

  return {
    total,
    completed,
    pending,
    failed,
    cancelled,
    refunded,
    completionRate: Math.round((completed / total) * 100),
  };
};
