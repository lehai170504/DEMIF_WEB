"use client";

import * as React from "react";
import { LessonHeader } from "@/components/admin/lesson/lesson-header";
import {
  LessonFilterBar,
  LessonStatus,
  LessonType,
} from "@/components/admin/lesson/lesson-filter-bar";
import { LessonTableWrapper } from "@/components/admin/lesson/lesson-table-wrapper";
import { useLessons } from "@/hooks/use-lesson";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLessonsPage() {
  // State quản lý filter & pagination
  const [activeStatus, setActiveStatus] = React.useState<LessonStatus>("all");
  const [activeType, setActiveType] = React.useState<LessonType>("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  // Pagination State
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10); // Mặc định 10 dòng/trang

  // Reset về trang 1 khi filter thay đổi
  React.useEffect(() => {
    setPage(1);
  }, [activeStatus, activeType, searchTerm]);

  // Fetch API
  const { data, isLoading, isError, refetch } = useLessons({
    page,
    pageSize,
    status: activeStatus === "all" ? undefined : activeStatus,
    type: activeType === "all" ? undefined : activeType,
    search: searchTerm || undefined,
  });

  const lessonCounts = React.useMemo(
    () => ({
      all: data?.totalCount || 0,
      Published: 0,
      Draft: 0,
      Review: 0,
    }),
    [data?.totalCount],
  );

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-zinc-500 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-xs uppercase tracking-widest">
          Đang tải dữ liệu bài học...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-zinc-500 font-mono">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p>Không thể tải dữ liệu.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-10 font-mono text-zinc-100 relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] right-[20%] w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-8">
        <LessonHeader />

        <LessonFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeType={activeType}
          onTypeChange={setActiveType}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          lessonCounts={lessonCounts}
        />

        <LessonTableWrapper
          data={data?.items || []}
          pageIndex={page - 1}
          pageSize={pageSize}
          pageCount={data?.totalPages || 1}
          onPaginationChange={(newPageIndex, newPageSize) => {
            setPage(newPageIndex + 1);
            setPageSize(newPageSize);
          }}
        />
      </div>
    </div>
  );
}
