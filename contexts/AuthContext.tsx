// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { UserProfile } from "@/types/auth.type";
import { authService } from "@/services/auth.service";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/use-user";

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
    try {
      const rt = Cookies.get("refreshToken");
      if (rt) {
        await authService.logout(rt);
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Xóa Cookie và Cache
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      queryClient.clear();

      // Đánh dấu event logout để các tab khác tự out theo
      if (typeof window !== "undefined") {
        localStorage.setItem("logout-event", Date.now().toString());
      }

      router.push("/login");
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
