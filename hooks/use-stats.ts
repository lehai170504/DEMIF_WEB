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
