import { useQuery } from "@tanstack/react-query";
import {
  getAdminAnalytics,
  getAdminOverview,
  getAdminUsersAnalytics,
  getAdminLessonsAnalytics,
  getAdminPaymentsAnalytics,
  getAdminLessonAccessAnalytics,
} from "@/services/analytics.service";

// 1. Hook cho Full Dashboard (Nếu sau này cần dùng lại cục data to)
export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: ["admin", "analytics", "full-dashboard"],
    queryFn: getAdminAnalytics,
    refetchInterval: 60000, // Tự động refetch sau 1 phút
  });
};

// 2. Hook cho trang Tổng quan (Overview)
export const useAdminOverview = () => {
  return useQuery({
    queryKey: ["admin", "analytics", "overview"],
    queryFn: getAdminOverview,
    refetchInterval: 60000,
  });
};

// 3. Hook cho tab Người dùng (Users)
export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin", "analytics", "users"],
    queryFn: getAdminUsersAnalytics,
    refetchInterval: 60000,
  });
};

// 4. Hook cho tab Bài học (Lessons)
export const useAdminLessons = () => {
  return useQuery({
    queryKey: ["admin", "analytics", "lessons"],
    queryFn: getAdminLessonsAnalytics,
    refetchInterval: 60000,
  });
};

// 5. Hook cho tab Tài chính (Payments)
export const useAdminPayments = () => {
  return useQuery({
    queryKey: ["admin", "analytics", "payments"],
    queryFn: getAdminPaymentsAnalytics,
    refetchInterval: 60000,
  });
};

// 6. Hook cho tab chi tiết Lượt truy cập bài học (Lesson Access) - Dự phòng nếu bạn làm sâu hơn
export const useAdminLessonAccess = () => {
  return useQuery({
    queryKey: ["admin", "analytics", "lesson-access"],
    queryFn: getAdminLessonAccessAnalytics,
    refetchInterval: 60000,
  });
};
