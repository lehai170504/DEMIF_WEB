import axiosClient from "@/lib/axios-client";
import { BlogDto, CreateBlogRequest } from "@/types/blog.type";

export const blogService = {
  // 1. Lấy toàn bộ bài viết
  getBlogs: async (): Promise<BlogDto[]> => {
    try {
      const response = await axiosClient.get("/blogs");
      const data = response?.data !== undefined ? response.data : response;

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Critical API Error:", error);
      return [];
    }
  },

  // 2. Lấy chi tiết bài viết
  getBlogById: async (id: string): Promise<BlogDto> => {
    try {
      const response = await axiosClient.get(`/blogs/${id}`);
      return response as unknown as BlogDto;
    } catch (error) {
      console.error("Lỗi API getBlogById:", error);
      throw error;
    }
  },
  // 3. Tạo mới bài viết
  createBlog: async (data: CreateBlogRequest): Promise<BlogDto> => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    ``;
    formData.append("Content", data.Content);
    if (data.Summary) formData.append("Summary", data.Summary);
    if (data.Tags) formData.append("Tags", data.Tags);
    if (data.Status) formData.append("Status", data.Status);
    if (data.ThumbnailFile)
      formData.append("ThumbnailFile", data.ThumbnailFile);

    const response = await axiosClient.post("/admin/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // 4. Cập nhật bài viết (Sửa từ updateStatus thành updateBlog)
  updateBlog: async (id: string, data: CreateBlogRequest): Promise<BlogDto> => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Content", data.Content);

    // Chỉ append nếu có giá trị để tránh gửi chuỗi "null" hoặc "undefined" sang BE
    if (data.Summary !== undefined && data.Summary !== null) {
      formData.append("Summary", data.Summary);
    }
    if (data.Tags !== undefined && data.Tags !== null) {
      formData.append("Tags", data.Tags);
    }
    if (data.Status) {
      formData.append("Status", data.Status);
    }

    // Quan trọng: Chỉ append ThumbnailFile nếu người dùng chọn ảnh mới (là kiểu File)
    // Nếu data.ThumbnailFile là link URL (ảnh cũ), ta không append để BE giữ nguyên ảnh cũ
    if (data.ThumbnailFile instanceof File) {
      formData.append("ThumbnailFile", data.ThumbnailFile);
    }

    const response = await axiosClient.put(`/admin/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // 5. Xóa bài viết
  deleteBlog: async (id: string): Promise<void> => {
    await axiosClient.delete(`/admin/blogs/${id}`);
  },
};
