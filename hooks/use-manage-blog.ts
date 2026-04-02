import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import { toast } from "sonner";
import { CreateBlogRequest } from "@/types/blog.type";
import { extractErrorMessage } from "@/lib/error";

export const useManageBlog = () => {
  const queryClient = useQueryClient();

  // 1. Hook tạo bài viết mới
  const createBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      // Làm mới danh sách blog để hiển thị bài mới nhất
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Đã xuất bản bài viết mới thành công!");
    },
    onError: (error: any) => {
      toast.error(extractErrorMessage(error, "Không thể tạo bài viết"));
    },
  });

  // 2. Hook cập nhật bài viết (Gửi Multipart Form)
  const updateBlogMutation = useMutation<
    any,
    any,
    { id: string; data: CreateBlogRequest }
  >({
    mutationFn: ({ id, data }) => blogService.updateBlog(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });

      toast.success("Đã lưu thay đổi bài viết thành công!");
    },
    onError: (error: any) => {
      toast.error(extractErrorMessage(error, "Cập nhật bài viết thất bại"));
    },
  });

  // 3. Hook xóa bài viết
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Đã gỡ bài viết khỏi hệ thống.");
    },
    onError: (error: any) => {
      toast.error(extractErrorMessage(error, "Xóa bài viết thất bại"));
    },
  });

  return {
    createBlog: createBlogMutation.mutate,
    isCreating: createBlogMutation.isPending,
    updateBlog: updateBlogMutation.mutate,
    isUpdating: updateBlogMutation.isPending,
    deleteBlog: deleteBlogMutation.mutate,
    isDeleting: deleteBlogMutation.isPending,
  };
};

// 4. Hook lấy chi tiết
export const useBlogDetail = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await blogService.getBlogById(id);
      return response ?? null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
