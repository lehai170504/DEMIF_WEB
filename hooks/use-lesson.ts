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
  UpdateDictationTemplatesRequest,
  GetYoutubeTranscriptParams,
  CheckVoiceRequest,
  CheckShadowingSegmentRequest,
  CheckDictationSegmentRequest,
} from "@/types/lesson.type";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";
import { useRouter } from "next/navigation";

// ============ ADMIN HOOKS ============

// Lấy danh sách bài học cho Admin
export const useLessons = (params: GetLessonsParams) => {
  return useQuery({
    queryKey: ["admin-lessons", params],
    queryFn: () => lessonService.getLessons(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
};

// Lấy chi tiết bài học
export const useLesson = (id: string) => {
  return useQuery({
    queryKey: ["lesson", id],
    queryFn: () => lessonService.getLessonById(id),
    enabled: !!id,
    retry: 1,
  });
};

// Lấy dữ liệu preview đục lỗ
export const useLessonPreview = (lessonId?: string) => {
  return useQuery({
    queryKey: ["lesson-preview", lessonId],
    queryFn: () => lessonService.getDictationPreview(lessonId!),
    enabled: !!lessonId,
    retry: 1,
  });
};

// Tổng hợp các Mutation quản lý bài học
export const useLessonActions = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateLessonRequest) => lessonService.createLesson(data),
    onSuccess: () => {
      toast.success("Khởi tạo thành công", {
        description: "Bài học mới đã được thêm vào hệ thống ở trạng thái Nháp.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
    },
    onError: (error: any) =>
      toast.error("Lỗi khởi tạo", {
        description: extractErrorMessage(
          error,
          "Vui lòng kiểm tra lại dữ liệu đầu vào.",
        ),
      }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLessonRequest }) =>
      lessonService.updateLesson(id, data),
    onSuccess: (_, variables) => {
      toast.success("Cập nhật thành công", {
        description: "Mọi thay đổi đã được đồng bộ hóa lên hệ thống.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", variables.id] });
      queryClient.invalidateQueries({
        queryKey: ["lesson-preview", variables.id],
      });
    },
    onError: (error: any) =>
      toast.error("Lỗi cập nhật", {
        description: extractErrorMessage(
          error,
          "Không thể lưu thay đổi vào lúc này.",
        ),
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => lessonService.deleteLesson(id),
    onSuccess: () => {
      toast.success("Xóa thành công", {
        description: "Bài học đã được gỡ bỏ hoàn toàn khỏi hệ thống.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
    },
    onError: (error: any) =>
      toast.error("Lỗi xóa bài", {
        description: extractErrorMessage(
          error,
          "Dữ liệu đang bị ràng buộc hoặc lỗi phân quyền.",
        ),
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      lessonService.updateStatus(id, status),
    onSuccess: (data) => {
      toast.success("Trạng thái đã đổi", {
        description: data.message || "Cập nhật trạng thái hiển thị thành công.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", data.lessonId] });
    },
    onError: (error: any) =>
      toast.error("Thao tác thất bại", {
        description: extractErrorMessage(
          error,
          "Thay đổi trạng thái không hợp lệ.",
        ),
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

// Reset và để AI tự đục lỗ lại
export const useRegenerateTemplates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lessonService.regenerateTemplates(id),
    onSuccess: (data, lessonId) => {
      toast.success("Tái tạo hoàn tất", {
        description:
          data?.message || "AI đã reset và tự động đục lỗ lại từ đầu.",
      });
      queryClient.invalidateQueries({ queryKey: ["lesson-preview", lessonId] });
    },
    onError: (error: any) =>
      toast.error("Lỗi tái tạo", {
        description: extractErrorMessage(
          error,
          "Không thể kích hoạt quy trình AI lúc này.",
        ),
      }),
  });
};

// Lưu cấu hình đục lỗ thủ công
export const useUpdateDictationTemplates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDictationTemplatesRequest;
    }) => lessonService.updateDictationTemplates(id, data),
    onSuccess: (_, variables) => {
      toast.success("Đã lưu cấu hình", {
        description: "Các vị trí đục lỗ thủ công đã được ghi nhận.",
      });
      queryClient.invalidateQueries({
        queryKey: ["lesson-preview", variables.id],
      });
    },
    onError: (error: any) => {
      toast.error("Lưu thất bại", {
        description: extractErrorMessage(
          error,
          "Lỗi khi đồng bộ cấu hình đục lỗ.",
        ),
      });
    },
  });
};

// Thay đổi nội dung Transcript
export const useUpdateTranscript = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTranscriptRequest }) =>
      lessonService.updateTranscript(id, data),
    onSuccess: (data, variables) => {
      toast.success("Đã nạp Transcript", {
        description: `Xử lý xong ${data.segmentCount} câu thoại và tự động đục lỗ lại.`,
      });
      queryClient.invalidateQueries({ queryKey: ["lesson", variables.id] });
      queryClient.invalidateQueries({
        queryKey: ["lesson-preview", variables.id],
      });
    },
    onError: (error: any) => {
      toast.error("Lỗi dữ liệu", {
        description: extractErrorMessage(
          error,
          "Định dạng Transcript không hợp lệ.",
        ),
      });
    },
  });
};

// Import bài học từ YouTube URL
export const useCreateFromYoutube = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateLessonFromYoutubeRequest) =>
      lessonService.createFromYoutube(data),
    onSuccess: (data) => {
      toast.success("Import thành công", {
        description: `Đã kéo dữ liệu từ YouTube vào hệ thống.`,
      });
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
      if (data.lessonId) router.push(`/admin/lessons/${data.lessonId}`);
    },
    onError: (error: any) => {
      toast.error("Lỗi YouTube", {
        description: extractErrorMessage(
          error,
          "Không thể bóc tách dữ liệu từ đường dẫn này.",
        ),
      });
    },
  });
};

// Xem trước thông tin video YouTube
export const useYoutubePreview = (url: string) => {
  return useQuery({
    queryKey: ["youtube-preview", url],
    queryFn: () => lessonService.getYoutubePreview(url),
    enabled: !!url && (url.includes("youtube.com") || url.includes("youtu.be")),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

// Lấy phụ đề từ YouTube
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

// Lấy bài học cho User học tập
export const useUserLessons = (params: GetUserLessonsParams) => {
  return useQuery({
    queryKey: ["user-lessons", params],
    queryFn: () => lessonService.getUserLessons(params),
    placeholderData: (previousData) => previousData,
  });
};

// Lấy chi tiết bài học cho User
export const useUserLessonDetail = (id: string) => {
  return useQuery({
    queryKey: ["user-lesson", id],
    queryFn: () => lessonService.getUserLessonById(id),
    enabled: !!id,
  });
};

// Lấy danh sách câu cho Shadowing
export const useSegments = (id: string, level: string) => {
  return useQuery({
    queryKey: ["segments", id, level],
    queryFn: () => lessonService.getSegments(id, level),
    enabled: !!id && !!level,
  });
};

// Nộp toàn bộ bài tập Dictation
export const useSubmitDictation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubmitDictationRequest }) =>
      lessonService.submitDictation(id, data),
    onSuccess: (result) => {
      // Ưu tiên isFullyCorrect trước
      if (result.isFullyCorrect) {
        toast.success("✨ Hoàn hảo tuyệt đối!", {
          description: `Điểm ${result.score?.toFixed(0)} — Tất cả ${result.totalBlanks} ô đều đúng. Bạn xuất sắc!`,
        });
      } else if (!result.isSubmissionComplete) {
        // Chưa điền đủ — cảnh báo nhẹ nhàng
        const missing =
          (result.totalBlanks ?? 0) - (result.answeredBlanks ?? 0);
        toast.warning("Chưa điền đủ bài", {
          description: `Còn ${missing} ô bị bỏ qua. Độ chính xác (phần đã điền): ${result.answeredAccuracy?.toFixed(0) ?? 0}%.`,
        });
      } else {
        const correctPercentage =
          (result.correctCount / result.totalBlanks) * 100;
        if (correctPercentage >= 80) {
          toast.success("Kết quả xuất sắc!", {
            description: `Bạn đạt ${result.score?.toFixed(0)} điểm — ${result.answeredAccuracy?.toFixed(0)}% chính xác trên phần đã điền!`,
          });
        } else if (correctPercentage >= 50) {
          toast.info("Làm tốt lắm!", {
            description: `Điểm: ${result.score?.toFixed(0)}. Cố gắng thêm chút nữa để hoàn hảo nhé.`,
          });
        } else {
          toast.warning("Cần nỗ lực hơn", {
            description: `Điểm: ${result.score?.toFixed(0)}. Hãy thử luyện tập lại để cải thiện trình độ.`,
          });
        }
      }
      queryClient.invalidateQueries({ queryKey: ["user-lesson"] });
    },
    onError: (error: any) => {
      toast.error("Lỗi nộp bài", {
        description: extractErrorMessage(
          error,
          "Hệ thống ghi nhận điểm đang gặp sự cố.",
        ),
      });
    },
  });
};

// Kiểm tra Shadowing qua text input
export const useCheckShadowingSegment = () => {
  return useMutation({
    mutationFn: ({
      id,
      segmentIndex,
      data,
    }: {
      id: string;
      segmentIndex: number;
      data: CheckShadowingSegmentRequest;
    }) => lessonService.checkSegment(id, segmentIndex, data),
    onSuccess: (result) => {
      const accuracy = result.accuracy;
      if (accuracy >= 90) {
        toast.success("Hoàn hảo!", {
          description: `Độ chính xác: ${accuracy.toFixed(0)}%. Bạn sao chép y hệt luôn!`,
        });
      } else if (accuracy >= 70) {
        toast.info("Tốt!", {
          description: `Đạt ${accuracy.toFixed(0)}%. Một vài chỗ cần chú ý hơn.`,
        });
      } else {
        toast.warning("Thử lại nhé", {
          description: `Độ chính xác: ${accuracy.toFixed(0)}%. Hãy lắng nghe kỹ hơn.`,
        });
      }
    },
    onError: (error: any) => {
      toast.error("Lỗi kiểm tra", {
        description: extractErrorMessage(
          error,
          "Không thể phân tích đoạn Shadowing này.",
        ),
      });
    },
  });
};

// Kiểm tra Dictation từng đoạn
export const useCheckDictationSegment = () => {
  return useMutation({
    mutationFn: ({
      id,
      segmentIndex,
      data,
    }: {
      id: string;
      segmentIndex: number;
      data: CheckDictationSegmentRequest;
    }) => lessonService.checkDictationSegment(id, segmentIndex, data),
    onSuccess: (result) => {
      const accuracy = result.accuracy;
      if (accuracy >= 90) {
        toast.success("Chính xác!", {
          description: `Bạn đạt ${accuracy.toFixed(0)}%. Kỹ năng nghe rất tốt!`,
        });
      } else {
        toast.warning("Chưa chuẩn xác", {
          description: `Đạt ${accuracy.toFixed(0)}%. Có một vài lỗi chính tả nhỏ.`,
        });
      }
    },
    onError: (error: any) => {
      toast.error("Lỗi phân tích", {
        description: extractErrorMessage(
          error,
          "Hệ thống không thể kiểm tra đoạn này.",
        ),
      });
    },
  });
};

// Kiểm tra phát âm qua Voice (Speech to Text)
export const useCheckVoice = (lessonId: string, segmentIndex: number) => {
  return useMutation({
    mutationFn: (data: CheckVoiceRequest) =>
      lessonService.checkVoice(lessonId, segmentIndex, data),
    onSuccess: (result) => {
      const accuracy = result.accuracy ?? 0;
      if (accuracy >= 90) {
        toast.success("Phát âm hoàn hảo", {
          description: `Độ chính xác đạt ${accuracy.toFixed(0)}%. Giọng bạn rất chuẩn!`,
        });
      } else if (accuracy >= 70) {
        toast.info("Khá ổn", {
          description: `Đạt ${accuracy.toFixed(0)}%. Chú ý vài từ bị phát âm sai nhé.`,
        });
      } else {
        toast.error("Chưa đạt yêu cầu", {
          description: `Đạt ${accuracy.toFixed(0)}%. Bạn cần luyện tập mở khẩu hình và bật hơi thêm.`,
        });
      }
    },
    onError: (error: any) => {
      toast.error("Lỗi nhận diện", {
        description: extractErrorMessage(
          error,
          "Kết nối micrô hoặc hệ thống phân tích giọng nói thất bại.",
        ),
      });
    },
  });
};

// Đồng bộ tiến độ bài học (Streak & Lesson Tracker)
export const useSyncLessonProgress = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { segmentIndex: number; isCompleted: boolean };
    }) => lessonService.syncProgress(id, data),
  });
};
