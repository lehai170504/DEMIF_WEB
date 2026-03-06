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
  const [activeFilter, setActiveFilter] = React.useState<UserStatus>("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

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

  // ĐÃ LOẠI BỎ LOGIC counts TẠI ĐÂY

  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 px-2 font-mono text-gray-900 relative">
      <div className="fixed inset-0 pointer-events-none z-0 bg-gray-50/50">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-8">
        <UserHeader />

        <UserToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          // KHÔNG TRUYỀN counts NỮA
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs animate-pulse">
              Đang truy xuất dữ liệu cộng đồng...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-600 bg-red-50 rounded-[2.5rem] border border-red-100 font-bold uppercase text-xs">
            Hệ thống gặp sự cố khi tải danh sách. Vui lòng thử lại sau.
          </div>
        ) : (
          <>
            <UserTable users={data?.users || []} />

            {totalPages > 1 && (
              <div className="py-6 border-t border-gray-100 bg-white/80 backdrop-blur-md rounded-b-[2.5rem] shadow-sm -mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent className="gap-4">
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={
                          page <= 1
                            ? "pointer-events-none opacity-30"
                            : "cursor-pointer hover:bg-gray-100 rounded-xl font-bold"
                        }
                      />
                    </PaginationItem>

                    <PaginationItem>
                      <div className="px-6 py-2 bg-gray-50 rounded-xl border border-gray-100 text-xs font-black uppercase tracking-tighter">
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
                            ? "pointer-events-none opacity-30"
                            : "cursor-pointer hover:bg-gray-100 rounded-xl font-bold"
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
