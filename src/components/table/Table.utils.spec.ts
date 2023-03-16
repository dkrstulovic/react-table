import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  getCompetitionScore,
  prepareColumns,
  sortCompetitions,
} from "./Table.utils";

describe("getCompetitionScore", () => {
  it("returns correct score for 'low'", () => {
    expect(getCompetitionScore("low")).toBe(0);
  });

  it("returns correct score for 'medium'", () => {
    expect(getCompetitionScore("medium")).toBe(1);
  });

  it("returns correct score for 'high'", () => {
    expect(getCompetitionScore("high")).toBe(2);
  });

  it("returns correct score for 'very high'", () => {
    expect(getCompetitionScore("very high")).toBe(3);
  });
});

describe("sortCompetitions", () => {
  it("sorts rows correctly by competition score", () => {
    const rowA: any = {
      values: {
        competition: "low",
      },
    };

    const rowB: any = {
      values: {
        competition: "medium",
      },
    };

    expect(sortCompetitions(rowA, rowB, "competition")).toBe(-1);
  });
});

describe("prepareColumns", () => {
  it("returns all columns if not in mobile view", () => {
    const columns = prepareColumns(false, "search_volume");

    expect(columns).toEqual([
      {
        Header: expect.any(Function),
        accessor: "search_volume",
        Cell: expect.any(Function),
      },
      {
        Header: expect.any(Function),
        accessor: "competition",
        sortType: expect.any(Function),
      },
      {
        Header: expect.any(Function),
        accessor: "overall_score",
        Cell: expect.any(Function),
      },
    ]);
  });

  it("returns only selected column if in mobile view", () => {
    const columns = prepareColumns(true, "search_volume");

    expect(columns).toEqual([
      {
        Header: expect.any(Function),
        accessor: "search_volume",
        Cell: expect.any(Function),
      },
    ]);
  });
});

describe("constants", () => {
  it("has correct default page index", () => {
    expect(DEFAULT_PAGE_INDEX).toBe(1);
  });

  it("has correct default page size", () => {
    expect(DEFAULT_PAGE_SIZE).toBe(25);
  });
});
