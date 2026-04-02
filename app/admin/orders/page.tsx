"use client";

import { useState } from "react";
import OrderDetailDrawer from "@/components/admin/order/order-detail-drawer";
import { mockOrders, getOrderStats, type Order } from "@/lib/data/orders";
import { OrderHeader } from "@/components/admin/order/order-header";
import { OrderStats } from "@/components/admin/order/order-stats";
import { OrderToolbar } from "@/components/admin/order/order-toolbar";
import { OrderTable } from "@/components/admin/order/order-table";

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
    <div className="w-full max-w-[1600px] mx-auto space-y-8 pb-10 font-mono text-zinc-100 relative">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-8">
        <OrderHeader />

        <OrderStats totalRevenue={formatCurrency(totalRevenue)} stats={stats} />

        {/* --- FILTER & TABLE SECTION --- */}
        <div className="rounded-[2.5rem] border border-white/10 shadow-xl overflow-hidden bg-[#18181b] mx-2 relative transition-all hover:shadow-2xl hover:shadow-emerald-500/5">
          <OrderToolbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />

          <OrderTable
            orders={filteredOrders}
            onViewDetail={(order) => {
              setSelectedOrder(order);
              setIsDetailOpen(true);
            }}
          />
        </div>

        <OrderDetailDrawer
          order={selectedOrder}
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
        />
      </div>
    </div>
  );
}
