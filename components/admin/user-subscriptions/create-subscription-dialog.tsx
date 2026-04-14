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
import { Loader2, Plus, Sparkles } from "lucide-react";

import { useAdminManageSubscription } from "@/hooks/use-user-subscriptions";
import { useSubscriptionPlans } from "@/hooks/use-subscription";
import { useUsers } from "@/hooks/use-users";

export function CreateSubscriptionDialog({ open, onOpenChange }: any) {
  const { createSubscription, isCreating } = useAdminManageSubscription();
  const { data: plansData } = useSubscriptionPlans();
  const { data: usersData } = useUsers({}); // lấy all

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
      <DialogContent className="sm:max-w-[560px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        {/* HEADER */}
        <DialogHeader className="relative p-8 bg-gradient-to-br from-orange-500 to-pink-600 text-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_white,_transparent)]" />

          <DialogTitle className="relative flex items-center gap-3 uppercase text-xl font-semibold">
            <Sparkles className="w-5 h-5" />
            Tạo thuê bao mới
          </DialogTitle>

          <p className="relative text-xs text-white/80 mt-1">
            Gán gói dịch vụ cho người dùng trong hệ thống
          </p>
        </DialogHeader>

        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            {/* USER */}
            <div className="p-4 border rounded-2xl space-y-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Người dùng</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isCreating}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="Chọn người dùng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {usersData?.users?.map((u: any) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.name} ({u.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* PLAN + DATE */}
            <div className="p-4 border rounded-2xl space-y-4">
              <FormField
                control={form.control}
                name="planId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gói dịch vụ</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isCreating}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="Chọn gói" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {plansData?.plans?.map((p: any) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bắt đầu</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-11 rounded-xl"
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
                    <FormItem>
                      <FormLabel>Kết thúc</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-11 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* STATUS + AUTO RENEW */}
            <div className="p-4 border rounded-2xl space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Đang hoạt động</SelectItem>
                        <SelectItem value="PendingPayment">
                          Chờ thanh toán
                        </SelectItem>
                        <SelectItem value="Expired">Hết hạn</SelectItem>
                        <SelectItem value="Cancelled">Đã hủy</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autoRenew"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Tự động gia hạn</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Tự động gia hạn khi hết hạn
                      </p>
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
            </div>
          </form>
        </Form>

        {/* FOOTER */}
        <DialogFooter className="p-6 border-t bg-muted/30 flex justify-between">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>

          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isCreating}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6"
          >
            {isCreating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Tạo thuê bao
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
