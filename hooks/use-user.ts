// src/hooks/use-user.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import Cookies from "js-cookie";
import { ChangePasswordPayload, UpdateProfilePayload } from "@/types/auth.type";
import { toast } from "sonner"; // Import trực tiếp từ library (Chuẩn)

export const useUserProfile = () => {
  const accessToken = Cookies.get("accessToken");

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: authService.getProfile,
    enabled: !!accessToken,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      authService.updateProfile(payload),
    onSuccess: (data) => {
      // 1. Làm mới cache
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      // 2. Cập nhật Optimistic
      queryClient.setQueryData(["userProfile"], data);

      // 3. Hiển thị Toast (Có thêm description)
      toast.success("Cập nhật thành công!", {
        description: "Thông tin hồ sơ của bạn đã được lưu lại.",
      });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Có lỗi xảy ra khi cập nhật.";

      toast.error("Cập nhật thất bại", {
        description: msg,
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      authService.changePassword(payload),
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công!", {
        description: "Vui lòng sử dụng mật khẩu mới cho lần đăng nhập sau.",
      });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Đổi mật khẩu thất bại.";
      toast.error("Lỗi", {
        description: msg,
      });
    },
  });
};
