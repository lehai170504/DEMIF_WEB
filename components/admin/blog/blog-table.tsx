"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Image as ImageIcon,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Hash,
  ArrowRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogDto } from "@/types/blog.type";

export function BlogTable({ blogs }: { blogs: BlogDto[] }) {
  return (
    <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden font-mono transition-all">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-zinc-900/50 border-b border-slate-100 dark:border-white/5 hover:bg-transparent">
              <TableHead className="px-6 md:px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
                Bài viết
              </TableHead>
              <TableHead className="text-center py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em] w-[160px]">
                Trạng thái
              </TableHead>
              <TableHead className="text-center py-5 text-xs font-black text-slate-500 hidden md:table-cell uppercase tracking-[0.2em] w-[180px]">
                Ngày đăng
              </TableHead>
              <TableHead className="text-right px-6 md:px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em] w-[180px]">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {blogs.map((blog) => {
              const tags =
                blog.tags && blog.tags !== "string"
                  ? blog.tags
                      .split(",")
                      .map((t) => t.trim())
                      .slice(0, 2)
                  : [];

              return (
                <TableRow
                  key={blog.id}
                  className="group hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors border-b border-slate-100 dark:border-white/5 last:border-none"
                >
                  {/* Cột 1: Thumbnail & Info (CHÚ Ý: THÊM relative VÀO ĐÂY) */}
                  <TableCell className="px-6 md:px-8 py-5 relative">
                    {/* Đã dời vạch màu highlight vào trong TableCell để đúng chuẩn HTML */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF7A00] to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-start gap-4">
                      <div className="h-16 w-24 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 overflow-hidden shrink-0 flex items-center justify-center shadow-sm relative">
                        {blog.thumbnailUrl ? (
                          <img
                            src={blog.thumbnailUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-slate-400" />
                        )}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div className="min-w-0 flex-1 flex flex-col justify-between h-16">
                        <Link
                          href={`/admin/blogs/${blog.id}`}
                          className="block w-fit"
                        >
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#FF7A00] transition-colors max-w-[250px] md:max-w-[350px] lg:max-w-[500px]">
                            {blog.title === "string"
                              ? "Tiêu đề chưa cập nhật"
                              : blog.title}
                          </h4>
                        </Link>

                        <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-auto">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-blue-500" />{" "}
                            {blog.viewCount?.toLocaleString() || 0}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-600" />
                          <span className="truncate max-w-[100px]">
                            T/g:{" "}
                            {blog.authorId?.substring(0, 4).toUpperCase() ||
                              "AD"}
                          </span>

                          {tags.length > 0 && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-600 hidden sm:block" />
                              <div className="hidden sm:flex items-center gap-1 text-[#FF7A00]">
                                <Hash className="w-3 h-3" />
                                <span>{tags[0]}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Cột 2: Trạng thái */}
                  <TableCell className="text-center py-5">
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm mx-auto flex w-fit items-center gap-1.5",
                        blog.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
                      )}
                    >
                      {blog.status === "Published" ? "Đã xuất bản" : "Bản nháp"}
                    </Badge>
                  </TableCell>

                  {/* Cột 3: Ngày tháng */}
                  <TableCell className="text-center py-5 hidden md:table-cell">
                    <div className="inline-flex items-center justify-center gap-2 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 px-3 py-2 rounded-xl shadow-inner">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-slate-600 dark:text-slate-300 text-xs">
                        {blog.createdAt
                          ? format(new Date(blog.createdAt), "dd/MM/yyyy", {
                              locale: vi,
                            })
                          : "N/A"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Cột 4: Thao tác */}
                  <TableCell className="text-right px-6 md:px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blogs/${blog.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 px-3 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300 transition-all group/btn"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-widest mr-1 hidden lg:inline">
                            Chi tiết
                          </span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
