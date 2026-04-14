import { z } from "zod";

// ==========================================
// 1. BASE SCHEMA: Các trường bắt buộc phải có cho cả CREATE và UPDATE
// ==========================================
const BaseLessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),

  // Chuyển sang number để khớp value của Select và BE
  lessonType: z.coerce.number({
    errorMap: () => ({ message: "Vui lòng chọn loại bài học" }),
  }),

  level: z.coerce.number({
    errorMap: () => ({ message: "Vui lòng chọn cấp độ" }),
  }),

  category: z.string().min(1, "Danh mục không được để trống"),
  mediaUrl: z
    .string()
    .min(1, "Media URL không được để trống")
    .url("URL không hợp lệ"),
  mediaType: z.string().min(1).default("audio"),

  thumbnailUrl: z
    .union([z.string().url("URL không hợp lệ"), z.literal("")])
    .nullable()
    .optional(),

  tags: z.string().nullable().optional(),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isPremiumOnly: z.boolean().default(false),
});
// ==========================================
// 2. SCHEMA CHO FORM TẠO MỚI (POST /quick-create)
// ==========================================
export const CreateLessonSchema = BaseLessonSchema.extend({
  transcript: z.string().min(1, "Vui lòng dán nội dung transcript vào đây"),
  format: z.string().min(1, "Vui lòng chọn định dạng (srt, vtt, plain)"),

  // Thời lượng: Dùng .positive() để bắt buộc > 0 (không chấp nhận 0 hoặc số âm)
  durationSeconds: z.coerce
    .number({ invalid_type_error: "Thời lượng phải là số" })
    .positive("Thời lượng bài học bắt buộc phải lớn hơn 0 giây"),
});

// ==========================================
// 3. SCHEMA CHO FORM CẬP NHẬT (PUT /{id})
// ==========================================
export const UpdateLessonSchema = BaseLessonSchema.extend({
  audioUrl: z
    .union([z.string().url(), z.literal("")])
    .nullable()
    .optional(),
  fullTranscript: z.string().optional(),
});

// ==========================================
// TYPES CHO REACT HOOK FORM
// ==========================================
export type CreateLessonFormValues = z.infer<typeof CreateLessonSchema>;
export type UpdateLessonFormValues = z.infer<typeof UpdateLessonSchema>;
