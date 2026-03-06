// src/hooks/use-blogs.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";

export const useBlogs = (params?: any) => {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => blogService.getBlogs(),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
};
