import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const result = await blogService.getBlogs();
      return result ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
};
