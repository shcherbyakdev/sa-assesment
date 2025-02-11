import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { RatingsSummaryCard } from "./index";
import { useRatingSummary } from "../../api/hooks";
import { queryStates } from "../../test/helpers";
import type { RatingSummaryData } from "../../types/api";

vi.mock("../../api/hooks", () => ({
  useRatingSummary: vi.fn(),
}));

describe("RatingsSummaryCard", () => {
  const mockData: RatingSummaryData[] = [
    {
      analyst: "Morgan Stanley",
      rating: "BUY",
      score: "75.50",
    },
    {
      analyst: "Goldman Sachs",
      rating: "HOLD",
      score: "50.00",
    },
    {
      analyst: "JP Morgan",
      rating: "SELL",
      score: "25.75",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    vi.mocked(useRatingSummary).mockReturnValue(
      queryStates.loading<RatingSummaryData[]>()
    );

    const { container } = render(<RatingsSummaryCard />);

    // Check header is present
    expect(screen.getByText("Ratings Summary")).toBeInTheDocument();
    const placeholders = container.getElementsByClassName("animate-pulse")[0];
    expect(placeholders).toBeInTheDocument();
  });

  it("renders data correctly when loaded", () => {
    vi.mocked(useRatingSummary).mockReturnValue(queryStates.success(mockData));

    render(<RatingsSummaryCard />);

    // Check for each analyst
    mockData.forEach((item) => {
      const row = screen.getByText(item.analyst).closest("tr");
      expect(row).toBeInTheDocument();

      // Check that rating and score are in the same row
      expect(within(row!).getByText(item.rating)).toBeInTheDocument();
      expect(within(row!).getByText(item.score)).toBeInTheDocument();
    });
  });

  it("handles empty data correctly", () => {
    vi.mocked(useRatingSummary).mockReturnValue(
      queryStates.success<RatingSummaryData[]>([])
    );

    render(<RatingsSummaryCard />);

    // Header should still be present
    expect(screen.getByText("Ratings Summary")).toBeInTheDocument();

    // No data rows should be present
    const rows = screen.queryAllByRole("row");
    expect(rows.length).toBe(0);
  });

  it("applies correct styling to cells", () => {
    vi.mocked(useRatingSummary).mockReturnValue(queryStates.success(mockData));

    render(<RatingsSummaryCard />);

    // Check analyst name styling
    mockData.forEach((item) => {
      const analystCell = screen.getByText(item.analyst);
      expect(analystCell).toHaveClass("text-blue-500");
    });

    // Check center alignment for rating and score
    const rows = screen.getAllByRole("row");
    rows.forEach((row) => {
      const cells = within(row).getAllByRole("cell");
      // Skip first cell (analyst name)
      expect(cells[1]).toHaveClass("text-center"); // rating
      expect(cells[2]).toHaveClass("text-center"); // score
    });
  });

  it("handles error state appropriately", () => {
    vi.mocked(useRatingSummary).mockReturnValue(
      queryStates.error<RatingSummaryData[]>(new Error("Failed to fetch"))
    );

    render(<RatingsSummaryCard />);

    expect(screen.getByText("Ratings Summary")).toBeInTheDocument();

    expect(screen.queryByRole("row")).not.toBeInTheDocument();
  });

  it("has headers hidden", () => {
    vi.mocked(useRatingSummary).mockReturnValue(queryStates.success(mockData));

    render(<RatingsSummaryCard />);

    expect(screen.queryByRole("columnheader")).not.toBeInTheDocument();
  });
});
