// src/lib/error.ts
export const extractErrorMessage = (
  error: any,
  fallbackMessage?: string,
): string => {
  const data = error?.response?.data;

  const rawError = data?.error || data?.detail || data?.message;

  if (Array.isArray(rawError)) {
    return rawError[0] || fallbackMessage || "Lỗi dữ liệu không hợp lệ.";
  }

  return (
    (typeof rawError === "string" ? rawError : null) ||
    fallbackMessage ||
    "Đã có lỗi xảy ra. Vui lòng thử lại sau."
  );
};
