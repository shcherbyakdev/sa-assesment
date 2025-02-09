export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences?: UserPreferences;
}

export type UserRole = "basic" | "premium" | "admin";

export interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
  emailFrequency: "daily" | "weekly" | "monthly";
}

// Rating Types
export interface RatingSummary {
  overall: number;
  totalRatings: number;
  averageRating: number;
  distribution: RatingDistribution;
  lastUpdated: string;
}

export interface RatingDistribution {
  "5": number;
  "4": number;
  "3": number;
  "2": number;
  "1": number;
}

// Factor Grade Types
export type FactorGradePeriod = "now" | "3m" | "6m";

export type GradeValue =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F";

export interface FactorGrade {
  factor: string;
  grade: GradeValue;
  score: number;
  trend: TrendDirection;
  previousScore?: number;
  description?: string;
  lastUpdated: string;
}

export type TrendDirection = "up" | "down" | "stable";

// Quant Ranking Types
export interface QuantRanking {
  rank: number;
  percentile: number;
  sector: string;
  sectorRank: number;
  totalCompanies: number;
  changeFromLastMonth: number;
  metrics: RankingMetrics;
  lastUpdated: string;
}

export interface RankingMetrics {
  valueScore: number;
  growthScore: number;
  profitabilityScore: number;
  momentumScore: number;
}

// API Error Types
export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

// Common API Response Type
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  timestamp: string;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// API Request Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

// Utility Types
export type Period = {
  startDate: string;
  endDate: string;
};

export type DateRange = "day" | "week" | "month" | "quarter" | "year";
