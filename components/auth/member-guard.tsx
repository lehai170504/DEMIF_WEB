"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RoleTransition } from "@/components/auth/RoleTransition";

export default function MemberGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState(
    "Đang tải dữ liệu học tập...",
  );

  const actualUser = (user as any)?.data || user;

  const isAdmin = actualUser?.roles?.some(
    (role: string) =>
      typeof role === "string" && role.toLowerCase() === "admin",
  );

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        setTransitionMessage("Yêu cầu đăng nhập...");
        setIsRedirecting(true);
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
      } else if (isAdmin) {
        setTransitionMessage("Đang chuyển về Không gian Quản trị...");
        setIsRedirecting(true);

        setTimeout(() => {
          router.replace("/admin");
        }, 3000);
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  // NẾU ĐANG CALL API HOẶC ĐANG BỊ ĐIỀU HƯỚNG -> BẬT MÀN HÌNH 3D
  if (isLoading || isRedirecting || (isAdmin && isAuthenticated)) {
    return (
      <RoleTransition
        message={transitionMessage}
        role={isAdmin ? "admin" : "member"}
      />
    );
  }

  // Nếu là Admin thì giấu giao diện học viên đi
  if (isAdmin) return null;

  // Render giao diện học viên bình thường
  return <>{children}</>;
}
