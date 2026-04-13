import axiosClient from "@/lib/axios-client";
import Cookies from "js-cookie";
import { CreateVocabularyPayload, GetVocabularyParams, PagedVocabularyResult, VocabularyItemDto, VocabularyOverviewResponse, VocabularySuggestionsResponse } from "@/types/vocabulary.type";

const getAuthHeaders = () => {
  const token = Cookies.get("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const vocabularyService = {
  getMyVocabulary: async (
    params: GetVocabularyParams
  ): Promise<PagedVocabularyResult> => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
    );

    const response = await axiosClient.get("/me/vocabulary", {
      params: cleanParams,
      headers: getAuthHeaders(),
    });

    return response as unknown as PagedVocabularyResult;
  },

  addVocabulary: async (payload: CreateVocabularyPayload) => {
    const response = await axiosClient.post("/me/vocabulary", payload, {
      headers: getAuthHeaders(),
    });
    return response;
  },

  getOverview: async (): Promise<VocabularyOverviewResponse> => {
    const response = await axiosClient.get("/me/vocabulary/overview", {
      headers: getAuthHeaders(),
    });
    return response as unknown as VocabularyOverviewResponse;
  },

  // Lấy gợi ý từ vựng từ bài học
  getSuggestions: async (lessonId: string, limit: number = 20): Promise<VocabularySuggestionsResponse> => {
    const response = await axiosClient.get("/me/vocabulary/suggestions", {
      params: { lessonId, limit },
      headers: getAuthHeaders(),
    });
    return response as unknown as VocabularySuggestionsResponse;
  },

  // Ghi nhận một lần ôn tập
  reviewWord: async (id: string, isCorrect: boolean): Promise<VocabularyItemDto> => {
    const response = await axiosClient.post(`/me/vocabulary/${id}/review`, { isCorrect }, {
      headers: getAuthHeaders(),
    });
    return response as unknown as VocabularyItemDto;
  },

  // Xóa từ vựng
  deleteVocabulary: async (id: string): Promise<void> => {
    await axiosClient.delete(`/me/vocabulary/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  getDueVocabulary: async (params: GetVocabularyParams): Promise<PagedVocabularyResult> => {
    const response = await axiosClient.get("/me/vocabulary/due", {
      params,
      headers: getAuthHeaders(),
    });
    return response as unknown as PagedVocabularyResult;
  },
  
};