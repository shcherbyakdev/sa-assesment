import {
  Factor,
  FactorGrades,
  FACTORS,
  NowGradesResponse,
  ThreeMonthGradesResponse,
  SixMonthGradesResponse,
  RatingSummaryResponse,
  RatingSummaryData,
} from "../types/api";

export function isFactor(value: string): value is Factor {
  return FACTORS.includes(value);
}

export function transformNowGrades(response: NowGradesResponse): FactorGrades {
  const result: FactorGrades = {};

  Object.entries(response).forEach(([key, { current }]) => {
    if (isFactor(key)) {
      result[key] = current;
    }
  });

  return result;
}

export function transformThreeMonthGrades(
  response: ThreeMonthGradesResponse
): FactorGrades {
  const result: FactorGrades = {};

  Object.entries(response).forEach(([key, grade]) => {
    if (isFactor(key)) {
      result[key] = grade;
    }
  });

  return result;
}

export function transformSixMonthGrades(
  response: SixMonthGradesResponse
): FactorGrades {
  const result: FactorGrades = {};

  response.data.forEach(([factor, grade]) => {
    if (isFactor(factor)) {
      result[factor] = grade;
    }
  });

  return result;
}

export const transformRatingSummary = (
  response: RatingSummaryResponse
): RatingSummaryData[] => {
  const entries = Object.entries(response);
  const result = new Array(entries.length);

  for (let i = 0; i < entries.length; i++) {
    const [analyst, value] = entries[i];
    result[i] = {
      analyst: analyst,
      rating: value.rating,
      score: value.score.toFixed(2).toString(),
    };
  }

  return result;
};
