// src/hooks/use-auth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginResponse, RegisterPayload } from "@/types/auth.type";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => authService.login(payload),
    onSuccess: (data: LoginResponse) => {
      // Lưu token vào Cookies (path "/" để có hiệu lực toàn trang)
      Cookies.set("accessToken", data.accessToken, { expires: 1, path: "/" });
      Cookies.set("refreshToken", data.refreshToken, { expires: 7, path: "/" });

      // Lưu cache user vào TanStack Query
      queryClient.setQueryData(["authUser"], data);

      toast.success("Đăng nhập thành công!");
      router.push("/home");
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
      // 1. Lưu token vào Cookies (giống như lúc Login)
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);

      // 2. Thông báo thành công
      toast.success("Đăng ký thành công!", {
        description: `Chào mừng ${data.username} đến với Demif!`,
      });

      // 3. Chuyển hướng
      router.push("/login");
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
