"use client";

import * as React from "react";
import { Banknote, Loader2, RotateCcw } from "lucide-react";
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
import { useRefundPayment } from "@/hooks/use-admin-payments";

interface RefundDialogProps {
  paymentId: string;
  amount: number;
  currency: string;
  userName: string;
}

export function RefundDialog({
  paymentId,
  amount,
  currency,
  userName,
}: RefundDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const refundMutation = useRefundPayment();

  const formatCurrency = (val: number, cur: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: cur,
    }).format(val);
  };

  const handleRefund = () => {
    if (!reason.trim()) return;
    refundMutation.mutate(
      { id: paymentId, payload: { reason: reason.trim() } },
      {
        onSuccess: () => {
          setIsOpen(false);
          setReason("");
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 rounded-2xl px-6 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all active:scale-95">
          <RotateCcw className="h-4 w-4 mr-2" /> Hoàn tiền (Refund)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10 border-red-100 dark:border-white/5 bg-white dark:bg-zinc-950 shadow-2xl font-mono">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-red-600">
            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl">
              <Banknote className="w-5 h-5 text-red-600" />
            </div>
            Xác nhận hoàn tiền
          </DialogTitle>
          <DialogDescription className="text-xs font-medium text-slate-500 leading-relaxed">
            Bạn đang yêu cầu hoàn tiền{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              {formatCurrency(amount, currency)}
            </span>{" "}
            cho học viên <span className="font-bold">{userName}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Lý do hoàn tiền
            </label>
            <Input
              placeholder="Nhập lý do..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 font-bold focus:border-red-500 focus:ring-red-500/20"
            />
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="ghost"
            className="h-12 rounded-2xl font-bold uppercase text-[10px] tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="destructive"
            className="h-12 rounded-2xl px-8 font-black uppercase text-[10px] tracking-widest"
            onClick={handleRefund}
            disabled={refundMutation.isPending || !reason.trim()}
          >
            {refundMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Xác nhận Refund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
