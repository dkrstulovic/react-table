export interface KeywordData {
  id: number;
  keyword: string;
  search_volume: number;
  competition: string;
  overall_score: number;
  isTrending: boolean;
}

export type ScreenSize = "small" | "large";

export interface LocalStorageConfig {
  pageSize?: number;
  pageIndex?: number;
  sortBy?: string;
  desc?: boolean;
  selectedColumn?: string;
}
