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
      <DialogContent className="sm:max-w-[650px] bg-white border-none text-slate-900 font-sans max-h-[95vh] overflow-y-auto no-scrollbar rounded-[2rem] shadow-2xl p-0">
        {/* Header */}
        <DialogHeader className="p-8 bg-slate-50/50 border-b border-slate-100">
          <DialogTitle className="flex items-center gap-3 text-2xl font-mono tracking-tight">
            <Save className="h-6 w-6 text-blue-500" />
            Cập nhật gói dịch vụ
          </DialogTitle>
          <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg w-fit ml-9">
            <Fingerprint className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">
              ID Gói: <span className="font-mono">{plan.id}</span>
            </span>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 space-y-8"
          >
            {/* Nhóm 1: Cấu hình cơ bản */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-blue-600 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Sparkles className="w-4 h-4" /> Cấu hình cơ bản
              </h4>
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-slate-600 ml-1">
                        Tên hiển thị
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-11 bg-white border-slate-200 font-medium rounded-xl shadow-sm"
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
                      <FormLabel className="text-xs font-mono text-slate-600 ml-1">
                        Cấp độ (Tier)
                      </FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        value={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-white border-slate-200 font-medium rounded-xl shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-medium">
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

            {/* Nhóm 2: Thông số kinh doanh */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-orange-600 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Sparkles className="w-4 h-4" /> Thông số kinh doanh
              </h4>
              <div className="grid grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-slate-600 ml-1">
                        Giá bán (VND)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-11 bg-white border-slate-200 font-medium rounded-xl shadow-sm"
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
                      <FormLabel className="text-xs font-mono text-slate-600 ml-1">
                        Chu kỳ
                      </FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        value={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-white border-slate-200 font-medium rounded-xl shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-medium">
                          <SelectItem value="0">Hàng tháng</SelectItem>
                          <SelectItem value="1">Hàng năm</SelectItem>
                          <SelectItem value="2">Vĩnh viễn</SelectItem>
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
                      <FormLabel className="text-xs font-mono text-slate-600 ml-1">
                        Số ngày
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-11 bg-white border-slate-200 font-medium rounded-xl disabled:opacity-50 shadow-sm"
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

            {/* Nhóm 3: Đặc quyền (Textarea chung) */}
            <FormField
              control={form.control}
              name="featuresString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono text-slate-600 ml-1">
                    Danh sách đặc quyền (Mỗi dòng một mục)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-slate-50 border-slate-200 font-mono text-sm min-h-[120px] rounded-xl p-4 shadow-inner"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Trạng thái Switch */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-mono text-slate-900">
                      Trạng thái hoạt động
                    </FormLabel>
                    <FormDescription className="text-xs font-medium text-slate-500">
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

            <DialogFooter className="pt-2 gap-3 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-11 px-6 rounded-xl font-semibold text-sm text-slate-600 border-slate-200 hover:bg-slate-50"
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                {isUpdating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
