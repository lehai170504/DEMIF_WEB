import { z } from "zod";

export const BlogSchema = z.object({
  Title: z.string().min(1, "Tiêu đề không được để trống"),
  Content: z.string().min(1, "Nội dung không được để trống"),
  Summary: z.string().optional().nullable(),
  Tags: z.string().optional().nullable(),
  Status: z.string().default("Published"),

  ThumbnailFile: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      "Tệp tin phải là một định dạng ảnh hợp lệ",
    ),
});

export type BlogFormValues = z.infer<typeof BlogSchema>;
