"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  CalendarDays,
  Loader2,
  Inbox,
  ArrowLeft,
  ArrowRight,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useUserSubscriptions } from "@/hooks/use-user-subscriptions";
import { SubscriptionFilterBar } from "@/components/admin/user-subscriptions/subscription-filter-bar";

import { EditSubscriptionDialog } from "@/components/admin/user-subscriptions/edit-subscription-dialog";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "Expired":
      return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    case "Cancelled":
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "PendingPayment":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
    default:
      return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
};

const getStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    Active: "Đang hoạt động",
    Expired: "Đã hết hạn",
    Cancelled: "Đã hủy",
    PendingPayment: "Chờ thanh toán",
  };
  return map[status] || status;
};

export default function UserSubscriptionsPage() {
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(10);
  const [status, setStatus] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editingSubscription, setEditingSubscription] =
    React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isFetching, isError, refetch } =
    useUserSubscriptions({
      page,
      pageSize,
      status: status === "all" ? undefined : status,
      search: debouncedSearch || undefined,
    });

  const handleOpenEdit = (e: React.MouseEvent, sub: any) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingSubscription(sub);
    setIsEditOpen(true);
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 dark:text-slate-400 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-[#FF7A00]" />
        <p className="text-sm font-black uppercase tracking-widest">
          Đang đồng bộ dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pb-20 font-mono bg-slate-50/50 dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-500">
      <div className="relative z-10 space-y-8 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        {/* Filter Bar */}
        <SubscriptionFilterBar
          searchTerm={searchTerm}
          onSearchChange={(val) => {
            setSearchTerm(val);
            setPage(1);
          }}
          status={status}
          onStatusChange={(val) => {
            setStatus(val);
            setPage(1);
          }}
        />

        {/* List Container */}
        <div className="relative bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden min-h-[400px]">
          {isFetching && (
            <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center transition-opacity duration-200">
              <Loader2 className="h-5 w-5 animate-spin text-[#FF7A00]" />
            </div>
          )}

          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-10 py-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-900/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <div className="col-span-4">Học viên</div>
            <div className="col-span-3">Gói dịch vụ</div>
            <div className="col-span-3">Chu kỳ sử dụng</div>
            <div className="col-span-2 text-right">Trạng thái & Quản lý</div>
          </div>

          {data?.items.length === 0 ? (
            <div className="p-32 text-center flex flex-col items-center justify-center gap-6">
              <Inbox className="h-12 w-12 text-slate-300" />
              <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                Không có dữ liệu
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/5 text-left">
              {data?.items.map((sub) => (
                <div key={sub.id} className="relative group">
                  <Link
                    href={`/admin/user-subscriptions/${sub.id}`}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-8 lg:px-10 py-8 hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-all items-center"
                  >
                    <div className="col-span-4 flex items-center gap-5">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-pink-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/20 shrink-0">
                        {sub.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <h4 className="text-sm font-black truncate group-hover:text-[#FF7A00] transition-colors">
                          {sub.userName}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold truncate uppercase tracking-tight">
                          {sub.userEmail}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-3 flex items-center gap-3">
                      <span className="text-sm font-black uppercase tracking-tighter">
                        {sub.planName}
                      </span>
                      <span className="text-[9px] font-black px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-500/20">
                        {sub.tier}
                      </span>
                    </div>

                    <div className="col-span-3 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-300">
                        <CalendarDays className="h-4 w-4 text-[#FF7A00] opacity-70" />
                        <span>
                          {format(new Date(sub.startDate), "dd/MM/yy")}
                        </span>
                        <ArrowRight className="h-3 w-3 opacity-30" />
                        <span>{format(new Date(sub.endDate), "dd/MM/yy")}</span>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-between lg:justify-end gap-4">
                      <span
                        className={cn(
                          "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm",
                          getStatusStyles(sub.status),
                        )}
                      >
                        {getStatusLabel(sub.status)}
                      </span>

                      {/* NÚT EDIT MỞ DIALOG EDIT */}
                      <button
                        onClick={(e) => handleOpenEdit(e, sub)}
                        className="p-3 rounded-2xl bg-white dark:bg-zinc-800 text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-blue-500/20"
                        title="Chỉnh sửa thuê bao"
                      >
                        <Settings2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {data && data.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-xl">
            <div className="space-y-1 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Trang hiện tại
              </p>
              <p className="text-xs font-bold">
                <span className="text-[#FF7A00] font-black">{data.page}</span> /{" "}
                {data.totalPages}
              </p>
            </div>

            <Pagination className="w-auto mx-0">
              <PaginationContent className="gap-2 sm:gap-3 p-1 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-[1.5rem] shadow-sm">
                {/* NÚT BACK */}
                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl text-slate-500 hover:bg-orange-500 hover:text-white transition-all disabled:opacity-20"
                  >
                    <ArrowLeft className="h-4 w-4 stroke-[3px]" />
                  </Button>
                </PaginationItem>

                {/* CỤM SỐ TRANG */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {[...Array(data.totalPages)].map((_, i) => {
                    const pageNum = i + 1;

                    // Logic hiển thị: Trang đầu, trang cuối, và các trang quanh trang hiện tại
                    const isVisible =
                      pageNum === 1 ||
                      pageNum === data.totalPages ||
                      (pageNum >= page - 1 && pageNum <= page + 1);

                    // Hiển thị dấu ba chấm nếu cần thiết
                    const showEllipsisBefore = pageNum === 2 && page > 3;
                    const showEllipsisAfter =
                      pageNum === data.totalPages - 1 &&
                      page < data.totalPages - 2;

                    if (showEllipsisBefore) {
                      return (
                        <PaginationEllipsis
                          key="ellipsis-before"
                          className="size-8 sm:size-10 opacity-50"
                        />
                      );
                    }

                    if (showEllipsisAfter) {
                      return (
                        <PaginationEllipsis
                          key="ellipsis-after"
                          className="size-8 sm:size-10 opacity-50"
                        />
                      );
                    }

                    if (isVisible) {
                      return (
                        <PaginationItem key={pageNum}>
                          <Button
                            variant={page === pageNum ? "default" : "ghost"}
                            onClick={() => setPage(pageNum)}
                            className={cn(
                              "h-10 w-10 sm:h-11 sm:w-11 rounded-xl font-black text-[11px] transition-all duration-300",
                              page === pageNum
                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                                : "bg-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5",
                            )}
                          >
                            {pageNum}
                          </Button>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* NÚT NEXT */}
                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setPage((p) => Math.min(data.totalPages, p + 1))
                    }
                    disabled={page === data.totalPages}
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl text-slate-500 hover:bg-orange-500 hover:text-white transition-all disabled:opacity-20"
                  >
                    <ArrowRight className="h-4 w-4 stroke-[3px]" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <EditSubscriptionDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        subscription={editingSubscription}
      />
    </div>
  );
}
