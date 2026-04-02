"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AccessDenied } from "@/components/auth/AccessDenied";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const actualUser = (user as any)?.data || user;
  const isAdmin = actualUser?.roles?.some(
    (role: string) =>
      typeof role === "string" && role.toLowerCase() === "admin",
  );

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Nếu chưa đăng nhập thì mới đá ra form login
        router.replace("/login");
      } else {
        // Đã kiểm tra xong token & profile
        setIsCheckingAuth(false);
      }
    }
  }, [isLoading, isAuthenticated, router]);

  // NẾU ĐANG CALL API: Vẫn hiện Loader bình thường
  if (isLoading || isCheckingAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#FF7A00]" />
          <p className="text-gray-500 text-sm font-mono animate-pulse">
            Đang tải dữ liệu quản trị...
          </p>
        </div>
      </div>
    );
  }

  // ĐÃ KIỂM TRA XONG NHƯNG KHÔNG PHẢI ADMIN -> HIỂN THỊ TRANG LỖI 403 3D
  if (isAuthenticated && !isAdmin) {
    return <AccessDenied />;
  }

  // LÀ ADMIN -> XEM GIAO DIỆN BÌNH THƯỜNG
  return <>{children}</>;
}
