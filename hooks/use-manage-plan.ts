// src/hooks/use-manage-plan.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import { CreatePlanRequest } from "@/types/subscription.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";

export const useManagePlan = () => {
  const queryClient = useQueryClient();

  // Mutation Update
  const updatePlanMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePlanRequest }) =>
      subscriptionService.updatePlan(id, data),
    onSuccess: () => {
      toast.success("Cập nhật gói dịch vụ thành công!");
      queryClient.invalidateQueries({ queryKey: ["admin-subscription-plans"] });
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Lỗi khi cập nhật gói dịch vụ.",
      );
      toast.error(message);
    },
  });

  // Mutation Delete
  const deletePlanMutation = useMutation({
    mutationFn: (id: string) => subscriptionService.deletePlan(id),
    onSuccess: () => {
      toast.success("Đã xóa gói dịch vụ thành công.");
      queryClient.invalidateQueries({ queryKey: ["admin-subscription-plans"] });
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Không thể xóa gói dịch vụ này.",
      );
      toast.error(message);
    },
  });

  return {
    updatePlan: updatePlanMutation.mutate,
    deletePlan: deletePlanMutation.mutate,
    isUpdating: updatePlanMutation.isPending,
    isDeleting: deletePlanMutation.isPending,
  };
};
