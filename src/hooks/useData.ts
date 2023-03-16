import { useState, useEffect } from "react";

import { API_URL } from "../config";
import { KeywordData } from "../types";

interface KeywordsResponse {
  id: number;
  keyword: string;
  search_volume: number;
  competition: string;
  overall_score: number;
}

type TrendingKeywordsResponse = number[];

export const useData = (): [KeywordData[] | null, string | null, boolean] => {
  const [data, setData] = useState<KeywordData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keywordsRequest = fetch(`${API_URL}keywords`);
        const trendingKeywordsRequest = fetch(`${API_URL}trending-keywords`);

        const [keywordsResponse, trendingKeywordsResponse] = await Promise.all([
          keywordsRequest,
          trendingKeywordsRequest,
        ]);

        if (!keywordsResponse.ok || !trendingKeywordsResponse.ok) {
          setError("Failed to fetch the data.");
          return;
        }

        const keywords: KeywordsResponse[] = await keywordsResponse.json();
        const trendingKeywords: TrendingKeywordsResponse =
          await trendingKeywordsResponse.json();

        const updatedData: KeywordData[] = [];

        keywords.forEach((keyword: KeywordsResponse) => {
          if (trendingKeywords.includes(keyword.id)) {
            updatedData.push({ ...keyword, isTrending: true });
          } else {
            updatedData.push({ ...keyword, isTrending: false });
          }
        });

        setData(updatedData);
      } catch (error) {
        setError("Failed to fetch the data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return [data, error, isLoading];
};
