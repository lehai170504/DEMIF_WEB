import axiosClient from "@/lib/axios-client";
import {
  AdminAnalyticsResponse,
  AdminOverviewResponse,
  AdminUsersResponse,
  AdminLessonsResponse,
  AdminPaymentsResponse,
} from "@/types/analytics.type";

// 1. API Full Dashboard (Cái cũ của bạn, dùng nếu cần load 1 cục to)
export const getAdminAnalytics = async (): Promise<AdminAnalyticsResponse> => {
  const response = await axiosClient.get("/admin/analytics");
  return response as unknown as AdminAnalyticsResponse;
};

// 2. API Overview (Dành cho trang chủ Dashboard - Load siêu tốc)
export const getAdminOverview = async (): Promise<AdminOverviewResponse> => {
  const response = await axiosClient.get("/admin/analytics/overview");
  return response as unknown as AdminOverviewResponse;
};

// 3. API Users (Dành cho Tab Người dùng)
export const getAdminUsersAnalytics = async (): Promise<any> => {
  const response = await axiosClient.get("/admin/analytics/users");
  return response as unknown as AdminUsersResponse;
};

// 4. API Lessons (Dành cho Tab Bài học)
export const getAdminLessonsAnalytics = async (): Promise<any> => {
  const response = await axiosClient.get("/admin/analytics/lessons");
  return response as unknown as AdminLessonsResponse;
};

// 5. API Payments (Dành cho Tab Tài chính)
export const getAdminPaymentsAnalytics = async (): Promise<any> => {
  const response = await axiosClient.get("/admin/analytics/payments");
  return response as unknown as AdminPaymentsResponse;
};

// 6. API Lessons Access (Dành cho tracking lượt truy cập bài học nếu bạn làm trang chi tiết hơn)
export const getAdminLessonAccessAnalytics = async (): Promise<any> => {
  const response = await axiosClient.get("/admin/analytics/lessons/access");
  return response as unknown as any;
};
