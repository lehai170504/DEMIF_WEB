// src/hooks/use-manage-plan.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import { CreatePlanRequest } from "@/types/subscription.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";

export const useManagePlan = () => {
  const queryClient = useQueryClient();

  // Mutation Update: Cập nhật gói
  const updatePlanMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePlanRequest }) =>
      subscriptionService.updatePlan(id, data),
    onSuccess: () => {
      toast.success("Cập nhật thành công", {
        description: "Thông tin gói dịch vụ đã được thay đổi trên hệ thống.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-subscription-plans"] });
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Lỗi khi cập nhật gói dịch vụ.",
      );
      toast.error("Cập nhật thất bại", {
        description: message,
      });
    },
  });

  // Mutation Delete: Xóa gói
  const deletePlanMutation = useMutation({
    mutationFn: (id: string) => subscriptionService.deletePlan(id),
    onSuccess: () => {
      toast.success("Đã gỡ bỏ gói", {
        description: "Gói dịch vụ đã được xóa hoàn toàn khỏi danh sách.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-subscription-plans"] });
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Không thể xóa gói dịch vụ này.",
      );
      toast.error("Lỗi xóa gói", {
        description: message,
      });
    },
  });

  return {
    updatePlan: updatePlanMutation.mutate,
    deletePlan: deletePlanMutation.mutate,
    isUpdating: updatePlanMutation.isPending,
    isDeleting: deletePlanMutation.isPending,
  };
};
