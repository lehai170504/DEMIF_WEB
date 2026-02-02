"use client";

import { CheckCircle, CreditCard, Download, Zap, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function BillingSubscription() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
      {/* Current Plan Card - Neon Style */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#18181b] to-black border border-white/10 p-1">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative bg-[#18181b]/50 backdrop-blur-xl rounded-[2.3rem] p-8 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg shadow-orange-500/20">
                  <Crown className="h-6 w-6 text-white fill-white" />
                </div>
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-3 py-1 uppercase tracking-widest text-[10px] font-black">
                  Active
                </Badge>
              </div>
              <h4 className="text-4xl font-black text-white tracking-tight">
                Premium Member
              </h4>
              <p className="text-zinc-400 font-medium">
                Gia hạn tiếp theo:{" "}
                <span className="text-white">12/12/2026</span>
              </p>
            </div>

            <Button
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold h-12"
            >
              Quản lý gói
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-8 border-t border-white/5">
            {[
              "Không giới hạn bài tập",
              "Phân tích phát âm AI",
              "Tải về bài học Offline",
              "Hỗ trợ 1-1 ưu tiên",
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm font-medium text-zinc-300"
              >
                <CheckCircle className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 pl-2">
          Lịch sử thanh toán
        </h3>
        <div className="rounded-[2rem] border border-white/10 bg-[#18181b] overflow-hidden shadow-xl">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/5">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold text-zinc-400 text-xs uppercase tracking-wider pl-6 py-4">
                  Mã đơn
                </TableHead>
                <TableHead className="font-bold text-zinc-400 text-xs uppercase tracking-wider">
                  Ngày
                </TableHead>
                <TableHead className="font-bold text-zinc-400 text-xs uppercase tracking-wider">
                  Số tiền
                </TableHead>
                <TableHead className="text-right font-bold text-zinc-400 text-xs uppercase tracking-wider pr-6">
                  Hóa đơn
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2].map((i) => (
                <TableRow
                  key={i}
                  className="hover:bg-white/5 border-b border-white/5 last:border-none transition-colors"
                >
                  <TableCell className="font-mono text-xs text-zinc-500 pl-6 py-4">
                    INV-2026-00{i}
                  </TableCell>
                  <TableCell className="font-medium text-sm text-zinc-300">
                    01/01/2026
                  </TableCell>
                  <TableCell className="font-black text-white">
                    499.000đ
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-lg text-zinc-500 hover:text-orange-500 hover:bg-orange-500/10"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
