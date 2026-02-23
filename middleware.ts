// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // 1. CẬP NHẬT: Nếu chưa login mà vào trang protect (/home, /admin) -> Về login
  if (
    !token &&
    (pathname.startsWith("/home") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. CẬP NHẬT: Nếu ĐÃ login mà ở trang /login hoặc /signup
  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// Thêm /admin/:path* vào matcher
export const config = {
  matcher: ["/home/:path*", "/admin/:path*", "/login", "/signup"],
};
