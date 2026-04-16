"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Image as ImageIcon,
  Calendar,
  Eye,
  Hash,
  ArrowRight,
  User,
  Archive,
  FileText,
  CheckCircle2,
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
                Thông tin bài viết
              </TableHead>
              <TableHead className="text-center py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em] w-[160px]">
                Trạng thái
              </TableHead>
              <TableHead className="text-center py-5 text-xs font-black text-slate-500 hidden md:table-cell uppercase tracking-[0.2em] w-[180px]">
                Ngày đăng
              </TableHead>
              <TableHead className="text-right px-6 md:px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em] w-[140px]">
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
                      .slice(0, 1)
                  : [];

              return (
                <TableRow
                  key={blog.id}
                  className="group hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors border-b border-slate-100 dark:border-white/5 last:border-none"
                >
                  {/* Cột 1: Thumbnail & Info */}
                  <TableCell className="px-6 md:px-8 py-5 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-center gap-4">
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
                        {/* Overlay Featured */}
                        {blog.isFeatured && (
                          <div className="absolute top-1 left-1 bg-orange-500 text-white p-1 rounded-md shadow-lg">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/admin/blogs/${blog.id}`}
                          className="block group/title"
                        >
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover/title:text-[#FF7A00] transition-colors">
                            {blog.title}
                          </h4>
                        </Link>

                        <div className="flex items-center gap-3 mt-1.5">
                          {/* Category */}
                          {blog.category && (
                            <Badge
                              variant="secondary"
                              className="bg-slate-100 dark:bg-zinc-800 text-[9px] px-2 py-0 border-none font-black uppercase text-slate-500"
                            >
                              {blog.category}
                            </Badge>
                          )}

                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3 text-blue-500" />
                              {blog.viewCount || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {blog.authorName || "Admin"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Cột 2: Trạng thái  */}
                  <TableCell className="text-center py-5">
                    <Badge
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm mx-auto flex w-fit items-center gap-1.5",
                        blog.status.toLowerCase() === "published"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : blog.status.toLowerCase() === "archived"
                            ? "bg-red-500/10 text-red-600 border-red-500/20"
                            : "bg-orange-500/10 text-orange-600 border-orange-500/20",
                      )}
                    >
                      {blog.status.toLowerCase() === "published" && (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                      {blog.status.toLowerCase() === "archived" && (
                        <Archive className="w-3 h-3" />
                      )}
                      {blog.status.toLowerCase() === "draft" && (
                        <FileText className="w-3 h-3" />
                      )}
                      {blog.status === "published"
                        ? "Đã đăng"
                        : blog.status === "archived"
                          ? "Lưu trữ"
                          : "Bản nháp"}
                    </Badge>
                  </TableCell>

                  {/* Cột 3: Ngày tháng */}
                  <TableCell className="text-center py-5 hidden md:table-cell">
                    <div className="inline-flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-bold text-xs uppercase">
                        {blog.publishedAt
                          ? format(new Date(blog.publishedAt), "dd MMM, yyyy", {
                              locale: vi,
                            })
                          : format(new Date(blog.createdAt), "dd MMM, yyyy", {
                              locale: vi,
                            })}
                      </span>
                    </div>
                  </TableCell>

                  {/* Cột 4: Thao tác */}
                  <TableCell className="text-right px-6 md:px-8 py-5">
                    <Link href={`/admin/blogs/${blog.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 rounded-xl hover:bg-[#FF7A00]/10 hover:text-[#FF7A00] transition-all"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
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
