import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSubscriptionService } from "@/services/user-subscription.service";
import {
  CancelSubscriptionDto,
  ExtendSubscriptionDto,
} from "@/types/user-subscription.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CancelSubscriptionDto }) =>
      userSubscriptionService.cancelSubscription(id, data),
    onSuccess: (_, variables) => {
      toast.success("Hủy gói thành công");
      queryClient.invalidateQueries({
        queryKey: ["user-subscription-detail", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Không thể hủy gói dịch vụ"));
    },
  });
};

export const useExtendSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExtendSubscriptionDto }) =>
      userSubscriptionService.extendSubscription(id, data),
    onSuccess: (_, variables) => {
      toast.success(`Đã gia hạn thêm ${variables.data.days} ngày thành công`);
      queryClient.invalidateQueries({
        queryKey: ["user-subscription-detail", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Lỗi gia hạn thuê bao"));
    },
  });
};
