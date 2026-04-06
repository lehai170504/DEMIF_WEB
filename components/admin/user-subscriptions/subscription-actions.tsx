"use client";

import * as React from "react";
import { CalendarPlus, Ban, Loader2 } from "lucide-react";
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

export function SubscriptionActions({
  subscriptionId,
  currentStatus,
}: {
  subscriptionId: string;
  currentStatus: string;
}) {
  const [isExtendOpen, setIsExtendOpen] = React.useState(false);
  const [isCancelOpen, setIsCancelOpen] = React.useState(false);

  // States for Extend
  const [extendDays, setExtendDays] = React.useState<number | "">("");
  const [extendNote, setExtendNote] = React.useState("");

  // States for Cancel
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
      {/* NÚT GIA HẠN */}
      <Dialog open={isExtendOpen} onOpenChange={setIsExtendOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-2xl h-11 px-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white shadow-sm hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-all font-semibold">
            <CalendarPlus className="h-4 w-4 mr-2" />
            Gia hạn thêm
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-8 border-slate-100 dark:border-white/10 shadow-2xl font-mono">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Gia hạn thuê bao
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 pt-2">
              Cộng thêm ngày sử dụng cho học viên. Nếu gói đã hết hạn, hệ thống
              sẽ gia hạn bắt đầu từ hôm nay.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Số ngày gia hạn
              </label>
              <Input
                type="number"
                placeholder="VD: 30"
                value={extendDays}
                onChange={(e) =>
                  setExtendDays(e.target.value ? Number(e.target.value) : "")
                }
                className="h-12 rounded-xl border-slate-200 bg-slate-50 dark:bg-zinc-900 font-bold focus:border-[#FF7A00]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Ghi chú (Tùy chọn)
              </label>
              <Input
                placeholder="Lý do gia hạn..."
                value={extendNote}
                onChange={(e) => setExtendNote(e.target.value)}
                className="h-12 rounded-xl border-slate-200 bg-slate-50 dark:bg-zinc-900 focus:border-[#FF7A00]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              className="rounded-xl"
              onClick={() => setIsExtendOpen(false)}
            >
              Hủy
            </Button>
            <Button
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleExtend}
              disabled={extendMutation.isPending || !extendDays}
            >
              {extendMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Xác nhận gia hạn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NÚT HỦY GÓI (Chỉ hiện nếu gói chưa bị hủy) */}
      {currentStatus !== "Cancelled" && (
        <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl h-11 px-5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-500/20 shadow-sm transition-all font-semibold">
              <Ban className="h-4 w-4 mr-2" />
              Hủy gói
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-8 border-red-100 dark:border-red-500/20 shadow-2xl font-mono">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-red-600">
                Hủy thuê bao ngay lập tức
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 pt-2">
                Hành động này sẽ vô hiệu hóa gói dịch vụ của học viên và tắt
                tính năng tự động gia hạn.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Lý do hủy (Bắt buộc)
                </label>
                <Input
                  placeholder="Nhập lý do..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 dark:bg-zinc-900 focus:border-red-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                className="rounded-xl"
                onClick={() => setIsCancelOpen(false)}
              >
                Quay lại
              </Button>
              <Button
                variant="destructive"
                className="rounded-xl"
                onClick={handleCancel}
                disabled={cancelMutation.isPending || !cancelReason.trim()}
              >
                {cancelMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Chấp nhận Hủy
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
