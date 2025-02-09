import { useMemo } from "react";
import { Column, DataRecord, Table } from "./common/Table";
import { useRatingSummary } from "../api/queries";
import { RatingSummary } from "../types/api";
import { Card } from "./common/Card";

interface RatingData extends DataRecord {
  analyst: string;
  rating: string;
  score: string;
}

const transformRatingSummary = (data: RatingSummary): RatingData[] => {
  const entries = Object.entries(data);
  const result = new Array(entries.length);

  for (let i = 0; i < entries.length; i++) {
    const [analyst, value] = entries[i];
    result[i] = {
      analyst: analyst.replace(/_/g, " "),
      rating: value.rating,
      score: value.score.toFixed(2).toString(),
    };
  }

  return result;
};

export const RatingsSummaryCard = () => {
  const { data, isLoading } = useRatingSummary();

  const transformedData = useMemo(() => {
    if (!data) return [];
    return transformRatingSummary(data);
  }, [data]);

  const columns: Column<RatingData>[] = [
    {
      key: "analyst",
      align: "left",
      className: "text-blue-500",
    },
    {
      key: "rating",
      align: "center",
      renderCell: (value) => value?.toUpperCase(),
    },
    {
      key: "score",
      align: "right",
      renderCell: (value) => value,
    },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Ratings Summary
      </h2>
      <Table<RatingData>
        hideHeaders
        columns={columns}
        data={transformedData}
        isLoading={isLoading}
      />
    </Card>
  );
};
