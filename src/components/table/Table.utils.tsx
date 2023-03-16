import { Row } from "react-table";

import { KeywordData } from "../../types";
import { OverallScoreCell } from "./cells/OverallScoreCell";
import { SearchVolumeCell } from "./cells/SearchVolumeCell";
import { HeadingComponent } from "./HeadingComponent";

type CompetitionScore = "low" | "medium" | "high" | "very high";

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 25;

export const getCompetitionScore = (score: CompetitionScore) => {
  switch (score) {
    case "low":
      return 0;
    case "medium":
      return 1;
    case "high":
      return 2;
    case "very high":
      return 3;
  }
};

export const sortCompetitions = (
  rowA: Row<KeywordData>,
  rowB: Row<KeywordData>,
  id: string
) =>
  getCompetitionScore(rowA.values[id]) - getCompetitionScore(rowB.values[id]);

export const DYNAMIC_COLUMNS = [
  {
    Header: HeadingComponent("Search volume"),
    accessor: "search_volume",
    Cell: SearchVolumeCell,
  },
  {
    Header: HeadingComponent("Competition"),
    accessor: "competition",
    sortType: sortCompetitions,
  },
  {
    Header: HeadingComponent("Overall Score"),
    accessor: "overall_score",
    Cell: OverallScoreCell,
  },
] as const;

export const prepareColumns = (
  isMobileView: boolean,
  selectedColumn: string
) => {
  if (isMobileView)
    return DYNAMIC_COLUMNS.filter(
      (column) => column.accessor === selectedColumn
    );

  return DYNAMIC_COLUMNS;
};

export const getColumnLabel = (
  accessor: "search_volume" | "competition" | "overall_score"
): string => {
  switch (accessor) {
    case "search_volume":
      return "Search volume";
    case "competition":
      return "Competition";
  }
  return "Overall score";
};
