// 1. Dữ liệu của một bài Blog
export interface BlogDto {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string | null;
  summary: string | null;
  thumbnailUrl: string | null;
  tags: string | null;
  status: "published" | "draft" | "archived" | string;
  isFeatured: boolean;
  viewCount: number;
  readingTimeMinutes: number;
  authorId: string;
  authorName: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  isDeleted?: boolean;
  deletedAt?: string | null;
}

// 2. Dữ liệu trả về khi gọi danh sách (Paged)
export interface PagedBlogResponse {
  items: BlogDto[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// 3. Request tạo/cập nhật Blog (Dựa theo Note 4.2, 4.3 & 7)
export interface CreateBlogRequest {
  title: string;
  content: string;
  slug?: string;
  category?: string;
  summary?: string;
  tags?: string;
  isFeatured?: boolean;
  status?: "published" | "draft" | "archived" | string;
  thumbnailFile?: File;
}

// Update thường giống Create, ta kế thừa cho gọn
export interface UpdateBlogRequest extends CreateBlogRequest {}

// 4. Request params dùng cho bộ lọc Filter
export interface GetBlogsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  tag?: string;
  status?: "all" | "published" | "draft" | "archived" | string;
  sortBy?: "publishedAt" | "createdAt" | "title" | "views" | string;
  sortDirection?: "asc" | "desc";
  includeDeleted?: boolean;
}
