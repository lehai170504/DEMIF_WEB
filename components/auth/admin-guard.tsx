// src/components/auth/admin-guard.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Đang tải thông tin user thì chờ
    if (isLoading) return;

    // 2. Chưa đăng nhập -> Đá về Login
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // 3. Đã đăng nhập nhưng KHÔNG phải Admin -> Đá về Home
    if (!user.roles || !user.roles.includes("Admin")) {
      router.push("/home");
    }
  }, [user, isLoading, isAuthenticated, router]);

  // Hiển thị màn hình Loading khi đang check quyền
  if (isLoading || !user || !user.roles?.includes("Admin")) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#FF7A00]" />
          <p className="text-zinc-500 text-sm font-mono animate-pulse">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  // Nếu là Admin thì render nội dung trang Admin
  return <>{children}</>;
}
