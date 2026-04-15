"use client";

import * as React from "react";
import { Receipt, Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePayments } from "@/hooks/use-admin-payments";
import { cn } from "@/lib/utils";
import { PaymentToolbar } from "@/components/admin/payments/payment-toolbar";
import { PaymentTable } from "@/components/admin/payments/payment-table";

export default function AdminPaymentsPage() {
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isFetching, isError, refetch } = usePayments({
    page,
    pageSize: 20,
    status: status === "all" ? undefined : status,
    search: debouncedSearch,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  const handleFilterChange = () => setPage(1);

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 px-4 md:px-8 relative font-mono transition-colors duration-300">
      {/* Background Glow Effect - Financial Emerald Style */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-emerald-400/5 dark:bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-400/5 dark:bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10 pt-4">
        {/* HEADER */}
        <div className="space-y-3 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 mb-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
              <Receipt className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Danh sách giao dịch
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">
            Quản lý{" "}
            <span className="text-slate-400 dark:text-zinc-500">Giao dịch</span>
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Theo dõi và đối soát dòng tiền, lịch sử thanh toán các gói Premium
            trên toàn bộ hạ tầng mạng lưới Demif.
          </p>
        </div>

        {/* TOOLBAR */}
        <PaymentToolbar
          searchTerm={searchTerm}
          onSearchChange={(v) => {
            setSearchTerm(v);
            handleFilterChange();
          }}
          status={status}
          onStatusChange={(v) => {
            setStatus(v);
            handleFilterChange();
          }}
          dateFrom={dateFrom}
          onDateFromChange={(v) => {
            setDateFrom(v);
            handleFilterChange();
          }}
          dateTo={dateTo}
          onDateToChange={(v) => {
            setDateTo(v);
            handleFilterChange();
          }}
        />

        {/* CONTENT AREA */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6 bg-white/50 dark:bg-zinc-900/30 rounded-[3rem] border border-slate-200/60 dark:border-white/5 backdrop-blur-md">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              </div>
              <p className="text-slate-500 dark:text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">
                Fetching_Transaction_Data...
              </p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6 bg-red-50/50 dark:bg-red-500/5 rounded-[3rem] border border-red-100 dark:border-red-500/10 backdrop-blur-sm text-center px-6">
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-red-500/10 border border-transparent dark:border-white/5">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-red-900 dark:text-red-400 font-black uppercase text-lg italic tracking-tighter">
                  Connection_Lost
                </h3>
                <p className="text-red-600/70 dark:text-red-400/60 text-[11px] font-bold uppercase tracking-tight max-w-xs mx-auto">
                  Lỗi truy xuất dữ liệu tài chính từ máy chủ core.
                </p>
              </div>
              <Button
                onClick={() => refetch()}
                className="rounded-2xl px-8 h-14 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-500/20 active:scale-95 transition-all"
              >
                <RefreshCcw className="w-4 h-4 mr-2" /> Thử lại
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Table Wrapper Island */}
              <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden backdrop-blur-sm">
                <PaymentTable
                  items={data?.items || []}
                  isFetching={isFetching && !isLoading}
                />
              </div>

              {/* FLOATING PAGINATION ISLAND */}
              {data && data.totalPages > 1 && (
                <div className="flex justify-center pt-6 pb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="inline-flex items-center p-1.5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 rounded-[1.75rem] shadow-xl shadow-slate-200/40 dark:shadow-none">
                    <Pagination className="w-auto mx-0">
                      <PaginationContent className="gap-2 sm:gap-3">
                        {/* NÚT TRƯỚC */}
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => {
                              if (page > 1) setPage((p) => p - 1);
                            }}
                            disabled={page <= 1}
                            className={cn(
                              "h-10 sm:h-11 px-4 sm:px-5 rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.15em] border-none active:scale-95",
                              page <= 1
                                ? "opacity-20 pointer-events-none text-slate-400"
                                : "text-slate-600 dark:text-slate-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 shadow-sm",
                            )}
                          />
                        </PaginationItem>

                        {/* HIỂN THỊ TRẠNG THÁI TRANG */}
                        <PaginationItem>
                          <div className="flex items-center gap-2.5 px-4 sm:px-6 py-2 bg-white/80 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-inner">
                            <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden xs:inline">
                              Trang
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-black text-orange-500 drop-shadow-sm">
                                {page}
                              </span>
                              <span className="text-[10px] font-bold text-slate-300 dark:text-zinc-700">
                                /
                              </span>
                              <span className="text-sm font-black text-slate-500 dark:text-slate-400">
                                {data.totalPages}
                              </span>
                            </div>
                          </div>
                        </PaginationItem>

                        {/* NÚT SAU */}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => {
                              if (page < data.totalPages) setPage((p) => p + 1);
                            }}
                            disabled={page >= data.totalPages}
                            className={cn(
                              "h-10 sm:h-11 px-4 sm:px-5 rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.15em] border-none active:scale-95",
                              page >= data.totalPages
                                ? "opacity-20 pointer-events-none text-slate-400"
                                : "text-slate-600 dark:text-slate-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 shadow-sm",
                            )}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
