"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Loader2,
  FileImage,
  Save,
  AlignLeft,
  Globe,
  Lock,
  ImageIcon,
  Tags as TagsIcon,
  Settings2,
} from "lucide-react";
import { useManageBlog } from "@/hooks/use-manage-blog";
import { BlogSchema, BlogFormValues } from "@/schemas/blog.schema";
import { BlogDto, CreateBlogRequest } from "@/types/blog.type";
import Image from "next/image";
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
      Title: blog.title,
      Content: blog.content,
      Summary: blog.summary || "",
      Tags: blog.tags || "",
      Status: blog.status || "Published",
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
      Summary: values.Summary ?? undefined,
      Tags: values.Tags ?? undefined,
      Status: values.Status ?? "Published",
    };

    if (values.ThumbnailFile instanceof File) {
      payload.ThumbnailFile = values.ThumbnailFile;
    }

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
      <DialogContent className="sm:max-w-[850px] bg-white dark:bg-zinc-950 rounded-[2.5rem] font-mono p-0 overflow-hidden border-none shadow-2xl transition-colors duration-300 h-[90vh] flex flex-col">
        {/* Header Cố định */}
        <DialogHeader className="p-10 bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-white/5 text-left shrink-0">
          <DialogTitle className="text-2xl font-black flex items-center gap-4 text-gray-900 dark:text-white uppercase tracking-tighter">
            <div className="p-2.5 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/20">
              <Settings2 className="w-6 h-6 text-white" />
            </div>
            Hiệu đính bài viết
          </DialogTitle>
        </DialogHeader>

        {/* Phần Form cuộn - Ẩn Scrollbar */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-10 bg-white dark:bg-zinc-950">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 font-mono"
            >
              {/* Visual Preview: Old vs New */}
              <div className="grid grid-cols-2 gap-6 pb-6 border-b border-dashed border-gray-200 dark:border-white/10">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                    Ảnh hiện tại
                  </p>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-zinc-900 shadow-inner group">
                    <Image
                      src={blog.thumbnailUrl || "/placeholder-blog.png"}
                      alt="Current thumbnail"
                      fill
                      className="object-cover opacity-40 dark:opacity-20 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white/90 dark:bg-zinc-800 text-[9px] font-black px-3 py-1.5 rounded-full shadow-sm dark:text-slate-400 border border-white/10 uppercase tracking-widest">
                        Ảnh bìa hiện tại
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-[0.2em] ml-1">
                    Ảnh thay thế
                  </p>
                  <div
                    className={cn(
                      "relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed transition-all flex items-center justify-center",
                      previewUrl
                        ? "border-blue-500 dark:border-blue-400 bg-blue-50/10"
                        : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900",
                    )}
                  >
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="New preview"
                        fill
                        className="object-cover animate-in fade-in zoom-in-95 duration-500"
                      />
                    ) : (
                      <div className="text-center space-y-1">
                        <ImageIcon className="w-8 h-8 text-slate-200 dark:text-zinc-800 mx-auto" />
                        <p className="text-[9px] text-slate-400 dark:text-zinc-600 font-black uppercase tracking-tighter">
                          Chưa chọn tệp mới
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="Title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                          Tiêu đề
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-bold rounded-xl focus:ring-blue-500 dark:text-white font-mono text-sm shadow-sm transition-all"
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
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                          Trạng thái
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-14 bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-black rounded-xl font-mono text-[10px] uppercase tracking-widest dark:text-slate-200 shadow-sm">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-mono bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 shadow-2xl">
                            <SelectItem
                              value="Published"
                              className="focus:bg-emerald-50 dark:focus:bg-emerald-500/10"
                            >
                              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
                                <Globe className="w-3.5 h-3.5" /> Công khai
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
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                        Cập nhật ảnh bìa
                      </FormLabel>
                      <FormControl>
                        <div className="relative h-14 group">
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            onChange={(e) => handleFileChange(e, onChange)}
                          />
                          <div className="h-full bg-slate-900 dark:bg-zinc-800 border-slate-800 dark:border-white/5 border rounded-xl flex items-center px-5 gap-3 text-white font-black text-[10px] uppercase tracking-widest shadow-lg transition-all group-hover:bg-blue-600">
                            <FileImage className="w-4 h-4 text-blue-400" />
                            <span className="truncate">
                              {value instanceof File
                                ? value.name
                                : "Chọn ảnh bìa mới..."}
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
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                        Thẻ phân loại
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="English, Tips..."
                            className="h-14 bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-bold rounded-xl focus:ring-blue-500 dark:text-white font-mono text-sm pl-10 shadow-sm"
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
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1 flex items-center gap-2">
                      <AlignLeft className="w-3 h-3" /> Tóm tắt nội dung
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px] bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-mono p-5 rounded-2xl resize-none font-bold text-sm shadow-sm focus:ring-blue-500 dark:text-slate-200 no-scrollbar"
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
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                      Nội dung chi tiết
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[350px] bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-mono p-6 rounded-[2.5rem] leading-relaxed font-bold text-sm shadow-sm focus:ring-blue-500 dark:text-slate-200 no-scrollbar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold text-red-500" />
                  </FormItem>
                )}
              />

              {/* Nút hành động chính */}
              <Button
                disabled={isUpdating}
                className="w-full h-16 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black rounded-[1.5rem] shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] text-[11px] uppercase tracking-[0.3em] mt-4 font-mono"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin mr-3 h-5 w-5" />
                ) : (
                  <Save className="w-5 h-5 mr-3" />
                )}
                {isUpdating ? "Đang cập nhật..." : "Lưu thay đổi"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
