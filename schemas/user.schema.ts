// src/schemas/user.schema.ts
import { z } from "zod";

// Định nghĩa Schema cho User Profile Update
export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Tên hiển thị phải có ít nhất 3 ký tự." })
    .max(50, { message: "Tên hiển thị không được quá 50 ký tự." }),

  avatarUrl: z
    .string()
    .url({ message: "Đường dẫn ảnh không hợp lệ." })
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .max(50, { message: "Tên quốc gia quá dài." })
    .optional()
    .or(z.literal("")),

  nativeLanguage: z
    .string()
    .max(50, { message: "Tên ngôn ngữ quá dài." })
    .optional()
    .or(z.literal("")),

  targetLanguage: z
    .string()
    .max(50, { message: "Tên ngôn ngữ quá dài." })
    .optional()
    .or(z.literal("")),

  currentLevel: z.enum(["Beginner", "Intermediate", "Advanced"], {
    errorMap: () => ({ message: "Trình độ không hợp lệ." }),
  }),

  dailyGoalMinutes: z
    .number({ invalid_type_error: "Vui lòng nhập số hợp lệ." })
    .min(5, { message: "Mục tiêu tối thiểu là 5 phút/ngày." })
    .max(300, { message: "Mục tiêu tối đa là 300 phút/ngày." }),
});

// Type suy ra từ Schema (dùng cho TypeScript)
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export const CreateUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Tên đăng nhập phải có ít nhất 3 ký tự." })
    .max(20, { message: "Tên đăng nhập không quá 20 ký tự." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Chỉ được chứa chữ cái, số và dấu gạch dưới.",
    }),
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email." })
    .email({ message: "Email không hợp lệ." }),
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." })
    .regex(/[A-Z]/, { message: "Mật khẩu phải chứa ít nhất 1 chữ hoa." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.",
    }),
  nativeLanguage: z.string().optional(),
  targetLanguage: z.string().optional(),
  country: z.string().optional(),
  avatarUrl: z.string().optional(),
  roles: z.array(z.string()).optional(),
});

export type CreateUserFormValues = z.infer<typeof CreateUserSchema>;
