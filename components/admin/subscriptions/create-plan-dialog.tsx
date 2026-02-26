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
      tier: 1, // Mặc định Premium
      price: 0,
      currency: "VND",
      billingCycle: 1, // Mặc định Theo Năm
      durationDays: 30,
      featuresString: "",
      badgeText: "",
      badgeColor: "#3B82F6", // Màu xanh mặc định
      isActive: true,
    },
  });

  const onSubmit = (values: CreatePlanFormValues) => {
    const featuresArray = values.featuresString
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    // Xử lý tự động gán ngày dựa trên Chu kỳ (nếu không tự nhập)
    let finalDuration = values.durationDays;

    if (values.billingCycle === 2) {
      finalDuration = 0; // Vĩnh viễn -> 0 ngày
    } else if (values.billingCycle === 3) {
      finalDuration = 7; // Dùng thử -> 7 ngày
    } else {
      finalDuration = values.durationDays ?? 30; // Nếu trống thì 30
    }

    const payload: CreatePlanRequest = {
      name: values.name,
      tier: values.tier,
      price: values.price,
      currency: values.currency,
      billingCycle: values.billingCycle,
      durationDays: finalDuration,
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

  // Lắng nghe sự thay đổi của Chu kỳ để tự động cập nhật số ngày lên ô UI
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
        <Button className="h-9 gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20">
          <Plus className="h-4 w-4" /> Tạo gói mới
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-[#18181b] border-white/10 text-white font-mono max-h-[90vh] overflow-y-auto no-scrollbar focus:outline-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tighter">
            <PackagePlus className="h-5 w-5 text-orange-500" />
            Tạo Gói Dịch Vụ Mới
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            Thiết lập thông tin gói, giá bán và các tính năng đi kèm.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            {/* Tên gói & Cấp độ */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-zinc-500">
                      Tên gói
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ví dụ: Premium Tháng"
                        className="bg-black/20 border-white/10 focus:border-orange-500/50"
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
                    <FormLabel className="text-[10px] font-bold uppercase text-zinc-500">
                      Cấp độ (Tier)
                    </FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue placeholder="Chọn cấp độ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1c1c1f] border-white/10 text-white">
                        <SelectItem value="0">Basic</SelectItem>
                        <SelectItem value="1">Premium</SelectItem>
                        <SelectItem value="2">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Giá, Chu kỳ & Thời hạn */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-zinc-500">
                      Giá bán (VND)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-black/20 border-white/10 focus:border-orange-500/50"
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
                    <FormLabel className="text-[10px] font-bold uppercase text-zinc-500">
                      Chu kỳ
                    </FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue placeholder="Chọn chu kỳ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1c1c1f] border-white/10 text-white">
                        <SelectItem value="0">Theo Tháng</SelectItem>
                        <SelectItem value="1">Theo Năm</SelectItem>
                        <SelectItem value="2">Vĩnh viễn</SelectItem>
                        <SelectItem value="3">Dùng thử (Trial)</SelectItem>
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
                    <FormLabel className="text-[10px] font-bold uppercase text-zinc-500">
                      Số ngày
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-black/20 border-white/10 focus:border-orange-500/50 disabled:opacity-50"
                        {...field}
                        value={field.value ?? ""}
                        disabled={watchCycle === 2 || watchCycle === 3} // Khóa ô này nếu là Vĩnh viễn hoặc Trial
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tính năng */}
            <FormField
              control={form.control}
              name="featuresString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase text-zinc-500">
                    Tính năng (Mỗi dòng 1 mục)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Không quảng cáo&#10;Học mọi bài học&#10;Hỗ trợ ưu tiên"
                      className="bg-black/20 border-white/10 h-24 font-sans text-sm"
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
                    <FormLabel className="text-[10px] font-bold uppercase text-zinc-500">
                      Nhãn (Badge)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="vd: Phổ biến nhất"
                        className="bg-black/20 border-white/10 focus:border-orange-500/50"
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
                    <FormLabel className="text-[10px] font-bold uppercase text-zinc-500">
                      Màu Badge
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {/* Thay thế div ảo bằng thẻ input type="color" */}
                        <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-white/10 shrink-0 cursor-pointer">
                          <input
                            type="color"
                            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                            value={field.value || "#3B82F6"}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </div>
                        <Input
                          placeholder="#3B82F6"
                          className="bg-black/20 border-white/10 focus:border-orange-500/50 uppercase"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Trạng thái Kích hoạt */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/[0.08]">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-bold text-white">
                      Kích hoạt ngay
                    </FormLabel>
                    <FormDescription className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
                      Gói này sẽ hiển thị ngay cho người dùng.
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

            <DialogFooter className="pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PackagePlus className="mr-2 h-4 w-4" />
                )}
                {isPending ? "Đang tạo gói..." : "Xác nhận tạo gói"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
