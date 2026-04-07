"use client";

import * as React from "react";
import { Receipt, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePayments } from "@/hooks/use-payments";
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
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 px-4 md:px-8 relative font-mono">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-emerald-400/5 dark:bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10 pt-4">
        {/* HEADER */}
        <div className="space-y-2 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="flex items-center gap-2 text-emerald-600 mb-2 font-semibold">
            <Receipt className="h-4 w-4" /> TÀI CHÍNH HỆ THỐNG
          </div>
          <h1 className="text-3xl md:text-4xl font-black">
            Quản lý <span className="text-slate-400">Giao dịch</span>
          </h1>
        </div>

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

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4 bg-white/50 dark:bg-zinc-900/30 rounded-[3rem] border border-slate-200/60 dark:border-white/5 backdrop-blur-sm">
              <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
              <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">
                Truy xuất dữ liệu...
              </p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 bg-red-50/50 dark:bg-red-500/5 rounded-[3rem] border border-red-100 dark:border-red-500/10">
              <AlertCircle className="h-10 w-10 text-red-500" />
              <p className="text-sm font-bold text-red-600">
                Lỗi kết nối dữ liệu.
              </p>
              <Button
                onClick={() => refetch()}
                variant="destructive"
                className="rounded-xl"
              >
                Thử lại
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <PaymentTable
                items={data?.items || []}
                isFetching={isFetching && !isLoading}
              />

              {data && data.totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent className="gap-2 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage((p) => p - 1);
                          }}
                          className={cn(
                            "h-10 px-4 rounded-xl border-none font-bold text-[10px] uppercase tracking-widest",
                            page <= 1
                              ? "opacity-30 pointer-events-none"
                              : "hover:bg-slate-100",
                          )}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-zinc-800 rounded-xl">
                          <span className="text-[10px] font-black uppercase text-slate-400">
                            Trang
                          </span>
                          <span className="text-sm font-black text-emerald-600">
                            {page}
                          </span>
                          <span className="text-slate-300">/</span>
                          <span className="text-sm font-bold text-slate-500">
                            {data.totalPages}
                          </span>
                        </div>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < data.totalPages) setPage((p) => p + 1);
                          }}
                          className={cn(
                            "h-10 px-4 rounded-xl border-none font-bold text-[10px] uppercase tracking-widest",
                            page >= data.totalPages
                              ? "opacity-30 pointer-events-none"
                              : "hover:bg-slate-100",
                          )}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
