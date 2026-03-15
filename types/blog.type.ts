export interface BlogDto {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  thumbnailUrl: string;
  tags: string;
  status: string;
  viewCount: number;
  authorId: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateBlogRequest {
  Title: string;
  Content: string;
  Summary?: string;
  Tags?: string;
  Status?: string;
  ThumbnailFile?: File;
}
