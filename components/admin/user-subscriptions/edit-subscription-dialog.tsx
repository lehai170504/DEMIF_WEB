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
import { Loader2, Save, Sparkles } from "lucide-react";

import { useAdminManageSubscription } from "@/hooks/use-user-subscriptions";
import { useSubscriptionPlans } from "@/hooks/use-subscription";

export function EditSubscriptionDialog({
  subscription,
  open,
  onOpenChange,
}: any) {
  const { updateSubscription, isUpdating } = useAdminManageSubscription();
  const { data: plansData } = useSubscriptionPlans();

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
    if (!subscription?.id) return;

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
      <DialogContent className="sm:max-w-[560px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        {/* HEADER */}
        <DialogHeader className="relative p-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_white,_transparent)]" />

          <DialogTitle className="relative flex items-center gap-3 uppercase text-xl font-semibold">
            <Sparkles className="w-5 h-5" />
            Chỉnh sửa thuê bao
          </DialogTitle>

          <p className="relative text-xs text-white/80 mt-1">
            Cập nhật thông tin gói dịch vụ cho người dùng
          </p>
        </DialogHeader>

        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            {/* USER CARD */}
            <div className="p-4 rounded-2xl bg-muted/50 border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Người dùng</p>
                <p className="font-semibold">{subscription?.userName}</p>
                <p className="text-xs text-muted-foreground">
                  {subscription?.userEmail}
                </p>
              </div>
            </div>

            {/* PLAN */}
            <div className="space-y-4 p-4 border rounded-2xl bg-background">
              <FormField
                control={form.control}
                name="planId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gói dịch vụ</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isUpdating}
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

              {/* DATE */}
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

            {/* STATUS */}
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

              {/* AUTO RENEW */}
              <FormField
                control={form.control}
                name="autoRenew"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Tự động gia hạn</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Hệ thống sẽ tự động gia hạn khi hết hạn
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
            disabled={isUpdating}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6"
          >
            {isUpdating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
