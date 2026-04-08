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
  Edit3,
  FileImage,
  Save,
  AlignLeft,
  Globe,
  Lock,
  ImageIcon,
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
      <DialogContent className="sm:max-w-[850px] bg-white dark:bg-zinc-950 rounded-[2.5rem] font-mono p-0 overflow-hidden border-none shadow-2xl transition-colors duration-300">
        <DialogHeader className="p-10 bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-white/5">
          <DialogTitle className="text-2xl font-black flex items-center gap-3 text-gray-900 dark:text-white uppercase tracking-tighter">
            <Edit3 className="w-6 h-6 text-blue-500" /> Hiệu đính bài viết
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar font-mono bg-white dark:bg-zinc-950"
          >
            {/* Visual Preview: Old vs New */}
            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-dashed border-gray-200 dark:border-white/10">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                  Ảnh hiện tại
                </p>
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-zinc-900 shadow-inner">
                  <Image
                    src={blog.thumbnailUrl || "/placeholder-blog.png"}
                    alt="Current thumbnail"
                    fill
                    className="object-cover opacity-40 dark:opacity-20 grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 dark:bg-zinc-800 text-[9px] font-black px-3 py-1.5 rounded-full shadow-sm dark:text-slate-400 border border-white/10 uppercase tracking-widest">
                      Original
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest ml-1">
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
                      className="object-cover animate-in fade-in duration-500"
                    />
                  ) : (
                    <div className="text-center space-y-1">
                      <ImageIcon className="w-8 h-8 text-slate-200 dark:text-zinc-800 mx-auto" />
                      <p className="text-[9px] text-slate-400 dark:text-zinc-600 font-black uppercase tracking-tighter">
                        Chưa có thay đổi
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
                      <div className="relative h-14">
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) => handleFileChange(e, onChange)}
                        />
                        <div className="h-full bg-gray-900 dark:bg-zinc-800 border-gray-800 dark:border-white/5 border rounded-xl flex items-center px-5 gap-3 text-white font-black text-[10px] uppercase tracking-widest shadow-lg transition-all hover:bg-blue-600">
                          <FileImage className="w-4 h-4 text-blue-400" />
                          <span className="truncate">
                            {value instanceof File
                              ? value.name
                              : "Chọn tệp thay thế..."}
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
                      <Input
                        className="h-14 bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-bold rounded-xl focus:ring-blue-500 dark:text-white font-mono text-sm shadow-sm"
                        {...field}
                        value={field.value ?? ""}
                      />
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
                      className="min-h-[80px] bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-mono p-4 rounded-2xl resize-none font-bold text-sm shadow-sm focus:ring-blue-500 dark:text-slate-200 custom-scrollbar"
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
                      className="min-h-[250px] bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5 font-mono p-6 rounded-[2rem] leading-relaxed font-bold text-sm shadow-sm focus:ring-blue-500 dark:text-slate-200 custom-scrollbar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold text-red-500" />
                </FormItem>
              )}
            />

            <Button
              disabled={isUpdating}
              className="w-full h-20 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black rounded-[1.5rem] shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] text-[11px] uppercase tracking-[0.3em] mt-4 font-mono"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin mr-3 h-6 w-6" />
              ) : (
                <Save className="w-6 h-6 mr-3" />
              )}
              Xác nhận cập nhật
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
