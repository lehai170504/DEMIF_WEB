// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // 1. Nếu CHƯA login mà vào trang nội bộ -> Về /login
  if (
    !token &&
    (pathname.startsWith("/home") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. ĐÃ FIX: Chỉ chặn /login và /signup. Ép về "/" để page.tsx tự phân luồng.
  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/admin/:path*", "/login", "/signup"],
};
