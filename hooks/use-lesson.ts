// src/hooks/use-lesson.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonService } from "@/services/lesson.service";
import { CreateLessonRequest, GetLessonsParams } from "@/types/lesson.type";
import { toast } from "sonner";

// Hook Fetch Danh sách
export const useLessons = (params: GetLessonsParams) => {
  return useQuery({
    queryKey: ["admin-lessons", params],
    queryFn: () => lessonService.getLessons(params),
    placeholderData: (previousData) => previousData,
  });
};

// Hook CRUD (Create, Update, Delete)
export const useLessonActions = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateLessonRequest) => lessonService.createLesson(data),
    onSuccess: () => {
      toast.success("Tạo bài học mới thành công!");
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
    },
    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Lỗi tạo bài học"),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateLessonRequest>;
    }) => lessonService.updateLesson(id, data),
    onSuccess: () => {
      toast.success("Cập nhật thành công!");
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
    },
    onError: (error: any) => toast.error("Lỗi cập nhật bài học"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => lessonService.deleteLesson(id),
    onSuccess: () => {
      toast.success("Đã xóa bài học.");
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
    },
    onError: (error: any) => toast.error("Lỗi xóa bài học"),
  });

  return {
    createLesson: createMutation.mutate,
    updateLesson: updateMutation.mutate,
    deleteLesson: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
