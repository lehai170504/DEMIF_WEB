"use client";

import * as React from "react";
import { UserHeader } from "@/components/admin/user/user-header";
import { UserToolbar, UserStatus } from "@/components/admin/user/user-toolbar";
import { UserTable } from "@/components/admin/user/user-table";
import { useUsers } from "@/hooks/use-users";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";

export default function AdminUsersPage() {
  // --- 1. STATE ---
  const [activeFilter, setActiveFilter] = React.useState<UserStatus>("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  // Pagination State
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  // --- 2. DEBOUNCE & FETCH ---
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = useUsers({
    Page: page,
    PageSize: pageSize,
    SearchTerm: debouncedSearch,
    Status: activeFilter === "all" ? undefined : activeFilter,
  });

  React.useEffect(() => {
    setPage(1);
  }, [activeFilter, debouncedSearch]);

  const counts = {
    all: data?.totalCount || 0,
    active: 0,
    suspended: 0,
    banned: 0,
  };

  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 px-2 font-mono text-foreground relative">
      {/* Background Glow Effect - Sử dụng màu primary mờ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-8">
        <UserHeader />

        <UserToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">
              Đang tải dữ liệu người dùng...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-destructive bg-destructive/5 rounded-xl border border-destructive/10">
            Có lỗi xảy ra khi tải danh sách. Vui lòng thử lại.
          </div>
        ) : (
          <>
            <UserTable users={data?.users || []} />

            {totalPages > 1 && (
              <div className="py-4 border-t border-border bg-card/50 backdrop-blur-sm rounded-b-[2.5rem] -mt-8">
                <Pagination>
                  <PaginationContent>
                    {/* Nút Previous */}
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={
                          page <= 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer hover:bg-muted hover:text-foreground text-muted-foreground transition-colors"
                        }
                      />
                    </PaginationItem>

                    {/* Hiển thị số trang */}
                    <PaginationItem>
                      <span className="px-4 text-sm font-bold text-muted-foreground">
                        Trang <span className="text-foreground">{page}</span> /{" "}
                        {totalPages}
                      </span>
                    </PaginationItem>

                    {/* Nút Next */}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                        className={
                          page >= totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer hover:bg-muted hover:text-foreground text-muted-foreground transition-colors"
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
