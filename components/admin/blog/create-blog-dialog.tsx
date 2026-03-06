"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Loader2, Plus, FileImage, Send, AlignLeft } from "lucide-react";
import { useManageBlog } from "@/hooks/use-manage-blog";
import { BlogSchema, BlogFormValues } from "@/schemas/blog.schema";
import { CreateBlogRequest } from "@/types/blog.type";

export function CreateBlogDialog() {
  const [open, setOpen] = React.useState(false);
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

  const onSubmit = (values: BlogFormValues) => {
    const payload: CreateBlogRequest = {
      Title: values.Title,
      Content: values.Content,
      Summary: values.Summary ?? undefined,
      ThumbnailFile: values.ThumbnailFile,
      Tags: values.Tags ?? undefined,
      Status: values.Status ?? "Published",
    };

    createBlog(payload, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 px-6 text-xs">
          <Plus className="w-4 h-4 mr-2 stroke-[3px]" /> Viết bài mới
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] bg-white rounded-[2.5rem] font-mono p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-10 bg-gray-50/50 border-b border-gray-100 text-left">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900 leading-none">
            <Send className="w-6 h-6 text-orange-500" /> Biên tập nội dung
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-10 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar"
          >
            {/* 1. Tiêu đề bài viết */}
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
                      className="h-12 bg-gray-50 border-gray-100 font-bold rounded-xl focus:border-orange-500 transition-all text-gray-900"
                      placeholder="Nhập tiêu đề hấp dẫn..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              {/* 2. Ảnh bìa */}
              <FormField
                control={form.control}
                name="ThumbnailFile"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-gray-400 ml-1">
                      Ảnh bìa (Thumbnail)
                    </FormLabel>
                    <FormControl>
                      <div className="relative h-12">
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onChange(file);
                          }}
                          {...field}
                        />
                        <div className="h-full bg-gray-50 border-gray-100 border rounded-xl flex items-center px-4 gap-3 text-gray-500 font-bold text-xs shadow-inner transition-all hover:bg-gray-100">
                          <FileImage className="w-4 h-4 text-orange-500" />
                          <span className="truncate">
                            {value instanceof File
                              ? value.name
                              : "Chọn tệp ảnh..."}
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              {/* 3. Tags */}
              <FormField
                control={form.control}
                name="Tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-gray-400 ml-1">
                      Tags (Phân cách bằng dấu phẩy)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="english, grammar, tips..."
                        className="h-12 bg-gray-50 border-gray-100 font-bold rounded-xl focus:border-orange-500 transition-all text-gray-900"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />
            </div>

            {/* 4. Tóm tắt bài viết */}
            <FormField
              control={form.control}
              name="Summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-400 ml-1 flex items-center gap-2">
                    <AlignLeft className="w-3 h-3" /> Tóm tắt ngắn (Summary)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả ngắn gọn nội dung bài viết..."
                      className="min-h-[80px] bg-gray-50 border-gray-100 font-sans p-4 rounded-xl resize-none text-gray-900 focus:border-orange-500 transition-all"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />

            {/* 5. Nội dung chi tiết */}
            <FormField
              control={form.control}
              name="Content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-400 ml-1">
                    Nội dung bài viết
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Sử dụng Markdown hoặc văn bản thuần túy..."
                      className="min-h-[250px] bg-gray-50 border-gray-100 font-sans p-5 rounded-[1.5rem] text-gray-900 focus:border-orange-500 transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isCreating}
              className="w-full h-16 bg-gray-900 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-[0.98] mt-4 text-sm"
            >
              {isCreating ? (
                <Loader2 className="animate-spin mr-3 h-5 w-5" />
              ) : (
                <Send className="w-5 h-5 mr-3" />
              )}
              {isCreating ? "Đang xử lý dữ liệu..." : "Xác nhận xuất bản"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
