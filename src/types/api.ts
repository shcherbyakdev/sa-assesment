import { UseQueryOptions } from "@tanstack/react-query";

export interface User {
  premium: boolean;
}

interface RatingItem {
  rating: string;
  score: number;
}

interface RankingItem {
  rank: number;
  total: number;
}

export type RatingSummaryResponse = Record<string, RatingItem>;

interface CompanyRankings {
  overall: RankingItem;
  sector: RankingItem;
  industry_specific: RankingItem;
}

export interface QuantRanking {
  sector: string;
  industry: string;
  rankings: CompanyRankings;
}

export const FACTORS = [
  "Valuation",
  "Growth",
  "Profitability",
  "Momentum",
  "Revisions",
];

export type Factor = (typeof FACTORS)[number];

export type Grade =
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

export type FactorGrades = {
  [K in Factor]: Grade;
};

export const PERIODS = ["now", "3m", "6m"] as const;
export type Period = (typeof PERIODS)[number];

export interface NowGradesResponse {
  [key: string]: {
    current: Grade;
  };
}

export interface ThreeMonthGradesResponse {
  [key: string]: Grade;
}

export interface SixMonthGradesResponse {
  data: Array<[string, Grade]>;
}

export type PeriodResponse = {
  now: NowGradesResponse;
  "3m": ThreeMonthGradesResponse;
  "6m": SixMonthGradesResponse;
};

export type QueryConfig<TData, TOutput = TData> = Omit<
  UseQueryOptions<TData, Error, TOutput>,
  "queryKey" | "queryFn"
>;

export type PeriodTransformers = {
  [P in Period]: (response: PeriodResponse[P]) => FactorGrades;
};

export type FactorGradesQuery<P extends Period> = {
  queryKey: readonly ["factor-grades", P];
  queryFn: () => Promise<PeriodResponse[P]>;
  select: (data: PeriodResponse[P]) => FactorGrades;
  staleTime?: number;
} & QueryConfig<PeriodResponse[P], FactorGrades>;

export interface RatingSummaryData {
  analyst: string;
  rating: string;
  score: string;
}
