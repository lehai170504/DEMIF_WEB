import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Hàm xử lý chung cho mọi method (GET, POST, PUT, DELETE...)
async function handleProxy(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  // 1. Tái tạo đường dẫn API thật
  // Ví dụ: Client gọi /api/proxy/products -> API thật: https://backend.com/api/v1/products
  const path = params.path.join("/");
  const apiUrl = `${process.env.API_URL}/${path}`;

  // 2. Chuẩn bị Headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Gắn Token vào Header (Đây là lúc phép màu xảy ra)
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // 3. Lấy body (nếu có)
  let body = null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = JSON.stringify(await request.json());
    } catch (e) {
      // Body rỗng hoặc lỗi
    }
  }

  // 4. Gọi Backend thật
  try {
    const response = await fetch(apiUrl, {
      method: request.method,
      headers,
      body,
      // Chuyển tiếp các query params (ví dụ ?page=1)
      cache: "no-store",
    });

    const data = await response.json();

    // 5. Trả kết quả về cho Axios Client
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: "Proxy Error" }, { status: 500 });
  }
}

// Export các method muốn hỗ trợ
export {
  handleProxy as GET,
  handleProxy as POST,
  handleProxy as PUT,
  handleProxy as DELETE,
  handleProxy as PATCH,
};
