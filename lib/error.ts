// src/lib/error.ts
export const extractErrorMessage = (
  error: any,
  fallbackMessage: string,
): string => {
  return (
    error?.response?.data?.error ||
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    fallbackMessage
  );
};
