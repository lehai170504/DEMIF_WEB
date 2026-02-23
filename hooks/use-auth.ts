// src/hooks/use-auth.ts
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import {
  FirebaseLoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/auth.type";
import { toast } from "sonner";
import { getRedirectPath } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext"; 

export const useLogin = () => {
  const router = useRouter();
  const { handleSuccessfulLogin } = useAuth(); 

  return useMutation({
    mutationFn: (payload: any) => authService.login(payload),
    onSuccess: async (data: LoginResponse) => {
      try {
        // 1. Giao việc set cookie và fetch profile cho AuthContext
        const fetchedUser = await handleSuccessfulLogin({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        toast.success("Đăng nhập thành công!");

        // 2. Sử dụng roles ĐÃ ĐƯỢC FETCH CHUẨN từ server để điều hướng
        // (Hoặc fallback về roles trả về từ API login nếu API profile không có)
        const userRoles = fetchedUser?.roles || (data as any).roles || [];
        const targetPath = getRedirectPath(userRoles);

        router.push(targetPath);
      } catch (error) {
        toast.error("Lỗi đồng bộ dữ liệu sau khi đăng nhập.");
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail || "Email hoặc mật khẩu không đúng";
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const { handleSuccessfulLogin } = useAuth();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: async (data: any) => {
      try {
        const fetchedUser = await handleSuccessfulLogin({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        toast.success("Đăng ký thành công!", {
          description: `Chào mừng ${fetchedUser?.username || data.username} đến với Demif!`,
        });

        const userRoles = fetchedUser?.roles || data.roles || [];
        const targetPath = getRedirectPath(userRoles);
        router.push(targetPath);
      } catch (e) {
        toast.error("Lỗi sau khi đăng ký.");
      }
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Đăng ký thất bại.";
      toast.error("Lỗi đăng ký", { description: msg });
    },
  });
};

export const useFirebaseLogin = () => {
  const router = useRouter();
  const { handleSuccessfulLogin } = useAuth();

  return useMutation({
    mutationFn: (payload: FirebaseLoginPayload) =>
      authService.firebaseLogin(payload),
    onSuccess: async (data: any) => {
      try {
        const fetchedUser = await handleSuccessfulLogin({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        if (data.isNewUser) {
          toast.success("Tạo tài khoản thành công!");
        } else {
          toast.success("Đăng nhập thành công!", {
            description: `Chào mừng trở lại, ${fetchedUser?.username || data.username}.`,
          });
        }

        const userRoles = fetchedUser?.roles || data.roles || [];
        const targetPath = getRedirectPath(userRoles);
        router.push(targetPath);
      } catch (e) {
        toast.error("Lỗi đồng bộ dữ liệu sau Google Login.");
      }
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Đăng nhập Google thất bại.";
      toast.error("Lỗi", { description: msg });
    },
  });
};
