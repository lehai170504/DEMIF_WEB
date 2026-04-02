import { z } from "zod";

export const CreatePlanSchema = z.object({
  name: z.string().min(1, "Tên gói không được để trống"),
  tier: z.coerce.number(),
  price: z.coerce.number().min(0, "Giá không hợp lệ"),
  currency: z.string().default("VND"),
  billingCycle: z.coerce.number(),

  durationDays: z.coerce.number().nullable().optional(),

  featuresString: z.string().min(1, "Nhập ít nhất 1 tính năng"),
  badgeText: z.string().optional(),
  badgeColor: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CreatePlanFormValues = z.infer<typeof CreatePlanSchema>;
