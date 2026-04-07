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

  // Bắt buộc nhập, và phải là đường dẫn hợp lệ (http/https)
  mediaUrl: z
    .string()
    .min(1, "Media URL không được để trống")
    .url("Đường dẫn Media không hợp lệ (Cần bắt đầu bằng http/https)"),

  mediaType: z.string().min(1, "Vui lòng chọn loại media").default("audio"),

  // Ảnh bìa: Không bắt buộc. Nhưng nếu có nhập thì phải là URL hợp lệ
  thumbnailUrl: z
    .union([z.string().url("Đường dẫn ảnh bìa không hợp lệ"), z.literal("")])
    .nullable()
    .optional(),

  tags: z.string().nullable().optional(),

  // Thứ tự hiển thị: Từ 0 trở lên và phải là số nguyên (không có vụ thứ tự 1.5)
  displayOrder: z.coerce
    .number({ invalid_type_error: "Thứ tự hiển thị phải là số" })
    .int("Thứ tự hiển thị phải là số nguyên")
    .min(0, "Thứ tự hiển thị không được là số âm")
    .default(0),

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
  // Audio phụ: Không bắt buộc, nhưng nếu nhập phải chuẩn URL
  audioUrl: z
    .union([z.string().url("Đường dẫn Audio không hợp lệ"), z.literal("")])
    .nullable()
    .optional(),

  fullTranscript: z.string().optional(),
});

// ==========================================
// TYPES CHO REACT HOOK FORM
// ==========================================
export type CreateLessonFormValues = z.infer<typeof CreateLessonSchema>;
export type UpdateLessonFormValues = z.infer<typeof UpdateLessonSchema>;
