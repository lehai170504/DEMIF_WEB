// src/types/lesson.type.ts

export interface LessonDto {
  id: string;
  title: string;
  description: string;
  lessonType: "Dictation" | "Shadowing" | "Test" | "0" | "1" | "2" | string;
  level: "Beginner" | "Intermediate" | "Advanced" | "0" | "1" | "2" | string;

  category: string | null; // Có bài học bị null

  // URLs có thể null
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
  status: "published" | "draft" | "review" | "archived" | string;

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

// Request gửi lên khi Create / Update
export interface CreateLessonRequest {
  title: string;
  description: string;
  lessonType: number;
  level: number;
  category: string;
  audioUrl?: string;
  mediaUrl?: string;
  mediaType?: string;
  durationSeconds: number;
  thumbnailUrl?: string;
  fullTranscript: string;
  timedTranscript?: string;
  isPremiumOnly: boolean;
  displayOrder: number;
  tags?: string;
  status: string;
}
