// src/hooks/use-users.ts
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { keepPreviousData } from "@tanstack/react-query";
import { GetUsersParams } from "@/types/user.type";

export const useUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUsers(params),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
};
