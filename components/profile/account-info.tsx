"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Check } from "lucide-react";

export function AccountInfo() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar với nút Edit nhanh */}
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
            <AvatarImage src="/avatar-placeholder.jpg" />
            <AvatarFallback className="bg-orange-500 text-white font-bold text-xl">
              D
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full border-2 border-white hover:bg-orange-600 transition-colors">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-xl font-bold text-slate-900">
            Thông tin cá nhân
          </h3>
          <p className="text-sm text-slate-500">
            Cập nhật ảnh đại diện và thông tin cơ bản của bạn tại đây.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Tên đăng nhập
          </Label>
          <Input
            defaultValue="demif_user"
            className="rounded-xl border-slate-100 bg-slate-50/50"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Email (Không thể thay đổi)
          </Label>
          <Input
            value="user@example.com"
            disabled
            className="rounded-xl bg-slate-100 text-slate-400 border-none"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Họ và tên
          </Label>
          <Input
            placeholder="Nguyễn Văn A"
            className="rounded-xl border-slate-100"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Số điện thoại
          </Label>
          <Input
            placeholder="090 123 4567"
            className="rounded-xl border-slate-100"
          />
        </div>
      </div>

      <Button className="rounded-xl bg-orange-500 px-8 font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20">
        Lưu thay đổi
      </Button>
    </div>
  );
}
