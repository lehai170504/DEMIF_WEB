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

  const hasAdminAccess = actualUser?.roles?.some((role: string) => {
    if (typeof role !== "string") return false;
    const normalizedRole = role.trim().toLowerCase();
    return normalizedRole === "admin" || normalizedRole === "moderator";
  });

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || isCheckingAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#FF7A00]" />
          <p className="text-gray-500 dark:text-zinc-500 text-sm font-mono animate-pulse uppercase tracking-widest font-black">
            Đang kiểm tra quyền truy cập...
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && !hasAdminAccess) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
