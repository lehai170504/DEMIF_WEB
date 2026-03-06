"use client";

import * as React from "react";
import { LessonHeader } from "@/components/admin/lesson/lesson-header";
import {
  LessonFilterBar,
  LessonStatus,
} from "@/components/admin/lesson/lesson-filter-bar";
import { LessonTableWrapper } from "@/components/admin/lesson/lesson-table-wrapper";
import { useLessons } from "@/hooks/use-lesson";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLessonsPage() {
  const [activeStatus, setActiveStatus] = React.useState<LessonStatus>("all");

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading, isError, refetch } = useLessons({
    page,
    pageSize,
    status: activeStatus !== "all" ? activeStatus.toLowerCase() : undefined,
  });

  const lessons = data?.items || [];
  const totalPages = data?.totalPages || 1;

  // Reset về trang 1 khi đổi bộ lọc
  React.useEffect(() => {
    setPage(1);
  }, [activeStatus]);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 font-sans animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="text-sm font-medium text-slate-500">
          Đang tải dữ liệu bài học...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 font-sans">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-sm font-medium text-slate-600">
          Không thể tải dữ liệu từ máy chủ.
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="rounded-xl shadow-sm hover:bg-slate-50"
        >
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-10 font-sans text-slate-900 bg-slate-50/50 min-h-screen">
      <div className="relative z-10 space-y-8 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 font-mono">
        <LessonHeader />

        <LessonFilterBar
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
        />

        <LessonTableWrapper
          data={lessons}
          pageIndex={page - 1}
          pageSize={pageSize}
          pageCount={totalPages}
          onPaginationChange={(newPageIndex, newPageSize) => {
            setPage(newPageIndex + 1);
            setPageSize(newPageSize);
          }}
        />
      </div>
    </div>
  );
}
