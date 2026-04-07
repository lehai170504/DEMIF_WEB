"use client";

import * as React from "react";
import { UserHeader } from "@/components/admin/user/user-header";
import { UserToolbar, UserStatus } from "@/components/admin/user/user-toolbar";
import { UserTable } from "@/components/admin/user/user-table";
import { useUsers } from "@/hooks/use-users";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
  const [activeFilter, setActiveFilter] = React.useState<UserStatus>("all");
  const [page, setPage] = React.useState(1);
  const pageSize = 12; // Tăng lên 12 cho chẵn Grid nếu cần

  const { data, isLoading, isError, refetch } = useUsers({
    Page: page,
    PageSize: pageSize,
    Status: activeFilter === "all" ? undefined : activeFilter,
  });

  React.useEffect(() => {
    setPage(1);
  }, [activeFilter]);

  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 px-4 md:px-8 relative font-mono">
      {/* Background Glow Effect - Cinematic Style */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] bg-orange-400/5 dark:bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[5%] w-[600px] h-[600px] bg-blue-400/5 dark:bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10 pt-4">
        {/* Header & Toolbar Island */}
        <div className="space-y-8 animate-in fade-in slide-in-from-top-6 duration-700 ease-out">
          <UserHeader />
          <UserToolbar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* CONTENT AREA */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6 bg-white/50 dark:bg-zinc-900/30 rounded-[3rem] border border-slate-200/60 dark:border-white/5 backdrop-blur-sm">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-[#FF7A00]" />
                <div className="absolute inset-0 bg-[#FF7A00]/20 blur-xl rounded-full" />
              </div>
              <p className="text-slate-500 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-[0.3em] animate-pulse">
                Đang truy xuất dữ liệu cộng đồng...
              </p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6 bg-red-50/50 dark:bg-red-500/5 rounded-[3rem] border border-red-100 dark:border-red-500/10 backdrop-blur-sm text-center px-6">
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-red-500/10">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-red-900 dark:text-red-400 font-black uppercase text-lg italic tracking-tight">
                  Mất kết nối máy chủ
                </h3>
                <p className="text-red-600/70 dark:text-red-400/60 text-xs font-medium max-w-xs mx-auto">
                  Hệ thống không thể phản hồi yêu cầu. Vui lòng kiểm tra lại
                  đường truyền hoặc làm mới phiên làm việc.
                </p>
              </div>
              <Button
                onClick={() => refetch()}
                variant="destructive"
                className="rounded-2xl px-8 h-12 font-black uppercase tracking-widest text-[10px]"
              >
                <RefreshCcw className="w-4 h-4 mr-2" /> Thử lại ngay
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Table Wrapper Island */}
              <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
                <UserTable users={data?.users || []} />
              </div>

              {/* FLOATING PAGINATION ISLAND */}
              {totalPages > 1 && (
                <div className="flex justify-center pt-4">
                  <div className="inline-flex items-center p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none animate-in zoom-in-95 duration-500">
                    <Pagination>
                      <PaginationContent className="gap-2">
                        {/* Nút Previous */}
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (page > 1) setPage(page - 1);
                            }}
                            className={cn(
                              "h-10 px-4 rounded-xl transition-all text-sm font-medium border-none",
                              page <= 1
                                ? "opacity-30 pointer-events-none text-slate-300 dark:text-slate-700"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white",
                            )}
                          />
                        </PaginationItem>

                        <PaginationItem>
                          <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                            <span className="text-xs font-semibold text-slate-500">
                              Trang
                            </span>
                            <span className="text-sm font-bold text-[#FF7A00]">
                              {page}
                            </span>
                            <span className="text-slate-300 dark:text-zinc-700">
                              /
                            </span>
                            <span className="text-sm font-medium text-slate-500">
                              {totalPages}
                            </span>
                          </div>
                        </PaginationItem>

                        {/* Nút Next */}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (page < totalPages) setPage(page + 1);
                            }}
                            className={cn(
                              "h-10 px-4 rounded-xl transition-all text-sm font-medium border-none",
                              page >= totalPages
                                ? "opacity-30 pointer-events-none text-slate-300 dark:text-slate-700"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white",
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
