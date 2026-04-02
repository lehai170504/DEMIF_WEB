// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRedirectPath = (roles?: string[] | string | null): string => {
  // 1. Nếu không có dữ liệu roles -> Mặc định về trang học viên
  if (!roles) return "/home";

  // 2. Ép kiểu an toàn về mảng (dù backend trả về chuỗi hay mảng)
  const rolesArray = Array.isArray(roles) ? roles : [roles];

  // 3. Kiểm tra xem có chứa role "admin" (không phân biệt hoa/thường, loại bỏ khoảng trắng dư)
  const isAdmin = rolesArray.some(
    (role) => typeof role === "string" && role.trim().toLowerCase() === "admin",
  );

  // 4. Phân luồng trả về đường dẫn
  return isAdmin ? "/admin" : "/home";
};
