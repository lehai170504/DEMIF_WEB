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
  GetUserLessonsParams,
  GetUserLessonsResponse,
  GetDictationExerciseResponse,
  SubmitDictationRequest,
  SubmitDictationResponse,
  GetSegmentsResponse,
  UpdateLessonRequest,
  UpdateDictationTemplatesRequest,
  GetYoutubeTranscriptParams,
  YoutubeTranscriptResponse,
  CheckVoiceRequest,
  CheckVoiceResponse,
  CheckShadowingSegmentRequest,
  CheckShadowingSegmentResponse,
  CheckDictationSegmentRequest,
  CheckDictationSegmentResponse,
  UploadAudioResponse,
} from "@/types/lesson.type";

export const lessonService = {
  // ============ ADMIN ENDPOINTS ============
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
    const response = await axiosClient.post(
      "/admin/lessons/quick-create",
      data,
    );
    return (response as any).data ?? response;
  },

  // UPDATE
  updateLesson: async (id: string, data: UpdateLessonRequest) => {
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

  updateDictationTemplates: async (
    id: string,
    data: UpdateDictationTemplatesRequest,
  ): Promise<{ message: string }> => {
    const response = await axiosClient.put(
      `/admin/lessons/${id}/dictation-templates`,
      data,
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

  getYoutubeTranscript: async (
    params: GetYoutubeTranscriptParams,
  ): Promise<YoutubeTranscriptResponse> => {
    const response = await axiosClient.get(
      "/admin/lessons/youtube/transcripts",
      { params },
    );
    return (response as any).data ?? response;
  },

  uploadAudio: async (file: File): Promise<UploadAudioResponse> => {
  const formData = new FormData();
  formData.append("AudioFile", file);
  formData.append("FolderName", "demif-lessons/audio");

  const response = await axiosClient.post(
    "/admin/lessons/audio/upload", 
    formData, 
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response as unknown as UploadAudioResponse;
},

  // ============ USER ENDPOINTS ============

  // GET /api/lessons - Lấy danh sách lessons (public + premium)
  getUserLessons: async (
    params: GetUserLessonsParams,
  ): Promise<GetUserLessonsResponse> => {
    const response = await axiosClient.get("/lessons", { params });
    return (response as any).data ?? response;
  },

  // GET /api/lessons/{id} - Lấy chi tiết lesson
  getUserLessonById: async (id: string): Promise<LessonDto> => {
    const response = await axiosClient.get(`/lessons/${id}`);
    return (response as any).data ?? response;
  },

  // GET /api/lessons/{id}/dictation - Lấy dictation exercise (blanks KHÔNG có đáp án)
  getDictationExercise: async (
    id: string,
    level: string = "Beginner",
  ): Promise<GetDictationExerciseResponse> => {
    const response = await axiosClient.get(`/lessons/${id}/dictation`, {
      params: { level },
    });
    return (response as any).data ?? response;
  },

  // POST /lessons/{id}/dictation/submit - Submit dictation answers
  submitDictation: async (
    id: string,
    data: SubmitDictationRequest,
  ): Promise<SubmitDictationResponse> => {
    const response = await axiosClient.post(
      `/lessons/${id}/dictation/submit`,
      data,
    );
    return (response as any).data ?? response;
  },

  // GET /lessons/{id}/segments - Lấy segments cho shadowing
  getSegments: async (
    id: string,
    level: string = "Intermediate",
  ): Promise<GetSegmentsResponse> => {
    const response = await axiosClient.get(`/lessons/${id}/segments`, {
      params: { level },
    });
    return (response as any).data ?? response;
  },

  // POST /lessons/{id}/segments/{segmentIndex}/shadowing - Check segment (text-fallback via Web Speech API)
  checkSegment: async (
    id: string,
    segmentIndex: number,
    data: CheckShadowingSegmentRequest,
  ): Promise<CheckShadowingSegmentResponse> => {
    const response = await axiosClient.post(
      `/lessons/${id}/segments/${segmentIndex}/shadowing`,
      data,
    );
    return (response as any).data ?? response;
  },

  // POST /lessons/{id}/segments/{segmentIndex}/check-voice
  checkVoice: async (
    id: string,
    segmentIndex: number,
    data: CheckVoiceRequest,
  ): Promise<CheckVoiceResponse> => {
    const response = await axiosClient.post(
      `/lessons/${id}/segments/${segmentIndex}/check-voice`,
      data,
    );
    return (response as any).data ?? response;
  },

  // POST /lessons/{id}/segments/{segmentIndex}/check - Dành riêng cho Dictation
  checkDictationSegment: async (
    id: string,
    segmentIndex: number,
    data: CheckDictationSegmentRequest,
  ): Promise<CheckDictationSegmentResponse> => {
    const response = await axiosClient.post(
      `/lessons/${id}/segments/${segmentIndex}/check`,
      data,
    );
    return (response as any).data ?? response;
  },

  syncProgress: async (
    id: string,
    data: { segmentIndex: number; isCompleted: boolean },
  ): Promise<any> => {
    const response = await axiosClient.post(`/lessons/${id}/sync-progress`, data);
    return (response as any).data ?? response;
  },
};
