"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { Switch } from "@/components/ui/switch";
import {
  Loader2,
  Save,
  Sparkles,
  UserCircle2,
  CreditCard,
  Calendar,
  Settings2,
  Fingerprint,
  Lock,
} from "lucide-react";

import { useAdminManageSubscription } from "@/hooks/use-user-subscriptions";
import { useSubscriptionPlans } from "@/hooks/use-subscription";
import { cn } from "@/lib/utils";

export function EditSubscriptionDialog({
  subscription,
  open,
  onOpenChange,
}: any) {
  const { updateSubscription, isUpdating } = useAdminManageSubscription();
  const { data: plansData } = useSubscriptionPlans();

  // Kiểm tra xem gói có bị khóa chỉnh sửa không (Active hoặc Cancelled)
  const isLocked =
    subscription?.status === "Active" || subscription?.status === "Cancelled";

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      planId: "",
      startDate: "",
      endDate: "",
      status: "Active",
      autoRenew: false,
    },
  });

  React.useEffect(() => {
    if (open && subscription) {
      form.reset({
        planId: subscription.planId || "",
        startDate: subscription.startDate?.split("T")[0] || "",
        endDate: subscription.endDate?.split("T")[0] || "",
        status: subscription.status || "Active",
        autoRenew: subscription.autoRenew ?? false,
      });
    }
  }, [open, subscription?.id]);

  const onSubmit = (values: any) => {
    if (!subscription?.id || isLocked) return;

    const payload = {
      planId: values.planId,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
      status: values.status,
      autoRenew: values.autoRenew,
    };

    updateSubscription(
      { id: subscription.id, data: payload },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden border-none bg-white dark:bg-zinc-950 rounded-[2.5rem] shadow-3xl [&>button]:hidden">
        <DialogHeader className="relative p-8 bg-indigo-600 dark:bg-indigo-900/50 text-white overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 -rotate-12 translate-x-1/4">
            <Fingerprint size={100} />
          </div>
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                <Sparkles className="w-4 h-4 text-indigo-100" />
              </div>
              <DialogTitle className="uppercase text-lg font-black tracking-tighter">
                Hiệu chỉnh thuê bao
              </DialogTitle>
            </div>
            <p className="text-xs text-indigo-100/70 font-medium">
              {isLocked
                ? "Gói đã được sử dụng nên không thể sửa trực tiếp"
                : "Cập nhật thông tin gói dịch vụ cho học viên"}
            </p>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
          >
            {/* CỘT TRÁI */}
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 flex items-center gap-4">
                <div className="size-12 rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center text-indigo-600">
                  <UserCircle2 size={24} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-[9px] font-black uppercase tracking-widest text-indigo-500/70 mb-0.5">
                    Học viên
                  </p>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate text-sm uppercase">
                    {subscription?.userName || "N/A"}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">
                    {subscription?.userEmail}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <CreditCard size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Gói dịch vụ
                  </span>
                </div>
                <FormField
                  control={form.control}
                  name="planId"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isUpdating || isLocked} // Disable nếu bị khóa
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl font-bold border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm">
                            <SelectValue placeholder="Chọn gói thuê bao" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          {plansData?.plans?.map((p: any) => (
                            <SelectItem
                              key={p.id}
                              value={p.id}
                              className="font-bold uppercase text-[10px] py-3"
                            >
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* CỘT PHẢI */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Calendar size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Hiệu lực
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-[9px] uppercase font-black text-slate-400">
                          Bắt đầu
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            disabled={isLocked} // Disable nếu bị khóa
                            className="h-10 rounded-lg bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/5 font-mono text-xs"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-[9px] uppercase font-black text-slate-400">
                          Kết thúc
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            disabled={isLocked} // Disable nếu bị khóa
                            className="h-10 rounded-lg bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/5 font-mono text-xs"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Settings2 size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Cấu hình
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-3 px-4 bg-slate-50/50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 space-y-0">
                        <FormLabel className="text-[10px] font-bold uppercase">
                          Trạng thái
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLocked}
                        >
                          <FormControl>
                            <SelectTrigger className="w-36 h-9 rounded-lg bg-white dark:bg-zinc-900 border-none shadow-sm text-[10px] font-black uppercase">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl font-bold uppercase text-[10px]">
                            <SelectItem
                              value="Active"
                              className="text-emerald-500"
                            >
                              Hoạt động
                            </SelectItem>
                            <SelectItem
                              value="PendingPayment"
                              className="text-amber-500"
                            >
                              Chờ tiền
                            </SelectItem>
                            <SelectItem
                              value="Expired"
                              className="text-rose-500"
                            >
                              Hết hạn
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="autoRenew"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-3 px-4 bg-white dark:bg-white/5 rounded-xl shadow-sm border border-slate-100 dark:border-white/10 space-y-0">
                        <FormLabel className="text-[10px] font-bold uppercase">
                          Tự gia hạn
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLocked}
                            className="scale-90 data-[state=checked]:bg-indigo-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>

        <div className="p-6 border-t bg-slate-50/80 dark:bg-zinc-900/50 flex justify-end gap-3 items-center">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-xl font-bold text-[10px] uppercase tracking-widest px-6 hover:bg-slate-200/50"
          >
            {isLocked ? "Đóng" : "Hủy bỏ"}
          </Button>

          {/* ẨN NÚT EDIT NẾU GÓI BỊ KHÓA */}
          {!isLocked && (
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isUpdating}
              className="h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-12 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4 stroke-[3px]" />
              )}
              Lưu thay đổi
            </Button>
          )}

          {/* HIỆN THÔNG BÁO LỖI NẾU BỊ KHÓA */}
          {isLocked && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl text-amber-600 dark:text-amber-400">
              <Lock size={14} strokeWidth={3} />
              <span className="text-[9px] font-black uppercase tracking-wider">
                Locked: Không thể sửa gói đang dùng hoặc đã hủy
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
