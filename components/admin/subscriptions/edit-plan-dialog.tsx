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
import { Loader2, Save, Sparkles } from "lucide-react";
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
      tier: "Free",
      price: 0,
      currency: "VND",
      billingCycle: "Monthly",
      durationDays: 30,
      featuresString: "",
      badgeText: "",
      badgeColor: "#3B82F6",
      isActive: true,
    },
  });

  // Đồng bộ data từ Backend vào Form khi mở Dialog
  React.useEffect(() => {
    if (open && plan) {
      form.reset({
        name: plan.name,
        tier: plan.tier || "Free",
        price: plan.price,
        currency: plan.currency || "VND",
        billingCycle: plan.billingCycle || "Monthly",
        durationDays: plan.durationDays ?? 30,
        featuresString: plan.features ? plan.features.join("\n") : "",
        badgeText: plan.badgeText || "",
        badgeColor: plan.badgeColor || "#3B82F6",
        isActive: plan.isActive,
      });
    }
  }, [open, plan, form]);

  // 🔥 Logic tự động cập nhật số ngày khi Admin đổi chu kỳ thủ công
  const watchCycle = form.watch("billingCycle");
  React.useEffect(() => {
    if (form.formState.dirtyFields.billingCycle) {
      if (watchCycle === "Monthly") form.setValue("durationDays", 30);
      else if (watchCycle === "Yearly") form.setValue("durationDays", 365);
      else if (watchCycle === "Lifetime") form.setValue("durationDays", 0);
    }
  }, [watchCycle, form]);

  const onSubmit = (values: CreatePlanFormValues) => {
    const featuresArray = values.featuresString
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const payload: CreatePlanRequest = {
      name: values.name,
      tier: values.tier,
      price: Number(values.price),
      currency: values.currency,
      billingCycle: values.billingCycle,
      durationDays:
        values.billingCycle === "Lifetime" ? 0 : Number(values.durationDays),
      features: featuresArray,
      badgeText: values.badgeText || "",
      badgeColor: values.badgeColor || "",
      isActive: values.isActive,
    };

    updatePlan(
      { id: plan.id, data: payload },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-white dark:bg-zinc-950 border-none text-slate-900 dark:text-white max-h-[95vh] overflow-y-auto no-scrollbar rounded-[2.5rem] shadow-2xl p-0 font-mono">
        {/* Header Section */}
        <DialogHeader className="p-8 bg-slate-50/50 dark:bg-zinc-900/50 border-b border-slate-100 dark:border-white/5 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
          <DialogTitle className="flex items-center gap-3 text-2xl tracking-tighter uppercase font-black">
            <Save className="h-6 w-6 text-blue-500" />
            Cập nhật cấu hình
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 space-y-8"
          >
            {/* Nhóm 1: Identity */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2 text-left">
                <Sparkles className="w-4 h-4" /> Thông tin định danh
              </h4>
              <div className="grid grid-cols-2 gap-5 text-left">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 ml-1">
                        Tên gói dịch vụ
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-xl focus:border-blue-500 transition-all shadow-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 ml-1">
                        Phân cấp (Tier)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 font-bold rounded-xl shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-medium">
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Nhóm 2: Commerce */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 dark:text-orange-400 flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2 text-left">
                <Sparkles className="w-4 h-4" /> Tài chính & Thời hạn
              </h4>
              <div className="grid grid-cols-3 gap-5 text-left">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 ml-1">
                        Giá bán
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            type="text"
                            inputMode="numeric"
                            className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-12 transition-all"
                            value={
                              field.value === 0
                                ? ""
                                : field.value.toLocaleString("vi-VN")
                            }
                            onChange={(e) => {
                              const rawValue = e.target.value.replace(
                                /\D/g,
                                "",
                              );
                              field.onChange(
                                rawValue ? parseInt(rawValue, 10) : 0,
                              );
                            }}
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 pointer-events-none uppercase tracking-widest">
                            VND
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billingCycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 ml-1">
                        Chu kỳ
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 font-bold rounded-xl shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-medium">
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Yearly">Yearly</SelectItem>
                          <SelectItem value="Lifetime">Lifetime</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="durationDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 ml-1">
                        Số ngày
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-xl disabled:opacity-30 shadow-sm"
                          {...field}
                          value={field.value ?? 0}
                          disabled={watchCycle === "Lifetime"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Nhóm 3: Marketing */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600 dark:text-pink-400 flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2 text-left">
                <Sparkles className="w-4 h-4" /> Hiển thị & Tiếp thị
              </h4>
              <div className="grid grid-cols-2 gap-5 text-left">
                <FormField
                  control={form.control}
                  name="badgeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 ml-1">
                        Nhãn nổi bật (Badge)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ví dụ: Bán chạy nhất"
                          className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 font-bold rounded-xl focus:border-pink-500 transition-all shadow-sm"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="badgeColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 ml-1">
                        Màu nhãn (Hex)
                      </FormLabel>
                      <div className="flex gap-2">
                        <div className="w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden shrink-0 shadow-sm">
                          <input
                            type="color"
                            className="absolute -inset-2 w-16 h-16 cursor-pointer"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </div>
                        <FormControl>
                          <Input
                            className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 font-bold rounded-xl uppercase"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Nhóm 4: Features */}
            <div className="space-y-4 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                <Sparkles className="w-4 h-4" /> Đặc quyền gói dịch vụ
              </h4>
              <FormField
                control={form.control}
                name="featuresString"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium text-sm min-h-[140px] rounded-2xl p-4 shadow-inner focus:border-emerald-500 transition-all no-scrollbar"
                        placeholder="Mở khóa shadowing AI&#10;Học mọi khóa học..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Trạng thái hoạt động */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-900/30 p-5 transition-all hover:bg-white dark:hover:bg-zinc-900">
                  <div className="space-y-1 text-left">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                      Active Status
                    </FormLabel>
                    <FormDescription className="text-[10px] font-medium text-slate-500">
                      Kích hoạt để hiển thị gói trên ứng dụng.
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

            <DialogFooter className="pt-2 gap-3 sm:gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="h-12 px-6 rounded-2xl font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95"
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Lưu cấu hình
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
