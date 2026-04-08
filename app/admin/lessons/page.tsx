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
    status: activeStatus !== "all" ? activeStatus : undefined,
  });

  const lessons = data?.items || [];
  const totalPages = data?.totalPages || 1;

  React.useEffect(() => {
    setPage(1);
  }, [activeStatus]);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 dark:text-slate-400 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500 dark:text-orange-400" />
        <p className="text-[11px] font-black uppercase tracking-widest mt-2">
          Đang đồng bộ dữ liệu...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 font-mono">
        <AlertCircle className="h-10 w-10 text-red-500 dark:text-red-400 mb-2" />
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4">
          Lỗi truy xuất dữ liệu từ máy chủ.
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="rounded-xl font-bold uppercase text-[10px] tracking-widest border-slate-200 dark:border-white/10 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
        >
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-10 font-mono text-slate-900 dark:text-white bg-slate-50/50 dark:bg-black min-h-screen transition-colors duration-300">
      <div className="relative z-10 space-y-8 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
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
