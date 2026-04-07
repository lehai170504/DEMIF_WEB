// src/hooks/use-auth.ts
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import {
  LoginPayload, // Nhớ export type này từ auth.type nha homie
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
    // FIX 1: Bỏ any, ép kiểu rõ ràng
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async (data: LoginResponse) => {
      try {
        // 1. Lưu token và fetch profile
        const fetchedUser = await handleSuccessfulLogin({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        toast.success("Đăng nhập thành công!", {
          description: "Chào mừng bạn quay lại hệ thống.",
        });

        // 2. Chuyển hướng theo role
        const userRoles = fetchedUser?.roles || (data as any).roles || [];
        const targetPath = getRedirectPath(userRoles);

        router.push(targetPath);
      } catch (error) {
        toast.error("Lỗi đồng bộ dữ liệu", {
          description: "Không thể tải thông tin sau khi đăng nhập.",
        });
      }
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Email hoặc mật khẩu không đúng",
      );
      // FIX 2: Đồng bộ style Toaster mới
      toast.error("Đăng nhập thất bại", { description: message });
    },
  });
};

export const useRegister = () => {
  const router = useRouter(); // FIX 3: Thêm router để chuyển trang

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    // FIX 4: Thêm luồng Success
    onSuccess: () => {
      toast.success("Đăng ký thành công!", {
        description: "Vui lòng kiểm tra email để xác thực tài khoản.",
      });
      router.push("/login"); // Đá về trang login
    },
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
        if (data.accessToken && data.refreshToken) {
          const fetchedUser = await handleSuccessfulLogin({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });

          toast.success("Xác thực thành công!", {
            description: "Tài khoản đã được kích hoạt. Đang tự động vào hệ thống...",
          });

          const userRoles = fetchedUser?.roles || data.roles || [];
          const targetPath = getRedirectPath(userRoles);
          router.push(targetPath);
        } else {
          toast.success("Xác thực thành công!", {
            description: data.message || "Tài khoản đã được kích hoạt. Vui lòng đăng nhập lại.",
          });
          router.push("/login");
        }
      } catch (error) {
        toast.error("Lỗi đồng bộ dữ liệu", {
          description: "Lỗi thiết lập phiên đăng nhập sau khi xác thực.",
        });
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

        toast.success("Kết nối Google thành công!", {
          description: `Chào mừng ${fetchedUser?.username || data.username || "bạn"} quay lại!`,
        });

        const userRoles = fetchedUser?.roles || (data as any).roles || [];
        const targetPath = getRedirectPath(userRoles);

        router.push(targetPath);
      } catch (error) {
        toast.error("Lỗi đồng bộ dữ liệu", {
          description: "Lỗi kết nối phiên làm việc với Google.",
        });
      }
    },
    onError: (error: any) => {
      const message = extractErrorMessage(
        error,
        "Đăng nhập bằng Google thất bại",
      );
      toast.error("Lỗi đăng nhập", { description: message });
    },
  });
};