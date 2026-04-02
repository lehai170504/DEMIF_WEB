import { z } from "zod";

// ==========================================
// 1. BASE SCHEMA: Các trường bắt buộc phải có cho cả CREATE và UPDATE
// ==========================================
const BaseLessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  lessonType: z.string().min(1, "Vui lòng chọn loại bài học (VD: Dictation)"),
  level: z.string().min(1, "Vui lòng chọn cấp độ (VD: Beginner)"),
  category: z.string().min(1, "Danh mục không được để trống"),

  mediaUrl: z.string().min(1, "Media URL không được để trống"),
  mediaType: z.string().min(1, "Vui lòng chọn loại media").default("audio"),

  thumbnailUrl: z.string().nullable().optional(),
  tags: z.string().nullable().optional(),
  displayOrder: z.coerce
    .number()
    .min(0, "Thứ tự hiển thị phải lớn hơn hoặc bằng 0")
    .default(0),
  isPremiumOnly: z.boolean().default(false),
});

// ==========================================
// 2. SCHEMA CHO FORM TẠO MỚI (POST /quick-create)
// ==========================================
export const CreateLessonSchema = BaseLessonSchema.extend({
  transcript: z.string().min(1, "Vui lòng dán nội dung transcript vào đây"),
  format: z.string().min(1, "Vui lòng chọn định dạng (srt, vtt, plain)"),
  durationSeconds: z.coerce.number().min(1, "Thời lượng phải lớn hơn 0 giây"),
});

// ==========================================
// 3. SCHEMA CHO FORM CẬP NHẬT (PUT /{id})
// ==========================================
export const UpdateLessonSchema = BaseLessonSchema.extend({
  audioUrl: z.string().nullable().optional(),
  fullTranscript: z.string().optional(),
});

// ==========================================
// TYPES CHO REACT HOOK FORM
// ==========================================
export type CreateLessonFormValues = z.infer<typeof CreateLessonSchema>;
export type UpdateLessonFormValues = z.infer<typeof UpdateLessonSchema>;
