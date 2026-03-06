// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRedirectPath = (roles?: string[] | string | null): string => {
  // 1. Kiểm tra nhanh nếu không có dữ liệu
  if (!roles) return "/home";

  // 2. Chuẩn hóa về mảng, lọc bỏ các giá trị null/undefined và ép về string
  const rolesArray = (Array.isArray(roles) ? roles : [roles])
    .filter(Boolean)
    .map((r) => String(r).trim().toLowerCase());

  // 3. Nếu mảng rỗng sau khi lọc
  if (rolesArray.length === 0) return "/home";

  // 4. Kiểm tra quyền Admin
  const isAdmin = rolesArray.includes("admin");

  return isAdmin ? "/admin" : "/home";
};
