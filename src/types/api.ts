export interface User {
  premium: boolean;
}

// Rating Summary Types
interface RatingItem {
  rating: string;
  score: number;
}

interface RankingItem {
  rank: number;
  total: number;
}

export type RatingSummary = Record<string, RatingItem>;

// Quant Ranking Types
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
