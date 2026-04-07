// src/hooks/use-blog.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import { toast } from "sonner";
import { CreateBlogRequest } from "@/types/blog.type";
import { extractErrorMessage } from "@/lib/error";

export const useManageBlog = () => {
  const queryClient = useQueryClient();

  // 1. Hook tạo bài viết mới (Export trực tiếp cho Admin)
  const createBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      toast.success("Xuất bản thành công", {
        description: "Bài viết mới đã được đưa lên hệ thống.",
      });
      // Làm mới danh sách blog
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: any) => {
      toast.error("Lỗi xuất bản", {
        description: extractErrorMessage(
          error,
          "Không thể tạo bài viết vào lúc này.",
        ),
      });
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
      toast.success("Cập nhật hoàn tất", {
        description: "Nội dung bài viết đã được thay đổi thành công.",
      });
      // Refresh cả danh sách và chi tiết bài đó
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });
    },
    onError: (error: any) => {
      toast.error("Cập nhật thất bại", {
        description: extractErrorMessage(
          error,
          "Lỗi khi lưu thay đổi bài viết.",
        ),
      });
    },
  });

  // 3. Hook xóa bài viết
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      toast.success("Đã gỡ bài viết", {
        description: "Bài viết đã được loại bỏ hoàn toàn khỏi hệ thống.",
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: any) => {
      toast.error("Lỗi xóa bài", {
        description: extractErrorMessage(error, "Không thể xóa bài viết này."),
      });
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

// 4. Hook lấy chi tiết bài viết
export const useBlogDetail = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await blogService.getBlogById(id);
      return response ?? null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Cache trong 5 phút
    retry: 1,
  });
};
