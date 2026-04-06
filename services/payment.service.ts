import axiosClient from "@/lib/axios-client";
import Cookies from "js-cookie";
import {
  PaymentInfoResponse,
  PaymentStatusResponse,
  SubscribePlanRequest,
  SubscribePlanResponse,
  PaymentHistoryResponse,
} from "@/types/payment.type";

const getAuthHeaders = () => {
  const token = Cookies.get("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const paymentService = {
  subscribePlan: async (
    payload: SubscribePlanRequest,
  ): Promise<SubscribePlanResponse> => {
    const response = await axiosClient.post("/subscription-plans/subscribe", payload, {
      headers: getAuthHeaders(),
    });
    return response as unknown as SubscribePlanResponse;
  },

  getPaymentInfo: async (paymentReference: string): Promise<PaymentInfoResponse> => {
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
    const response = await axiosClient.get(`/payments/${safeReference}/status`, {
      headers: getAuthHeaders(),
    });
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
    const response = await axiosClient.post(`/payments/${safeReference}/cancel`, {}, {
      headers: getAuthHeaders(),
    });
    return response;
  },
};
