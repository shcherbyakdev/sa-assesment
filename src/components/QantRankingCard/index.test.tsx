import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QantRankingCard } from "./index";
import { useQuantRanking } from "../../api/hooks";
import { queryStates } from "../../test/helpers";
import type { QuantRanking } from "../../types/api";

vi.mock("../../api/hooks", () => ({
  useQuantRanking: vi.fn(),
}));

describe("QantRankingCard", () => {
  const mockData: QuantRanking = {
    sector: "Technology",
    industry: "Software",
    rankings: {
      overall: { rank: 5, total: 100 },
      sector: { rank: 3, total: 50 },
      industry_specific: { rank: 2, total: 25 },
    },
  };

  it("renders loading state correctly", () => {
    vi.mocked(useQuantRanking).mockReturnValue(
      queryStates.loading<QuantRanking>()
    );

    const { container } = render(<QantRankingCard />);

    expect(screen.getByText("Qant Ranking")).toBeInTheDocument();
    expect(container.getElementsByClassName("h-4").length).toBeGreaterThan(0);
  });

  it("renders data correctly when loaded", () => {
    vi.mocked(useQuantRanking).mockReturnValue(
      queryStates.success<QuantRanking>(mockData)
    );

    render(<QantRankingCard />);

    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("Software")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders all section labels correctly", () => {
    vi.mocked(useQuantRanking).mockReturnValue(
      queryStates.success<QuantRanking>(mockData)
    );

    render(<QantRankingCard />);

    [
      "Sector",
      "Industry",
      "Ranked Overall",
      "Ranked in Sector",
      "Ranked in Industry",
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders the "Beat The Market" link', () => {
    vi.mocked(useQuantRanking).mockReturnValue(
      queryStates.success<QuantRanking>(mockData)
    );

    render(<QantRankingCard />);

    const link = screen.getByText("Ratings Beat The Market »");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "#");
  });

  it("handles error state appropriately", () => {
    vi.mocked(useQuantRanking).mockReturnValue(
      queryStates.error<QuantRanking>(new Error("Failed to fetch"))
    );

    render(<QantRankingCard />);
    expect(screen.queryByText("Technology")).not.toBeInTheDocument();
  });
});
