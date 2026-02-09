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
  refetchProfile: () => void;
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

  const logout = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });

      queryClient.clear(); // Xóa cache

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
      refetchProfile: refetch, // Expose hàm refetch ra ngoài
    }),
    [user, isLoading, refetch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
