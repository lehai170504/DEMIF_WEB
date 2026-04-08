// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRedirectPath = (roles?: string[] | string | null): string => {
  if (!roles) return "/home";

  const rolesArray = Array.isArray(roles) ? roles : [roles];

  const isAdmin = rolesArray.some((role) => {
    if (typeof role !== "string") return false;
    return role.trim().toLowerCase() === "admin";
  });

  const isModerator = rolesArray.some((role) => {
    if (typeof role !== "string") return false;
    return role.trim().toLowerCase() === "moderator";
  });

  if (isAdmin) return "/admin";
  if (isModerator) return "/admin/lessons";

  return "/home";
};
