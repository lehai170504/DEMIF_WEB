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
    "Xác thực quyền truy cập...",
  );

  const actualUser = (user as any)?.data || user;

  // Kiểm tra danh sách roles
  const roles = actualUser?.roles?.map((r: string) => r.toLowerCase()) || [];
  const isAdmin = roles.includes("admin");
  const isModerator = roles.includes("moderator");
  const hasAdminAccess = isAdmin || isModerator;

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        setTransitionMessage("Xác thực tài khoản cần thiết");
        setIsRedirecting(true);
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
      } else if (hasAdminAccess) {
        setTransitionMessage("Phát hiện quyền quản trị viên");
        setIsRedirecting(true);

        setTimeout(() => {
          router.replace(isAdmin ? "/admin" : "/admin/lessons");
        }, 2000);
      }
    }
  }, [isLoading, isAuthenticated, hasAdminAccess, isAdmin, router]);

  if (isLoading) {
    return (
      <RoleTransition message="Xác thực quyền truy cập..." role="checking" />
    );
  }

  if (isRedirecting) {
    return (
      <RoleTransition
        message={transitionMessage}
        role={hasAdminAccess ? (isAdmin ? "admin" : "moderator") : "checking"}
      />
    );
  }

  if (hasAdminAccess && isAuthenticated) {
    return (
      <RoleTransition
        message="Chuyển hướng..."
        role={isAdmin ? "admin" : "moderator"}
      />
    );
  }

  // 4. Cho phép Member vào học
  return <>{children}</>;
}
