"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Save,
  User,
  Mail,
  Globe,
  Trophy,
  Calendar,
  Languages,
  Loader2,
  Signal,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserProfile, useUpdateProfile } from "@/hooks/use-user";
import { toast } from "sonner";
import {
  updateProfileSchema,
  UpdateProfileFormValues,
} from "@/schemas/user.schema";

export function AccountInfo() {
  const { data: user, isLoading } = useUserProfile();
  const updateMutation = useUpdateProfile();

  const [formData, setFormData] = useState<UpdateProfileFormValues>({
    username: "",
    avatarUrl: "",
    country: "",
    nativeLanguage: "",
    targetLanguage: "",
    currentLevel: "Beginner",
    dailyGoalMinutes: 30,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        avatarUrl: user.avatarUrl || "",
        country: user.country || "",
        nativeLanguage: user.nativeLanguage || "",
        targetLanguage: user.targetLanguage || "",
        currentLevel: (user.currentLevel as any) || "Beginner",
        dailyGoalMinutes: user.dailyGoalMinutes || 30,
      });
    }
  }, [user]);

  const handleSave = () => {
    const result = updateProfileSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.errors[0].message;
      toast.error("Lỗi dữ liệu", {
        description: firstError,
      });
      return;
    }

    // --- FIX LỖI TYPE Ở ĐÂY
    const payload = {
      ...result.data,

      avatarUrl: result.data.avatarUrl || null,

      country: result.data.country || "",
      nativeLanguage: result.data.nativeLanguage || "",
      targetLanguage: result.data.targetLanguage || "",

      // Các trường bắt buộc giữ nguyên
      username: result.data.username,
      dailyGoalMinutes: result.data.dailyGoalMinutes,
      currentLevel: result.data.currentLevel,
    };

    // 3. Gọi API update với payload đã chuẩn hóa
    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="text-white animate-pulse">Đang tải thông tin...</div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* --- HEADER SECTION (Avatar & Info) --- */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar Preview */}
        <div className="relative group shrink-0 mx-auto md:mx-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-[#18181b] shadow-2xl relative">
              <AvatarImage
                src={formData.avatarUrl || "/avatar-placeholder.jpg"}
                className="object-cover"
                onError={(e) => {
                  // Fallback nếu link lỗi (optional)
                }}
              />
              <AvatarFallback className="bg-zinc-800 text-zinc-400 font-bold text-4xl">
                {formData.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Header Info + Avatar URL Input */}
        <div className="flex-1 w-full space-y-4 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Hồ sơ cá nhân
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto md:mx-0 mt-1">
              Quản lý thông tin hiển thị công khai.
            </p>
          </div>

          {/* INPUT AVATAR URL */}
          <div className="max-w-md mx-auto md:mx-0">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1.5 block">
              Avatar URL (Link ảnh)
            </Label>
            <div className="relative group">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
              <Input
                value={formData.avatarUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, avatarUrl: e.target.value })
                }
                placeholder="https://example.com/my-avatar.png"
                className="pl-11 h-10 rounded-xl border-white/10 bg-black/20 text-white focus-visible:ring-orange-500/50 transition-all font-mono text-xs"
              />
            </div>
            <p className="text-[10px] text-zinc-500 mt-1.5 flex items-center gap-1 justify-center md:justify-start">
              <ImageIcon className="w-3 h-3" />
              Dán đường dẫn ảnh trực tiếp (JPG, PNG) để thay đổi avatar.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
            {user?.roles?.map((role) => (
              <span
                key={role}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-zinc-300"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- FORM GRID --- */}
      <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
        {/* Username */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Tên hiển thị
          </Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
            <Input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="pl-11 h-12 rounded-2xl border-white/10 bg-black/20 text-white focus-visible:ring-orange-500/50 transition-all font-medium"
            />
          </div>
        </div>

        {/* Email (Read-only) */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Email đăng nhập
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
            <Input
              value={user?.email || ""}
              disabled
              className="pl-11 h-12 rounded-2xl bg-white/5 border-transparent text-zinc-400 cursor-not-allowed font-mono text-sm"
            />
          </div>
        </div>

        {/* Country */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Quốc gia
          </Label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              value={formData.country || ""}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="pl-11 h-12 rounded-2xl border-white/10 bg-black/20 text-white focus-visible:ring-orange-500/50 transition-all"
            />
          </div>
        </div>

        {/* Native Language */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Ngôn ngữ mẹ đẻ
          </Label>
          <div className="relative">
            <Languages className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
            <Input
              value={formData.nativeLanguage || ""}
              onChange={(e) =>
                setFormData({ ...formData, nativeLanguage: e.target.value })
              }
              className="pl-11 h-12 rounded-2xl border-white/10 bg-black/20 text-white focus-visible:ring-orange-500/50 transition-all"
              placeholder="VD: Vietnamese"
            />
          </div>
        </div>

        {/* Target Language */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Ngôn ngữ đang học
          </Label>
          <div className="relative">
            <Languages className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
            <Input
              value={formData.targetLanguage || ""}
              onChange={(e) =>
                setFormData({ ...formData, targetLanguage: e.target.value })
              }
              className="pl-11 h-12 rounded-2xl border-white/10 bg-black/20 text-white focus-visible:ring-orange-500/50 transition-all border-orange-500/20"
              placeholder="VD: English"
            />
          </div>
        </div>

        {/* Current Level */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Trình độ hiện tại
          </Label>
          <div className="relative">
            <Signal className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 z-10" />
            <Select
              value={formData.currentLevel}
              onValueChange={(val: any) =>
                setFormData({ ...formData, currentLevel: val })
              }
            >
              <SelectTrigger className="pl-11 h-12 rounded-2xl border-white/10 bg-black/20 text-white w-full">
                <SelectValue placeholder="Chọn trình độ" />
              </SelectTrigger>
              <SelectContent className="bg-[#18181b] border-white/10 text-white">
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Mục tiêu luyện tập
          </Label>
          <div className="relative">
            <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              type="number"
              value={formData.dailyGoalMinutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dailyGoalMinutes: Number(e.target.value),
                })
              }
              className="pl-11 h-12 rounded-2xl border-white/10 bg-black/20 text-white focus-visible:ring-orange-500/50 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500 font-bold uppercase">
              Phút/Ngày
            </span>
          </div>
        </div>

        {/* Created At (Read-only) */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Thành viên từ
          </Label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
            <Input
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                  : "N/A"
              }
              disabled
              className="pl-11 h-12 rounded-2xl bg-white/5 border-transparent text-zinc-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* --- FOOTER ACTION --- */}
      <div className="flex justify-between items-center pt-6 border-t border-white/5">
        <p className="text-xs text-zinc-500 italic">
          Lần đăng nhập cuối:{" "}
          {user?.lastLoginAt
            ? new Date(user.lastLoginAt).toLocaleString("vi-VN")
            : "N/A"}
        </p>

        <Button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="h-12 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {updateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang lưu...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
