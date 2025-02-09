import { ReactNode } from "react";
import { Skeleton } from "./Skeleton";

type Alignment = "left" | "center" | "right";

// Ensure cell values are ReactNode compatible
type CellValue = string | undefined;
export type DataRecord = Record<string, CellValue>;

export interface Column<T extends DataRecord = DataRecord> {
  header?: string;
  key: keyof T | string;
  align?: Alignment;
  className?: string;
  renderCell?: (value: CellValue, row: T) => ReactNode;
}

interface TableProps<T extends DataRecord = DataRecord> {
  columns: Column<T>[];
  data?: T[];
  isLoading?: boolean;
  underlineRows?: boolean;
  hideHeaders?: boolean;
  className?: string;
  loadingRowCount?: number;
}

const getAlignmentClass = (align: Alignment = "left"): string => {
  switch (align) {
    case "right":
      return "text-right";
    case "center":
      return "text-center";
    default:
      return "text-left";
  }
};

export function Table<T extends DataRecord = DataRecord>({
  columns = [],
  data = [],
  isLoading = false,
  underlineRows = false,
  hideHeaders = false,
  className = "",
  loadingRowCount = 3,
}: TableProps<T>) {
  const baseCellStyles = "py-3 px-4 text-sm";
  const defaultTextStyle = "text-gray-700";

  if (isLoading) {
    return (
      <div className={`w-full overflow-x-auto ${className}`}>
        <table className="w-full min-w-full table-auto">
          {!hideHeaders && (
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((column, index) => (
                  <th
                    key={String(column.key) || index}
                    className={`py-3 px-4 text-sm font-medium text-gray-500 ${getAlignmentClass(
                      column.align
                    )}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {Array.from({ length: loadingRowCount }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${underlineRows ? "border-b border-gray-200" : ""}`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${String(column.key) || colIndex}`}
                    className="py-3 px-4"
                  >
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full min-w-full table-auto">
        {!hideHeaders && (
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column, index) => (
                <th
                  key={String(column.key) || index}
                  className={`
                    py-3 px-4 text-sm font-medium text-gray-500
                    ${getAlignmentClass(column.align)}
                    ${column.className || ""}
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, cellIndex) => {
                const value = row[column.key as keyof T] as CellValue;
                const content = column.renderCell
                  ? column.renderCell(value, row)
                  : value;

                return (
                  <td
                    key={`${rowIndex}-${String(column.key) || cellIndex}`}
                    className={`
                      ${baseCellStyles}
                      ${getAlignmentClass(column.align)}
                      ${column.className || defaultTextStyle}
                    `}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
