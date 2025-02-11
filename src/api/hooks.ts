import { useQuery, useQueries, UseQueryResult } from "@tanstack/react-query";
import { fetchClient } from "./fetchClient";
import {
  User,
  RatingSummaryResponse,
  RatingSummaryData,
  QuantRanking,
  FactorGrades,
  Period,
  PERIODS,
  PeriodResponse,
  PeriodTransformers,
  QueryConfig,
  FactorGradesQuery,
} from "../types/api";
import { API_CONFIG } from "../config/apiConfig";
import {
  transformNowGrades,
  transformThreeMonthGrades,
  transformSixMonthGrades,
  transformRatingSummary,
} from "./transformFunctions";

export const queryKeys = {
  user: ["user"] as const,
  ratingSummary: ["rating-summary"] as const,
  quantRanking: ["quant-ranking"] as const,
  factorGrades: (period: Period) => ["factor-grades", period] as const,
} as const;

export function useUser(config?: QueryConfig<User>) {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => fetchClient<User>(API_CONFIG.ENDPOINTS.USER),
    ...config,
  });
}

export function useRatingSummary(
  config?: QueryConfig<RatingSummaryResponse, RatingSummaryData[]>
): UseQueryResult<RatingSummaryData[], Error> {
  return useQuery<RatingSummaryResponse, Error, RatingSummaryData[]>({
    queryKey: queryKeys.ratingSummary,
    queryFn: () =>
      fetchClient<RatingSummaryResponse>(API_CONFIG.ENDPOINTS.RATINGS_SUMMARY),
    select: transformRatingSummary,
    ...config,
  });
}

export function useQuantRanking(config?: QueryConfig<QuantRanking>) {
  return useQuery({
    queryKey: queryKeys.quantRanking,
    queryFn: () =>
      fetchClient<QuantRanking>(API_CONFIG.ENDPOINTS.QUANT_RANKING),
    ...config,
  });
}

const periodTransformers: PeriodTransformers = {
  now: transformNowGrades,
  "3m": transformThreeMonthGrades,
  "6m": transformSixMonthGrades,
};

export function useFactorGrades(
  config?: Omit<QueryConfig<PeriodResponse[Period], FactorGrades>, "select">
) {
  return useQueries({
    queries: PERIODS.map(
      (period) =>
        ({
          queryKey: queryKeys.factorGrades(period),
          queryFn: () =>
            fetchClient<PeriodResponse[typeof period]>(
              `${API_CONFIG.ENDPOINTS.FACTOR_GRADES}/${period}`
            ),
          select: periodTransformers[period],
          staleTime: 5 * 60 * 1000,
          ...config,
        } as FactorGradesQuery<typeof period>)
    ),
  });
}
