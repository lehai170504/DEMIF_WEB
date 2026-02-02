"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export default function AddAdminDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập Email và Mật khẩu.");
      return;
    }

    setLoading(true);

    // --- GIẢ LẬP LOGIC THÊM ADMIN ---
    new Promise((resolve) => setTimeout(resolve, 2000))
      .then(() => {
        toast.success(`Đã thêm thành công tài khoản Admin: ${email}`);
        setEmail("");
        setPassword("");
        setOpen(false);
      })
      .catch((err) => {
        toast.error("Lỗi khi thêm Admin. Vui lòng thử lại.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[1.5rem] font-mono bg-[#18181b] border-white/10 text-zinc-100 shadow-2xl p-0 overflow-hidden">
        {/* Header with decorative background */}
        <div className="relative p-6 border-b border-white/5 bg-gradient-to-br from-orange-500/10 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[50px] rounded-full pointer-events-none" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight text-white">
              <ShieldCheck className="h-5 w-5 text-orange-500" /> Thêm Admin
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs font-medium mt-1.5 leading-relaxed">
              Tạo tài khoản mới với quyền quản trị viên cao cấp.
              <span className="text-red-400 block mt-2 font-bold bg-red-500/10 border border-red-500/20 px-2 py-1.5 rounded-lg w-fit">
                ⚠ Lưu ý: Chỉ thêm quyền Admin.
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-3">
            <Label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5"
            >
              <Mail className="h-3 w-3" /> Email Admin
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/20 border-white/10 text-white rounded-xl focus-visible:ring-orange-500/50 focus-visible:border-orange-500 h-11 transition-all"
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5"
            >
              <Lock className="h-3 w-3" /> Mật khẩu khởi tạo
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/20 border-white/10 text-white rounded-xl focus-visible:ring-orange-500/50 focus-visible:border-orange-500 h-11 transition-all"
            />
          </div>

          <DialogFooter className="mt-4 pt-4 border-t border-white/5">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-widest text-xs transition-all shadow-lg"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Xác nhận cấp quyền
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
