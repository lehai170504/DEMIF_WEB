    // components/admin/AddAdminDialog.tsx

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
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function AddAdminDialog({ children }: { children: React.ReactNode }) {
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
    
    // --- GIẢ LẬP LOGIC THÊM ADMIN (Dùng API Firebase Admin/Backend) ---
    new Promise((resolve) => setTimeout(resolve, 2000))
      .then(() => {
        // GIẢ LẬP: Sau khi thêm thành công, gán vai trò 'admin'
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
      <DialogContent className="sm:max-w-[425px] rounded-l font-mono">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" /> Thêm Tài Khoản Admin
          </DialogTitle>
          <DialogDescription>
            Tạo tài khoản mới với quyền quản trị viên.
            <span className="font-semibold text-red-500 block mt-1">
              *Chỉ được thêm tài khoản Admin, không thêm Member.
            </span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Mật khẩu
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Tạo Admin
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}