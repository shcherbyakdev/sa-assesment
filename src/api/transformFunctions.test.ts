import { describe, it, expect } from "vitest";
import {
  transformNowGrades,
  transformThreeMonthGrades,
  transformSixMonthGrades,
  isFactor,
} from "./transformFunctions";
import {
  NowGradesResponse,
  ThreeMonthGradesResponse,
  SixMonthGradesResponse,
  FactorGrades,
} from "../types/api";

describe("isFactor", () => {
  it("returns true for valid factors", () => {
    expect(isFactor("Valuation")).toBe(true);
    expect(isFactor("Growth")).toBe(true);
    expect(isFactor("Profitability")).toBe(true);
    expect(isFactor("Momentum")).toBe(true);
    expect(isFactor("Revisions")).toBe(true);
  });

  it("returns false for invalid factors", () => {
    expect(isFactor("InvalidFactor")).toBe(false);
    expect(isFactor("")).toBe(false);
    expect(isFactor("Random")).toBe(false);
  });
});

describe("transformNowGrades", () => {
  it("correctly maps valid response with all factors", () => {
    const response: NowGradesResponse = {
      Valuation: { current: "A+" },
      Growth: { current: "B-" },
      Profitability: { current: "C" },
      Momentum: { current: "D+" },
      Revisions: { current: "F" },
      OtherField: { current: "A" }, // Should be ignored
    };

    const expected: FactorGrades = {
      Valuation: "A+",
      Growth: "B-",
      Profitability: "C",
      Momentum: "D+",
      Revisions: "F",
    };

    expect(transformNowGrades(response)).toEqual(expected);
  });

  it("handles partial response with missing factors", () => {
    const response: NowGradesResponse = {
      Valuation: { current: "A+" },
      Growth: { current: "B-" },
    };

    const result = transformNowGrades(response);
    expect(result.Valuation).toBe("A+");
    expect(result.Growth).toBe("B-");
    expect(Object.keys(result).length).toBe(2);
  });

  it("ignores invalid factors", () => {
    const response: NowGradesResponse = {
      InvalidFactor: { current: "A+" },
      Valuation: { current: "B+" },
    };

    const result = transformNowGrades(response);
    expect(result.Valuation).toBe("B+");
    expect(Object.keys(result).length).toBe(1);
  });
});

describe("transformThreeMonthGrades", () => {
  it("correctly maps valid response with all factors", () => {
    const response: ThreeMonthGradesResponse = {
      Valuation: "A+",
      Growth: "B-",
      Profitability: "C",
      Momentum: "D+",
      Revisions: "F",
      OtherField: "A", // Should be ignored
    };

    const expected: FactorGrades = {
      Valuation: "A+",
      Growth: "B-",
      Profitability: "C",
      Momentum: "D+",
      Revisions: "F",
    };

    expect(transformThreeMonthGrades(response)).toEqual(expected);
  });

  it("handles partial response with missing factors", () => {
    const response: ThreeMonthGradesResponse = {
      Valuation: "A+",
      Growth: "B-",
    };

    const result = transformThreeMonthGrades(response);
    expect(result.Valuation).toBe("A+");
    expect(result.Growth).toBe("B-");
    expect(Object.keys(result).length).toBe(2);
  });

  it("ignores invalid factors", () => {
    const response: ThreeMonthGradesResponse = {
      InvalidFactor: "A+",
      Valuation: "B+",
    };

    const result = transformThreeMonthGrades(response);
    expect(result.Valuation).toBe("B+");
    expect(Object.keys(result).length).toBe(1);
  });
});

describe("transformSixMonthGrades", () => {
  it("correctly maps valid response with all factors", () => {
    const response: SixMonthGradesResponse = {
      data: [
        ["Valuation", "A+"],
        ["Growth", "B-"],
        ["Profitability", "C"],
        ["Momentum", "D+"],
        ["Revisions", "F"],
        ["OtherField", "A"], // Should be ignored
      ],
    };

    const expected: FactorGrades = {
      Valuation: "A+",
      Growth: "B-",
      Profitability: "C",
      Momentum: "D+",
      Revisions: "F",
    };

    expect(transformSixMonthGrades(response)).toEqual(expected);
  });

  it("handles partial response with missing factors", () => {
    const response: SixMonthGradesResponse = {
      data: [
        ["Valuation", "A+"],
        ["Growth", "B-"],
      ],
    };

    const result = transformSixMonthGrades(response);
    expect(result.Valuation).toBe("A+");
    expect(result.Growth).toBe("B-");
    expect(Object.keys(result).length).toBe(2);
  });

  it("ignores invalid factors", () => {
    const response: SixMonthGradesResponse = {
      data: [
        ["InvalidFactor", "A+"],
        ["Valuation", "B+"],
      ],
    };

    const result = transformSixMonthGrades(response);
    expect(result.Valuation).toBe("B+");
    expect(Object.keys(result).length).toBe(1);
  });
});
