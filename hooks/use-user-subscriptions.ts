// src/hooks/use-user-subscriptions.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userSubscriptionService } from "@/services/user-subscription.service";
import { GetUserSubscriptionsParams } from "@/types/user-subscription.type";
import { AdminSubscriptionPayload } from "@/types/subscription.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";

export const useUserSubscriptions = (params: GetUserSubscriptionsParams) => {
  return useQuery({
    queryKey: ["user-subscriptions", params],
    queryFn: () => userSubscriptionService.getSubscriptions(params),
    placeholderData: (prev) => prev,
    staleTime: 60 * 1000,
  });
};

export function useAdminManageSubscription() {
  const queryClient = useQueryClient();

  // ================= CREATE =================
  const createMutation = useMutation({
    mutationFn: (data: AdminSubscriptionPayload) =>
      userSubscriptionService.createSubscription(data),

    onSuccess: () => {
      toast.success("Tạo gói thành công", {
        description: "Gói thuê bao mới đã được cấp cho người dùng.",
      });

      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    },

    onError: (error) => {
      toast.error("Tạo gói thất bại", {
        description: extractErrorMessage(
          error,
          "Không thể tạo gói thuê bao vào lúc này.",
        ),
      });
    },
  });

  // ================= UPDATE =================
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: AdminSubscriptionPayload;
    }) => userSubscriptionService.updateSubscription(id, data),

    onSuccess: (_, variables) => {
      toast.success("Cập nhật thành công", {
        description: "Thông tin thuê bao đã được cập nhật.",
      });

      // invalidate detail + list (chuẩn hơn)
      queryClient.invalidateQueries({
        queryKey: ["user-subscription-detail", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-subscriptions"],
      });
    },

    onError: (error) => {
      toast.error("Cập nhật thất bại", {
        description: extractErrorMessage(
          error,
          "Không thể cập nhật thuê bao. Có thể dữ liệu đã thay đổi.",
        ),
      });
    },
  });

  return {
    // CREATE
    createSubscription: createMutation.mutate,
    isCreating: createMutation.isPending,

    // UPDATE
    updateSubscription: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
