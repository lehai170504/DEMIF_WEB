// src/services/lesson.service.ts
import axiosClient from "@/lib/axios-client";
import {
  CreateLessonFromYoutubeRequest,
  CreateLessonFromYoutubeResponse,
  CreateLessonRequest,
  DictationPreviewResponse,
  GetLessonsParams,
  GetLessonsResponse,
  LessonDto,
  UpdateLessonStatusResponse,
  UpdateTranscriptRequest,
  UpdateTranscriptResponse,
  YoutubePreviewResponse,
} from "@/types/lesson.type";

export const lessonService = {
  // GET List
  getLessons: async (params: GetLessonsParams): Promise<GetLessonsResponse> => {
    const response = await axiosClient.get("/admin/lessons", { params });
    return (response as any).data ?? response;
  },

  // GET Detail
  getLessonById: async (id: string): Promise<LessonDto> => {
    const response = await axiosClient.get(`/admin/lessons/${id}`);
    return (response as any).data ?? response;
  },

  // CREATE
  createLesson: async (data: CreateLessonRequest) => {
    const response = await axiosClient.post("/admin/lessons", data);
    return (response as any).data ?? response;
  },

  // UPDATE
  updateLesson: async (id: string, data: Partial<CreateLessonRequest>) => {
    const response = await axiosClient.put(`/admin/lessons/${id}`, data);
    return (response as any).data ?? response;
  },

  // DELETE
  deleteLesson: async (id: string) => {
    const response = await axiosClient.delete(`/admin/lessons/${id}`);
    return (response as any).data ?? response;
  },

  // GET PREVIEW
  getDictationPreview: async (
    id: string,
  ): Promise<DictationPreviewResponse> => {
    const response = await axiosClient.get(
      `/admin/lessons/${id}/dictation-preview`,
    );
    return (response as any).data ?? response;
  },

  // REGENERATE DICTATION TEMPLATES
  regenerateTemplates: async (id: string): Promise<{ message: string }> => {
    const response = await axiosClient.post(
      `/admin/lessons/${id}/regenerate-templates`,
    );
    return (response as any).data ?? response;
  },

  // UPDATE STATUS
  updateStatus: async (
    id: string,
    status: string,
  ): Promise<UpdateLessonStatusResponse> => {
    const response = await axiosClient.patch(`/admin/lessons/${id}/status`, {
      status,
    });
    return (response as any).data ?? response;
  },

  // UPDATE TRANSCRIPT
  updateTranscript: async (
    id: string,
    data: UpdateTranscriptRequest,
  ): Promise<UpdateTranscriptResponse> => {
    const response = await axiosClient.patch(
      `/admin/lessons/${id}/transcript`,
      data,
    );
    return (response as any).data ?? response;
  },

  // CREATE FROM YOUTUBE
  createFromYoutube: async (
    data: CreateLessonFromYoutubeRequest,
  ): Promise<CreateLessonFromYoutubeResponse> => {
    const response = await axiosClient.post(
      "/admin/lessons/from-youtube",
      data,
    );
    return (response as any).data ?? response;
  },

  // GET YOUTUBE PREVIEW
  getYoutubePreview: async (url: string): Promise<YoutubePreviewResponse> => {
    const response = await axiosClient.get("/admin/lessons/youtube/preview", {
      params: { url },
    });
    return (response as any).data ?? response;
  },
};
