"use client";

import * as React from "react";
import { LessonHeader } from "@/components/admin/lesson/lesson-header";
import { LessonFilterBar } from "@/components/admin/lesson/lesson-filter-bar";
import { LessonTableWrapper } from "@/components/admin/lesson/lesson-table-wrapper";
import { useLessons } from "@/hooks/use-lesson";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetLessonsParams } from "@/types/lesson.type";
import { useDebounce } from "@/hooks/use-debounce";

export default function AdminLessonsPage() {
  const [params, setParams] = React.useState<GetLessonsParams>({
    page: 1,
    pageSize: 10,
    status: undefined,
    level: undefined,
    type: undefined,
    category: undefined,
    mediaType: undefined,
    tag: undefined,
    search: "",
    isPremiumOnly: undefined,
  });

  const debouncedSearch = useDebounce(params.search, 500);

  const { data, isLoading, isError, refetch } = useLessons({
    ...params,
    search: debouncedSearch,
    status: params.status === "all" ? undefined : params.status,
    level: params.level === "all" ? undefined : params.level,
    type: params.type === "all" ? undefined : params.type,
    mediaType: params.mediaType === "all" ? undefined : params.mediaType,
  });

  const lessons = data?.items || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-[11px] font-black uppercase tracking-widest mt-2">
          Đang đồng bộ dữ liệu hệ thống...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 font-mono">
        <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-600 mb-4">
          Lỗi truy xuất dữ liệu từ máy chủ.
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="rounded-xl font-bold uppercase text-[10px]"
        >
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-10 font-mono text-slate-900 dark:text-white bg-slate-50/50 dark:bg-black min-h-screen transition-colors duration-300 text-left">
      <div className="relative z-10 space-y-8 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <LessonHeader />

        {/* 3. Truyền state params và hàm setParams vào thanh lọc */}
        <LessonFilterBar params={params} setParams={setParams} />

        <LessonTableWrapper
          data={lessons}
          pageIndex={(params.page || 1) - 1}
          pageSize={params.pageSize || 10}
          pageCount={totalPages}
          onPaginationChange={(newPageIndex, newPageSize) => {
            setParams({
              ...params,
              page: newPageIndex + 1,
              pageSize: newPageSize,
            });
          }}
        />
      </div>
    </div>
  );
}
