"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save } from "lucide-react";
import { useManagePlan } from "@/hooks/use-manage-plan";
import {
  CreatePlanSchema,
  CreatePlanFormValues,
} from "@/schemas/subscription.schema";
import {
  SubscriptionPlanDto,
  CreatePlanRequest,
} from "@/types/subscription.type";

interface EditPlanDialogProps {
  plan: SubscriptionPlanDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPlanDialog({
  plan,
  open,
  onOpenChange,
}: EditPlanDialogProps) {
  const { updatePlan, isUpdating } = useManagePlan();

  const form = useForm<CreatePlanFormValues>({
    resolver: zodResolver(CreatePlanSchema),
    defaultValues: {
      name: "",
      tier: "",
      price: 0,
      currency: "VND",
      billingCycle: "",
      durationDays: 0,
      featuresString: "",
      badgeText: "",
      badgeColor: "",
      isActive: true,
    },
  });

  // Reset form khi mở modal
  React.useEffect(() => {
    if (open && plan) {
      form.reset({
        name: plan.name,
        tier: plan.tier, // Giữ nguyên string "Premium"
        price: plan.price,
        currency: plan.currency,
        billingCycle: plan.billingCycle, // Giữ nguyên string "Monthly"
        durationDays: plan.durationDays ?? 0,
        featuresString: plan.features ? plan.features.join("\n") : "",
        badgeText: plan.badgeText || "",
        badgeColor: plan.badgeColor || "#3B82F6",
        isActive: plan.isActive,
      });
    }
  }, [open, plan, form]);

  const onSubmit = (values: CreatePlanFormValues) => {
    // 1. Xử lý Features
    const featuresArray = values.featuresString
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    // 2. Xử lý DurationDays cho gói Vĩnh viễn (Lifetime)
    const finalDuration =
      values.billingCycle === "Lifetime" ? null : values.durationDays || 30;

    // 3. Tạo Payload chuẩn
    const payload: CreatePlanRequest = {
      name: values.name,
      tier: values.tier,
      price: values.price,
      currency: values.currency,
      billingCycle: values.billingCycle,
      durationDays: finalDuration,
      features: featuresArray,
      badgeText: values.badgeText,
      badgeColor: values.badgeColor,
      isActive: values.isActive,
    };

    // 4. Gọi API
    updatePlan(
      { id: plan.id, data: payload },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* ĐÃ FIX: Sử dụng class "no-scrollbar" từ globals.css 
          Thay vì viết dài dòng inline style.
      */}
      <DialogContent className="sm:max-w-[600px] bg-[#18181b] border-white/10 text-white font-mono max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase">
            <Save className="h-5 w-5 text-blue-500" />
            Cập nhật gói dịch vụ
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-xs">
            Chỉnh sửa thông tin chi tiết của gói dịch vụ.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 py-4"
          >
            {/* Tên & Cấp độ */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Tên gói
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-black/20 border-white/10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Cấp độ
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Giá, Chu kỳ, Ngày */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Giá bán (VND)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-black/20 border-white/10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingCycle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Chu kỳ
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Monthly">Theo Tháng</SelectItem>
                        <SelectItem value="Yearly">Theo Năm</SelectItem>
                        <SelectItem value="Lifetime">Vĩnh viễn</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="durationDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Số ngày
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-black/20 border-white/10 disabled:opacity-50"
                        {...field}
                        value={field.value ?? ""}
                        disabled={form.watch("billingCycle") === "Lifetime"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Features */}
            <FormField
              control={form.control}
              name="featuresString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                    Tính năng (Xuống dòng)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-black/20 border-white/10 h-24 font-mono text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Badge Info */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="badgeText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Badge Text
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-black/20 border-white/10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="badgeColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Mã màu (Hex)
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <div
                          className="w-10 h-10 rounded border border-white/10"
                          style={{ backgroundColor: field.value }}
                        ></div>
                        <Input
                          className="bg-black/20 border-white/10 flex-1"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Active Switch */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-bold text-white">
                      Trạng thái Kích hoạt
                    </FormLabel>
                    <FormDescription className="text-xs text-zinc-500">
                      Tắt gói này sẽ ẩn nó khỏi danh sách hiển thị cho người
                      dùng.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="hover:bg-white/10 hover:text-white text-zinc-400"
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold min-w-[120px]"
              >
                {isUpdating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}{" "}
                {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
