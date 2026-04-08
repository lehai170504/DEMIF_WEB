"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
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
import {
  Loader2,
  Save,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";
import { useManagePlan } from "@/hooks/use-manage-plan";

// --- MAP GIÁ TRỊ THEO YÊU CẦU CỦA BE TRONG HÌNH ---
// BE chỉ hỗ trợ: Weekly, Monthly, Yearly
const BILLING_CYCLE_MAP: Record<string, number> = {
  Weekly: 0,
  Monthly: 1,
  Yearly: 2,
};

const REVERSE_BILLING_CYCLE_MAP: Record<number, string> = {
  0: "Weekly",
  1: "Monthly",
  2: "Yearly",
};

export function EditPlanDialog({ plan, open, onOpenChange }: any) {
  const { updatePlan, isUpdating } = useManagePlan();

  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      currency: "VND",
      billingCycle: "Monthly",
      featuresString: "",
      badgeText: "",
      badgeColor: "#3B82F6",
      isActive: true,
    },
  });

  React.useEffect(() => {
    if (open && plan) {
      form.reset({
        name: plan.name,
        price: plan.price,
        currency: plan.currency || "VND",
        billingCycle: REVERSE_BILLING_CYCLE_MAP[plan.billingCycle] || "Monthly",
        featuresString: plan.features ? plan.features.join("\n") : "",
        badgeText: plan.badgeText || "",
        badgeColor: plan.badgeColor || "#3B82F6",
        isActive: plan.isActive,
      });
    }
  }, [open, plan, form]);

  const onSubmit = (values: any) => {
    const featuresArray = values.featuresString
      .split("\n")
      .map((f: string) => f.trim())
      .filter((f: string) => f.length > 0);

    const payload = {
      name: values.name,
      price: Number(values.price),
      currency: values.currency,
      billingCycle: BILLING_CYCLE_MAP[values.billingCycle],
      features: featuresArray,
      badgeText: values.badgeText || null,
      badgeColor: values.badgeColor || null,
      isActive: values.isActive,
    };

    updatePlan(
      { id: plan.id, data: payload },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-white dark:bg-zinc-950 border-none text-slate-900 dark:text-white h-[90vh] flex flex-col rounded-[2.5rem] shadow-2xl p-0 font-mono transition-colors duration-300 overflow-hidden">
        {/* HEADER CỐ ĐỊNH - Nút X của Shadcn sẽ nằm im ở đây */}
        <DialogHeader className="p-10 bg-slate-50/50 dark:bg-zinc-900/50 border-b border-slate-100 dark:border-white/5 relative shrink-0 text-left">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
          <DialogTitle className="flex items-center gap-4 text-2xl font-black uppercase tracking-tighter relative z-10">
            <div className="p-2.5 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/20">
              <Save className="h-6 w-6 text-white" />
            </div>
            CẬP NHẬT CẤU HÌNH GÓI
          </DialogTitle>
        </DialogHeader>

        {/* PHẦN FORM CHO PHÉP CUỘN - ẨN SCROLLBAR */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-10 bg-white dark:bg-zinc-950">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* Nhóm 1: Identity */}
              <div className="space-y-5">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-3 text-left text-blue-500">
                  <ShieldCheck className="w-4 h-4" /> THÔNG TIN ĐỊNH DANH
                </h4>
                <div className="grid grid-cols-1 gap-6 text-left">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-1">
                          TÊN GÓI DỊCH VỤ
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-white/5 text-slate-900 dark:text-white font-bold rounded-2xl focus:ring-blue-500/20 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Nhóm 2: Commerce */}
              <div className="space-y-5">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-3 text-left text-orange-500">
                  <Zap className="w-4 h-4" /> THÔNG SỐ TÀI CHÍNH
                </h4>
                <div className="grid grid-cols-2 gap-6 text-left">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-1">
                          GIÁ BÁN
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              type="text"
                              inputMode="numeric"
                              className="h-12 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-white/5 text-slate-900 dark:text-white font-black rounded-2xl pr-12 focus:ring-orange-500/20 transition-all"
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
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
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
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-1">
                          CHU KỲ THANH TOÁN
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-white/5 font-black rounded-2xl uppercase text-[10px] tracking-widest">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-mono bg-white dark:bg-zinc-900 border-white/10">
                            <SelectItem
                              value="Weekly"
                              className="text-[10px] font-black uppercase"
                            >
                              HÀNG TUẦN
                            </SelectItem>
                            <SelectItem
                              value="Monthly"
                              className="text-[10px] font-black uppercase"
                            >
                              HÀNG THÁNG
                            </SelectItem>
                            <SelectItem
                              value="Yearly"
                              className="text-[10px] font-black uppercase"
                            >
                              HÀNG NĂM
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Nhóm 3: Marketing */}
              <div className="space-y-5">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-3 text-left text-pink-500">
                  <Sparkles className="w-4 h-4" /> HIỂN THỊ TIẾP THỊ
                </h4>
                <div className="grid grid-cols-2 gap-6 text-left">
                  <FormField
                    control={form.control}
                    name="badgeText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-1">
                          NHÃN PHỤ TRỢ (TUỲ CHỌN)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ví dụ: PHỔ BIẾN NHẤT"
                            className="h-12 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-white/5 font-bold rounded-2xl focus:ring-pink-500/20 transition-all"
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
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-1">
                          MÃ MÀU NHÃN (HEX)
                        </FormLabel>
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-white/10 relative overflow-hidden shrink-0 shadow-sm">
                            <input
                              type="color"
                              className="absolute -inset-2 w-16 h-16 cursor-pointer"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </div>
                          <FormControl>
                            <Input
                              className="h-12 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-white/5 font-bold rounded-2xl uppercase"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Nhóm 4: Đặc quyền */}
              <div className="space-y-5 text-left">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-3 text-emerald-500">
                  <Target className="w-4 h-4" /> DANH SÁCH ĐẶC QUYỀN
                </h4>
                <FormField
                  control={form.control}
                  name="featuresString"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-200 font-bold text-xs min-h-[160px] rounded-[2rem] p-6 focus:ring-emerald-500/20 transition-all no-scrollbar leading-relaxed"
                          placeholder="Tính năng 1&#10;Tính năng 2..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 p-6 transition-all hover:bg-white dark:hover:bg-zinc-900">
                    <div className="space-y-1 text-left">
                      <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        TRẠNG THÁI HOẠT ĐỘNG
                      </FormLabel>
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
            </form>
          </Form>
        </div>

        {/* FOOTER CỐ ĐỊNH */}
        <DialogFooter className="p-8 bg-slate-50/50 dark:bg-zinc-900/50 border-t border-slate-100 dark:border-white/5 shrink-0 gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            HỦY THAO TÁC
          </Button>
          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isUpdating}
            className="h-14 px-12 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
          >
            {isUpdating ? (
              <Loader2 className="mr-3 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-3 h-4 w-4" />
            )}
            LƯU CẤU HÌNH
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
