// src/services/lesson.service.ts
import axiosClient from "@/lib/axios-client";
import {
  CreateLessonRequest,
  GetLessonsParams,
  GetLessonsResponse,
  LessonDto,
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
    return response.data;
  },

  // UPDATE
  updateLesson: async (id: string, data: Partial<CreateLessonRequest>) => {
    const response = await axiosClient.put(`/admin/lessons/${id}`, data);
    return response.data;
  },

  // DELETE
  deleteLesson: async (id: string) => {
    const response = await axiosClient.delete(`/admin/lessons/${id}`);
    return response.data;
  },
};
