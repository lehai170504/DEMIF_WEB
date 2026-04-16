import axiosClient from "@/lib/axios-client";
import Cookies from "js-cookie";
import {
  PaymentInfoResponse,
  PaymentStatusResponse,
  SubscribePlanRequest,
  SubscribePlanResponse,
  PaymentHistoryResponse,
  GetPaymentsParams,
  PagedPaymentResult,
  RefundPaymentRequest,
  PaymentDetailDto,
  PaymentStatsResponse,
} from "@/types/payment.type";

const getAuthHeaders = () => {
  const token = Cookies.get("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const paymentService = {
  subscribePlan: async (
    payload: SubscribePlanRequest,
  ): Promise<SubscribePlanResponse> => {
    const response = await axiosClient.post(
      "/subscription-plans/subscribe",
      payload,
      {
        headers: getAuthHeaders(),
      },
    );
    return response as unknown as SubscribePlanResponse;
  },

  getPaymentInfo: async (
    paymentReference: string,
  ): Promise<PaymentInfoResponse> => {
    const safeReference = encodeURIComponent(paymentReference);
    const response = await axiosClient.get(`/payments/info/${safeReference}`, {
      headers: getAuthHeaders(),
    });
    return response as unknown as PaymentInfoResponse;
  },

  getPaymentStatus: async (
    paymentReference: string,
  ): Promise<PaymentStatusResponse> => {
    const safeReference = encodeURIComponent(paymentReference);
    const response = await axiosClient.get(
      `/payments/${safeReference}/status`,
      {
        headers: getAuthHeaders(),
      },
    );
    return response as unknown as PaymentStatusResponse;
  },

  getPaymentHistory: async (): Promise<PaymentHistoryResponse> => {
    const response = await axiosClient.get("/me/payment-history", {
      headers: getAuthHeaders(),
    });
    return response as unknown as PaymentHistoryResponse;
  },

  cancelPayment: async (paymentReference: string): Promise<any> => {
    const safeReference = encodeURIComponent(paymentReference);
    const response = await axiosClient.post(
      `/payments/${safeReference}/cancel`,
      {},
      {
        headers: getAuthHeaders(),
      },
    );
    return response;
  },
};

export const getAdminPayments = async (
  params: GetPaymentsParams,
): Promise<PagedPaymentResult> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== ""),
  );

  const response = await axiosClient.get("/admin/payments", {
    params: cleanParams,
    headers: getAuthHeaders(),
  });

  return response as unknown as PagedPaymentResult;
};

export const getAdminPaymentDetail = async (
  id: string,
): Promise<PaymentDetailDto> => {
  const response = await axiosClient.get(`/admin/payments/${id}`, {
    headers: getAuthHeaders(),
  });
  return response as unknown as PaymentDetailDto;
};

export const refundAdminPayment = async (
  id: string,
  payload: RefundPaymentRequest,
) => {
  const response = await axiosClient.post(
    `/admin/payments/${id}/refund`,
    payload,
    {
      headers: getAuthHeaders(),
    },
  );
  return response;
};

export const getAdminPaymentStats = async (): Promise<PaymentStatsResponse> => {
  const response = await axiosClient.get("/admin/payments/stats", {
    headers: getAuthHeaders(),
  });
  return response as unknown as PaymentStatsResponse;
};
