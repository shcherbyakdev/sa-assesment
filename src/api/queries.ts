import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "./fetchClient";
import { User, RatingSummary, QuantRanking } from "../types/api";
import { API_CONFIG } from "../config/apiConfig";

export const queryKeys = {
  user: ["user"] as const,
  ratingSummary: ["rating-summary"] as const,
  //   factorGrades: (period: FactorGradePeriod) =>
  //     ["factor-grades", period] as const,
  quantRanking: ["quant-ranking"] as const,
} as const;

type QueryConfig<T> = Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">;

export function useUser(config?: QueryConfig<User>) {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => fetchClient<User>(API_CONFIG.ENDPOINTS.USER),
    ...config,
  });
}

export function useRatingSummary(config?: QueryConfig<RatingSummary>) {
  return useQuery({
    queryKey: queryKeys.ratingSummary,
    queryFn: () =>
      fetchClient<RatingSummary>(API_CONFIG.ENDPOINTS.RATINGS_SUMMARY),
    ...config,
  });
}

// export function useFactorGrades(
//   period: FactorGradePeriod,
//   config?: QueryConfig<FactorGrade[]>
// ) {
//   return useQuery({
//     queryKey: queryKeys.factorGrades(period),
//     queryFn: () =>
//       fetchClient<FactorGrade[]>(
//         `${API_CONFIG.ENDPOINTS.FACTOR_GRADES}/${period}`
//       ),
//     ...config,
//   });
// }

export function useQuantRanking(config?: QueryConfig<QuantRanking>) {
  return useQuery({
    queryKey: queryKeys.quantRanking,
    queryFn: () =>
      fetchClient<QuantRanking>(API_CONFIG.ENDPOINTS.QUANT_RANKING),
    ...config,
  });
}
