// src/hooks/use-lesson.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonService } from "@/services/lesson.service";
import {
  CreateLessonFromYoutubeRequest,
  CreateLessonRequest,
  GetLessonsParams,
  UpdateLessonRequest,
  UpdateTranscriptRequest,
  GetUserLessonsParams,
  SubmitDictationRequest,
  CheckSegmentRequest,
  UpdateDictationTemplatesRequest,
  GetYoutubeTranscriptParams,
} from "@/types/lesson.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";
import { useRouter } from "next/navigation";

// ============ ADMIN HOOKS ============

// Hook Fetch Danh sách (Admin)
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
      });
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
      });
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
      });
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
    // Gọi thông thường (Không await được)
    createLesson: createMutation.mutate,
    updateLesson: updateMutation.mutate,
    deleteLesson: deleteMutation.mutate,
    updateStatus: updateStatusMutation.mutate,

    // NÊN THÊM: Gọi dạng Async (Await được trong form submit để redirect)
    createLessonAsync: createMutation.mutateAsync,
    updateLessonAsync: updateMutation.mutateAsync,

    // Trạng thái loading
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
      toast.success("Reset Templates thành công!", {
        id: "regen-template-success",
        description:
          data?.message ||
          "Hệ thống đã reset và tự động chọn lại các từ đục lỗ.",
      });

      queryClient.invalidateQueries({
        queryKey: ["lesson-preview", lessonId],
        exact: true,
      });
    },
    onError: (error: any) =>
      toast.error("Không thể tái tạo Templates", {
        id: "regen-template-error",
        description: extractErrorMessage(
          error,
          "Lỗi hệ thống khi đang reset bản nháp.",
        ),
      }),
  });
};

export const useUpdateDictationTemplates = () => {
  const queryClient = useQueryClient();

  // Thêm Generics: <Kiểu_Data_Trả_Về, Kiểu_Lỗi, Kiểu_Dữ_Liệu_Đầu_Vào>
  return useMutation<
    { message: string },
    any,
    { id: string; data: UpdateDictationTemplatesRequest }
  >({
    // Giải nén object để truyền vào 2 tham số cho service
    mutationFn: ({ id, data }) =>
      lessonService.updateDictationTemplates(id, data),
    onSuccess: (_, variables) => {
      toast.success("Đã lưu cấu hình đục lỗ!", {
        id: "update-templates-success",
      });
      // Làm mới cache Preview để fetch lại data mới nhất
      queryClient.invalidateQueries({
        queryKey: ["lesson-preview", variables.id],
      });
    },
    onError: (error: any) => {
      toast.error("Lỗi khi lưu cấu hình", {
        description: extractErrorMessage(error),
      });
    },
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

export const useYoutubeTranscript = (params: GetYoutubeTranscriptParams) => {
  return useQuery({
    queryKey: ["youtube-transcript", params.url, params.preferredLanguage],
    queryFn: () => lessonService.getYoutubeTranscript(params),
    enabled:
      !!params.url &&
      (params.url.includes("youtube.com") || params.url.includes("youtu.be")),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};

// ============ USER HOOKS ============

// Hook lấy danh sách lessons cho user
export const useUserLessons = (params: GetUserLessonsParams) => {
  return useQuery({
    queryKey: ["user-lessons", params],
    queryFn: () => lessonService.getUserLessons(params),
    placeholderData: (previousData) => previousData,
  });
};

// Hook lấy chi tiết lesson cho user
export const useUserLessonDetail = (id: string) => {
  return useQuery({
    queryKey: ["user-lesson", id],
    queryFn: () => lessonService.getUserLessonById(id),
    enabled: !!id,
  });
};

// Hook lấy dictation exercise
export const useDictationExercise = (id: string, level: string) => {
  return useQuery({
    queryKey: ["dictation", id, level],
    queryFn: () => lessonService.getDictationExercise(id, level),
    enabled: !!id && !!level,
  });
};

// Hook submit dictation
export const useSubmitDictation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubmitDictationRequest }) =>
      lessonService.submitDictation(id, data),
    onSuccess: (result) => {
      const correctPercentage =
        (result.correctCount / result.totalBlanks) * 100;
      if (correctPercentage >= 80) {
        toast.success(`Xuất sắc! Điểm: ${result.score.toFixed(0)}`);
      } else if (correctPercentage >= 50) {
        toast.info(`Tốt lắm! Điểm: ${result.score.toFixed(0)}`);
      } else {
        toast.warning(`Cần cố gắng thêm. Điểm: ${result.score.toFixed(0)}`);
      }
      queryClient.invalidateQueries({ queryKey: ["user-lesson"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Lỗi khi nộp bài");
    },
  });
};

// Hook lấy segments cho shadowing
export const useSegments = (id: string, level: string) => {
  return useQuery({
    queryKey: ["segments", id, level],
    queryFn: () => lessonService.getSegments(id, level),
    enabled: !!id && !!level,
  });
};

// Hook check segment
export const useCheckSegment = () => {
  return useMutation({
    mutationFn: ({
      id,
      segmentIndex,
      data,
    }: {
      id: string;
      segmentIndex: number;
      data: CheckSegmentRequest;
    }) => lessonService.checkSegment(id, segmentIndex, data),
    onSuccess: (result) => {
      const accuracy = result.accuracy;
      if (accuracy >= 90) {
        toast.success(`Hoàn hảo! Độ chính xác: ${accuracy.toFixed(0)}%`);
      } else if (accuracy >= 70) {
        toast.info(`Tốt! Độ chính xác: ${accuracy.toFixed(0)}%`);
      } else {
        toast.warning(`Thử lại nhé! Độ chính xác: ${accuracy.toFixed(0)}%`);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Lỗi khi kiểm tra");
    },
  });
};
