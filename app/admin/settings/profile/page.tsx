"use client";
import { User, Mail, Smartphone, MapPin, Camera, Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- PHẦN AVATAR & TIÊU ĐỀ --- */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 px-4">
        <div className="relative group">
          {/* Avatar với Shadow Layer */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-[6px] border-white bg-white shadow-2xl shadow-orange-200/50">
            <img
              src="https://ui-avatars.com/api/?name=Hai+Le&background=f97316&color=fff&bold=true&size=256"
              alt="Avatar"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay Camera */}
            <label className="absolute inset-0 flex items-center justify-center bg-orange-600/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
              <Camera className="text-white w-8 h-8" />
              <input type="file" className="hidden" />
            </label>
          </div>
          {/* Badge Online/Status */}
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg shadow-green-200" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-2 pb-2">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Lê Hoàng Hải</h1>
            <Badge className="bg-orange-100 text-orange-600 border-none px-3 font-bold uppercase text-[10px]">
              Admin
            </Badge>
          </div>
          <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-500" /> Cập nhật lần cuối: 10 phút trước
          </p>
        </div>
      </div>

      {/* --- FORM THÔNG TIN --- */}
      <Card className="border-none shadow-2xl shadow-orange-100/30 bg-white rounded-[3rem] overflow-hidden">
        <CardHeader className="pt-10 px-8 md:px-12">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Thông tin định danh
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 md:p-12 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {[
              { label: "Họ và tên", icon: User, val: "Lê Hoàng Hải", placeholder: "Nhập họ tên" },
              { label: "Email hệ thống", icon: Mail, val: "hai.le@admin.com", placeholder: "email@vi du.com" },
              { label: "Số điện thoại", icon: Smartphone, val: "+84 901 234 567", placeholder: "090..." },
              { label: "Khu vực hoạt động", icon: MapPin, val: "TP. Hồ Chí Minh", placeholder: "Địa chỉ" },
            ].map((field, i) => (
              <div key={i} className="group space-y-3">
                <Label className="text-slate-400 font-bold ml-1 text-[11px] uppercase tracking-[0.1em]">
                  {field.label}
                </Label>
                <div className="relative transition-all">
                  <field.icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-orange-500 group-focus-within:scale-110 transition-all" />
                  <Input
                    defaultValue={field.val}
                    placeholder={field.placeholder}
                    className="pl-13 h-15 rounded-[1.25rem] border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-orange-500/5 focus:border-orange-200 transition-all font-semibold text-slate-700"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-4 border-t border-slate-50 pt-8">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-[1.25rem] px-10 h-14 shadow-xl shadow-orange-200 transition-all hover:-translate-y-1 active:scale-95 font-bold">
              <Save className="w-5 h-5 mr-2" /> 
              Cập nhật hồ sơ
            </Button>
            <Button variant="ghost" className="rounded-[1.25rem] h-14 px-8 font-bold text-slate-400 hover:text-slate-600 transition-all">
              Hủy bỏ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}