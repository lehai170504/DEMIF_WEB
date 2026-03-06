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

  // 2. Nếu ĐÃ login mà truy cập vào /login hoặc /signup
  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/admin/:path*", "/login", "/signup"],
};
