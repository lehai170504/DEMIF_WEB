// src/hooks/use-manage-plan.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import { CreatePlanRequest } from "@/types/subscription.type";
import { toast } from "sonner";

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
      toast.error(error?.response?.data?.message || "Lỗi khi cập nhật gói.");
    },
  });

  // Mutation Delete
  const deletePlanMutation = useMutation({
    mutationFn: (id: string) => subscriptionService.deletePlan(id),
    onSuccess: () => {
      toast.success("Đã xóa gói dịch vụ.");
      queryClient.invalidateQueries({ queryKey: ["admin-subscription-plans"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Lỗi khi xóa gói.");
    },
  });

  return {
    updatePlan: updatePlanMutation.mutate,
    deletePlan: deletePlanMutation.mutate,
    isUpdating: updatePlanMutation.isPending,
    isDeleting: deletePlanMutation.isPending,
  };
};
