import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vocabularyService } from "@/services/vocabulary.service";
import {
  CreateVocabularyPayload,
  GetVocabularyParams,
} from "@/types/vocabulary.type";
import { toast } from "sonner";

// 1. Lấy toàn bộ từ vựng (Ôn vội / Custom Study)
export const useVocabulary = (params: GetVocabularyParams, enabled = true) => {
  return useQuery({
    queryKey: ["my-vocabulary", params],
    queryFn: () => vocabularyService.getMyVocabulary(params),
    enabled: enabled,
  });
};

// 2. Lấy từ vựng tới hạn (Học hàng ngày)
export const useDueVocabulary = (
  params: GetVocabularyParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["due-vocabulary", params],
    queryFn: () => vocabularyService.getDueVocabulary(params),
    enabled: enabled,
  });
};

// 3. Lấy Overview (Thống kê Dashboard)
export const useVocabularyOverview = () => {
  return useQuery({
    queryKey: ["vocabulary-overview"],
    queryFn: () => vocabularyService.getOverview(),
  });
};

// 4. Thêm từ vựng mới
export const useAddVocabulary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVocabularyPayload) =>
      vocabularyService.addVocabulary(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["due-vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["vocabulary-overview"] });
    },
  });
};

// 5. Review từ vựng (Chấm điểm Nhớ/Quên)
export const useReviewVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isCorrect }: { id: string; isCorrect: boolean }) =>
      vocabularyService.reviewWord(id, isCorrect),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["due-vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["vocabulary-overview"] });
    },
  });
};

// 6. Xóa từ vựng
export const useDeleteVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => vocabularyService.deleteVocabulary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["due-vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["vocabulary-overview"] });
      toast.success("Đã xóa từ vựng");
    },
  });
};

// 7. Suggestions (Giữ nguyên)
export const useVocabularySuggestions = (lessonId: string, limit?: number) => {
  return useQuery({
    queryKey: ["vocabulary-suggestions", lessonId, limit],
    queryFn: () => vocabularyService.getSuggestions(lessonId, limit),
    enabled: !!lessonId,
  });
};
