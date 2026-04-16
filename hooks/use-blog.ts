import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import { toast } from "sonner";
import {
  CreateBlogRequest,
  GetBlogsParams,
  UpdateBlogRequest,
} from "@/types/blog.type";
import { extractErrorMessage } from "@/lib/error";

// 1. Hook lấy danh sách blog cho Public
export const usePublicBlogs = (params?: GetBlogsParams) => {
  return useQuery({
    queryKey: ["blogs", "public", params],
    queryFn: () => blogService.getPublicBlogs(params),
    staleTime: 1000 * 60 * 5,
  });
};

// 2. Hook lấy danh sách blog cho Admin
export const useAdminBlogs = (params?: GetBlogsParams) => {
  return useQuery({
    queryKey: ["blogs", "admin", params],
    queryFn: () => blogService.getAdminBlogs(params),
    staleTime: 1000 * 60 * 2,
  });
};

// 3. Hook lấy chi tiết bài viết
export const useBlogDetail = (
  identifier: string,
  type: "id" | "slug" = "id",
) => {
  return useQuery({
    queryKey: ["blog", type, identifier],
    queryFn: () =>
      type === "slug"
        ? blogService.getBlogBySlug(identifier)
        : blogService.getBlogById(identifier),
    enabled: !!identifier,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

// 4. Hook Quản lý (Create, Update, Delete)
export const useManageBlog = () => {
  const queryClient = useQueryClient();

  // Tạo bài viết mới
  const createBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      toast.success("Xuất bản thành công", {
        description: "Bài viết mới đã được đưa lên hệ thống.",
      });
      // Refresh mọi list liên quan đến blog
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

  // Cập nhật bài viết
  const updateBlogMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBlogRequest }) =>
      blogService.updateBlog(id, data),
    onSuccess: (_, variables) => {
      toast.success("Cập nhật hoàn tất", {
        description: "Nội dung bài viết đã được thay đổi thành công.",
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", "id", variables.id] });
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

  // Xóa bài viết (Note 4.4)
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      toast.success("Đã xóa bài viết", {
        description:
          "Bài viết đã được chuyển vào trạng thái lưu trữ (Archived).",
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
