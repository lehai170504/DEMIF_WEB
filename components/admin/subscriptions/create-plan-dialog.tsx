"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Loader2, Plus, PackagePlus, Sparkles } from "lucide-react";
import { useCreatePlan } from "@/hooks/use-create-plan";
import {
  CreatePlanSchema,
  CreatePlanFormValues,
} from "@/schemas/subscription.schema";
import { CreatePlanRequest } from "@/types/subscription.type";

export function CreatePlanDialog() {
  const [open, setOpen] = React.useState(false);
  const { mutate, isPending } = useCreatePlan();

  const form = useForm<CreatePlanFormValues>({
    resolver: zodResolver(CreatePlanSchema),
    defaultValues: {
      name: "",
      tier: "Premium",
      price: 0,
      currency: "VND",
      billingCycle: "Yearly",
      durationDays: 365,
      featuresString: "",
      badgeText: "",
      badgeColor: "#3B82F6",
      isActive: true,
    },
  });

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
      durationDays: Number(values.durationDays),
      features: featuresArray,
      badgeText: values.badgeText || "",
      badgeColor: values.badgeColor || "",
      isActive: values.isActive,
    };

    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  const watchCycle = form.watch("billingCycle");
  React.useEffect(() => {
    if (watchCycle === "Monthly") form.setValue("durationDays", 30);
    else if (watchCycle === "Yearly") form.setValue("durationDays", 365);
    else if (watchCycle === "Lifetime") form.setValue("durationDays", 0);
    else if (watchCycle === "Trial") form.setValue("durationDays", 7);
  }, [watchCycle, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 gap-2 px-6 bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-semibold rounded-xl shadow-md transition-all border-none active:scale-95">
          <Plus className="h-4 w-4" /> Tạo gói dịch vụ mới
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] bg-white dark:bg-zinc-950 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-sans max-h-[95vh] overflow-y-auto no-scrollbar rounded-[2rem] shadow-2xl p-0">
        {/* Header */}
        <DialogHeader className="p-8 bg-slate-50/50 dark:bg-zinc-900/50 border-b font-mono border-slate-100 dark:border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/10 blur-[50px] rounded-full pointer-events-none" />
          <DialogTitle className="flex items-center gap-3 text-2xl tracking-tight relative z-10 text-slate-900 dark:text-white">
            <PackagePlus className="h-6 w-6 text-[#FF7A00]" />
            Thiết lập gói dịch vụ
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-zinc-400 text-sm font-medium mt-2 relative z-10 pl-9">
            Cấu hình thông số thương mại và đặc quyền học tập cho học viên.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 space-y-8"
          >
            {/* Nhóm 1: Thông tin cơ bản */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-[#FF7A00] flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                <Sparkles className="w-4 h-4" /> Thông tin định danh
              </h4>
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-slate-600 dark:text-zinc-400 ml-1">
                        Tên gói dịch vụ
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ví dụ: Premium Annual"
                          className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium focus:border-[#FF7A00] rounded-xl transition-all shadow-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-slate-600 dark:text-zinc-400 ml-1">
                        Cấp độ ưu tiên (Tier)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium rounded-xl transition-all shadow-sm">
                            <SelectValue placeholder="Chọn cấp độ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-medium">
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[10px] text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Nhóm 2: Tài chính & Chu kỳ */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                <Sparkles className="w-4 h-4" /> Tài chính & Thời hạn
              </h4>
              <div className="grid grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-slate-600 dark:text-zinc-400 ml-1">
                        Giá bán (VND)
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="0"
                            className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono rounded-xl shadow-sm focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] pr-12 transition-all"
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
                              const numberValue = rawValue
                                ? parseInt(rawValue, 10)
                                : 0;
                              field.onChange(numberValue);
                            }}
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 dark:text-zinc-500 pointer-events-none uppercase tracking-widest">
                            VND
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px] text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billingCycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-slate-600 dark:text-zinc-400 ml-1">
                        Chu kỳ thu phí
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-white dark:bg-zinc-900 font-mono border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium rounded-xl shadow-sm">
                            <SelectValue placeholder="Chọn chu kỳ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-medium">
                          <SelectItem value="Monthly">Hàng tháng</SelectItem>
                          <SelectItem value="Yearly">Hàng năm</SelectItem>
                          <SelectItem value="Lifetime">Vĩnh viễn</SelectItem>
                          <SelectItem value="0">Tùy chỉnh</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[10px] text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="durationDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-slate-600 dark:text-zinc-400 ml-1">
                        Thời hạn (Ngày)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium rounded-xl disabled:opacity-50 shadow-sm"
                          {...field}
                          value={field.value ?? 0}
                          disabled={watchCycle === "Lifetime"}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Nhóm 3: Tính năng & Hiển thị */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                <Sparkles className="w-4 h-4" /> Đặc quyền & Tiếp thị
              </h4>
              <FormField
                control={form.control}
                name="featuresString"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-mono text-slate-600 dark:text-zinc-400 ml-1">
                      Danh sách tính năng (Mỗi dòng một mục)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ví dụ:&#10;Học không giới hạn&#10;Mở khóa mọi video&#10;Hỗ trợ 24/7"
                        className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm min-h-[120px] rounded-xl p-4 shadow-inner focus:border-[#FF7A00]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] text-red-500" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="badgeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-slate-600 dark:text-zinc-400 ml-1">
                        Nhãn quảng bá (Badge)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phổ biến nhất"
                          className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono rounded-xl shadow-sm focus:border-[#FF7A00]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="badgeColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-slate-600 dark:text-zinc-400 ml-1">
                        Mã màu nhãn (Hex)
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-3">
                          <div className="w-11 h-11 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden relative shrink-0">
                            <input
                              type="color"
                              className="absolute -inset-3 w-20 h-20 cursor-pointer"
                              value={field.value || "#3B82F6"}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </div>
                          <Input
                            className="h-11 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium flex-1 rounded-xl shadow-sm focus:border-[#FF7A00]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px] text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Trạng thái Switch */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/50 p-5 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-mono text-slate-900 dark:text-white">
                      Kích hoạt tức thì
                    </FormLabel>
                    <FormDescription className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                      Gói dịch vụ sẽ hiển thị công khai trên ứng dụng ngay sau
                      khi tạo.
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

            <DialogFooter className="pt-2 gap-3">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-mono font-bold text-sm h-12 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                ) : (
                  <PackagePlus className="h-5 w-5 mr-2" />
                )}
                {isPending
                  ? "Đang khởi tạo hệ thống..."
                  : "Xác nhận tạo gói dịch vụ"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
