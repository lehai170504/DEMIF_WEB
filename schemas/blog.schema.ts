import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),

  content: z.string().min(1, "Nội dung bài viết không được để trống"),

  slug: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  category: z.string().optional().nullable(),

  summary: z.string().optional().nullable(),

  tags: z.string().optional().nullable(),

  status: z.enum(["published", "draft", "archived"]).default("published"),

  isFeatured: z.boolean().default(false),

  // Xử lý File ảnh
  thumbnailFile: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      "Tệp tin phải là một định dạng ảnh hợp lệ",
    ),
});

export type BlogFormValues = z.infer<typeof BlogSchema>;
