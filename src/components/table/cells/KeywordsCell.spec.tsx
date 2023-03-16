import { render } from "@testing-library/react";
import { KeywordsCell } from "./KeywordsCell";

const TestComponent = KeywordsCell as any;

const mockTableRow: any = {
  original: {
    keyword: "test keyword 1",
    isTrending: true,
    search_volume: 1,
    competition: "1",
    overall_score: 1,
    id: 1,
  },
};

describe("KeywordsCell", () => {
  it("should render the keyword text", () => {
    const { getByText } = render(<TestComponent row={mockTableRow} />);
    const keywordText = getByText(mockTableRow.original.keyword);
    expect(keywordText).toBeInTheDocument();
  });

  it("should render the FireIcon when isTrending is true", () => {
    const { getByTestId } = render(<TestComponent row={mockTableRow} />);
    const fireIcon = getByTestId("fire-icon");
    expect(fireIcon).toBeInTheDocument();
  });

  it("should not render the FireIcon when isTrending is false", () => {
    const mockTableRowNotTrending: any = {
      original: {
        keyword: "test keyword 2",
        isTrending: false,
        search_volume: 22,
        competition: "22",
        overall_score: 22,
        id: 2,
      },
    };
    const { queryByTestId } = render(
      <TestComponent row={mockTableRowNotTrending} />
    );
    const fireIcon = queryByTestId("fire-icon");
    expect(fireIcon).toBeNull();
  });
});
