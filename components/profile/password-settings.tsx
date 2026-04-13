"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import { useChangePassword } from "@/hooks/use-user";
import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from "@/schemas/auth.schema";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function PasswordSettings() {
  const changePasswordMutation = useChangePassword();

  // State cho ẩn/hiện mật khẩu
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState<ChangePasswordFormValues>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ChangePasswordFormValues, string>>
  >({});

  const handleChange = (
    field: keyof ChangePasswordFormValues,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const result = changePasswordSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: any = {};
      result.error.errors.forEach((err) => {
        if (!newErrors[err.path[0]]) {
          newErrors[err.path[0]] = err.message;
        }
      });
      setErrors(newErrors);
      toast.error("Kiểm tra lại thông tin", {
        description: result.error.errors[0].message,
      });
      return;
    }

    changePasswordMutation.mutate(result.data, {
      onSuccess: () => {
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      },
    });
  };

  return (
    <div className="max-w-xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── ALERTS & TIPS ── */}
      <div className="p-6 bg-orange-500/5 border border-orange-500/10 rounded-[2rem] flex gap-5 items-start relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
        <div className="p-3 bg-orange-500/10 rounded-2xl shrink-0 border border-orange-500/20">
          <ShieldCheck className="h-6 w-6 text-orange-500" />
        </div>
        <div className="space-y-1.5 relative z-10">
          <h4 className="text-sm font-black uppercase tracking-tight text-gray-900 dark:text-white">
            Nâng cao bảo mật
          </h4>
          <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
            Mật khẩu mới nên có ít nhất{" "}
            <span className="text-orange-500 font-bold">8 ký tự</span>, bao gồm
            chữ hoa, số và ký tự đặc biệt để đảm bảo an toàn tối đa cho tài
            khoản của bạn.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* ── CURRENT PASSWORD ── */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 ml-1">
            Mật khẩu hiện tại
          </Label>
          <div className="relative group">
            <Input
              type={showCurrent ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              className={cn(
                "h-14 pl-12 pr-12 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/5 text-sm font-bold transition-all",
                errors.currentPassword
                  ? "border-red-500/50 focus-visible:ring-red-500/20 bg-red-500/5"
                  : "focus-visible:ring-orange-500/30",
              )}
            />
            <Lock
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                errors.currentPassword
                  ? "text-red-500"
                  : "text-gray-400 dark:text-zinc-600 group-focus-within:text-orange-500",
              )}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              {showCurrent ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-2 italic">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* ── NEW PASSWORD ── */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 ml-1">
            Mật khẩu mới
          </Label>
          <div className="relative group">
            <Input
              type={showNew ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              className={cn(
                "h-14 pl-12 pr-12 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/5 text-sm font-bold transition-all",
                errors.newPassword
                  ? "border-red-500/50 focus-visible:ring-red-500/20 bg-red-500/5"
                  : "focus-visible:ring-orange-500/30",
              )}
            />
            <KeyRound
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                errors.newPassword
                  ? "text-red-500"
                  : "text-gray-400 dark:text-zinc-600 group-focus-within:text-orange-500",
              )}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              {showNew ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-2 italic">
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* ── CONFIRM PASSWORD ── */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 ml-1">
            Xác nhận mật khẩu
          </Label>
          <div className="relative group">
            <Input
              type={showConfirm ? "text" : "password"}
              value={formData.confirmNewPassword}
              onChange={(e) =>
                handleChange("confirmNewPassword", e.target.value)
              }
              className={cn(
                "h-14 pl-12 pr-12 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/5 text-sm font-bold transition-all",
                errors.confirmNewPassword
                  ? "border-red-500/50 focus-visible:ring-red-500/20 bg-red-500/5"
                  : "focus-visible:ring-orange-500/30",
              )}
            />
            <ShieldCheck
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                errors.confirmNewPassword
                  ? "text-red-500"
                  : "text-gray-400 dark:text-zinc-600 group-focus-within:text-orange-500",
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmNewPassword && (
            <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-2 italic">
              {errors.confirmNewPassword}
            </p>
          )}
        </div>
      </div>

      {/* ── SUBMIT BUTTON ── */}
      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          disabled={changePasswordMutation.isPending}
          className="w-full h-14 rounded-2xl bg-orange-500 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-orange-600 dark:hover:bg-zinc-200 shadow-xl shadow-orange-500/10 dark:shadow-white/5 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {changePasswordMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
            </>
          ) : (
            "Cập nhật mật khẩu ngay"
          )}
        </Button>
      </div>
    </div>
  );
}
