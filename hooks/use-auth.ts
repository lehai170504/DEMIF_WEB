// src/hooks/use-auth.ts
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import {
  GoogleLoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/auth.type";
import { toast } from "sonner";
import { getRedirectPath } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { extractErrorMessage } from "@/lib/error";

export const useLogin = () => {
  const router = useRouter();
  const { handleSuccessfulLogin } = useAuth();

  return useMutation({
    mutationFn: (payload: any) => authService.login(payload),
    onSuccess: async (data: LoginResponse) => {
      try {
        // 1. Lưu token và fetch profile
        const fetchedUser = await handleSuccessfulLogin({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        toast.success("Đăng nhập thành công!");

        // 2. Chuyển hướng theo role
        const userRoles = fetchedUser?.roles || (data as any).roles || [];
        const targetPath = getRedirectPath(userRoles);

        router.push(targetPath);
      } catch (error) {
        toast.error("Lỗi đồng bộ dữ liệu sau khi đăng nhập.");
      }
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Email hoặc mật khẩu không đúng",
      );
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onError: (error: any) => {
      const message = extractErrorMessage(error, "Đăng ký thất bại.");
      toast.error("Lỗi đăng ký", { description: message });
    },
  });
};

// AUTO-LOGIN SAU KHI VERIFY
export const useVerifyEmail = () => {
  const router = useRouter();
  const { handleSuccessfulLogin } = useAuth();

  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: async (data: any) => {
      try {
        // Kiểm tra xem Backend có trả về Token sau khi verify không
        if (data.accessToken && data.refreshToken) {
          // Lưu token và fetch thông tin user
          const fetchedUser = await handleSuccessfulLogin({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });

          toast.success("Xác thực thành công!", {
            description:
              "Tài khoản đã được kích hoạt. Đang tự động đăng nhập...",
          });

          // Điều hướng vào hệ thống theo quyền
          const userRoles = fetchedUser?.roles || data.roles || [];
          const targetPath = getRedirectPath(userRoles);
          router.push(targetPath);
        } else {
          // Fallback: Nếu Backend KHÔNG trả về Token (chỉ trả về message)
          toast.success("Xác thực thành công!", {
            description:
              data.message ||
              "Tài khoản đã được kích hoạt. Vui lòng đăng nhập lại.",
          });
          // Trả về trang đăng nhập
          router.push("/login");
        }
      } catch (error) {
        toast.error("Lỗi đồng bộ dữ liệu sau khi xác thực.");
      }
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Mã xác nhận không hợp lệ hoặc đã hết hạn.",
      );
      toast.error("Lỗi xác thực", { description: message });
    },
  });
};

export const useGoogleOAuthLogin = () => {
  const router = useRouter();
  const { handleSuccessfulLogin } = useAuth();

  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) =>
      authService.googleLogin(payload),
    onSuccess: async (data: LoginResponse) => {
      try {
        const fetchedUser = await handleSuccessfulLogin({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        toast.success("Đăng nhập Google thành công!", {
          description: `Chào mừng ${fetchedUser?.username || data.username} quay lại!`,
        });

        const userRoles = fetchedUser?.roles || data.roles || [];
        const targetPath = getRedirectPath(userRoles);

        router.push(targetPath);
      } catch (error) {
        toast.error("Lỗi đồng bộ dữ liệu sau khi đăng nhập Google.");
      }
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Đăng nhập bằng Google thất bại",
      );
      toast.error(message);
    },
  });
};
