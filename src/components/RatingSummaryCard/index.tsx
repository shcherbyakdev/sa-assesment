import { Table, Column } from "../common/Table";
import { useRatingSummary } from "../../api/hooks";
import { Card } from "../common/Card";
import { RatingSummaryData } from "../../types/api";

export const RatingsSummaryCard = () => {
  const { data, isLoading } = useRatingSummary();

  const columns: Column<RatingSummaryData>[] = [
    {
      key: "analyst",
      align: "left",
      className: "text-blue-500",
    },
    {
      key: "rating",
      align: "center",
      renderCell: (value) => value,
    },
    {
      key: "score",
      align: "center",
      renderCell: (value) => value,
    },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Ratings Summary
      </h2>
      <Table<RatingSummaryData>
        hideHeaders
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
      />
    </Card>
  );
};
