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
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const [activeFilter, setActiveFilter] = React.useState<UserStatus>("all");
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  // Lấy dữ liệu với trạng thái phân trang và lọc (đã bỏ SearchTerm)
  const { data, isLoading, isError, refetch } = useUsers({
    Page: page,
    PageSize: pageSize,
    Status: activeFilter === "all" ? undefined : activeFilter,
  });

  // Chỉ reset về trang 1 khi đổi bộ lọc trạng thái
  React.useEffect(() => {
    setPage(1);
  }, [activeFilter]);

  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 px-4 sm:px-8 lg:px-12 text-slate-900 relative font-mono">
      {/* Hiệu ứng Glow nền nhẹ nhàng */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-slate-50/50">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-8">
        <UserHeader />

        <UserToolbar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
            <p className="text-slate-500 font-medium text-sm">
              Đang tải danh sách cộng đồng...
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 bg-red-50/50 rounded-[2rem] border border-red-100">
            <AlertCircle className="h-10 w-10 text-red-500 opacity-80" />
            <p className="text-red-600 font-semibold text-sm">
              Không thể kết nối đến máy chủ quản lý học viên.
            </p>
            <Button
              onClick={() => refetch()}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm px-6 h-10 font-semibold text-sm"
            >
              Thử tải lại
            </Button>
          </div>
        ) : (
          <>
            <UserTable users={data?.users || []} />

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="py-6 border-t border-slate-200 bg-white/80 backdrop-blur-md rounded-b-[2rem] shadow-sm -mt-8 flex justify-center relative z-20">
                <Pagination>
                  <PaginationContent className="gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={
                          page <= 1
                            ? "pointer-events-none opacity-40 text-slate-400"
                            : "cursor-pointer hover:bg-slate-100 rounded-xl font-medium text-slate-600"
                        }
                      />
                    </PaginationItem>

                    <PaginationItem>
                      <div className="px-5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 shadow-sm min-w-[120px] text-center">
                        Trang <span className="text-orange-600">{page}</span> /{" "}
                        {totalPages}
                      </div>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                        className={
                          page >= totalPages
                            ? "pointer-events-none opacity-40 text-slate-400"
                            : "cursor-pointer hover:bg-slate-100 rounded-xl font-medium text-slate-600"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
