"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  CalendarDays,
  Loader2,
  Inbox,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useUserSubscriptions } from "@/hooks/use-user-subscriptions";
import { SubscriptionFilterBar } from "@/components/admin/user-subscriptions/subscription-filter-bar";

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

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setPage(1);
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useUserSubscriptions({
      page,
      pageSize,
      status: status === "all" ? undefined : status,
      search: debouncedSearch || undefined,
    });

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 dark:text-slate-400 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-[#FF7A00]" />
        <p className="text-sm font-medium">Đang đồng bộ dữ liệu hệ thống...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-5 font-mono">
        <div className="p-4 bg-red-500/10 rounded-full">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Lỗi truy xuất dữ liệu từ máy chủ.
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="rounded-xl h-11 px-6 font-semibold text-sm mt-2 hover:bg-red-50 dark:hover:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-600 transition-colors"
        >
          Thử lại ngay
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pb-10 font-mono bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-white">
      <div className="relative z-10 space-y-8 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <SubscriptionFilterBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          status={status}
          onStatusChange={handleStatusChange}
        />

        {/* Khung chứa List Danh Sách */}
        <div className="relative bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-sm overflow-hidden min-h-[300px]">
          {/* Lớp phủ Loading khi chuyển trang/filter */}
          {isFetching && !isLoading && (
            <div className="absolute inset-0 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md z-20 flex items-center justify-center transition-all duration-300">
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-[#FF7A00]" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  Đang tải...
                </span>
              </div>
            </div>
          )}

          {/* Header của Table/List (Chỉ hiện trên Desktop) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-900/50 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <div className="col-span-4">Học viên</div>
            <div className="col-span-3">Gói dịch vụ</div>
            <div className="col-span-3">Chu kỳ</div>
            <div className="col-span-2 text-right">Trạng thái</div>
          </div>

          {!isLoading && data?.items.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
              <div className="p-4 bg-slate-100 dark:bg-zinc-800 rounded-full">
                <Inbox className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-500">
                Không tìm thấy dữ liệu phù hợp
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {data?.items.map((sub) => (
                <Link
                  href={`/admin/user-subscriptions/${sub.id}`}
                  key={sub.id}
                  className="group block px-6 lg:px-8 py-5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer relative"
                >
                  {/* Thanh highlight bên trái khi hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 items-center">
                    {/* Cột 1: Thông tin Học Viên (4 phần) */}
                    <div className="col-span-1 lg:col-span-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FF7A00] to-pink-600 flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
                        {sub.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {sub.userName}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {sub.userEmail}
                        </p>
                      </div>
                    </div>

                    {/* Cột 2: Gói dịch vụ (3 phần) */}
                    <div className="col-span-1 lg:col-span-3 flex items-center gap-2 mt-2 lg:mt-0">
                      <div className="lg:hidden w-24 text-xs font-medium text-slate-400 uppercase">
                        Gói:
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {sub.planName}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-500/20">
                        {sub.tier}
                      </span>
                    </div>

                    {/* Cột 3: Chu kỳ & Gia hạn (3 phần) */}
                    <div className="col-span-1 lg:col-span-3 mt-1 lg:mt-0">
                      <div className="flex items-center gap-2">
                        <div className="lg:hidden w-24 text-xs font-medium text-slate-400 uppercase">
                          Chu kỳ:
                        </div>
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400 hidden lg:block" />
                        <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                          {format(new Date(sub.startDate), "dd/MM", {
                            locale: vi,
                          })}{" "}
                          -{" "}
                          {format(new Date(sub.endDate), "dd/MM/yy", {
                            locale: vi,
                          })}
                        </span>
                      </div>
                      {/* Badge Tự động gia hạn nhỏ ở dưới */}
                      <div className="flex items-center gap-1 mt-1 lg:ml-5">
                        <div
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            sub.autoRenew ? "bg-emerald-500" : "bg-slate-300",
                          )}
                        />
                        <span className="text-[10px] font-medium text-slate-500">
                          {sub.autoRenew ? "Auto-renew" : "Manual"}
                        </span>
                      </div>
                    </div>

                    {/* Cột 4: Status & Action (2 phần) */}
                    <div className="col-span-1 lg:col-span-2 flex items-center justify-between lg:justify-end mt-2 lg:mt-0">
                      <span
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] font-semibold border shadow-sm",
                          getStatusStyles(sub.status),
                        )}
                      >
                        {getStatusLabel(sub.status)}
                      </span>

                      {/* Icon mũi tên chuyển trang (Chỉ hiện khi hover trên Desktop) */}
                      <div className="ml-4 h-8 w-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 lg:opacity-0 group-hover:opacity-100 transition-all bg-white dark:bg-zinc-800">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data.totalPages > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 px-6 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 rounded-[1.5rem] shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Trang{" "}
              <span className="text-[#FF7A00] font-bold mx-1">{data.page}</span>{" "}
              / {data.totalPages}{" "}
              <span className="hidden sm:inline text-xs opacity-70 ml-2">
                (Tổng {data.totalCount} bản ghi)
              </span>
            </p>

            <Pagination className="w-auto mx-0">
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage((p) => p - 1);
                    }}
                    className={cn(
                      "h-9 px-4 rounded-xl font-medium text-sm transition-all",
                      page === 1
                        ? "pointer-events-none opacity-50 bg-transparent"
                        : "cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-800",
                    )}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < data.totalPages) setPage((p) => p + 1);
                    }}
                    className={cn(
                      "h-9 px-4 rounded-xl font-medium text-sm transition-all",
                      page === data.totalPages
                        ? "pointer-events-none opacity-50 bg-transparent"
                        : "cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-800",
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
