// src/hooks/use-user-subscription.ts

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
      toast.success("Hủy gói thành công", {
        description:
          "Gói dịch vụ của người dùng đã được chấm dứt trên hệ thống.",
      });
      queryClient.invalidateQueries({
        queryKey: ["user-subscription-detail", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    },
    onError: (error) => {
      toast.error("Thao tác thất bại", {
        description: extractErrorMessage(
          error,
          "Không thể hủy gói dịch vụ vào lúc này.",
        ),
      });
    },
  });
};

export const useExtendSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExtendSubscriptionDto }) =>
      userSubscriptionService.extendSubscription(id, data),
    onSuccess: (_, variables) => {
      toast.success("Gia hạn thành công", {
        description: `Hệ thống đã cộng thêm ${variables.data.days} ngày vào thời hạn sử dụng.`,
      });
      queryClient.invalidateQueries({
        queryKey: ["user-subscription-detail", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    },
    onError: (error) => {
      toast.error("Lỗi gia hạn", {
        description: extractErrorMessage(
          error,
          "Đã có lỗi xảy ra khi cập nhật thời hạn.",
        ),
      });
    },
  });
};
