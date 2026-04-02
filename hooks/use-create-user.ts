// src/hooks/use-create-user.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { toast } from "sonner";
import { CreateUserRequest } from "@/types/user.type";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => userService.createUser(data),
    onSuccess: () => {
      toast.success("Tạo tài khoản thành công!");
      // Làm mới danh sách user sau khi tạo xong
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      // Xử lý lỗi từ API trả về
      const message =
        error?.response?.data?.message || "Có lỗi xảy ra khi tạo tài khoản.";
      toast.error(message);
    },
  });
};
