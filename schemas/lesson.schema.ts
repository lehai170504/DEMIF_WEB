import { z } from "zod";

/* ================= ENUM VALUES (String để khớp UI) ================= */
export const LESSON_TYPE_VALUES = ["0", "1"] as const;
export const LESSON_LEVEL_VALUES = ["0", "1", "2", "3"] as const;

/* ================= QUICK CREATE SCHEMA ================= */
/* ================= QUICK CREATE SCHEMA ================= */
// Cập nhật Schema sử dụng String theo Note của BE
export const CreateLessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  transcript: z.string().min(1, "Nội dung transcript không được để trống"),
  format: z.string().default("auto"),
  mediaUrl: z
    .string()
    .min(1, "Media URL không được để trống")
    .url("URL không hợp lệ"),
  mediaType: z.string().default("youtube"),
  durationSeconds: z.coerce.number().default(0),
  level: z.string().min(1, "Vui lòng chọn cấp độ"),
  lessonType: z.string().min(1, "Vui lòng chọn loại bài học"),
  category: z.string().default("academic"),
  tags: z.string().default(""),
  thumbnailUrl: z.string().optional(),
});

export type CreateLessonFormValues = z.infer<typeof CreateLessonSchema>;

export const UpdateLessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được trống"),
  description: z.string().min(1, "Mô tả không được trống"),
  level: z.string().min(1, "Vui lòng chọn cấp độ"),
  lessonType: z.string().min(1, "Vui lòng chọn loại bài học"),

  tags: z.string().nullable().optional(),
  isPremiumOnly: z.boolean().default(false),
  displayOrder: z.coerce.number().int().min(0).default(0),
  category: z.string().optional(),
  mediaUrl: z.string().url("URL không hợp lệ").or(z.literal("")),
  mediaType: z.string().default("youtube"),
  audioUrl: z
    .string()
    .url("URL không hợp lệ")
    .nullable()
    .optional()
    .or(z.literal("")),
  thumbnailUrl: z
    .string()
    .url("URL không hợp lệ")
    .nullable()
    .optional()
    .or(z.literal("")),

  fullTranscript: z.string().optional(),
});

export type UpdateLessonFormValues = z.infer<typeof UpdateLessonSchema>;
