// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Hàm hỗ trợ giải mã JWT trong môi trường Edge của Next.js
function getRolesFromToken(token: string): string[] {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    const decoded = JSON.parse(jsonPayload);

    // Lấy Role từ token (Tuỳ thuộc vào BE cấu hình trả về)
    const roleClaim =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      decoded.roles ||
      decoded.role;

    if (Array.isArray(roleClaim)) return roleClaim;
    if (typeof roleClaim === "string") return [roleClaim];
    return [];
  } catch (error) {
    return [];
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  if (
    !token &&
    (pathname.startsWith("/home") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && pathname.startsWith("/admin")) {
    const roles = getRolesFromToken(token);

    const hasAdminAccess = roles.some((role) => {
      const normalizedRole = role.toLowerCase();
      return normalizedRole === "admin" || normalizedRole === "moderator";
    });

    if (!hasAdminAccess) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/admin/:path*", "/login", "/signup"],
};
