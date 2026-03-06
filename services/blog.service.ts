import axiosClient from "@/lib/axios-client";
import { BlogDto, CreateBlogRequest } from "@/types/blog.type";

export const blogService = {
  // GET List - Lấy danh sách bài viết
  getBlogs: async (): Promise<BlogDto[]> => {
    const response = await axiosClient.get("/Blogs");
    return (response as any).data ?? response;
  },

  // GET Detail - Lấy chi tiết bài viết theo ID
  getBlogById: async (id: string): Promise<BlogDto> => {
    const response = await axiosClient.get(`/Blogs/${id}`);
    return (response as any).data ?? response;
  },

  // CREATE - Tạo bài viết mới (Sử dụng Multipart Form Data cho ThumbnailFile)
  createBlog: async (data: CreateBlogRequest): Promise<BlogDto> => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Content", data.Content);
    if (data.Summary) formData.append("Summary", data.Summary);
    if (data.Tags) formData.append("Tags", data.Tags);
    if (data.Status) formData.append("Status", data.Status);

    // Đính kèm file binary nếu có
    if (data.ThumbnailFile) {
      formData.append("ThumbnailFile", data.ThumbnailFile);
    }

    const response = await axiosClient.post("/Blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return (response as any).data ?? response;
  },

  updateBlog: async (id: string, data: CreateBlogRequest): Promise<BlogDto> => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Content", data.Content);
    if (data.Summary) formData.append("Summary", data.Summary);
    if (data.Tags) formData.append("Tags", data.Tags);
    if (data.Status) formData.append("Status", data.Status);

    // Chỉ đính kèm file nếu người dùng chọn ảnh mới
    if (data.ThumbnailFile instanceof File) {
      formData.append("ThumbnailFile", data.ThumbnailFile);
    }

    const response = await axiosClient.put(`/Blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return (response as any).data ?? response;
  },

  // DELETE - Xóa bài viết
  deleteBlog: async (id: string): Promise<void> => {
    const response = await axiosClient.delete(`/Blogs/${id}`);
    return (response as any).data ?? response;
  },
};
