// src/hooks/use-user.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import Cookies from "js-cookie";
import { ChangePasswordPayload, UpdateProfilePayload } from "@/types/auth.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";

export const useUserProfile = () => {
  const accessToken = Cookies.get("accessToken");

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: authService.getProfile,
    enabled: !!accessToken,
    retry: false,
    staleTime: 1000 * 60 * 30, // 30 phút
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      authService.updateProfile(payload),
    onSuccess: (data) => {
      // 1. Làm mới cache để các component khác lấy data mới
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      // 2. Cập nhật ngay lập tức data trong cache (Optimistic Update)
      queryClient.setQueryData(["userProfile"], data);

      // 3. Hiển thị Toast Cinematic
      toast.success("Đã lưu thay đổi", {
        description: "Thông tin hồ sơ cá nhân đã được đồng bộ thành công.",
      });
    },
    onError: (error: any) => {
      toast.error("Cập nhật thất bại", {
        description: extractErrorMessage(
          error,
          "Không thể lưu thông tin hồ sơ.",
        ),
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      authService.changePassword(payload),
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công", {
        description:
          "Bạn có thể sử dụng mật khẩu mới cho những lần đăng nhập sau.",
      });
    },
    onError: (error: any) => {
      toast.error("Thao tác thất bại", {
        description: extractErrorMessage(
          error,
          "Mật khẩu hiện tại không chính xác.",
        ),
      });
    },
  });
};
