export interface LessonStatDto {
  lessonId: string;
  title: string;
  avgScore: number;
  completionsCount: number;
}

export interface RevenueStatsDto {
  totalRevenue: number;
  premiumRevenue: number;
  proRevenue: number;
  otherRevenue: number;
}

export interface AdminAnalyticsResponse {
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  totalUsers: number;
  difficultLessons: LessonStatDto[];
  popularLessons: LessonStatDto[];
  revenueStats: RevenueStatsDto;
}