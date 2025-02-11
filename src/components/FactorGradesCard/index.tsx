import { useMemo } from "react";
import { useFactorGrades } from "../../api/hooks";
import { Factor, FACTORS, Grade } from "../../types/api";
import { Card } from "../common/Card";
import { Table, Column } from "../common/Table";

interface FactorCellData {
  factor: Factor;
  now?: Grade;
  threeMonth?: Grade;
  sixMonth?: Grade;
}

export const FactorGradesCard = () => {
  const queries = useFactorGrades();
  const [nowQuery, threeMonthQuery, sixMonthQuery] = queries;

  const isLoading = queries.some((query) => query.isLoading);

  const columns: Column<FactorCellData>[] = [
    {
      header: "",
      key: "factor",
      className: "font-normal text-blue-500",
      renderCell: (value) => value,
    },
    {
      header: "Now",
      key: "now",
      align: "center",
      className: "text-gray-700",
      renderCell: (value) => value,
    },
    {
      header: "3M ago",
      key: "threeMonth",
      align: "center",
      className: "text-gray-700",
      renderCell: (value) => value,
    },
    {
      header: "6M ago",
      key: "sixMonth",
      align: "center",
      className: "text-gray-700",
      renderCell: (value) => value,
    },
  ];

  const tableData = useMemo<FactorCellData[]>(
    () =>
      FACTORS.map((factor) => ({
        factor,
        now: nowQuery.data?.[factor],
        threeMonth: threeMonthQuery.data?.[factor],
        sixMonth: sixMonthQuery.data?.[factor],
      })),
    [nowQuery.data, threeMonthQuery.data, sixMonthQuery.data]
  );

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Factor Grades
      </h2>

      <Table<FactorCellData>
        data-testid="factor-grades-table"
        loadingRowCount={FACTORS.length}
        columns={columns}
        data={tableData}
        isLoading={isLoading}
      />
    </Card>
  );
};
