import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminPaymentDetail,
  getAdminPayments,
  refundAdminPayment,
} from "@/services/payment.service";
import {
  PagedPaymentResult,
  GetPaymentsParams,
  RefundPaymentRequest,
} from "@/types/payment.type";

export const usePayments = (params: GetPaymentsParams) => {
  return useQuery<PagedPaymentResult>({
    queryKey: ["admin-payments", params],
    queryFn: () => getAdminPayments(params),
    placeholderData: (previousData) => previousData,
  });
};

export const usePaymentDetail = (id: string) => {
  return useQuery({
    queryKey: ["admin-payment-detail", id],
    queryFn: () => getAdminPaymentDetail(id),
    enabled: !!id,
  });
};

export const useRefundPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RefundPaymentRequest;
    }) => refundAdminPayment(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-payment-detail", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
    },
  });
};
