// src/hooks/use-create-plan.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import { CreatePlanRequest } from "@/types/subscription.type";
import { toast } from "sonner";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlanRequest) =>
      subscriptionService.createPlan(data),
    onSuccess: () => {
      toast.success("Tạo gói dịch vụ thành công!");
      // Refresh list after creation
      queryClient.invalidateQueries({ queryKey: ["admin-subscription-plans"] });
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Lỗi khi tạo gói dịch vụ.";
      toast.error(msg);
    },
  });
};
