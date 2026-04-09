import { useQuery } from "@tanstack/react-query";
import { statsService } from "@/services/stats.service";
import Cookies from "js-cookie";

export const useStatsSummary = () => {
  const hasToken = typeof window !== "undefined" ? !!Cookies.get("accessToken") : false;

  return useQuery({
    queryKey: ["stats-summary"],
    queryFn: () => statsService.getSummary(),
    enabled: hasToken,
  });
};

export const useStatsHeatmap = (months: number = 6) => {
  const hasToken = typeof window !== "undefined" ? !!Cookies.get("accessToken") : false;

  return useQuery({
    queryKey: ["stats-heatmap", months],
    queryFn: () => statsService.getHeatmap(months),
    enabled: hasToken,
  });
};

export const useDailyPractice = (days: number = 30, type?: string) => {
  const hasToken = typeof window !== "undefined" ? !!Cookies.get("accessToken") : false;

  return useQuery({
    queryKey: ["stats-daily-practice", days, type],
    queryFn: () => statsService.getDailyPractice(days, type),
    enabled: hasToken,
  });
};

export const useProgress = () => {
  const hasToken = typeof window !== "undefined" ? !!Cookies.get("accessToken") : false;

  return useQuery({
    queryKey: ["me-progress"],
    queryFn: () => statsService.getProgress(),
    enabled: hasToken,
  });
};

export const useStreak = () => {
  const hasToken = typeof window !== "undefined" ? !!Cookies.get("accessToken") : false;

  return useQuery({
    queryKey: ["me-streak"],
    queryFn: () => statsService.getStreak(),
    enabled: hasToken,
  });
};

export const useSkillsAnalytics = () => {
  const hasToken = typeof window !== "undefined" ? !!Cookies.get("accessToken") : false;

  return useQuery({
    queryKey: ["me-analytics-skills"],
    queryFn: () => statsService.getSkillsAnalytics(),
    enabled: hasToken,
  });
};
