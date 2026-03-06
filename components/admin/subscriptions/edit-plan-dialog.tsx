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
import { Loader2, Save, Fingerprint, Sparkles } from "lucide-react";
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

const mapTierToString = (tier: string | number) => {
  const t = String(tier);
  if (t === "1" || t === "Premium") return "1";
  if (t === "2" || t === "Enterprise") return "2";
  return "0";
};

const mapCycleToString = (cycle: string | number) => {
  const c = String(cycle);
  if (c === "1" || c === "Yearly") return "1";
  if (c === "2" || c === "Lifetime") return "2";
  return "0";
};

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
      tier: 1,
      price: 0,
      currency: "VND",
      billingCycle: 1,
      durationDays: 30,
      featuresString: "",
      badgeText: "",
      badgeColor: "",
      isActive: true,
    },
  });

  React.useEffect(() => {
    if (open && plan) {
      form.reset({
        name: plan.name,
        tier: Number(mapTierToString(plan.tier)),
        price: plan.price,
        currency: plan.currency,
        billingCycle: Number(mapCycleToString(plan.billingCycle)),
        durationDays: plan.durationDays ?? 30,
        featuresString: plan.features ? plan.features.join("\n") : "",
        badgeText: plan.badgeText || "",
        badgeColor: plan.badgeColor || "#3B82F6",
        isActive: plan.isActive,
      });
    }
  }, [open, plan, form]);

  const onSubmit = (values: CreatePlanFormValues) => {
    const featuresArray = values.featuresString
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const finalDuration =
      values.billingCycle === 2 ? 0 : (values.durationDays ?? 30);

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

    updatePlan(
      { id: plan.id, data: payload },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-white border-none text-gray-900 font-mono max-h-[95vh] overflow-y-auto no-scrollbar rounded-[2.5rem] shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="p-10 bg-gray-50/50 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-3 text-2xl font-black uppercase italic tracking-tighter">
            <Save className="h-7 w-7 text-blue-500" />
            Cập Nhật Gói Dịch Vụ
          </DialogTitle>
          <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-white border border-gray-200 rounded-xl w-fit">
            <Fingerprint className="h-3 w-3 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              ID Gói: {plan.id}
            </span>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-10 space-y-8"
          >
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-blue-500 tracking-[0.3em] flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> 01. Cấu hình cơ bản
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                        Tên Hiển Thị
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 bg-gray-50 border-gray-200 font-bold rounded-xl"
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
                        Cấp Độ (Tier)
                      </FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        value={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200 font-bold rounded-xl">
                            <SelectValue />
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

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em] flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> 02. Thông số kinh doanh
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
                          className="h-12 bg-gray-50 border-gray-200 font-bold rounded-xl"
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
                        Chu Kỳ
                      </FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        value={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200 font-bold rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-bold">
                          <SelectItem value="0">Hàng Tháng</SelectItem>
                          <SelectItem value="1">Hàng Năm</SelectItem>
                          <SelectItem value="2">Vĩnh Viễn</SelectItem>
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
                        Số Ngày
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-12 bg-gray-50 border-gray-200 font-bold rounded-xl disabled:opacity-50"
                          {...field}
                          value={field.value ?? 0}
                          disabled={Number(form.watch("billingCycle")) === 2}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="featuresString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 italic">
                    Đặc Quyền (Mỗi dòng một mục)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-gray-50 border-gray-200 font-mono text-sm min-h-[120px] rounded-2xl p-4 shadow-inner"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
                  <div className="space-y-1">
                    <FormLabel className="text-sm font-black uppercase text-gray-900">
                      Trạng Thái Kích Hoạt
                    </FormLabel>
                    <FormDescription className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                      Quyết định việc gói có xuất hiện trên ứng dụng hay không.
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

            <DialogFooter className="gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="h-14 px-8 rounded-xl font-bold uppercase text-[10px] tracking-widest text-gray-400 hover:bg-gray-50"
              >
                Hủy Bỏ
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="h-14 flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-600/20"
              >
                {isUpdating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Lưu Thay Đổi Hệ Thống
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
