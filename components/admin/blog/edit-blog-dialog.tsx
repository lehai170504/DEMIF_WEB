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
      ThumbnailFile: undefined, // Mặc định không bắt buộc chọn
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
    // 1. Tạo payload cơ bản từ dữ liệu form
    const payload: CreateBlogRequest = {
      Title: values.Title,
      Content: values.Content,
      Summary: values.Summary ?? undefined,
      Tags: values.Tags ?? undefined,
      Status: values.Status ?? "Published",
    };

    // 2. CHỈ THÊM ẢNH MỚI NẾU CÓ CHỌN (instanceof File)
    // Nếu ThumbnailFile là undefined, payload sẽ không chứa thuộc tính này.
    // BE khi nhận được FormData thiếu key "ThumbnailFile" sẽ hiểu là giữ nguyên ảnh cũ.
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
      <DialogContent className="sm:max-w-[850px] bg-white rounded-[2.5rem] font-mono p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-10 bg-gray-50/50 border-b border-gray-100">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900 leading-none">
            <Edit3 className="w-6 h-6 text-blue-500" /> Hiệu đính bài viết
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-10 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar font-mono"
          >
            {/* Visual Preview: Old vs New */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-gray-200">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                  Ảnh hiện tại
                </p>
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50">
                  <Image
                    src={blog.thumbnailUrl || "/placeholder-blog.png"}
                    alt="Current thumbnail"
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">
                      ORIGINAL
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider ml-1">
                  Ảnh thay thế (Preview)
                </p>
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-blue-200 bg-blue-50/30 flex items-center justify-center">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="New preview"
                      fill
                      className="object-cover animate-in fade-in duration-500"
                    />
                  ) : (
                    <div className="text-center space-y-1">
                      <ImageIcon className="w-8 h-8 text-blue-200 mx-auto" />
                      <p className="text-[10px] text-blue-300 font-bold px-4">
                        Giữ ảnh hiện tại
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
                      <FormLabel className="text-xs font-bold text-gray-400 ml-1">
                        Tiêu đề bài viết
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 bg-gray-50 border-gray-100 font-bold rounded-xl focus:border-blue-500 transition-all font-mono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-bold" />
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
                      <FormLabel className="text-xs font-bold text-gray-400 ml-1">
                        Trạng thái
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-100 font-bold rounded-xl focus:border-blue-500 font-mono text-xs">
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-mono font-bold">
                          <SelectItem value="Published">
                            <div className="flex items-center gap-2 text-emerald-600 text-xs">
                              <Globe className="w-3.5 h-3.5" /> Công khai
                            </div>
                          </SelectItem>
                          <SelectItem value="Draft">
                            <div className="flex items-center gap-2 text-orange-500 text-xs">
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
                    <FormLabel className="text-xs font-bold text-gray-400 ml-1">
                      Thay đổi ảnh (Tùy chọn)
                    </FormLabel>
                    <FormControl>
                      <div className="relative h-12">
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) => handleFileChange(e, onChange)}
                        />
                        <div className="h-full bg-gray-900 border-gray-800 border rounded-xl flex items-center px-4 gap-3 text-white font-bold text-xs shadow-lg transition-colors hover:bg-blue-600">
                          <FileImage className="w-4 h-4 text-blue-300" />
                          <span className="truncate">
                            {value instanceof File
                              ? value.name
                              : "Giữ nguyên ảnh cũ..."}
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
                    <FormLabel className="text-xs font-bold text-gray-400 ml-1">
                      Thẻ phân loại (Tags)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 bg-gray-50 border-gray-100 font-bold rounded-xl focus:border-blue-500 font-mono"
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
                  <FormLabel className="text-xs font-bold text-gray-400 ml-1 flex items-center gap-2">
                    <AlignLeft className="w-3 h-3" /> Tóm tắt
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[80px] bg-gray-50 border-gray-100 font-mono p-4 rounded-xl resize-none font-bold"
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
                  <FormLabel className="text-xs font-bold text-gray-400 ml-1">
                    Nội dung chi tiết
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[200px] bg-gray-50 border-gray-100 font-mono p-5 rounded-[1.5rem] leading-relaxed font-bold text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />

            <Button
              disabled={isUpdating}
              className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-[0.98] text-sm font-mono"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin mr-3 h-5 w-5" />
              ) : (
                <Save className="w-5 h-5 mr-3" />
              )}
              Xác nhận cập nhật hệ thống
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
