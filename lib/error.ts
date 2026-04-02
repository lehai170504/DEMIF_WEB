// src/lib/error.ts
export const extractErrorMessage = (
  error: any,
  fallbackMessage?: string, // Thêm dấu ? ở đây
): string => {
  return (
    error?.response?.data?.error ||
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    fallbackMessage ||
    "Đã có lỗi xảy ra. Vui lòng thử lại sau."
  );
};
