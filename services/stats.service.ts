import axiosClient from "@/lib/axios-client";
import {
  DailyPracticeResponse,
  HeatmapResponse,
  StatsSummaryResponse,
  ProgressResponse,
  StreakResponse,
  SkillAnalyticsResponse,
} from "@/types/stats.type";

export const statsService = {
  getSummary: async (): Promise<StatsSummaryResponse> => {
    const response = await axiosClient.get("/me/stats/summary");
    return response as unknown as StatsSummaryResponse;
  },

  getHeatmap: async (months: number = 6): Promise<HeatmapResponse> => {
    const response = await axiosClient.get("/me/stats/heatmap", {
      params: { months },
    });
    return response as unknown as HeatmapResponse;
  },

  getDailyPractice: async (
    days: number = 30,
    type?: string
  ): Promise<DailyPracticeResponse> => {
    const response = await axiosClient.get("/me/stats/daily-practice", {
      params: { days, type },
    });
    return response as unknown as DailyPracticeResponse;
  },

  getProgress: async (): Promise<ProgressResponse> => {
    const response = await axiosClient.get("/me/progress");
    return response as unknown as ProgressResponse;
  },

  getStreak: async (): Promise<StreakResponse> => {
    const response = await axiosClient.get("/me/streak");
    return response as unknown as StreakResponse;
  },

  getSkillsAnalytics: async (): Promise<SkillAnalyticsResponse> => {
    const response = await axiosClient.get("/me/analytics/skills");
    return response as unknown as SkillAnalyticsResponse;
  },
};
