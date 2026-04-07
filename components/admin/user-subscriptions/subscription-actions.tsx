"use client";

import * as React from "react";
import { CalendarPlus, Ban, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCancelSubscription,
  useExtendSubscription,
} from "@/hooks/use-user-subscription-actions";
import { cn } from "@/lib/utils";

export function SubscriptionActions({
  subscriptionId,
  currentStatus,
}: {
  subscriptionId: string;
  currentStatus: string;
}) {
  const [isExtendOpen, setIsExtendOpen] = React.useState(false);
  const [isCancelOpen, setIsCancelOpen] = React.useState(false);

  const [extendDays, setExtendDays] = React.useState<number | "">("");
  const [extendNote, setExtendNote] = React.useState("");
  const [cancelReason, setCancelReason] = React.useState("");

  const extendMutation = useExtendSubscription();
  const cancelMutation = useCancelSubscription();

  const handleExtend = () => {
    if (!extendDays || extendDays <= 0) return;
    extendMutation.mutate(
      {
        id: subscriptionId,
        data: { days: Number(extendDays), note: extendNote },
      },
      {
        onSuccess: () => {
          setIsExtendOpen(false);
          setExtendDays("");
          setExtendNote("");
        },
      },
    );
  };

  const handleCancel = () => {
    if (!cancelReason.trim()) return;
    cancelMutation.mutate(
      { id: subscriptionId, data: { reason: cancelReason } },
      {
        onSuccess: () => {
          setIsCancelOpen(false);
          setCancelReason("");
        },
      },
    );
  };

  return (
    <div className="flex items-center gap-3 font-mono">
      {/* LOGIC GIA HẠN: CHỈ HIỂN THỊ KHI STATUS LÀ ACTIVE */}
      {currentStatus === "Active" && (
        <Dialog open={isExtendOpen} onOpenChange={setIsExtendOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 rounded-2xl px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-95">
              <CalendarPlus className="h-4 w-4 mr-2" />
              Gia hạn ngay
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10 border-slate-100 dark:border-white/5 bg-white dark:bg-zinc-950 shadow-2xl font-mono">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                  <RefreshCw className="w-5 h-5 text-emerald-600" />
                </div>
                Gia hạn <span className="text-slate-400">thuê bao</span>
              </DialogTitle>
              <DialogDescription className="text-xs font-medium text-slate-500 leading-relaxed">
                Cộng thêm ngày sử dụng trực tiếp cho học viên.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-8 py-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Số ngày cộng thêm
                </label>
                <Input
                  type="number"
                  placeholder="Ví dụ: 30"
                  value={extendDays}
                  onChange={(e) =>
                    setExtendDays(e.target.value ? Number(e.target.value) : "")
                  }
                  className="h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 font-black text-lg focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Ghi chú
                </label>
                <Input
                  placeholder="Lý do..."
                  value={extendNote}
                  onChange={(e) => setExtendNote(e.target.value)}
                  className="h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 font-bold"
                />
              </div>
            </div>

            <DialogFooter className="gap-3">
              <Button
                variant="ghost"
                className="h-12 rounded-2xl font-bold uppercase text-[10px] tracking-widest text-slate-500"
                onClick={() => setIsExtendOpen(false)}
              >
                Hủy bỏ
              </Button>
              <Button
                className="h-12 rounded-2xl px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-500/20"
                onClick={handleExtend}
                disabled={extendMutation.isPending || !extendDays}
              >
                {extendMutation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                Xác nhận
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* LOGIC HỦY GÓI: HIỆN KHI CHƯA BỊ CANCELLED */}
      {currentStatus !== "Cancelled" && (
        <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-12 rounded-2xl px-6 border-slate-200 dark:border-white/10 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/5 hover:border-red-200 transition-all font-bold text-[10px] uppercase tracking-widest"
            >
              <Ban className="h-3.5 w-3.5 mr-2" />
              Hủy gói
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10 border-red-100 dark:border-red-500/10 bg-white dark:bg-zinc-950 font-mono">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-black uppercase tracking-tight text-red-600">
                Hủy bỏ <span className="text-slate-400">gói đăng ký</span>
              </DialogTitle>
              <DialogDescription className="text-xs font-medium text-slate-500 leading-relaxed">
                Ngắt quyền truy cập ngay lập tức.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-8 py-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Lý do hủy
                </label>
                <Input
                  placeholder="Nhập lý do..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-red-50/30 dark:bg-red-500/5 font-bold focus:border-red-500"
                />
              </div>
            </div>
            <DialogFooter className="gap-3">
              <Button
                variant="ghost"
                className="h-12 rounded-2xl font-bold uppercase text-[10px] tracking-widest"
                onClick={() => setIsCancelOpen(false)}
              >
                Quay lại
              </Button>
              <Button
                variant="destructive"
                className="h-12 rounded-2xl px-8 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-red-500/20"
                onClick={handleCancel}
                disabled={cancelMutation.isPending || !cancelReason.trim()}
              >
                {cancelMutation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                Xác nhận hủy
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
