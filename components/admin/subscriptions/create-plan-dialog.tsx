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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { Loader2, Plus, PackagePlus } from "lucide-react";
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
      billingCycle: "Monthly",
      durationDays: 30,
      featuresString: "",
      badgeText: "",
      badgeColor: "#3B82F6",
      isActive: true,
    },
  });

  const onSubmit = (values: CreatePlanFormValues) => {
    // 1. Convert featuresString to array
    const featuresArray = values.featuresString
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    // 2. Logic xử lý Duration cho gói Lifetime
    // Nếu là Lifetime -> durationDays = null
    const finalDuration =
      values.billingCycle === "Lifetime" ? null : values.durationDays || 30;

    // 3. Construct Payload chuẩn
    const payload: CreatePlanRequest = {
      name: values.name,
      tier: values.tier, // Giữ nguyên string nếu BE nhận string
      price: values.price,
      currency: values.currency,
      billingCycle: values.billingCycle, // Giữ nguyên string nếu BE nhận string
      durationDays: finalDuration,
      features: featuresArray,
      badgeText: values.badgeText,
      badgeColor: values.badgeColor,
      isActive: values.isActive,
    };

    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20">
          <Plus className="h-4 w-4" /> Tạo gói mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#18181b] border-white/10 text-white font-mono max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase">
            <PackagePlus className="h-5 w-5 text-orange-500" />
            Tạo Gói Dịch Vụ Mới
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-xs">
            Thiết lập thông tin gói, giá bán và các tính năng đi kèm.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 py-4"
          >
            {/* Row 1: Name & Tier */}
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
                        placeholder="Ví dụ: Premium Tháng"
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
                      Cấp độ (Tier)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue placeholder="Chọn cấp độ" />
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

            {/* Row 2: Price & Cycle */}
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue placeholder="Chọn chu kỳ" />
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
                        // Nếu chọn Lifetime thì disable ô nhập ngày
                        disabled={form.watch("billingCycle") === "Lifetime"}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Features (Textarea) */}
            <FormField
              control={form.control}
              name="featuresString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                    Tính năng (Mỗi dòng 1 tính năng)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="- Không giới hạn bài học&#10;- Hỗ trợ 24/7&#10;- Không quảng cáo"
                      className="bg-black/20 border-white/10 h-24 font-mono text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Row 3: Badge Info */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="badgeText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Badge Text (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="vd: Phổ biến nhất"
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
                      Mã màu Badge (Hex)
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <div
                          className="w-10 h-10 rounded border border-white/10"
                          style={{ backgroundColor: field.value }}
                        ></div>
                        <Input
                          placeholder="#3B82F6"
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

            {/* Is Active Switch */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-bold text-white">
                      Kích hoạt ngay
                    </FormLabel>
                    <FormDescription className="text-xs text-zinc-500">
                      Gói này sẽ hiển thị ngay lập tức cho người dùng.
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
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-black hover:bg-zinc-200 font-bold"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PackagePlus className="mr-2 h-4 w-4" />
                )}
                {isPending ? "Đang xử lý..." : "Xác nhận tạo gói"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
