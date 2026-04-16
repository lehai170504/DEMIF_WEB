"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Loader2,
  Save,
  AlignLeft,
  ImageIcon,
  Globe,
  Lock,
  Tags as TagsIcon,
  Settings2,
  Link as LinkIcon,
  Bookmark,
  Star,
  Archive,
} from "lucide-react";
import { useManageBlog } from "@/hooks/use-blog";
import { BlogSchema, BlogFormValues } from "@/schemas/blog.schema";
import { BlogDto, UpdateBlogRequest } from "@/types/blog.type";
import { cn } from "@/lib/utils";

interface EditBlogDialogProps {
  blog: BlogDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBlogDialog({
  blog,
  open,
  onOpenChange,
}: EditBlogDialogProps) {
  const { updateBlog, isUpdating } = useManageBlog();
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: blog.title || "",
      content: blog.content || "",
      slug: blog.slug || "",
      category: blog.category || "",
      summary: blog.summary || "",
      tags: blog.tags || "",
      status: (blog.status?.toLowerCase() as any) || "published",
      isFeatured: blog.isFeatured || false,
      thumbnailFile: undefined,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        title: blog.title,
        content: blog.content,
        slug: blog.slug,
        category: blog.category || "",
        summary: blog.summary || "",
        tags: blog.tags || "",
        status: (blog.status?.toLowerCase() as any) || "published",
        isFeatured: blog.isFeatured,
      });
      setPreviewUrl(null);
    }
  }, [blog, open, form]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = (values: BlogFormValues) => {
    const payload: UpdateBlogRequest = {
      title: values.title,
      content: values.content,
      slug: values.slug || undefined,
      category: values.category || undefined,
      summary: values.summary || undefined,
      tags: values.tags || undefined,
      status: values.status,
      isFeatured: values.isFeatured,
      thumbnailFile: values.thumbnailFile,
    };

    updateBlog(
      { id: blog.id, data: payload },
      {
        onSuccess: () => {
          onOpenChange(false);
          setPreviewUrl(null);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] bg-white dark:bg-zinc-950 rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl h-[92vh] flex flex-col font-mono">
        {/* HEADER ĐỒNG BỘ MÀU BLUE (EDIT MODE) */}
        <DialogHeader className="p-8 bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-white/5 shrink-0">
          <DialogTitle className="text-2xl font-black flex items-center gap-4 text-gray-900 dark:text-white uppercase tracking-tighter">
            <div className="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
              <Settings2 className="w-6 h-6 text-white" />
            </div>
            Hiệu đính bài viết hệ thống
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar p-8 bg-white dark:bg-zinc-950">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* SO SÁNH ẢNH CŨ - MỚI (BỐ CỤC CÂN ĐỐI) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Ảnh bìa hiện tại
                  </FormLabel>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5 bg-slate-50">
                    <Image
                      src={blog.thumbnailUrl || "/placeholder-blog.png"}
                      alt="Current"
                      fill
                      className="object-cover opacity-40 grayscale transition-all group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge
                        variant="ghost"
                        className="bg-white/80 dark:bg-zinc-800/80 text-[8px] uppercase font-black"
                      >
                        Original
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-blue-500 ml-1">
                    Cập nhật ảnh mới
                  </FormLabel>
                  <div
                    className={cn(
                      "relative aspect-video rounded-2xl border-2 border-dashed flex items-center justify-center transition-all overflow-hidden",
                      previewUrl
                        ? "border-blue-500 bg-blue-50/5"
                        : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900",
                    )}
                  >
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="New Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-200" />
                    )}
                    <FormField
                      control={form.control}
                      name="thumbnailFile"
                      render={({ field: { onChange } }) => (
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-20"
                          onChange={(e) => handleFileChange(e, onChange)}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* TITLE & SLUG */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          Tiêu đề bài viết
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-bold rounded-2xl text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="md:col-span-5">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          Slug URL
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-bold rounded-2xl pl-12 text-sm"
                              {...field}
                              value={field.value ?? ""}
                            />
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* CATEGORY, STATUS, FEATURED */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Danh mục
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-bold rounded-2xl pl-12 text-sm"
                            {...field}
                            value={field.value ?? ""}
                          />
                          <Bookmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Trạng thái
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-black rounded-2xl uppercase tracking-widest text-[10px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono">
                          <SelectItem
                            value="published"
                            className="text-emerald-500 font-black"
                          >
                            Published
                          </SelectItem>
                          <SelectItem
                            value="draft"
                            className="text-orange-500 font-black"
                          >
                            Draft
                          </SelectItem>
                          <SelectItem
                            value="archived"
                            className="text-red-500 font-black"
                          >
                            Archived
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 px-5 h-14 border border-blue-500/10 self-end">
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 m-0">
                        <Star
                          className={cn(
                            "w-4 h-4",
                            field.value && "fill-blue-600",
                          )}
                        />{" "}
                        Featured
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* TAGS & SUMMARY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Tags
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-bold rounded-2xl pl-12 text-sm"
                            {...field}
                            value={field.value ?? ""}
                          />
                          <TagsIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Tóm tắt ngắn
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-bold rounded-2xl pl-12 text-sm"
                            {...field}
                            value={field.value ?? ""}
                          />
                          <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* CONTENT */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                      Nội dung chi tiết
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[250px] bg-gray-50 dark:bg-zinc-900 border-none rounded-[2rem] p-6 leading-relaxed font-bold text-sm no-scrollbar focus:ring-2 focus:ring-blue-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* UPDATE BUTTON */}
              <Button
                disabled={isUpdating}
                className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl shadow-xl shadow-blue-600/20 text-[11px] uppercase tracking-[0.3em] transition-all active:scale-[0.98]"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin mr-3 h-5 w-5" />
                ) : (
                  <Save className="w-5 h-5 mr-3" />
                )}
                {isUpdating ? "Đang lưu thay đổi..." : "Cập nhật bài viết"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component cho badge nhanh
function Badge({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}) {
  return (
    <span className={cn("px-2 py-0.5 rounded text-[8px] font-bold", className)}>
      {children}
    </span>
  );
}
