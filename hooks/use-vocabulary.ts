import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vocabularyService } from "@/services/vocabulary.service";
import {
  CreateVocabularyPayload,
  GetVocabularyParams,
} from "@/types/vocabulary.type";

export const useVocabulary = (params: GetVocabularyParams) => {
  return useQuery({
    queryKey: ["my-vocabulary", params],
    queryFn: () => vocabularyService.getMyVocabulary(params),
  });
};

export const useAddVocabulary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVocabularyPayload) =>
      vocabularyService.addVocabulary(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-vocabulary"] });
    },
  });
};

// Hook lấy Overview
export const useVocabularyOverview = () => {
  return useQuery({
    queryKey: ["vocabulary-overview"],
    queryFn: () => vocabularyService.getOverview(),
  });
};

// Hook lấy Suggestions theo Lesson
export const useVocabularySuggestions = (lessonId: string, limit?: number) => {
  return useQuery({
    queryKey: ["vocabulary-suggestions", lessonId, limit],
    queryFn: () => vocabularyService.getSuggestions(lessonId, limit),
    enabled: !!lessonId,
  });
};

// Hook Review từ vựng
export const useReviewVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isCorrect }: { id: string; isCorrect: boolean }) =>
      vocabularyService.reviewWord(id, isCorrect),
    onSuccess: () => {
      // Refresh cả list và overview sau khi ôn tập
      queryClient.invalidateQueries({ queryKey: ["my-vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["vocabulary-overview"] });
    },
  });
};

// Hook Xóa từ vựng
export const useDeleteVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => vocabularyService.deleteVocabulary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["vocabulary-overview"] });
    },
  });
};

export const useDueVocabulary = (params: GetVocabularyParams) => {
  return useQuery({
    queryKey: ["due-vocabulary", params],
    queryFn: () => vocabularyService.getDueVocabulary(params),
  });
};
