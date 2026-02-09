// src/hooks/use-user-detail.ts
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";

export const useUserDetail = (userId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["user-detail", userId],
    queryFn: () => userService.getUserById(userId),
    enabled: enabled && !!userId, // Chỉ fetch khi có ID và enabled = true
    staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút
    retry: 1, // Thử lại 1 lần nếu lỗi
  });
};
