export interface SubscribePlanRequest {
  planId: string;
  paymentMethod: "transfer";
  autoRenew: boolean;
}

export interface SubscribePlanResponse {
  subscriptionId: string;
  paymentId: string;
  paymentReference: string;
  amount: number;
  currency: string;
  planName: string;
  status: string;
}

export interface PaymentInfoResponse {
  referenceCode: string;
  amount: number;
  currency: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  transferContent: string;
  qrCodeUrl: string;
  status: string;
  expiredAt: string;
}

export interface PaymentStatusResponse {
  referenceCode: string;
  status: string;
  isCompleted: boolean;
  isFailed: boolean;
  completedAt: string | null;
  transactionId: string | null;
  bankCode: string | null;
}

export interface PaymentHistoryItemDto {
  id: string;
  referenceCode: string;
  amount: number;
  planName: string;
  status: string;
  createdAt: string;
  completedAt: string | null;
}

export interface PaymentHistoryResponse {
  items: PaymentHistoryItemDto[];
}

export interface CancelPaymentResponse {
  success: boolean;
  message: string;
}

// Dành cho admin
export interface PaymentDto {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  planName: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: "Pending" | "Completed" | "Failed" | "Refunded" | string;
  paymentReference: string;
  transactionId: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface PagedPaymentResult {
  items: PaymentDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GetPaymentsParams {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaymentDetailDto extends PaymentDto {
  planId: string;
  subscriptionId: string;
  bankCode: string | null;
  bankTransactionNo: string | null;
  gatewayResponse: string | null;
  note: string | null;
}

export interface RefundPaymentRequest {
  reason: string;
}
