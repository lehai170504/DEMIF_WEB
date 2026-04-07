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
