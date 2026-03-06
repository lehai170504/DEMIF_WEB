import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import { toast } from "sonner";

export const useManageBlog = () => {
  const queryClient = useQueryClient();

  // Hook tạo bài viết
  const createBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Đã xuất bản bài viết mới thành công!");
    },
    onError: () => {
      toast.error("Không thể tạo bài viết. Vui lòng kiểm tra lại dữ liệu.");
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      blogService.updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      toast.success("Đã lưu thay đổi bài viết!");
    },
    onError: () => {
      toast.error("Cập nhật thất bại. Vui lòng thử lại.");
    },
  });

  // Hook xóa bài viết
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Đã gỡ bài viết khỏi hệ thống.");
    },
  });

  return {
    createBlog: createBlogMutation.mutate,
    isCreating: createBlogMutation.isPending,
    deleteBlog: deleteBlogMutation.mutate,
    isDeleting: deleteBlogMutation.isPending,
    updateBlog: updateBlogMutation.mutate,
    isUpdating: updateBlogMutation.isPending,
  };
};

export const useBlogDetail = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getBlogById(id),
    enabled: !!id && enabled, // Chỉ gọi khi có ID và được phép
  });
};
