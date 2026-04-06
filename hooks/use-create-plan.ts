// src/hooks/use-create-plan.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import { CreatePlanRequest } from "@/types/subscription.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlanRequest) =>
      subscriptionService.createPlan(data),
    onSuccess: () => {
      toast.success("Hệ thống đã khởi tạo gói dịch vụ thành công!");
      queryClient.invalidateQueries({ queryKey: ["admin-subscription-plans"] });
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Lỗi khi khởi tạo gói dịch vụ.",
      );
      toast.error(message);
    },
  });
};
