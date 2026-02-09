"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Loader2, AlertCircle } from "lucide-react";
import { useChangePassword } from "@/hooks/use-user";
import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from "@/schemas/auth.schema";
import { toast } from "sonner";

export function PasswordSettings() {
  const changePasswordMutation = useChangePassword();

  // State form
  const [formData, setFormData] = useState<ChangePasswordFormValues>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // State lỗi hiển thị
  const [errors, setErrors] = useState<
    Partial<Record<keyof ChangePasswordFormValues, string>>
  >({});

  const handleChange = (
    field: keyof ChangePasswordFormValues,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Xóa lỗi khi người dùng bắt đầu nhập lại
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    // 1. Validate
    const result = changePasswordSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: any = {};
      result.error.errors.forEach((err) => {
        if (!newErrors[err.path[0]]) {
          newErrors[err.path[0]] = err.message;
        }
      });
      setErrors(newErrors);
      // Hiển thị toast lỗi đầu tiên để gây chú ý
      toast.error("Lỗi dữ liệu", {
        description: result.error.errors[0].message,
      });
      return;
    }

    // 2. Call API
    changePasswordMutation.mutate(result.data, {
      onSuccess: () => {
        // Reset form sau khi thành công
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      },
    });
  };

  return (
    <div className="max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Alert Box */}
      <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-4 items-start">
        <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
          <ShieldCheck className="h-5 w-5 text-blue-400" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-blue-300">Bảo mật mật khẩu</h4>
          <p className="text-xs text-blue-200/70 leading-relaxed font-medium">
            Sử dụng mật khẩu mạnh bao gồm chữ hoa, chữ thường, số và ký tự đặc
            biệt để bảo vệ tài khoản tốt nhất.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Current Password */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Mật khẩu hiện tại
          </Label>
          <div className="relative group">
            <Input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              className={`h-12 pl-11 rounded-2xl bg-black/20 border-white/10 text-white transition-all ${
                errors.currentPassword
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "focus-visible:ring-orange-500/50"
              }`}
            />
            <Lock
              className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${errors.currentPassword ? "text-red-500" : "text-zinc-600 group-focus-within:text-orange-500"}`}
            />
          </div>
          {errors.currentPassword && (
            <p className="text-xs text-red-400 font-medium ml-1">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Mật khẩu mới
          </Label>
          <Input
            type="password"
            value={formData.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
            className={`h-12 rounded-2xl bg-black/20 border-white/10 text-white transition-all ${
              errors.newPassword
                ? "border-red-500 focus-visible:ring-red-500"
                : "focus-visible:ring-orange-500/50"
            }`}
          />
          {errors.newPassword && (
            <p className="text-xs text-red-400 font-medium ml-1">
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Xác nhận mật khẩu
          </Label>
          <Input
            type="password"
            value={formData.confirmNewPassword}
            onChange={(e) => handleChange("confirmNewPassword", e.target.value)}
            className={`h-12 rounded-2xl bg-black/20 border-white/10 text-white transition-all ${
              errors.confirmNewPassword
                ? "border-red-500 focus-visible:ring-red-500"
                : "focus-visible:ring-orange-500/50"
            }`}
          />
          {errors.confirmNewPassword && (
            <p className="text-xs text-red-400 font-medium ml-1">
              {errors.confirmNewPassword}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={changePasswordMutation.isPending}
          className="w-full h-12 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {changePasswordMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang cập nhật...
            </>
          ) : (
            "Cập nhật mật khẩu"
          )}
        </Button>
      </div>
    </div>
  );
}
