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
  Plus,
  Sparkles,
  User,
  CreditCard,
  Calendar,
  Settings2,
  ShieldCheck,
} from "lucide-react";

import { useAdminManageSubscription } from "@/hooks/use-user-subscriptions";
import { useSubscriptionPlans } from "@/hooks/use-subscription";
import { useUsers } from "@/hooks/use-users";
import { cn } from "@/lib/utils";

export function CreateSubscriptionDialog({ open, onOpenChange }: any) {
  const { createSubscription, isCreating } = useAdminManageSubscription();
  const { data: plansData } = useSubscriptionPlans();
  const { data: usersData } = useUsers({});

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      userId: "",
      planId: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      status: "Active",
      autoRenew: false,
    },
  });

  const onSubmit = (values: any) => {
    if (!values.userId || !values.planId || !values.endDate) return;

    const payload = {
      userId: values.userId,
      planId: values.planId,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
      status: values.status,
      autoRenew: values.autoRenew,
    };

    createSubscription(payload, {
      onSuccess: () => {
        onOpenChange(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Tăng max-width lên sm:max-w-[800px] để dàn ngang */}
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden border-none bg-white dark:bg-zinc-950 rounded-[2.5rem] shadow-3xl">
        {/* HEADER - Gọn gàng hơn */}
        <DialogHeader className="relative p-8 bg-slate-900 dark:bg-zinc-900 text-white overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12">
            <ShieldCheck size={100} />
          </div>
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <DialogTitle className="uppercase text-lg font-black tracking-tighter">
                Cấp thuê bao mới
              </DialogTitle>
            </div>
            <p className="text-xs text-slate-400 font-medium italic">
              Thiết lập đặc quyền Premium cho học viên
            </p>
          </div>
        </DialogHeader>

        {/* FORM BODY - Dàn 2 cột */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          >
            {/* CỘT TRÁI: NGƯỜI DÙNG & GÓI */}
            <div className="space-y-6">
              {/* Nhóm 1: Người dùng */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-orange-500">
                  <User size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Chủ sở hữu
                  </span>
                </div>
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isCreating}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl font-bold shadow-sm">
                            <SelectValue placeholder="Chọn người dùng..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-slate-200 dark:border-white/10">
                          {usersData?.users?.map((u: any) => (
                            <SelectItem
                              key={u.id}
                              value={u.id}
                              className="py-2.5 font-medium"
                            >
                              <div className="flex flex-col text-left">
                                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                                  {u.name}
                                </span>
                                <span className="text-[9px] text-slate-500">
                                  {u.email}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Nhóm 2: Gói dịch vụ */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-orange-500">
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
                        disabled={isCreating}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl font-bold bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10">
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

            {/* CỘT PHẢI: THỜI HẠN & CÀI ĐẶT */}
            <div className="space-y-6">
              {/* Nhóm 3: Thời hạn */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-orange-500">
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
                          Từ ngày
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
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
                          Đến ngày
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="h-10 rounded-lg bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/5 font-mono text-xs"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Nhóm 4: Trạng thái & Gia hạn - Gộp lại cho ngắn */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-orange-500">
                  <Settings2 size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Thiết lập
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
                        >
                          <FormControl>
                            <SelectTrigger className="w-32 h-9 rounded-lg bg-white dark:bg-zinc-900 border-none shadow-sm text-[10px] font-black uppercase">
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
                          Gia hạn
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="scale-90 data-[state=checked]:bg-orange-500"
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

        {/* FOOTER - Gọn nhẹ */}
        <div className="p-6 border-t bg-slate-50/80 dark:bg-zinc-900/50 flex justify-end gap-3 items-center">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-xl font-bold text-[10px] uppercase tracking-widest px-6 hover:bg-slate-200/50"
          >
            Hủy
          </Button>

          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isCreating}
            className="h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-12 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
          >
            {isCreating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4 stroke-[4px]" />
            )}
            Xác nhận tạo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
