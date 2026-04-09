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
import {
  Loader2,
  Plus,
  Send,
  AlignLeft,
  ImageIcon,
  Globe,
  Lock,
  Tags as TagsIcon,
} from "lucide-react";
import { useManageBlog } from "@/hooks/use-manage-blog";
import { BlogSchema, BlogFormValues } from "@/schemas/blog.schema";
import { CreateBlogRequest } from "@/types/blog.type";

export function CreateBlogDialog() {
  const [open, setOpen] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const { createBlog, isCreating } = useManageBlog();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      Title: "",
      Content: "",
      Summary: "",
      Tags: "",
      Status: "Published",
      ThumbnailFile: undefined,
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

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onSubmit = (values: BlogFormValues) => {
    const payload: CreateBlogRequest = {
      Title: values.Title,
      Content: values.Content,
      Summary: values.Summary || "",
      Tags: values.Tags || "",
      Status: values.Status || "Published",
      ThumbnailFile: values.ThumbnailFile,
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
        <Button className="h-12 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-500/20 px-8 text-[11px] uppercase tracking-widest flex items-center transition-all active:scale-95 border-b-4 border-orange-700 dark:border-orange-800">
          <Plus className="w-4 h-4 mr-2 stroke-[3px]" /> Viết bài mới
        </Button>
      </DialogTrigger>

      {/* Cấu trúc flex-col và h-[90vh] để cố định Header */}
      <DialogContent className="sm:max-w-[850px] bg-white dark:bg-zinc-950 rounded-[2.5rem] font-mono p-0 overflow-hidden border-none shadow-2xl transition-colors duration-300 h-[90vh] flex flex-col">
        {/* Header Cố định (shrink-0) */}
        <DialogHeader className="p-10 bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-white/5 text-left shrink-0">
          <DialogTitle className="text-2xl font-black flex items-center gap-4 text-gray-900 dark:text-white uppercase tracking-tighter">
            <div className="p-2.5 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/20">
              <Send className="w-6 h-6 text-white" />
            </div>
            Biên tập bài viết
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar p-10 bg-white dark:bg-zinc-950">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 font-mono"
            >
              {previewUrl && (
                <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden border-2 border-orange-100 dark:border-orange-500/20 mb-4 shadow-inner bg-gray-50 dark:bg-zinc-900 group">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/10">
                    Xem trước ảnh bìa
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="Title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                          Tiêu đề bài viết
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-bold rounded-xl focus:ring-orange-500 dark:text-white font-mono text-sm shadow-sm transition-all"
                            placeholder="Nhập tiêu đề hấp dẫn..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="Status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                          Trạng thái
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-14 bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-black rounded-xl font-mono text-[10px] uppercase tracking-widest shadow-sm dark:text-slate-200">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-mono bg-white dark:bg-zinc-900 border-white/10">
                            <SelectItem
                              value="Published"
                              className="focus:bg-emerald-50 dark:focus:bg-emerald-500/10"
                            >
                              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
                                <Globe className="w-3.5 h-3.5" /> Xuất bản
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="Draft"
                              className="focus:bg-orange-50 dark:focus:bg-orange-500/10"
                            >
                              <div className="flex items-center gap-2 text-orange-500 font-bold text-[10px] uppercase">
                                <Lock className="w-3.5 h-3.5" /> Bản nháp
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ThumbnailFile"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                        Ảnh bìa
                      </FormLabel>
                      <FormControl>
                        <div className="relative h-14 group">
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            onChange={(e) => handleFileChange(e, onChange)}
                          />
                          <div className="h-full bg-slate-900 dark:bg-zinc-800 border-slate-800 dark:border-white/5 border rounded-xl flex items-center px-5 gap-3 text-white font-black text-[10px] uppercase tracking-widest shadow-lg transition-all group-hover:bg-orange-600">
                            <ImageIcon className="w-4 h-4 text-orange-400" />
                            <span className="truncate">
                              {value instanceof File
                                ? value.name
                                : "Chọn ảnh bìa..."}
                            </span>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                        Từ khóa (Tags)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Tips, Grammar..."
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-bold rounded-xl focus:ring-orange-500 font-mono text-sm pl-10 shadow-sm dark:text-white"
                            {...field}
                            value={field.value ?? ""}
                          />
                          <TagsIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 dark:text-zinc-600" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="Summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1 flex items-center gap-2">
                      <AlignLeft className="w-3 h-3" /> Tóm tắt bài viết
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả ngắn gọn nội dung..."
                        className="min-h-[100px] bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-mono p-5 rounded-2xl resize-none font-bold text-sm shadow-sm focus:ring-orange-500 dark:text-slate-200 no-scrollbar"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                      Nội dung bài viết
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Bắt đầu viết tại đây..."
                        className="min-h-[350px] bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-mono p-6 rounded-[2.5rem] leading-relaxed font-bold text-sm shadow-sm focus:ring-orange-500 dark:text-slate-200 no-scrollbar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                disabled={isCreating}
                className="w-full h-16 bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-black rounded-[1.5rem] shadow-xl shadow-orange-600/20 transition-all active:scale-[0.98] text-[11px] uppercase tracking-[0.3em] font-mono"
              >
                {isCreating ? (
                  <Loader2 className="animate-spin mr-3 h-5 w-5" />
                ) : (
                  <Send className="w-5 h-5 mr-3" />
                )}
                {isCreating ? "Đang xử lý..." : "Xuất bản bài viết"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
