// src/hooks/use-auth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  FirebaseLoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/auth.type";
import { toast } from "sonner";
import { getRedirectPath } from "@/lib/utils"; // Import hàm tiện ích

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => authService.login(payload),
    onSuccess: (data: LoginResponse) => {
      // Lưu token
      Cookies.set("accessToken", data.accessToken, { expires: 1, path: "/" });
      Cookies.set("refreshToken", data.refreshToken, { expires: 7, path: "/" });

      // Cache user
      queryClient.setQueryData(["authUser"], data);

      toast.success("Đăng nhập thành công!");

      // --- ĐIỀU HƯỚNG THEO ROLE ---
      const targetPath = getRedirectPath(data.roles);
      router.push(targetPath);
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

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      // API mới trả về token luôn -> Auto Login
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);

      toast.success("Đăng ký thành công!", {
        description: `Chào mừng ${data.username} đến với Demif!`,
      });

      // --- ĐIỀU HƯỚNG THEO ROLE ---
      const targetPath = getRedirectPath(data.roles);
      router.push(targetPath);
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Đăng ký thất bại.";

      toast.error("Lỗi đăng ký", {
        description: msg,
      });
    },
  });
};

export const useFirebaseLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: FirebaseLoginPayload) =>
      authService.firebaseLogin(payload),
    onSuccess: (data) => {
      Cookies.set("accessToken", data.accessToken);

      if (data.isNewUser) {
        toast.success("Tạo tài khoản thành công!", {
          description: "Chào mừng bạn đến với Demif.",
        });
      } else {
        toast.success("Đăng nhập thành công!", {
          description: `Chào mừng trở lại, ${data.username}.`,
        });
      }

      // --- ĐIỀU HƯỚNG THEO ROLE ---
      const targetPath = getRedirectPath(data.roles);
      router.push(targetPath);
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Đăng nhập Google thất bại.";
      toast.error("Lỗi", { description: msg });
    },
  });
};
