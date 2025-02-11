import { ReactNode } from "react";
import { Skeleton } from "./Skeleton";

type Alignment = "left" | "center" | "right";

// Remove the BaseRecord type constraint since we want to allow any object type
export interface Column<T> {
  header?: string;
  key: keyof T;
  align?: Alignment;
  className?: string;
  renderCell?: (value: T[keyof T], row: T) => ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data?: T[];
  isLoading?: boolean;
  hideHeaders?: boolean;
  className?: string;
  loadingRowCount?: number;
  firstColumnWidth?: string;
  "data-testid"?: string;
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

export function Table<T>({
  columns = [],
  data = [],
  isLoading = false,
  hideHeaders = false,
  className = "",
  loadingRowCount = 3,
  firstColumnWidth = "150px",
  "data-testid": dataTestId,
}: TableProps<T>) {
  const baseCellStyles = "py-2 px-3 text-sm whitespace-nowrap";
  const defaultTextStyle = "text-gray-700";

  if (isLoading) {
    return (
      <div className={`w-full overflow-auto ${className}`}>
        <table className="w-full table-fixed" data-testid={dataTestId}>
          {!hideHeaders && (
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={String(column.key) || index}
                    className={`py-2 px-3 text-sm font-medium text-gray-300 ${getAlignmentClass(
                      column.align
                    )} truncate`}
                    style={{
                      width: index === 0 ? firstColumnWidth : column.width,
                    }}
                  >
                    <Skeleton className="h-4 w-full" />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {Array.from({ length: loadingRowCount }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${String(column.key) || colIndex}`}
                    className={`py-2 px-3 ${getAlignmentClass(
                      column.align
                    )} truncate`}
                    style={{
                      width: colIndex === 0 ? firstColumnWidth : column.width,
                    }}
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
    <div className={`w-full overflow-auto ${className}`}>
      <table className="w-full table-fixed" data-testid={dataTestId}>
        {!hideHeaders && (
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={String(column.key) || index}
                  className={`
                    py-2 px-3 text-sm font-medium text-gray-400 whitespace-nowrap
                    ${getAlignmentClass(column.align)} truncate
                  `}
                  style={{
                    width: index === 0 ? firstColumnWidth : column.width,
                  }}
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
                const value = row[column.key];
                const content = column.renderCell
                  ? column.renderCell(value, row)
                  : (value as ReactNode);

                return (
                  <td
                    key={`${rowIndex}-${String(column.key) || cellIndex}`}
                    className={`
                      ${baseCellStyles}
                      ${getAlignmentClass(column.align)}
                      ${column.className || defaultTextStyle} truncate
                    `}
                    style={{
                      width: cellIndex === 0 ? firstColumnWidth : column.width,
                    }}
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
