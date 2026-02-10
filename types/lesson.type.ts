// src/types/lesson.type.ts

export interface LessonDto {
  id: string;
  title: string;
  description: string;
  lessonType: "Dictation" | "Shadowing" | "Test" | string; // Linh hoạt cho string từ BE
  level: "Beginner" | "Intermediate" | "Advanced" | string;
  category: string;
  audioUrl: string;
  mediaUrl: string;
  mediaType: string;
  durationSeconds: number;
  thumbnailUrl: string;
  fullTranscript: string;
  dictationTemplate: string;
  isPremiumOnly: boolean;
  displayOrder: number;
  tags: string;
  status: "Published" | "Draft" | "Review" | string;
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

// Request Payload cho Create/Update
export interface CreateLessonRequest {
  title: string;
  description: string;
  lessonType: string;
  level: string;
  category: string;
  audioUrl: string;
  mediaUrl: string;
  mediaType: string;
  durationSeconds: number;
  thumbnailUrl: string;
  fullTranscript: string;
  dictationTemplate: string;
  isPremiumOnly: boolean;
  displayOrder: number;
  tags: string;
  status: string;
}
