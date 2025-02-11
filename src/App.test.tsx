import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithProviders } from "./test/testUtils";

// Mock child components
vi.mock("./components/RatingsSummaryCard", () => ({
  RatingsSummaryCard: () => <div>Ratings Summary Card</div>,
}));

vi.mock("./components/FactorGradesCard", () => ({
  FactorGradesCard: () => <div>Factor Grades Card</div>,
}));

vi.mock("./components/QantRankingCard", () => ({
  QantRankingCard: () => <div>Qant Ranking Card</div>,
}));

describe("App", () => {
  it("renders RatingsSummaryCard and FactorGradesCard for non-premium user", () => {
    renderWithProviders(<App />, { premium: false });

    expect(screen.getByText("Ratings Summary")).toBeInTheDocument();
    expect(screen.getByText("Factor Grades Card")).toBeInTheDocument();
    expect(screen.queryByText("Qant Ranking Card")).not.toBeInTheDocument();
  });

  it("renders all cards including QantRankingCard for premium user", () => {
    renderWithProviders(<App />, { premium: true });

    expect(screen.getByText("Ratings Summary")).toBeInTheDocument();
    expect(screen.getByText("Factor Grades Card")).toBeInTheDocument();
    expect(screen.getByText("Qant Ranking Card")).toBeInTheDocument();
  });
});
