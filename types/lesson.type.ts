// src/types/lesson.type.ts

export interface LessonDto {
  id: string;
  title: string;
  description: string;
  // Đổi thành string để đồng bộ với cách Select/Input hoạt động hiện tại
  lessonType: string;
  level: string;

  category: string | null;
  audioUrl: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  thumbnailUrl: string | null;

  durationSeconds: number;
  fullTranscript: string;
  timedTranscript: string | null;
  hasDictationTemplates: boolean;

  isPremiumOnly: boolean;
  displayOrder: number;
  tags: string | null;
  status: string; // Đồng bộ string

  completionsCount: number;
  avgScore: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetLessonsParams {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
  type?: string;
}

export interface GetLessonsResponse {
  items: LessonDto[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// Request dùng chung cho cả Create và Update để tránh lặp lại code
export interface CreateLessonRequest {
  title: string;
  description: string;
  lessonType: string;
  level: string;
  category: string;
  audioUrl?: string | null;
  mediaUrl?: string | null;
  mediaType?: string | null;
  durationSeconds: number;
  thumbnailUrl?: string | null;
  fullTranscript: string;
  timedTranscript?: string | null;
  isPremiumOnly: boolean;
  displayOrder: number;
  tags?: string | null;
  status: string;
}

export interface UpdateLessonRequest extends Partial<CreateLessonRequest> {}
