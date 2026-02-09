// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // 1. Nếu chưa login mà vào các trang protect -> Redirect về /login
  if (!token && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Nếu đã login mà cố tình vào /login hoặc /signup -> Redirect về /home
  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// Chỉ định các route cần chạy middleware
export const config = {
  matcher: ["/home/:path*", "/login", "/signup"],
};
