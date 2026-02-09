// src/hooks/use-debounce.ts
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Tạo timeout để set value sau khoảng delay
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    // Clear timeout nếu value thay đổi trước khi delay kết thúc (người dùng gõ tiếp)
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
