import { z } from "zod";

/* ================= ENUM VALUES (String để khớp UI) ================= */
export const LESSON_TYPE_VALUES = ["0", "1"] as const;
export const LESSON_LEVEL_VALUES = ["0", "1", "2", "3"] as const;

/* ================= QUICK CREATE SCHEMA ================= */
export const CreateLessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),

  transcript: z.string().min(1, "Nội dung transcript không được để trống"),
  format: z.string().default("auto"),

  mediaUrl: z
    .string()
    .min(1, "Media URL không được để trống")
    .url("URL không hợp lệ"),

  // 0: Beginner, 1: Intermediate, 2: Advanced, 3: Expert
  level: z.enum(LESSON_LEVEL_VALUES, {
    errorMap: () => ({ message: "Vui lòng chọn cấp độ" }),
  }),

  // 0: Dictation, 1: Shadowing
  lessonType: z.enum(LESSON_TYPE_VALUES, {
    errorMap: () => ({ message: "Vui lòng chọn loại bài học" }),
  }),

  // Chuỗi các tag cách nhau bằng dấu phẩy
  tags: z.string().default(""),
});

/* ================= TYPE CHO REACT HOOK FORM ================= */
export type CreateLessonFormValues = z.infer<typeof CreateLessonSchema>;

export const UpdateLessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được trống"),
  description: z.string().min(1, "Mô tả không được trống"),
  level: z.enum(LESSON_LEVEL_VALUES),
  lessonType: z.enum(LESSON_TYPE_VALUES),
  tags: z.string().nullable().optional(),
  isPremiumOnly: z.boolean().default(false),
  displayOrder: z.coerce.number().int().min(0).default(0),
  // Mở rộng thêm các trường bổ sung
  category: z.string().optional(),
  mediaUrl: z.string().url().optional(),
  mediaType: z.string().optional(),
  audioUrl: z.string().url().nullable().optional(),
  fullTranscript: z.string().optional(),
  thumbnailUrl: z.string().url().nullable().optional().or(z.literal("")),
});

export type UpdateLessonFormValues = z.infer<typeof UpdateLessonSchema>;
