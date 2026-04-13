"use client";

import { useForm } from "react-hook-form";
import { Loader2, Send, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBroadcastNotification } from "@/hooks/use-notification";
import { toast } from "sonner";
import { BroadcastNotificationPayload } from "@/types/notification.type";
import { cn } from "@/lib/utils";

// 1. Khai báo interface cho props
interface AdminBroadcastFormProps {
  onSuccess?: () => void;
}

// 2. Nhận prop onSuccess
export function AdminBroadcastForm({ onSuccess }: AdminBroadcastFormProps) {
  const { mutate, isPending } = useBroadcastNotification();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BroadcastNotificationPayload>();

  const onSubmit = (data: BroadcastNotificationPayload) => {
    const payload = {
      ...data,
      actionUrl: data.actionUrl?.trim() === "" ? undefined : data.actionUrl,
    };

    mutate(payload, {
      onSuccess: (res) => {
        toast.success(`Thành công! ${res.summary}`);
        reset();
        // 3. Gọi hàm onSuccess để đóng Dialog
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.error || "Lỗi gửi thông báo");
      },
    });
  };

  return (
    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 shadow-xl font-mono">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-6">
        <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF7A00]">
          <Megaphone className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight dark:text-white">
            Phát sóng <span className="text-[#FF7A00]">Thông báo</span>
          </h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
            Gửi email và in-app notification cho toàn user
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* TIÊU ĐỀ */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("title", {
              required: "Vui lòng nhập tiêu đề",
              maxLength: { value: 120, message: "Tiêu đề không quá 120 ký tự" },
            })}
            placeholder="VD: System maintenance tonight"
            className={cn(
              "h-12 rounded-xl bg-gray-50 dark:bg-white/5 border-transparent",
              errors.title && "border-red-500 focus-visible:ring-red-500",
            )}
          />
          {errors.title && (
            <p className="text-[9px] text-red-500 font-bold uppercase ml-2 mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* NỘI DUNG */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">
            Nội dung <span className="text-red-500">*</span>
          </label>
          <Textarea
            {...register("message", {
              required: "Vui lòng nhập nội dung",
              maxLength: {
                value: 4000,
                message: "Nội dung không quá 4000 ký tự",
              },
            })}
            placeholder="Nhập nội dung chi tiết..."
            className={cn(
              "min-h-[120px] rounded-xl bg-gray-50 dark:bg-white/5 border-transparent resize-none pt-4",
              errors.message && "border-red-500 focus-visible:ring-red-500",
            )}
          />
          {errors.message && (
            <p className="text-[9px] text-red-500 font-bold uppercase ml-2 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* URL */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">
            URL Hành động (Tùy chọn)
          </label>
          <Input
            {...register("actionUrl", {
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                message: "Vui lòng nhập một đường dẫn hợp lệ",
              },
            })}
            placeholder="https://demif.app/..."
            className={cn(
              "h-12 rounded-xl bg-gray-50 dark:bg-white/5 border-transparent text-blue-500",
              errors.actionUrl && "border-red-500 focus-visible:ring-red-500",
            )}
          />
          {errors.actionUrl && (
            <p className="text-[9px] text-red-500 font-bold uppercase ml-2 mt-1">
              {errors.actionUrl.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-14 mt-4 rounded-xl bg-[#FF7A00] hover:bg-orange-600 text-white font-black uppercase tracking-[0.2em] text-xs shadow-lg active:scale-95 transition-all"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" /> Phát sóng ngay
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
