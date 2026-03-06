// src/hooks/use-lesson.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonService } from "@/services/lesson.service";
import {
  CreateLessonFromYoutubeRequest,
  CreateLessonRequest,
  GetLessonsParams,
  UpdateLessonRequest,
  UpdateTranscriptRequest,
} from "@/types/lesson.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";
import { useRouter } from "next/navigation";

// --- 1. Hook Fetch Danh sách bài học ---
export const useLessons = (params: GetLessonsParams) => {
  return useQuery({
    queryKey: ["admin-lessons", params],
    queryFn: () => lessonService.getLessons(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
};

// --- 2. Hook Fetch Chi tiết 1 bài học theo ID ---
export const useLesson = (id: string) => {
  return useQuery({
    queryKey: ["lesson", id],
    queryFn: () => lessonService.getLessonById(id),
    enabled: !!id,
    retry: 1,
  });
};

// --- 3. Hook Fetch Dữ liệu Preview Dictation ---
export const useLessonPreview = (lessonId?: string) => {
  return useQuery({
    queryKey: ["lesson-preview", lessonId],
    queryFn: () => lessonService.getDictationPreview(lessonId!),
    enabled: !!lessonId,
    retry: 1,
  });
};

// --- 4. Hook CRUD (Create, Update, Delete, Patch Status) ---
export const useLessonActions = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateLessonRequest) => lessonService.createLesson(data),
    onSuccess: () => {
      toast.success("Tạo bài học mới thành công!", {
        id: "create-lesson-success",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
    },
    onError: (error: any) =>
      toast.error("Lỗi tạo bài học", {
        id: "create-lesson-error",
        description: extractErrorMessage(
          error,
          "Vui lòng kiểm tra lại dữ liệu.",
        ),
      }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLessonRequest }) =>
      lessonService.updateLesson(id, data),
    onSuccess: (_, variables) => {
      toast.success("Cập nhật bài học thành công!", {
        id: "update-lesson-success",
      }); // Thêm ID
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", variables.id] });
      queryClient.invalidateQueries({
        queryKey: ["lesson-preview", variables.id],
      });
    },
    onError: (error: any) =>
      toast.error("Lỗi cập nhật", {
        id: "update-lesson-error",
        description: extractErrorMessage(error, "Không thể lưu thay đổi."),
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => lessonService.deleteLesson(id),
    onSuccess: () => {
      toast.success("Đã xóa bài học khỏi hệ thống.", {
        id: "delete-lesson-success",
      }); // Thêm ID
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
    },
    onError: (error: any) =>
      toast.error("Lỗi xóa bài học", {
        id: "delete-lesson-error",
        description: extractErrorMessage(
          error,
          "Bài học có thể đang được sử dụng.",
        ),
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      lessonService.updateStatus(id, status),
    onSuccess: (data) => {
      toast.success(data.message || "Cập nhật trạng thái thành công", {
        id: "status-update-success",
      }); // Thêm ID
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", data.lessonId] });
    },
    onError: (error: any) =>
      toast.error("Lỗi thay đổi trạng thái", {
        id: "status-update-error",
        description: extractErrorMessage(error, "Thao tác không hợp lệ."),
      }),
  });

  return {
    createLesson: createMutation.mutate,
    updateLesson: updateMutation.mutate,
    deleteLesson: deleteMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};

// --- 5. Hook Tái tạo Templates ---
export const useRegenerateTemplates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lessonService.regenerateTemplates(id),
    onSuccess: (data, lessonId) => {
      toast.success("Đồng bộ thành công!", {
        id: "regen-template-success",
        description: data?.message || "Đã tạo lại Templates cho bài học.",
      });
      queryClient.invalidateQueries({ queryKey: ["lesson-preview", lessonId] });
    },
    onError: (error: any) =>
      toast.error("Lỗi hệ thống", {
        id: "regen-template-error",
        description: extractErrorMessage(
          error,
          "Không thể tạo lại Templates lúc này.",
        ),
      }),
  });
};

// --- 6. Hook Cập nhật Transcript ---
export const useUpdateTranscript = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTranscriptRequest }) =>
      lessonService.updateTranscript(id, data),
    onSuccess: (data, variables) => {
      toast.success("Đã cập nhật Transcript", {
        id: "update-transcript-success",
        description: `Hệ thống đã xử lý ${data.segmentCount} câu thoại và tái tạo templates.`,
      });
      queryClient.invalidateQueries({ queryKey: ["lesson", variables.id] });
      queryClient.invalidateQueries({
        queryKey: ["lesson-preview", variables.id],
      });
    },
    onError: (error: any) => {
      toast.error("Lỗi cập nhật Transcript", {
        id: "update-transcript-error",
        description: extractErrorMessage(
          error,
          "Không thể xử lý nội dung transcript này.",
        ),
      });
    },
  });
};

// --- 7. Hook Tạo từ Youtube
export const useCreateFromYoutube = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateLessonFromYoutubeRequest) =>
      lessonService.createFromYoutube(data),
    onSuccess: (data) => {
      toast.success("Xử lý thành công!", {
        id: "youtube-create-success",
        description: `Đã tạo bài học "${data.title}" từ YouTube.`,
      });
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });

      // Chuyển hướng sang trang chi tiết
      if (data.lessonId) {
        router.push(`/admin/lessons/${data.lessonId}`);
      }
    },
    onError: (error: any) => {
      toast.error("Lỗi tạo từ YouTube", {
        id: "youtube-create-error",
        description: extractErrorMessage(
          error,
          "Không thể lấy dữ liệu từ URL này.",
        ),
      });
    },
  });
};

// --- 8. Hook Preview YouTube trước khi tạo bài học ---
export const useYoutubePreview = (url: string) => {
  return useQuery({
    queryKey: ["youtube-preview", url],
    queryFn: () => lessonService.getYoutubePreview(url),
    enabled: !!url && (url.includes("youtube.com") || url.includes("youtu.be")),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
