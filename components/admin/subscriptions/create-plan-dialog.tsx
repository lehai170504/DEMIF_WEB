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
import { cn } from "@/lib/utils";

export function CreatePlanDialog() {
  const [open, setOpen] = React.useState(false);
  const { mutate, isPending } = useCreatePlan();

  // 1. Khởi tạo Form với Zod Schema
  const form = useForm<CreatePlanFormValues>({
    resolver: zodResolver(CreatePlanSchema),
    defaultValues: {
      name: "",
      tier: 1, // Mặc định Premium
      price: 0,
      currency: "VND",
      billingCycle: 1, // Mặc định Theo Năm
      durationDays: 365,
      featuresString: "",
      badgeText: "",
      badgeColor: "#3B82F6",
      isActive: true,
    },
  });

  // 2. Logic xử lý Submit
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

  // 3. Logic tự động gán ngày dựa trên Chu kỳ thanh toán
  const watchCycle = form.watch("billingCycle");
  React.useEffect(() => {
    if (watchCycle === 0) form.setValue("durationDays", 30);
    else if (watchCycle === 1) form.setValue("durationDays", 365);
    else if (watchCycle === 2) form.setValue("durationDays", 0);
    else if (watchCycle === 3) form.setValue("durationDays", 7);
  }, [watchCycle, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 border-none">
          <Plus className="h-4 w-4 stroke-[3px]" /> Tạo Gói Dịch Vụ Mới
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] bg-white border-none text-gray-900 font-mono max-h-[95vh] overflow-y-auto no-scrollbar rounded-[2.5rem] shadow-2xl p-0 overflow-hidden">
        {/* Header trang trọng */}
        <DialogHeader className="p-10 bg-gray-50/50 border-b border-gray-100 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full pointer-events-none" />
          <DialogTitle className="flex items-center gap-3 text-2xl font-black uppercase tracking-tighter relative z-10">
            <PackagePlus className="h-7 w-7 text-orange-500" />
            Thiết Lập Gói Dịch Vụ
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-2 relative z-10">
            Cấu hình thông số thương mại và đặc quyền học tập cho học viên
            Premium.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-10 space-y-8"
          >
            {/* Nhóm 1: Thông tin cơ bản */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em] flex items-center gap-2 italic">
                <Sparkles className="w-3 h-3" /> 01. Định danh gói
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                        Tên Gói Dịch Vụ
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ví dụ: Premium Annual"
                          className="h-12 bg-gray-50 border-gray-100 font-bold focus:border-orange-500 rounded-xl transition-all"
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
                      <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                        Cấp Độ Ưu Tiên (Tier)
                      </FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200 font-bold rounded-xl transition-all">
                            <SelectValue placeholder="Chọn cấp độ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-bold">
                          <SelectItem value="0">Basic</SelectItem>
                          <SelectItem value="1">Premium</SelectItem>
                          <SelectItem value="2">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Nhóm 2: Tài chính & Chu kỳ */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-blue-500 tracking-[0.3em] flex items-center gap-2 italic">
                <Sparkles className="w-3 h-3" /> 02. Tài chính & Thời hạn
              </h4>
              <div className="grid grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                        Giá Bán (VND)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-12 bg-gray-50 border-gray-100 font-bold rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billingCycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                        Chu Kỳ Thu Phí
                      </FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200 font-bold rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-bold">
                          <SelectItem value="0">Theo Tháng</SelectItem>
                          <SelectItem value="1">Theo Năm</SelectItem>
                          <SelectItem value="2">Vĩnh Viễn</SelectItem>
                          <SelectItem value="3">Dùng Thử</SelectItem>
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
                      <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                        Thời Hạn (Ngày)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-12 bg-gray-50 border-gray-200 font-bold rounded-xl disabled:opacity-50"
                          {...field}
                          value={field.value ?? 0}
                          disabled={watchCycle === 2 || watchCycle === 3}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Nhóm 3: Tính năng & Hiển thị */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.3em] flex items-center gap-2 italic">
                <Sparkles className="w-3 h-3" /> 03. Đặc quyền & Tiếp thị
              </h4>
              <FormField
                control={form.control}
                name="featuresString"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                      Danh Sách Tính Năng (Mỗi dòng một mục)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ví dụ:&#10;Học không giới hạn&#10;Mở khóa mọi video&#10;Hỗ trợ 24/7"
                        className="bg-gray-50 border-gray-200 font-bold min-h-[120px] rounded-[1.5rem] p-4 shadow-inner"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="badgeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                        Nhãn Quảng Bá (Badge)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phổ Biến Nhất"
                          className="h-12 bg-gray-50 border-gray-100 font-bold rounded-xl"
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
                      <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                        Mã Màu Nhãn
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-xl border-2 border-white shadow-md overflow-hidden relative shrink-0">
                            <input
                              type="color"
                              className="absolute -inset-3 w-20 h-20 cursor-pointer"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </div>
                          <Input
                            className="h-12 bg-gray-50 border-gray-100 font-bold flex-1 rounded-xl uppercase tracking-widest"
                            {...field}
                          />
                        </div>
                      </FormControl>
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
                <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition-all hover:bg-white hover:shadow-md">
                  <div className="space-y-1">
                    <FormLabel className="text-sm font-black uppercase text-gray-900">
                      Kích Hoạt Ngay
                    </FormLabel>
                    <FormDescription className="text-[10px] text-gray-400 font-bold uppercase tracking-tight leading-none">
                      Gói dịch vụ sẽ hiển thị công khai sau khi tạo thành công.
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

            <DialogFooter className="pt-6">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-gray-900 hover:bg-black text-white font-black uppercase text-xs tracking-[0.3em] h-16 rounded-[1.5rem] shadow-2xl transition-all active:scale-[0.98]"
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-3" />
                ) : (
                  <PackagePlus className="h-5 w-5 mr-3" />
                )}
                {isPending
                  ? "Đang Khởi Tạo Hệ Thống..."
                  : "Xác Nhận Khởi Tạo Gói"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
