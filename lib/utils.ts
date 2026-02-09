// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRedirectPath = (roles: string[] = []) => {
  if (roles && roles.includes("Admin")) {
    return "/admin";
  }
  return "/home";
};
