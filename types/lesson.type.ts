// src/types/lesson.type.ts

// Đây là file định nghĩa các interface liên quan đến bài học (Lesson) trong hệ thống.
export interface LessonDto {
  id: string;
  title: string;
  description: string;
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

// Các interface liên quan đến tạo và cập nhật bài học
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

export interface DictationSegmentPreview {
  index: number;
  startTime: number;
  endTime: number;
  text: string;
  wordCount: number;
}

// --- 3. Interface cho API preview bài tập điền từ (Dictation) ---
export interface DictationPreviewResponse {
  lessonId: string;
  title: string;
  status: string;
  totalSegments: number;
  totalWords: number;
  readyToPublish: boolean;
  publishBlockers: string[];
  segments: DictationSegmentPreview[];
}

// --- 4. Các interface liên quan đến cập nhật trạng thái bài học ---
export interface UpdateLessonStatusRequest {
  status: string; // "draft" | "published" | "archived"
}

export interface UpdateLessonStatusResponse {
  lessonId: string;
  title: string;
  previousStatus: string;
  newStatus: string;
  message: string;
}

// --- 5. Interface cho API cập nhật transcript ---
export interface UpdateTranscriptRequest {
  rawContent: string;
  format: "plain" | "vtt" | "srt";
}

export interface UpdateTranscriptResponse {
  lessonId: string;
  segmentCount: number;
  wordCount: number;
  dictationTemplatesRegenerated: boolean;
  message: string;
}

// --- 6. Interface cho API tạo bài học từ YouTube ---
export interface CreateLessonFromYoutubeRequest {
  youtubeUrl: string;
  captionLanguage: string; // vd: "en", "vi"
  lessonType: string; // "Dictation" | "Shadowing"
  level: string;
  category: string;
  isPremiumOnly: boolean;
  displayOrder: number;
  tags?: string;
  status: string;
  titleOverride?: string; // Nếu muốn đặt tiêu đề khác với tiêu đề video
  descriptionOverride?: string;
}

export interface CreateLessonFromYoutubeResponse {
  lessonId: string;
  title: string;
  youtubeId: string;
  segmentCount: number;
  message: string;
}

// --- 7. Interface cho API preview thông tin video YouTube trước khi tạo bài học ---
export interface YoutubePreviewResponse {
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  durationSeconds: number;
  thumbnailUrl: string;
  embedUrl: string;
  hasCaptions: boolean;
  availableCaptionLanguages: string[];
  suggestedCategory: string;
}
