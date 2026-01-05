"use client";

import { CheckCircle, CreditCard, Download, Zap } from "lucide-react";
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* Gói hiện tại */}
      <Card className="relative overflow-hidden border-none bg-slate-900 text-white p-8 rounded-[2.5rem]">
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-orange-500 rounded-2xl shadow-xl shadow-orange-500/20">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <Badge className="bg-white/10 text-orange-400 border-white/20 px-4 py-1">
              Gia hạn: 12/12/2026
            </Badge>
          </div>

          <div>
            <h4 className="text-4xl font-black mb-1 tracking-tight">
              Premium Member
            </h4>
            <p className="text-slate-400 font-medium">
              Bạn đang sở hữu quyền truy cập cao cấp nhất.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" /> Không giới
              hạn bài tập
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" /> Phân tích
              phát âm AI
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" /> Tải về bài
              học Offline
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" /> Hỗ trợ 1-1 ưu
              tiên
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 bg-orange-500/10 rounded-full blur-[100px]" />
      </Card>

      {/* Lịch sử thanh toán */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">
          Lịch sử thanh toán
        </h3>
        <div className="rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-bold">Mã đơn</TableHead>
                <TableHead className="font-bold">Ngày thanh toán</TableHead>
                <TableHead className="font-bold">Số tiền</TableHead>
                <TableHead className="text-right font-bold">Hóa đơn</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2].map((i) => (
                <TableRow
                  key={i}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-mono text-xs text-slate-500">
                    INV-2026-00{i}
                  </TableCell>
                  <TableCell className="font-medium text-sm text-slate-600">
                    01/01/2026
                  </TableCell>
                  <TableCell className="font-black text-slate-900">
                    499.000đ
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-lg text-slate-400 hover:text-orange-500"
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
