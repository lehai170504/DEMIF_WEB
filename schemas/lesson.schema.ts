import { z } from "zod";

export const LessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().optional().default(""),

  lessonType: z.string().min(1, "Vui lòng chọn loại bài học"),
  level: z.string().min(1, "Vui lòng chọn cấp độ"),

  category: z.string().min(1, "Vui lòng nhập danh mục"),

  audioUrl: z
    .string()
    .url("Link audio không hợp lệ")
    .optional()
    .or(z.literal("")),
  mediaUrl: z
    .string()
    .url("Link video không hợp lệ")
    .optional()
    .or(z.literal("")),
  thumbnailUrl: z
    .string()
    .url("Link ảnh không hợp lệ")
    .optional()
    .or(z.literal("")),

  // Content
  mediaType: z.string().default("audio"),
  fullTranscript: z.string().optional(),
  timedTranscript: z.string().optional(),

  // Settings
  durationSeconds: z.coerce.number().min(0),
  displayOrder: z.coerce.number().min(0),
  isPremiumOnly: z.boolean().default(false),
  status: z.string().default("draft"),
  tags: z.string().optional(),
});

export type LessonFormValues = z.infer<typeof LessonSchema>;
