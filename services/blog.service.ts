import axiosClient from "@/lib/axios-client";
import {
  BlogDto,
  CreateBlogRequest,
  UpdateBlogRequest,
  PagedBlogResponse,
  GetBlogsParams,
} from "@/types/blog.type";

export const blogService = {
  // ===================== ADMIN APIS =====================

  // 1. Lấy danh sách bài viết cho CMS
  getAdminBlogs: async (
    params?: GetBlogsParams,
  ): Promise<PagedBlogResponse> => {
    try {
      const response = await axiosClient.get("/admin/blogs", { params });
      // FIX: Ép kiểu as PagedBlogResponse
      return (
        response.data !== undefined ? response.data : response
      ) as PagedBlogResponse;
    } catch (error) {
      console.error("Lỗi API getAdminBlogs:", error);
      throw error;
    }
  },

  // 2. Tạo mới bài viết
  createBlog: async (
    data: CreateBlogRequest,
  ): Promise<{ message: string; blogId: string }> => {
    const formData = new FormData();
    // Bắt buộc
    formData.append("title", data.title);
    formData.append("content", data.content);

    // Optional
    if (data.slug) formData.append("slug", data.slug);
    if (data.category) formData.append("category", data.category);
    if (data.summary) formData.append("summary", data.summary);
    if (data.tags) formData.append("tags", data.tags);
    if (data.status) formData.append("status", data.status);
    if (data.isFeatured !== undefined)
      formData.append("isFeatured", String(data.isFeatured));

    // File ảnh
    if (data.thumbnailFile instanceof File) {
      formData.append("thumbnailFile", data.thumbnailFile);
    }

    const response = await axiosClient.post("/admin/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // FIX: Ép kiểu Response
    return (response.data !== undefined ? response.data : response) as {
      message: string;
      blogId: string;
    };
  },

  // 3. Cập nhật bài viết
  updateBlog: async (
    id: string,
    data: UpdateBlogRequest,
  ): Promise<{ message: string }> => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (data.slug) formData.append("slug", data.slug);
    if (data.category) formData.append("category", data.category);
    if (data.summary !== undefined && data.summary !== null)
      formData.append("summary", data.summary);
    if (data.tags !== undefined && data.tags !== null)
      formData.append("tags", data.tags);
    if (data.status) formData.append("status", data.status);
    if (data.isFeatured !== undefined)
      formData.append("isFeatured", String(data.isFeatured));

    if (data.thumbnailFile instanceof File) {
      formData.append("thumbnailFile", data.thumbnailFile);
    }

    const response = await axiosClient.put(`/admin/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // FIX: Ép kiểu Response
    return (response.data !== undefined ? response.data : response) as {
      message: string;
    };
  },

  // 4. Xóa bài viết
  deleteBlog: async (id: string): Promise<{ message: string }> => {
    const response = await axiosClient.delete(`/admin/blogs/${id}`);
    // FIX: Ép kiểu Response
    return (response.data !== undefined ? response.data : response) as {
      message: string;
    };
  },

  // ===================== PUBLIC APIS =====================

  // 5. Lấy danh sách Public
  getPublicBlogs: async (
    params?: GetBlogsParams,
  ): Promise<PagedBlogResponse> => {
    try {
      const response = await axiosClient.get("/blogs", { params });
      return (
        response.data !== undefined ? response.data : response
      ) as PagedBlogResponse;
    } catch (error) {
      console.error("Lỗi API getPublicBlogs:", error);
      throw error;
    }
  },

  // 6. Lấy chi tiết ưu tiên qua slug
  getBlogBySlug: async (slug: string): Promise<BlogDto> => {
    try {
      const response = await axiosClient.get(`/blogs/slug/${slug}`);
      return (
        response.data !== undefined ? response.data : response
      ) as BlogDto;
    } catch (error) {
      console.error("Lỗi API getBlogBySlug:", error);
      throw error;
    }
  },

  // 7. Fallback: Lấy chi tiết qua ID
  getBlogById: async (id: string): Promise<BlogDto> => {
    try {
      const response = await axiosClient.get(`/blogs/${id}`);
      return (
        response.data !== undefined ? response.data : response
      ) as BlogDto;
    } catch (error) {
      console.error("Lỗi API getBlogById:", error);
      throw error;
    }
  },
};
