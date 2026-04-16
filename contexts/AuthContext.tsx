// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { UserProfile } from "@/types/auth.type";
import { authService } from "@/services/auth.service";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/use-user";
import { toast } from "sonner";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  refetchProfile: () => Promise<any>;
  handleSuccessfulLogin: (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<UserProfile | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, isLoading, refetch } = useUserProfile();

  // Đồng bộ logout giữa các tab
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "logout-event") {
        queryClient.clear();
        router.push("/login");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [queryClient, router]);

  // Hàm xử lý tập trung sau khi gọi API login/register xong
  const handleSuccessfulLogin = async (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    // 1. Set cookie ngay lập tức
    Cookies.set("accessToken", tokens.accessToken, { path: "/" });
    Cookies.set("refreshToken", tokens.refreshToken, { path: "/" });

    // 2. Xóa TOÀN BỘ cache cũ để tránh dính data của user trước (Quan trọng!)
    queryClient.clear();

    // 3. Gọi API lấy profile mới nhất với token vừa set
    // Đợi một chút để cookie kịp set (nếu cần)
    const result = await refetch();

    return result.data;
  };

  const logout = async () => {
    // 1. Hiện thông báo "đang xử lý" nếu muốn (Optional)
    const toastId = toast.loading("Đang đăng xuất...");

    try {
      const rt = Cookies.get("refreshToken");
      if (rt) {
        await authService.logout(rt);
      }
    } catch (error) {
      console.error("Logout API error:", error);
      // Không cần hiện toast error ở đây vì mình vẫn cho user out ở client
    } finally {
      // 2. Xóa Cookie và Cache dữ liệu cũ
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      queryClient.clear();

      // 3. Đồng bộ logout giữa các Tabs
      if (typeof window !== "undefined") {
        localStorage.setItem("logout-event", Date.now().toString());
      }

      // 4. Thông báo thành công bằng Sonner
      toast.success("Đăng xuất thành công", {
        id: toastId, // Ghi đè lên cái loading lúc nãy
        description: "Hẹn gặp lại bạn sớm nhé!",
        duration: 2000,
      });

      // 5. Chuyển trang (Sử dụng setTimeout nhẹ để user kịp thấy toast)
      setTimeout(() => {
        router.push("/login");
      }, 800);
    }
  };

  const value = useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated: !!user,
      isLoading,
      logout,
      refetchProfile: refetch,
      handleSuccessfulLogin,
    }),
    [user, isLoading, handleSuccessfulLogin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
