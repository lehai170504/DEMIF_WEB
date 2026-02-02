"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Order } from "@/lib/data/orders";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

interface OrderTableProps {
  orders: Order[];
  onViewDetail: (order: Order) => void;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
    case "pending":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "failed":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    case "refunded":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    default:
      return "bg-white/5 text-zinc-400 border-white/10";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export function OrderTable({ orders, onViewDetail }: OrderTableProps) {
  return (
    <div className="overflow-x-auto p-2 relative z-10">
      <Table>
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Mã đơn & Khách hàng
            </TableHead>
            <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Gói dịch vụ
            </TableHead>
            <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Giá trị
            </TableHead>
            <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Trạng thái
            </TableHead>
            <TableHead className="text-right px-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="group hover:bg-white/5 transition-all border-b border-white/5 last:border-none"
            >
              <TableCell className="px-6 py-5">
                <div className="flex flex-col gap-1">
                  <span className="font-black text-xs text-emerald-500 tracking-tighter group-hover:text-emerald-400 transition-colors">
                    #{order.id.slice(0, 8)}
                  </span>
                  <span className="font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {order.userName}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors">
                    {order.userEmail}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className="rounded-xl border-white/10 font-bold px-3 py-1 bg-white/5 text-[10px] uppercase text-zinc-300 group-hover:bg-white/10 transition-colors"
                >
                  {order.packageName}
                </Badge>
              </TableCell>
              <TableCell className="text-center font-black italic text-white text-sm">
                {formatCurrency(order.amount)}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn(
                    "px-3 py-1 rounded-lg border font-black text-[9px] uppercase tracking-tighter transition-all",
                    getStatusStyles(order.status),
                  )}
                >
                  {order.status === "completed"
                    ? "Thành công"
                    : order.status === "pending"
                      ? "Chờ xử lý"
                      : "Thất bại"}
                </Badge>
              </TableCell>
              <TableCell className="text-right px-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"
                  onClick={() => onViewDetail(order)}
                >
                  <Eye className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
