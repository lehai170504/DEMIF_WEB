import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  // 1. Gọi Backend thật để lấy token
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // 2. Lấy token từ kết quả trả về
  const { accessToken, refreshToken } = data; // Tùy cấu trúc API của bạn

  // 3. Set HttpOnly Cookie (Trình duyệt tự lưu, JS không thấy)
  const cookieStore = cookies();
  (await cookieStore).set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 ngày
  });

  return NextResponse.json({ success: true, user: data.user });
}
