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
  DialogTrigger,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Loader2,
  Plus,
  Send,
  AlignLeft,
  ImageIcon,
  Globe,
  Lock,
  Tags as TagsIcon,
  Link as LinkIcon,
  Bookmark,
  Star,
  Layout,
} from "lucide-react";
import { useManageBlog } from "@/hooks/use-blog";
import { BlogSchema, BlogFormValues } from "@/schemas/blog.schema";
import { CreateBlogRequest } from "@/types/blog.type";
import { cn } from "@/lib/utils";

export function CreateBlogDialog() {
  const [open, setOpen] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const { createBlog, isCreating } = useManageBlog();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "",
      content: "",
      slug: "",
      category: "",
      summary: "",
      tags: "",
      status: "published",
      isFeatured: false,
    },
  });

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
    const payload: CreateBlogRequest = {
      title: values.title,
      content: values.content,
      slug: values.slug || undefined,
      category: values.category || undefined,
      summary: values.summary || undefined,
      tags: values.tags || undefined,
      status: values.status || "published",
      isFeatured: values.isFeatured,
      thumbnailFile: values.thumbnailFile,
    };

    createBlog(payload, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        setPreviewUrl(null);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-500/20 px-8 text-[11px] uppercase tracking-widest flex items-center transition-all active:scale-95 border-b-4 border-orange-700">
          <Plus className="w-4 h-4 mr-2 stroke-[3px]" /> Viết bài mới
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] bg-white dark:bg-zinc-950 rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl h-[92vh] flex flex-col font-mono">
        {/* HEADER CÂN ĐỐI */}
        <DialogHeader className="p-8 bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-white/5 shrink-0">
          <DialogTitle className="text-2xl font-black flex items-center gap-4 text-gray-900 dark:text-white uppercase tracking-tighter">
            <div className="p-2.5 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/20">
              <Layout className="w-6 h-6 text-white" />
            </div>
            Biên tập nội dung hệ thống
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar p-8 bg-white dark:bg-zinc-950">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* PHẦN ẢNH BÌA & THÔNG TIN CƠ BẢN */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Cột trái: Thumbnail Preview */}
                <div className="lg:col-span-5 space-y-4">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Hình ảnh đại diện
                  </FormLabel>
                  <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 group transition-all hover:border-orange-500/50">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400">
                        <ImageIcon className="w-10 h-10 opacity-20" />
                        <span className="text-[9px] font-black uppercase tracking-tighter">
                          Chưa có ảnh
                        </span>
                      </div>
                    )}
                    <FormField
                      control={form.control}
                      name="thumbnailFile"
                      render={({ field: { value, onChange } }) => (
                        <div className="absolute inset-0 opacity-0 cursor-pointer z-10">
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full h-full cursor-pointer"
                            onChange={(e) => handleFileChange(e, onChange)}
                          />
                        </div>
                      )}
                    />
                    <div className="absolute bottom-4 inset-x-4">
                      <Button
                        type="button"
                        className="w-full h-10 bg-slate-900/80 backdrop-blur-md text-white rounded-xl text-[9px] font-black uppercase border border-white/10 pointer-events-none"
                      >
                        Thay đổi ảnh bìa
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Cột phải: Tiêu đề & Slug */}
                <div className="lg:col-span-7 space-y-6">
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
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-bold rounded-2xl text-sm focus:ring-2 focus:ring-orange-500/20"
                            placeholder="VD: Cách học tiếng Anh hiệu quả..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          Đường dẫn tĩnh (Slug)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-bold rounded-2xl pl-12 text-sm"
                              placeholder="url-bai-viet-tu-dong"
                              {...field}
                              value={field.value ?? ""}
                            />
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                          </div>
                        </FormControl>
                        <FormDescription className="text-[9px] text-slate-400">
                          Để trống để hệ thống tự tạo Slug chuẩn SEO
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* HÀNG BỘ LỌC CÂN ĐỐI (3 CỘT) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Phân loại
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-bold rounded-2xl pl-12 text-sm"
                            placeholder="VD: Grammar, Tips..."
                            {...field}
                            value={field.value ?? ""}
                          />
                          <Bookmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
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
                        Chế độ hiển thị
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
                            Xuất bản ngay
                          </SelectItem>
                          <SelectItem
                            value="draft"
                            className="text-orange-500 font-black"
                          >
                            Lưu nháp
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
                    <FormItem className="flex flex-row items-center justify-between rounded-[1.25rem] bg-orange-500/5 dark:bg-orange-500/10 px-5 h-14 border border-orange-500/10 self-end">
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-2 m-0">
                        <Star
                          className={cn(
                            "w-4 h-4",
                            field.value && "fill-orange-500",
                          )}
                        />{" "}
                        Tin nổi bật
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
                        Từ khóa (Tags)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-none font-bold rounded-2xl pl-12 text-sm"
                            placeholder="Speaking, IELTS, Tips..."
                            {...field}
                            value={field.value ?? ""}
                          />
                          <TagsIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
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
                            placeholder="Mô tả ngắn gọn nội dung..."
                            {...field}
                            value={field.value ?? ""}
                          />
                          <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* NỘI DUNG CHÍNH (FULL WIDTH) */}
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
                        className="min-h-[250px] bg-gray-50 dark:bg-zinc-900 border-none rounded-[2rem] p-6 leading-relaxed font-bold text-sm no-scrollbar focus:ring-2 focus:ring-orange-500/20"
                        placeholder="Bắt đầu biên tập nội dung tại đây..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ACTION BUTTON */}
              <Button
                disabled={isCreating}
                className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-3xl shadow-xl shadow-orange-600/20 text-[11px] uppercase tracking-[0.3em] transition-all active:scale-[0.98]"
              >
                {isCreating ? (
                  <Loader2 className="animate-spin mr-3 h-5 w-5" />
                ) : (
                  <Send className="w-5 h-5 mr-3" />
                )}
                {isCreating ? "Đang đồng bộ..." : "Hoàn tất & Xuất bản"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
