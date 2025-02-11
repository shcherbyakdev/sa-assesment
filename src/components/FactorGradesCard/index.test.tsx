import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FactorGradesCard } from "./index";
import { useFactorGrades } from "../../api/hooks";
import { queryStates } from "../../test/helpers";
import type { FactorGrades } from "../../types/api";
import { FACTORS } from "../../types/api";

vi.mock("../../api/hooks", () => ({
  useFactorGrades: vi.fn(),
}));

describe("FactorGradesCard", () => {
  const mockGradesData: FactorGrades = {
    Valuation: "A+",
    Growth: "B-",
    Profitability: "C+",
    Momentum: "A-",
    Revisions: "B+",
  };

  it("renders loading state correctly", () => {
    vi.mocked(useFactorGrades).mockReturnValue([
      queryStates.loading<FactorGrades>(),
      queryStates.loading<FactorGrades>(),
      queryStates.loading<FactorGrades>(),
    ]);

    const { container } = render(<FactorGradesCard />);

    expect(screen.getByText("Factor Grades")).toBeInTheDocument();

    // Check for loading skeletons
    const placeholders = container.getElementsByClassName("animate-pulse")[0];
    expect(placeholders).toBeInTheDocument();
  });

  it("renders full data state correctly", () => {
    vi.mocked(useFactorGrades).mockReturnValue([
      queryStates.success<FactorGrades>(mockGradesData),
      queryStates.success<FactorGrades>(mockGradesData),
      queryStates.success<FactorGrades>(mockGradesData),
    ]);

    render(<FactorGradesCard />);

    const headerCells = screen.getAllByRole("columnheader");
    expect(headerCells).toHaveLength(4); // Factor, Now, 3M ago, 6M ago
    expect(headerCells[1]).toHaveTextContent("Now");
    expect(headerCells[2]).toHaveTextContent("3M ago");
    expect(headerCells[3]).toHaveTextContent("6M ago");

    FACTORS.forEach((factor) => {
      expect(screen.getByText(factor)).toBeInTheDocument();
    });

    const rows = screen.getAllByRole("row");
    const firstDataRow = rows[1];
    const cells = within(firstDataRow).getAllByRole("cell");
    expect(cells[1]).toHaveTextContent("A+"); // Now
    expect(cells[2]).toHaveTextContent("A+"); // 3M
    expect(cells[3]).toHaveTextContent("A+"); // 6M
  });

  it("shows loading state if any query is loading", () => {
    vi.mocked(useFactorGrades).mockReturnValue([
      queryStates.success<FactorGrades>(mockGradesData),
      queryStates.loading<FactorGrades>(),
      queryStates.success<FactorGrades>(mockGradesData),
    ]);

    const { container } = render(<FactorGradesCard />);

    const loadingRows = container.getElementsByClassName("animate-pulse");
    expect(loadingRows.length).toBe(24);
  });

  it("handles partial data correctly", () => {
    const partialData: FactorGrades = {
      Valuation: "A+",
      Growth: "B-",
    };

    vi.mocked(useFactorGrades).mockReturnValue([
      queryStates.success<FactorGrades>(partialData),
      queryStates.success<FactorGrades>(mockGradesData),
      queryStates.success<FactorGrades>(mockGradesData),
    ]);

    render(<FactorGradesCard />);

    const rows = screen.getAllByRole("row");
    const valuationRow = rows[1];
    const cells = within(valuationRow).getAllByRole("cell");

    expect(cells[0]).toHaveTextContent("Valuation");
    expect(cells[1]).toHaveTextContent("A+");
  });

  it("applies correct styling to cells when data is loaded", () => {
    vi.mocked(useFactorGrades).mockReturnValue([
      queryStates.success<FactorGrades>(mockGradesData),
      queryStates.success<FactorGrades>(mockGradesData),
      queryStates.success<FactorGrades>(mockGradesData),
    ]);

    render(<FactorGradesCard />);

    const rows = screen.getAllByRole("row");
    const firstDataRow = rows[1];
    const cells = within(firstDataRow).getAllByRole("cell");

    // Factor name cell
    expect(cells[0]).toHaveClass("text-blue-500");

    // Grade cells
    expect(cells[1]).toHaveClass("text-center", "text-gray-700");
    expect(cells[2]).toHaveClass("text-center", "text-gray-700");
    expect(cells[3]).toHaveClass("text-center", "text-gray-700");
  });

  it("handles error states appropriately", () => {
    vi.mocked(useFactorGrades).mockReturnValue([
      queryStates.error<FactorGrades>(new Error("Failed to fetch")),
      queryStates.success<FactorGrades>(mockGradesData),
      queryStates.success<FactorGrades>(mockGradesData),
    ]);

    render(<FactorGradesCard />);

    const rows = screen.getAllByRole("row");
    const firstDataRow = rows[1];
    const cells = within(firstDataRow).getAllByRole("cell");

    expect(cells[0]).toHaveTextContent("Valuation");
    expect(cells[1]).toBeEmptyDOMElement(); // First period should be empty due to error
    expect(cells[2]).toHaveTextContent("A+"); // Other periods should have data
    expect(cells[3]).toHaveTextContent("A+");
  });
});
