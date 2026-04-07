import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";
import Cookies from "js-cookie";
import { extractErrorMessage } from "@/lib/error";
import { toast } from "sonner";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: (planId: string) =>
      paymentService.subscribePlan({
        planId,
        paymentMethod: "transfer",
        autoRenew: false,
      }),
    onError: (error: any) => {
      const refreshDebug =
        typeof window !== "undefined"
          ? localStorage.getItem("last-auth-refresh-error")
          : null;
      const refreshInfo = refreshDebug ? ` | refresh_debug: ${refreshDebug}` : "";

      toast.error("Không thể tạo yêu cầu thanh toán", {
        description: `${extractErrorMessage(
          error,
          "Vui lòng thử lại hoặc chọn gói khác.",
        )}${refreshInfo}`,
      });
    },
  });
};

export const usePaymentHistory = () => {
  const hasToken = typeof window !== "undefined" ? !!Cookies.get("accessToken") : false;

  return useQuery({
    queryKey: ["payment-history"],
    queryFn: () => paymentService.getPaymentHistory(),
    enabled: hasToken,
  });
};

export const useCancelPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (referenceCode: string) =>
      paymentService.cancelPayment(referenceCode),
    onSuccess: () => {
      // Clear cache completely to prevent UI from picking up stale Pending status
      queryClient.resetQueries({ queryKey: ["my-subscription"] });
      queryClient.resetQueries({ queryKey: ["payment-history"] });
    },
    onError: (error: any) => {
      toast.error("Không thể hủy giao dịch", {
        description: extractErrorMessage(error, "Đã có lỗi xảy ra."),
      });
    }
  });
};
