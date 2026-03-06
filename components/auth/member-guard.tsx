"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function MemberGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // 1. Chưa đăng nhập -> Về Login
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // 2. Nếu là Admin -> Đẩy sang trang Admin
    // (Vì Admin thường không vào trang học viên để học)
    if (user?.roles?.includes("Admin")) {
      router.replace("/admin");
    }
  }, [user, isLoading, isAuthenticated, router]);

  // Loading khi đang check quyền
  if (isLoading || user?.roles?.includes("Admin")) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  return <>{children}</>;
}
