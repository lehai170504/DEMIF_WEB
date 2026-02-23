// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRedirectPath = (roles?: string[] | string | null) => {
  if (!roles) return "/home";

  if (Array.isArray(roles)) {
    if (roles.includes("Admin")) return "/admin";
  } else if (typeof roles === "string") {
    if (roles === "Admin") return "/admin";
  }

  return "/home";
};
