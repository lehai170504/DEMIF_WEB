// src/schemas/auth.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập địa chỉ email." })
    .email({ message: "Địa chỉ email không hợp lệ." }),

  password: z
    .string()
    .min(1, { message: "Vui lòng nhập mật khẩu." })
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." })
    .regex(/[A-Z]/, { message: "Mật khẩu phải chứa ít nhất 1 chữ in hoa." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.",
    }),
});

// Type tự động suy ra từ Schema
export type LoginFormValues = z.infer<typeof loginSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Vui lòng nhập mật khẩu hiện tại." }),

    newPassword: z
      .string()
      .min(6, { message: "Mật khẩu mới phải có ít nhất 6 ký tự." })
      .regex(/[A-Z]/, { message: "Mật khẩu mới phải chứa chữ in hoa." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Mật khẩu mới phải chứa ký tự đặc biệt.",
      }),

    confirmNewPassword: z
      .string()
      .min(1, { message: "Vui lòng xác nhận mật khẩu mới." }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmNewPassword"], // Gắn lỗi vào trường confirmNewPassword
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Tên đăng nhập phải có ít nhất 3 ký tự." })
      .max(20, { message: "Tên đăng nhập không được quá 20 ký tự." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Tên đăng nhập chỉ chứa chữ, số và dấu gạch dưới.",
      }),

    email: z
      .string()
      .min(1, { message: "Vui lòng nhập địa chỉ email." })
      .email({ message: "Địa chỉ email không hợp lệ." }),

    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." })
      .regex(/[A-Z]/, { message: "Mật khẩu phải chứa ít nhất 1 chữ in hoa." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "Vui lòng xác nhận mật khẩu." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"], // Gắn lỗi vào field confirmPassword
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
