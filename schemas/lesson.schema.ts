import { z } from "zod";

export const LessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  lessonType: z.string().min(1, "Vui lòng chọn loại bài"),
  level: z.string().min(1, "Vui lòng chọn cấp độ"),
  category: z.string().min(1, "Danh mục không được để trống"),
  // Các trường URL để z.string().nullable() hoặc .optional() để khớp BE
  audioUrl: z.string().nullable().optional(),
  mediaUrl: z.string().nullable().optional(),
  mediaType: z.string().default("audio"),
  thumbnailUrl: z.string().nullable().optional(),
  fullTranscript: z.string().min(1, "Transcript không được để trống"),
  timedTranscript: z.string().nullable().optional(),
  tags: z.string().nullable().optional(),
  status: z.string().default("draft"),
  durationSeconds: z.coerce.number().min(0),
  displayOrder: z.coerce.number().min(0),
  isPremiumOnly: z.boolean().default(false),
});

export type LessonFormValues = z.infer<typeof LessonSchema>;
