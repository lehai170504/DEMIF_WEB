"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Search,
  Filter,
  Download,
  LayoutGrid,
  DollarSign,
  ShoppingBag,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import RevenueChart from "@/components/admin/order/RevenueChart";
import OrderDetailDrawer from "@/components/admin/order/OrderDetailDrawer";
import { mockOrders, getOrderStats, type Order } from "@/lib/data/orders";
import { cn } from "@/lib/utils";

// Helper styles (Giữ nguyên)
const getStatusStyles = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10";
    case "pending":
      return "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10";
    case "failed":
      return "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10";
    case "refunded":
      return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10";
    default:
      return "bg-slate-50 text-slate-600 border-slate-100";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = getOrderStats();
  const totalRevenue = mockOrders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    // Sử dụng space-y-6 hoặc 8 thống nhất, tránh px-2 làm thụt lề so với Navbar/Sidebar
    <div className="w-full max-w-[1600px] mx-auto space-y-8 pb-10 font-mono">
      {/* --- HEADER: Căn chỉnh padding đều --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Financial Tracking
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-slate-900 dark:text-white">
            Order{" "}
            <span className="text-slate-300 dark:text-slate-700">
              Management
            </span>
          </h1>
          <p className="text-muted-foreground text-xs font-medium italic">
            Theo dõi dòng tiền và quản lý các giao dịch.
          </p>
        </div>
        <Button
          variant="outline"
          className="h-12 px-6 font-bold border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
        >
          <Download className="mr-2 h-4 w-4" /> Xuất dữ liệu
        </Button>
      </div>

      {/* --- STATS GRID: Sửa Grid gap và padding --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Tổng doanh thu",
            val: formatCurrency(totalRevenue),
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
          },
          {
            label: "Tổng đơn hàng",
            val: stats.total,
            icon: ShoppingBag,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Đã hoàn thành",
            val: stats.completed,
            icon: CheckCircle,
            color: "text-orange-500",
            bg: "bg-orange-50",
          },
          {
            label: "Đang chờ xử lý",
            val: stats.pending,
            icon: Clock,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="border-none shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-[2rem] bg-white dark:bg-slate-900"
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
                {item.label}
              </CardTitle>
              <div className={cn("p-2 rounded-xl", item.bg, item.color)}>
                <item.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tighter italic">
                {item.val}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- CHART SECTION --- */}
      {/* <Card className="rounded-[2.5rem] border-none shadow-[0_4px_20px_rgb(0,0,0,0.03)] bg-white dark:bg-slate-900 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 dark:border-slate-800 pb-6">
          <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black text-xl italic uppercase">
              Revenue Analytics
            </h2>
            <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-0.5 text-emerald-500">
              +12% growth rate
            </p>
          </div>
        </div>
        <div className="h-[320px] w-full">
          <RevenueChart />
        </div>
      </Card> */}

      {/* --- FILTER & TABLE SECTION --- */}
      <div className="rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden bg-white dark:bg-slate-900">
        <div className="p-6 md:p-8 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/30">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500 hidden sm:block">
              <Search className="h-5 w-5" />
            </div>
            <div className="relative group w-full sm:min-w-[350px]">
              <Input
                placeholder="Tìm kiếm mã đơn, khách hàng..."
                className="h-12 pl-4 bg-white dark:bg-slate-800 border-none rounded-2xl font-bold focus-visible:ring-2 focus-visible:ring-orange-500/20 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 w-full sm:w-[200px] rounded-2xl bg-white dark:bg-slate-800 border-none font-bold shadow-sm italic">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent className="font-mono rounded-2xl border-none shadow-xl">
                <SelectItem value="all">Tất cả đơn</SelectItem>
                <SelectItem value="completed">Thành công</SelectItem>
                <SelectItem value="pending">Đang xử lý</SelectItem>
                <SelectItem value="failed">Thất bại</SelectItem>
                <SelectItem value="refunded">Hoàn tiền</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto p-2">
          <Table>
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Mã đơn & Khách hàng
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Gói dịch vụ
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Giá trị
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Trạng thái
                </TableHead>
                <TableHead className="text-right px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="group hover:bg-orange-50/30 transition-all border-b border-slate-50 last:border-none"
                >
                  <TableCell className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-xs text-orange-600 tracking-tighter">
                        #{order.id.slice(0, 8)}
                      </span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {order.userName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {order.userEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className="rounded-xl border-slate-200 font-bold px-3 py-1 bg-slate-50/50 text-[10px] uppercase"
                    >
                      {order.packageName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-black italic text-slate-800 dark:text-slate-100 text-sm">
                    {formatCurrency(order.amount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-lg border-none font-black text-[9px] uppercase tracking-tighter shadow-sm",
                        getStatusStyles(order.status)
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
                      className="h-10 w-10 rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-orange-200"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDetailOpen(true);
                      }}
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <OrderDetailDrawer
        order={selectedOrder}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
